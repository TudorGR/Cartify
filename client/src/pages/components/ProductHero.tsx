import {
  // ...existing code...
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin({ x, y });
  };

  return (
    <div className="w-full max-w-5xl mx-auto h-full flex flex-col">
      <p className="my-2 flex">
        {loading ? (
          <Skeleton
            containerClassName=" w-100"
            className="pt-1 h-full rounded-2xl "
          />
        ) : (
          `Home > All > ${data.category} > ${data.name}`
        )}
      </p>
      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-col items-start">
          <div className="grid grid-cols-[1fr_3fr] h-full w-full gap-6">
            {loading ? (
              <>
                <div className="flex flex-col justify-between gap-6">
                  <div className="bg-neutral-200 rounded-2xl overflow-hidden flex-1">
                    <Skeleton
                      containerClassName="flex-1 w-20"
                      className="pt-10 h-full rounded-2xl"
                    />
                  </div>
                  <div className="bg-neutral-200 rounded-2xl overflow-hidden flex-1">
                    <Skeleton
                      containerClassName="flex-1 w-20"
                      className="pt-10 h-full rounded-2xl"
                    />
                  </div>
                  <div className="bg-neutral-200 rounded-2xl overflow-hidden flex-1">
                    <Skeleton
                      containerClassName="flex-1 w-20"
                      className="pt-10 h-full rounded-2xl"
                    />
                  </div>
                </div>
                <div className="bg-neutral-200 rounded-2xl overflow-hidden">
                  <Skeleton
                    containerClassName="flex-1 w-20"
                    className="pt-10 h-full rounded-2xl"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col justify-between gap-6">
                  <div className="bg-neutral-200 rounded-2xl flex-1 overflow-hidden">
                    <img
                      src={data.image}
                      alt={data.name}
                      className="pointer-events-none h-full"
                    />
                  </div>
                  <div className="bg-neutral-200 rounded-2xl flex-1 overflow-hidden">
                    <img
                      src={data.image}
                      alt={data.name}
                      className="pointer-events-none h-full"
                    />
                  </div>
                  <div className="bg-neutral-200 rounded-2xl flex-1 overflow-hidden">
                    <img
                      src={data.image}
                      alt={data.name}
                      className="pointer-events-none h-full"
                    />
                  </div>
                </div>
                <div
                  className={`bg-neutral-200 rounded-2xl overflow-hidden "cursor-zoom-in`}
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
                containerClassName="w-70"
                className=" h-full rounded-2xl "
              />
            ) : (
              <>{data.name}</>
            )}
          </p>
          <div className="flex gap-4">
            {data.discountedPrice ? (
              <>
                <p>${data.discountedPrice}</p>
                <p className="text-neutral-200 line-through">${data.price}</p>
              </>
            ) : (
              <p>${data.price}</p>
            )}
            <p>★★★☆☆ (20 reviews)</p>
          </div>
          <div className="w-full border-b border-neutral-200"></div>
          <p className="">
            {loading ? (
              <Skeleton className="pt-7 h-full rounded-2xl " />
            ) : (
              <>{data.shortDescription}</>
            )}
          </p>
          <div className="flex gap-4">
            <div className="flex gap-4 border border-neutral-200  py-2 rounded-full">
              <button
                className=" px-4 cursor-pointer"
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
                className=" px-4 cursor-pointer"
                onClick={() => setQuantity(quantity + 1)}
              >
                {"+"}
              </button>
            </div>
            <button className="cursor-pointer text-white w-full bg-neutral-500 rounded-full">
              Add to Cart (animation go to cart icon)
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
