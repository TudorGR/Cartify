import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/userContext";
import axios from "axios";
import { toast } from "react-hot-toast";

interface Review {
  _id: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface DescriptionReviewProps {
  productId: string;
}

const DescriptionReview = ({ productId }: DescriptionReviewProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const { lightMode, user } = useContext(UserContext);

  const wrapperClasses = lightMode
    ? "bg-neutral-50 text-neutral-600"
    : "bg-neutral-900 text-neutral-300";
  const headingClasses = lightMode ? "text-neutral-900" : "text-neutral-100";
  const dividerBorder = lightMode ? "border-neutral-200" : "border-neutral-800";
  const cardClasses = lightMode
    ? "bg-white border-neutral-200"
    : "bg-neutral-800 border-neutral-700";
  const inputBase = lightMode
    ? "border-neutral-200 bg-white text-black focus:ring-neutral-400"
    : "border-neutral-600 bg-neutral-800 text-white focus:ring-neutral-600";
  const buttonBase = lightMode
    ? "bg-neutral-900 hover:bg-neutral-800 text-white"
    : "bg-neutral-600 hover:bg-neutral-500 text-white";

  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name,
        email: user.email,
        rating: 5,
        comment: "",
      });
    }
  }, [user]);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    if (productId) {
      try {
        let response;
        response = await axios.get(
          `http://localhost:3000/reviews/${productId}`
        );

        setReviews(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.comment) {
      toast.error("Please fill in all fields");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post("http://localhost:3000/reviews", {
        productId,
        ...formData,
      });
      toast.success("Review posted successfully!");
      setFormData({ name: "", email: "", rating: 5, comment: "" });
      fetchReviews();
    } catch (error) {
      toast.error("Error posting review");
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className={wrapperClasses}>
      <div className="w-full max-w-5xl mx-auto  py-12 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <section className="flex flex-col gap-4">
            <h2
              className={`text-2xl md:text-3xl font-semibold ${headingClasses}`}
            >
              Description
            </h2>
            <p className="leading-7">
              Experience the perfect blend of quality, functionality, and style
              with this product. Designed with attention to detail, it offers
              durability you can rely on and comfort you'll appreciate every
              day. Whether you're using it at home, at work, or on the go, this
              item adapts seamlessly to your lifestyle. With its sleek design
              and premium materials, it not only performs exceptionally but also
              looks great in any setting. An ideal choice for those who value
              practicality without compromising on aesthetics.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                ♻️ Made from premium recycled materials, reducing waste and
                environmental impact
              </li>
              <li>🌱 Eco-friendly design that supports sustainable living</li>
              <li>
                💪 Durable and long-lasting, crafted to withstand daily use
              </li>
              <li>
                ✨ Stylish yet practical, blending modern aesthetics with
                functionality
              </li>
              <li>
                🌍 A responsible choice for those who value both quality and the
                planet
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-4">
            <h2
              className={`text-2xl md:text-3xl font-semibold ${headingClasses}`}
            >
              Reviews
            </h2>
            <div className="flex flex-col gap-4 max-h-100 overflow-auto p-2">
              {loading ? (
                <p>Loading reviews...</p>
              ) : (
                <>
                  {reviews.map((review) => (
                    <article
                      key={review._id}
                      className={`flex gap-2 flex-col items-start border p-4 rounded-xl ${cardClasses}`}
                    >
                      <div className="flex w-full justify-between items-start">
                        <h3 className="text-lg font-medium">{review.name}</h3>
                        <div
                          className="text-yellow-500"
                          role="img"
                          aria-label={`Rating: ${review.rating} out of 5`}
                        >
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="text-sm leading-6">{review.comment}</p>
                      <p className="text-xs opacity-70">
                        Posted on {formatDate(review.createdAt)}
                      </p>
                    </article>
                  ))}

                  {reviews.length === 0 && (
                    <div className="text-center opacity-70 h-100 w-full flex items-center justify-center">
                      <p>No reviews yet. Be the first to review!</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`border ${cardClasses} p-6 rounded-xl flex flex-col gap-4`}
        >
          <h3 className={`text-lg font-semibold ${headingClasses}`}>
            Write a review
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col gap-1">
              <label htmlFor="review-name" className="sr-only">
                Your Name
              </label>
              <input
                id="review-name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={`flex-1 border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${inputBase}`}
                placeholder="Your Name"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="review-email" className="sr-only">
                Email
              </label>
              <input
                id="review-email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`flex-1 border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${inputBase}`}
                placeholder="example@email.com"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="review-comment" className="sr-only">
              Your Review
            </label>
            <textarea
              id="review-comment"
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
              rows={4}
              placeholder="Write your review..."
              className={`w-full resize-none border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${inputBase}`}
              required
            ></textarea>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
            <div className="flex items-center gap-2">
              <label htmlFor="review-rating" className="text-sm">
                Your rating:
              </label>
              <select
                id="review-rating"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: Number(e.target.value) })
                }
                className={`border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${inputBase}`}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {renderStars(num)}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className={`${buttonBase} cursor-pointer px-6 py-3 rounded-lg transition-colors disabled:opacity-50`}
            >
              {submitting ? "Posting..." : "Post Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DescriptionReview;
