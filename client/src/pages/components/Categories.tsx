import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";

const Categories = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full max-w-5xl  mx-auto h-full gap-6 flex flex-col items-center">
      <div className="cursor-pointer max-w-xl flex flex-col gap-2 items-center">
        <p className="text-">View our range of categoris</p>
        <p className="text-neutral-400 text-center">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus
          delectus soluta consectetur, sint eum voluptatem quaerat sunt unde
          inventore.
        </p>
      </div>
      <div className="grid-cols-3 grid h-100 gap-6 w-full">
        <div
          onClick={() => navigate("/products/Electronics")}
          className="cursor-pointer bg-neutral-500 rounded-2xl w-full h-full relative overflow-hidden"
        >
          {loading && (
            <Skeleton
              containerClassName="absolute w-full flex-1"
              className="h-100 rounded-2xl pt-[50px]"
            />
          )}
          <p className="absolute bottom-6 left-6 text-white">Electronics</p>
        </div>
        <div className="flex flex-col gap-6">
          <div
            onClick={() => navigate("/products/Toys")}
            className="cursor-pointer bg-neutral-500 rounded-2xl w-full flex-1 relative overflow-hidden"
          >
            {loading && (
              <Skeleton
                containerClassName="absolute w-full flex-1"
                className="h-100 rounded-2xl pt-[50px]"
              />
            )}
            <p className="absolute bottom-6 left-6 text-white">Toys</p>
          </div>
          <div
            onClick={() => navigate("/products/Beauty")}
            className="cursor-pointer bg-neutral-500 rounded-2xl w-full flex-1 relative overflow-hidden"
          >
            {loading && (
              <Skeleton
                containerClassName="absolute w-full flex-1"
                className="h-100 rounded-2xl pt-[50px]"
              />
            )}
            <p className="absolute bottom-6 left-6 text-white">Beauty</p>
          </div>
        </div>
        <div
          onClick={() => navigate("/products/Automotive")}
          className="cursor-pointer bg-neutral-500 rounded-2xl w-full h-full relative overflow-hidden"
        >
          {loading && (
            <Skeleton
              containerClassName="absolute w-full flex-1"
              className="h-100 rounded-2xl pt-[50px]"
            />
          )}
          <p className="absolute bottom-6 left-6 text-white">Automotive</p>
        </div>
      </div>
    </div>
  );
};

export default Categories;
