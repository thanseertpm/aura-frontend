import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

const REFRESH_URL = "/accounts/token/refresh/";

// Keep the CSRF token in memory.
let csrfToken = null;
let csrfTokenPromise = null;

// Prevent multiple simultaneous refresh requests.
let refreshPromise = null;

// Endpoints where a 401 should not trigger an automatic token refresh.
const refreshExcludedUrls = [
  "/accounts/login/",
  "/accounts/signup/",
  "/accounts/google/",
  "/accounts/otp/",
  "/accounts/password/reset/",
  "/accounts/logout/",
  REFRESH_URL,
];

function shouldSkipRefresh(url = "") {
  return refreshExcludedUrls.some((endpoint) =>
    url.includes(endpoint),
  );
}

// Fetch a fresh CSRF token from Django.
export const refreshCSRFToken = async () => {
  if (!csrfTokenPromise) {
    csrfTokenPromise = api
      .get("/accounts/csrf/")
      .then((response) => {
        csrfToken = response.data.csrfToken;
        return csrfToken;
      })
      .catch((error) => {
        csrfToken = null;
        throw error;
      })
      .finally(() => {
        csrfTokenPromise = null;
      });
  }

  return csrfTokenPromise;
};

// Refresh the access token using the HttpOnly refresh-token cookie.
async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = api
      .post(REFRESH_URL)
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

// Attach CSRF token to unsafe requests.
api.interceptors.request.use(async (config) => {
  const method = (config.method || "get").toLowerCase();

  const unsafeMethods = ["post", "put", "patch", "delete"];

  if (unsafeMethods.includes(method)) {
    if (!csrfToken) {
      await refreshCSRFToken();
    }

    config.headers = config.headers || {};
    config.headers["X-CSRFToken"] = csrfToken;
  }

  return config;
});

// Handle expired access tokens.
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      shouldSkipRefresh(originalRequest.url)
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // Refresh the access token. Concurrent 401 responses share
      // the same refresh request.
      await refreshAccessToken();

      // The backend has updated the HttpOnly cookies.
      // Retry the original request with the new access cookie.
      return api(originalRequest);
    } catch (refreshError) {
      csrfToken = null;
      return Promise.reject(refreshError);
    }
  },
);

export default api;