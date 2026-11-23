import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verify the current user using the JWT access-token cookie.
  // Axios automatically refreshes the access token if it has expired.
  const refreshUser = useCallback(async () => {
    try {
      const response = await api.get("/accounts/me/");

      // Your backend MeView returns the raw user JSON.
      const userData = response.data?.data;

      setUser(userData);
      return userData;
    } catch (error) {
      setUser(null);

      console.error("User authentication verification failed:", {
        status: error.response?.status,
        response: error.response?.data,
        message: error.message,
      });

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Check authentication when the application loads.
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const logout = useCallback(async () => {
    try {
      // Backend blacklists the refresh token and clears both JWT cookies.
      await api.post("/accounts/logout/");
    } catch (error) {
      console.error("Logout request failed:", {
        status: error.response?.status,
        response: error.response?.data,
        message: error.message,
      });
    } finally {
      setUser(null);
    }
  }, []);

  const value = {
    user,
    loading,
    refreshUser,
    logout,
    isAuthenticated: Boolean(user),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}