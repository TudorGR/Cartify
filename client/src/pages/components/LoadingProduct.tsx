import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingProduct = () => {
  return (
    <div className="flex flex-col gap-2 ">
      <div className="w-60 rounded-2xl overflow-hidden">
        <Skeleton
          containerClassName="flex-1 w-60"
          className="h-80 rounded-2xl pt-[50px]"
        />
      </div>
      <div className="flex justify-between max-w-60 w-full">
        <div>
          <p className="max-h-8 text-nowrap truncate w-45">
            <Skeleton containerClassName="flex-1" className="h-5 rounded-2xl" />
          </p>
          <div className="flex w-min">
            <Skeleton
              containerClassName="flex-1 w-20"
              className="h-5 rounded-2xl"
            />
          </div>
        </div>
        <button
          className={`border border-gray-400
          cursor-pointer text-gray-400 rounded-full w-10 h-10 shrink-0 transition-all`}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default LoadingProduct;
