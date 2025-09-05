import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useContext, useEffect, useState } from "react";
import Electronics from "../../assets/Electronics.png";
import Toys from "../../assets/Toys.png";
import Beauty from "../../assets/Beauty.png";
import Automotive from "../../assets/Automotive.png";
import { UserContext } from "../../../context/userContext";

const Categories = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { lightMode } = useContext(UserContext);

  useEffect(() => {
    setTimeout(
      () => setLoading(false),
      Math.floor(Math.random() * (500 - 200 + 1)) + 200
    );
  }, []);

  return (
    <div className="w-full max-w-5xl  mx-auto h-full gap-6 flex flex-col items-center">
      <div className="cursor-pointer max-w-xl flex flex-col gap-2 items-center">
        <h1
          className={`flex-1 text-2xl ${
            lightMode ? "text-black" : "text-white"
          }`}
        >
          Categories
        </h1>
        <p className="text-neutral-400 text-center">
          Browse through our diverse product categories to find exactly what
          you're looking for. From electronics to beauty products, we have it
          all.
        </p>
      </div>
      <div className="grid-cols-3 grid h-100 gap-6 w-full">
        <div
          onClick={() => navigate("/products/Electronics")}
          className="cursor-pointer bg-neutral-500 rounded-2xl w-full h-full relative overflow-hidden"
        >
          {loading ? (
            <Skeleton
              containerClassName="absolute w-full flex-1"
              className={`h-100 rounded-2xl pt-[50px] ${
                lightMode ? "" : "brightness-50"
              }`}
            />
          ) : (
            <img
              src={Electronics}
              className={`h-full object-cover ${
                lightMode ? "brightness-50" : "brightness-100"
              }`}
            />
          )}
          <p className="text-xl absolute bottom-6 left-6 text-white">
            Electronics
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <div
            onClick={() => navigate("/products/Toys")}
            className="cursor-pointer bg-neutral-500 rounded-2xl w-full flex-1 relative overflow-hidden"
          >
            {loading ? (
              <Skeleton
                containerClassName="absolute w-full flex-1"
                className={`h-100 rounded-2xl pt-[50px] ${
                  lightMode ? "" : "brightness-50"
                }`}
              />
            ) : (
              <img
                src={Toys}
                className={`absolute object-cover translate-y-[-20%] ${
                  lightMode ? "brightness-50" : "brightness-100"
                }`}
              />
            )}
            <p className="text-xl absolute bottom-6 left-6 text-white">Toys</p>
          </div>
          <div
            onClick={() => navigate("/products/Beauty")}
            className="cursor-pointer bg-neutral-500 rounded-2xl w-full flex-1 relative overflow-hidden"
          >
            {loading ? (
              <Skeleton
                containerClassName="absolute w-full flex-1"
                className={`h-100 rounded-2xl pt-[50px] ${
                  lightMode ? "" : "brightness-50"
                }`}
              />
            ) : (
              <img
                src={Beauty}
                className={`absolute object-cover translate-y-[-20%] ${
                  lightMode ? "brightness-50" : "brightness-100"
                }`}
              />
            )}
            <p className="text-xl absolute bottom-6 left-6 text-white">
              Beauty
            </p>
          </div>
        </div>
        <div
          onClick={() => navigate("/products/Automotive")}
          className="cursor-pointer bg-neutral-500 rounded-2xl w-full h-full relative overflow-hidden"
        >
          {loading ? (
            <Skeleton
              containerClassName="absolute w-full flex-1"
              className={`h-100 rounded-2xl pt-[50px] ${
                lightMode ? "" : "brightness-50"
              }`}
            />
          ) : (
            <img
              src={Automotive}
              className={`h-full object-cover ${
                lightMode ? "brightness-50" : "brightness-100"
              }`}
            />
          )}
          <p className="text-xl absolute bottom-6 left-6 text-white">
            Automotive
          </p>
        </div>
      </div>
    </div>
  );
};

export default Categories;
