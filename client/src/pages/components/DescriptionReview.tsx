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
  const [dorr, setDorr] = useState("r");
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
    <div className={`${lightMode ? "bg-neutral-100" : "bg-neutral-900"}`}>
      <div className="w-full my-20 max-w-5xl mx-auto h-full flex flex-col gap-6">
        <div className="flex gap-6">
          <div className="flex flex-col gap-4 flex-1">
            <h2 className="text-4xl">Description</h2>
            <p>
              Experience the perfect blend of quality, functionality, and style
              with this product. Designed with attention to detail, it offers
              durability you can rely on and comfort you'll appreciate every
              day. Whether you're using it at home, at work, or on the go, this
              item adapts seamlessly to your lifestyle. With its sleek design
              and premium materials, it not only performs exceptionally but also
              looks great in any setting. An ideal choice for those who value
              practicality without compromising on aesthetics.
            </p>
            <ul className="list-disc ml-6">
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
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <h2 className="text-4xl">Reviews</h2>
            <div className="flex flex-col gap-4 max-h-100 overflow-auto p-2">
              {loading ? (
                <p>Loading reviews...</p>
              ) : (
                <>
                  {reviews.map((review) => (
                    <div
                      key={review._id}
                      className={`flex gap-1 flex-col items-start ${
                        lightMode ? "border-neutral-300" : "border-neutral-700"
                      } border p-4 rounded-2xl`}
                    >
                      <div>{renderStars(review.rating)}</div>
                      <h2 className="text-xl">{review.name}</h2>
                      <p>{review.comment}</p>
                      <p className="text-sm opacity-70">
                        Posted on {formatDate(review.createdAt)}
                      </p>
                    </div>
                  ))}

                  {reviews.length === 0 && (
                    <div className="text-center opacity-70 h-100 w-full flex items-center justify-center">
                      <p>No reviews yet. Be the first to review!</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className={`flex gap-4 flex-col items-start ${
            lightMode ? "border-neutral-300" : "border-neutral-700"
          } border p-4 rounded-2xl`}
        >
          <div className="flex gap-4 w-full">
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`flex-1 border ${
                lightMode
                  ? "border-neutral-300 bg-white text-black"
                  : "border-neutral-600 bg-neutral-800 text-white"
              } px-6 py-3 rounded-full`}
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`flex-1 border ${
                lightMode
                  ? "border-neutral-300 bg-white text-black"
                  : "border-neutral-600 bg-neutral-800 text-white"
              } px-6 py-3 rounded-full`}
              placeholder="example@email.com"
              required
            />
          </div>
          <textarea
            value={formData.comment}
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
            rows={4}
            placeholder="Write your review..."
            className={`w-full resize-none border ${
              lightMode
                ? "border-neutral-300 bg-white text-black"
                : "border-neutral-600 bg-neutral-800 text-white"
            } px-6 py-3 rounded-4xl`}
            required
          ></textarea>
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <span>Your rating:</span>
              <select
                value={formData.rating}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rating: Number(e.target.value),
                  })
                }
                className={`border ${
                  lightMode
                    ? "border-neutral-300 bg-white text-black"
                    : "border-neutral-600 bg-neutral-800 text-white"
                } px-3 py-1 rounded`}
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
              className={`${
                lightMode
                  ? "bg-neutral-800 hover:bg-neutral-700"
                  : "bg-neutral-500 hover:bg-neutral-400"
              } text-white cursor-pointer px-6 py-3 rounded-full transition-colors disabled:opacity-50`}
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
