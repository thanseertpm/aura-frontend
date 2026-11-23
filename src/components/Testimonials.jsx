import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../services/api";

const dummyReviews = [
  {
    id: "dummy-1",
    username: "Rahul",
    product_title: "Classic Casual Shirt",
    rating: 5,
    review:
      "Excellent quality and perfect fitting. The fabric feels premium, and I am very happy with my purchase!",
    isDummy: true,
  },
  {
    id: "dummy-2",
    username: "Ananya",
    product_title: "Premium Fashion Collection",
    rating: 5,
    review:
      "Really loved the product! The quality exceeded my expectations. Definitely shopping here again.",
    isDummy: true,
  },
  {
    id: "dummy-3",
    username: "Arjun",
    product_title: "Men's Casual Wear",
    rating: 4,
    review:
      "Good quality and comfortable to wear. The product looks exactly as shown on the website.",
    isDummy: true,
  },
  {
    id: "dummy-4",
    username: "Sneha",
    product_title: "Fashion Accessories",
    rating: 5,
    review:
      "Great shopping experience. The product is stylish, and the quality is worth the price.",
    isDummy: true,
  },
  {
    id: "dummy-5",
    username: "Vishnu",
    product_title: "Everyday Fashion",
    rating: 4,
    review:
      "Good product with nice finishing. I liked the overall quality and packaging.",
    isDummy: true,
  },
  {
    id: "dummy-6",
    username: "Meera",
    product_title: "Women's Fashion Collection",
    rating: 5,
    review:
      "Beautiful product and amazing quality. I am completely satisfied with my order.",
    isDummy: true,
  },
  {
    id: "dummy-7",
    username: "Adithya",
    product_title: "Casual Wear Collection",
    rating: 5,
    review:
      "Very comfortable and stylish. The product was exactly what I was looking for.",
    isDummy: true,
  },
  {
    id: "dummy-8",
    username: "Nikhil",
    product_title: "Premium Clothing",
    rating: 4,
    review:
      "Nice quality for the price. The overall shopping experience was smooth.",
    isDummy: true,
  },
  {
    id: "dummy-9",
    username: "Akhila",
    product_title: "Fashion Essentials",
    rating: 5,
    review:
      "Loved the design and quality. Would definitely recommend checking out this collection.",
    isDummy: true,
  },
  {
    id: "dummy-10",
    username: "Sanjay",
    product_title: "Men's Style Collection",
    rating: 4,
    review:
      "Good product, comfortable material, and a nice overall experience.",
    isDummy: true,
  },
];

const getInitials = (username = "Customer") => {
  return username
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/catalog/testimonials/");

        const responseData = response?.data?.data;

        const realReviews = Array.isArray(responseData) ? responseData : [];

        // Only 4-star and 5-star reviews
        const filteredReviews = realReviews.filter((item) =>
          [4, 5].includes(Number(item.rating)),
        );



        if (filteredReviews.length < 10) {


          setReviews(dummyReviews);
        } else {


          setReviews(
            filteredReviews.map((item) => ({
              ...item,
              isDummy: false,
            })),
          );
        }
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);

        setError(
          err?.response?.data?.message ||
            "Unable to load testimonials. Please try again later.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="overflow-hidden bg-white py-14">
      <div className="mx-auto mb-10 max-w-7xl px-4 text-center sm:px-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#c77b4b]">
          Customer Feedback
        </p>

        <h2 className="title-font text-3xl text-gray-900 sm:text-4xl">
          What Our Customers Say
        </h2>
      </div>

      {loading && (
        <div className="py-12 text-center text-sm text-gray-500">
          Loading testimonials...
        </div>
      )}

      {!loading && error && (
        <div className="mx-auto max-w-3xl rounded-lg border border-red-200 bg-red-50 px-4 py-8 text-center">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {!loading && !error && reviews.length > 0 && (
        <div className="testimonial-marquee relative">
          <div className="testimonial-track flex w-max gap-5">
            {duplicatedReviews.map((item, index) => (
              <article
                key={`${item.id}-${index}`}
                aria-hidden={index >= reviews.length}
                className="flex w-[300px] shrink-0 flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:w-[340px]"
              >
                {/* Customer details */}
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f8eee8] text-sm font-semibold text-[#a75f35]">
                    {getInitials(item.username)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-gray-900">
                      {item.username || "Customer"}
                    </h3>

                    <p className="mt-1 truncate text-xs text-gray-500">
                      {item.product_title || "Aura Fashions"}
                    </p>
                  </div>
                </div>

                {/* Star rating */}
                <div
                  className="mb-4 flex gap-1"
                  aria-label={`${item.rating} out of 5 stars`}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      fill={star <= Number(item.rating) ? "#c77b4b" : "none"}
                      color={
                        star <= Number(item.rating) ? "#c77b4b" : "#d1d5db"
                      }
                    />
                  ))}
                </div>

                {/* Review text */}
                <p className="flex-1 text-sm leading-7 text-gray-600">
                  "{item.review}"
                </p>
              </article>
            ))}
          </div>
        </div>
      )}

      {!loading && !error && reviews.length === 0 && (
        <div className="py-12 text-center text-sm text-gray-500">
          No testimonials are available right now.
        </div>
      )}

<style>{`
  .testimonial-marquee {
    width: 100%;
    overflow: hidden;
    padding: 8px 0 16px;
  }

  .testimonial-track {
    width: max-content;
    animation: testimonial-scroll 45s linear infinite;
    will-change: transform;
  }

  @keyframes testimonial-scroll {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(-50%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .testimonial-track {
      animation: none;
    }
  }
`}</style>
    </section>
  );
};

export default Testimonials;
