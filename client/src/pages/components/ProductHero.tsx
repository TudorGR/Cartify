import {
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { UserContext } from "../../../context/userContext";
import axios from "axios";

interface ProductProps {
  data: {
    id: string;
    name: string;
    shortDescription: string;
    category: string;
    image: string;
    price: number;
    discountedPrice: number;
  };
  loading: boolean;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}

const ProductHero = ({
  data,
  loading,
  quantity,
  setQuantity,
}: ProductProps) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState<{ x: number; y: number }>({
    x: 50,
    y: 50,
  });
  const [reviewData, setReviewData] = useState({
    averageRating: 0,
    totalReviews: 0,
  });
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    if (data.id) {
      fetchReviewData();
    }
  }, [data.id]);

  const fetchReviewData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/reviews/${data.id}/stats`
      );
      setReviewData({
        averageRating: response.data.averageRating,
        totalReviews: response.data.totalReviews,
      });
    } catch (error) {
      console.error("Error fetching review data:", error);
      setReviewData({
        averageRating: 0,
        totalReviews: 0,
      });
    } finally {
      setReviewsLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      "★".repeat(fullStars) + (hasHalfStar ? "☆" : "") + "☆".repeat(emptyStars)
    );
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin({ x, y });
  };
  const { lightMode, addToCart, cart } = useContext(UserContext);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: data.id,
        name: data.name,
        price: data.price,
        discountedPrice: data.discountedPrice,
        image: data.image,
      });
    }
  };

  const isInCart = cart.has(data.id);

  return (
    <div className="px-5 w-full max-w-5xl mx-auto h-full flex flex-col">
      <p className="my-2 flex">
        {loading ? (
          <Skeleton
            containerClassName="  w-100"
            className={`pt-1 h-full rounded-xl ${
              lightMode ? "" : "brightness-50"
            }`}
          />
        ) : (
          `Home > All > ${data.category} > ${data.name}`
        )}
      </p>
      <div className="grid-rows-2 grid sm:grid-cols-2 sm:grid-rows-1 gap-10 ">
        <div className="flex flex-col items-start">
          <div className="grid grid-cols-1 sm:grid-rows-1 sm:grid-cols-[1fr_3fr] h-full w-full gap-6">
            {loading ? (
              <>
                <div className="hidden sm:flex flex-col justify-between gap-6">
                  <div className=" rounded-xl overflow-hidden flex-1">
                    <Skeleton
                      containerClassName={`${
                        lightMode ? "" : "brightness-50"
                      } flex-1 w-20`}
                      className="pt-10 h-full rounded-xl"
                    />
                  </div>
                  <div className=" rounded-xl overflow-hidden flex-1">
                    <Skeleton
                      containerClassName={`${
                        lightMode ? "" : "brightness-50"
                      } flex-1 w-20`}
                      className="pt-10 h-full rounded-xl"
                    />
                  </div>
                  <div className=" rounded-xl overflow-hidden flex-1">
                    <Skeleton
                      containerClassName={`${
                        lightMode ? "" : "brightness-50"
                      } flex-1 w-20`}
                      className="pt-10 h-full rounded-xl"
                    />
                  </div>
                </div>
                <div className=" rounded-xl overflow-hidden">
                  <Skeleton
                    containerClassName={`${
                      lightMode ? "" : "brightness-50"
                    } flex-1 w-20`}
                    className="pt-10 h-full rounded-xl"
                  />
                </div>
              </>
            ) : (
              <>
                <div className=" hidden sm:flex sm:flex-col justify-between gap-6">
                  <div className=" rounded-xl flex-1 overflow-hidden">
                    <img
                      src={data.image}
                      alt={data.name}
                      className="pointer-events-none h-full"
                    />
                  </div>
                  <div
                    className={`${
                      lightMode ? "bg-neutral-200" : "bg-neutral-700"
                    } rounded-xl flex-1 overflow-hidden`}
                  >
                    <img
                      src={data.image}
                      alt={data.name}
                      className="pointer-events-none h-full"
                    />
                  </div>
                  <div
                    className={`${
                      lightMode ? "bg-neutral-200" : "bg-neutral-700"
                    } rounded-xl flex-1 overflow-hidden`}
                  >
                    <img
                      src={data.image}
                      alt={data.name}
                      className="pointer-events-none h-full"
                    />
                  </div>
                </div>
                <div
                  className={`${
                    lightMode ? "bg-neutral-200" : "bg-neutral-700"
                  } rounded-xl overflow-hidden cursor-zoom-in`}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                >
                  <img
                    src={data.image}
                    alt={data.name}
                    draggable={false}
                    className="h-full w-full object-cover select-none will-change-transform"
                    style={{
                      transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                      transform: isZoomed ? "scale(1.6)" : "scale(1)",
                      transition: "transform 150ms ease-out",
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6 min-h-100">
          <p className="text-4xl flex">
            {loading ? (
              <Skeleton
                containerClassName={`${lightMode ? "" : "brightness-50"} w-70`}
                className="h-full rounded-xl "
              />
            ) : (
              <>{data.name}</>
            )}
          </p>
          <div className="flex gap-4">
            {data.discountedPrice ? (
              <>
                <p>${data.discountedPrice}</p>
                <p
                  className={`${
                    lightMode ? "text-neutral-400" : "text-neutral-500"
                  } line-through`}
                >
                  ${data.price}
                </p>
              </>
            ) : (
              <p>${data.price}</p>
            )}
            {reviewsLoading ? (
              <Skeleton
                containerClassName={`${lightMode ? "" : "brightness-50"} w-32`}
                className="h-5 rounded-xl"
              />
            ) : reviewData.totalReviews > 0 ? (
              <p>
                {renderStars(reviewData.averageRating)} (
                {reviewData.totalReviews} review
                {reviewData.totalReviews !== 1 ? "s" : ""})
              </p>
            ) : (
              <p className="text-neutral-400">No reviews yet</p>
            )}
          </div>
          <div
            className={`border-t ${
              lightMode ? "border-neutral-200" : "border-neutral-800"
            }`}
          />
          <p className="flex flex-col">
            {loading ? (
              <>
                <Skeleton
                  containerClassName="w-full"
                  className={`${
                    lightMode ? "" : "brightness-50"
                  } pt-4 h-5 rounded-xl `}
                />
                <Skeleton
                  containerClassName="w-40"
                  className={`${
                    lightMode ? "" : "brightness-50"
                  } pt-4 h-5 rounded-xl`}
                />
              </>
            ) : (
              <>{data.shortDescription}</>
            )}
          </p>
          <div className="flex gap-4">
            <div
              className={`flex gap-4 border ${
                lightMode ? "border-neutral-300" : "border-neutral-600"
              } py-2 rounded-lg`}
            >
              <button
                className="px-4 cursor-pointer"
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  }
                }}
              >
                {"-"}
              </button>
              <p>{quantity}</p>
              <button
                className="px-4 cursor-pointer"
                onClick={() => setQuantity(quantity + 1)}
              >
                {"+"}
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className={`cursor-pointer text-white w-full ${
                lightMode
                  ? "bg-neutral-800 hover:bg-neutral-700"
                  : "bg-neutral-500 hover:bg-neutral-400"
              } rounded-lg transition-colors`}
            >
              {isInCart ? "Added to Cart ✓" : "Add to Cart"}
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-neutral-400">
              Free Worldwide shipping on all orders over $100
            </p>
            <p className="text-neutral-400">Delivers in: 3-7 working days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHero;
