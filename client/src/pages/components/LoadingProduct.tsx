import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { UserContext } from "../../../context/userContext";

const LoadingProduct = () => {
  const { lightMode } = useContext(UserContext);

  return (
    <div className={`flex flex-col gap-2 ${lightMode ? "" : "brightness-50"}`}>
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
          className={`${
            lightMode
              ? "border border-neutral-400 text-neutral-400"
              : "border border-neutral-600 text-neutral-600"
          } cursor-pointer rounded-full w-10 h-10 shrink-0 transition-all`}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default LoadingProduct;
