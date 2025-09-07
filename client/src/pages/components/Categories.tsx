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
    <div className="px-5 w-full max-w-5xl mx-auto h-full gap-6 flex flex-col items-center">
      <div className="cursor-pointer max-w-xl flex flex-col gap-2 items-center text-center">
        <h1
          className={`hero-font flex-1 text-4xl sm:text-5xl ${
            lightMode ? "text-black" : "text-white"
          }`}
        >
          Categories
        </h1>
        <p className="text-neutral-500 text-sm sm:text-base">
          Browse through our diverse product categories to find exactly what
          you're looking for. From electronics to beauty products, we have it
          all.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 sm:grid-rows-2 gap-3 sm:gap-6 w-full">
        <div
          onClick={() => navigate("/products/Electronics")}
          className="group cursor-pointer bg-neutral-500 rounded-2xl w-full relative overflow-hidden aspect-[24/10] sm:aspect-[4/5] sm:row-span-2 shadow-sm"
        >
          {loading ? (
            <Skeleton
              containerClassName="absolute inset-0"
              className={`w-full h-full ${lightMode ? "" : "brightness-50"}`}
            />
          ) : (
            <img
              loading="lazy"
              width="400"
              height="300"
              alt="electronics image"
              src={Electronics}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                lightMode ? "brightness-75" : "brightness-100"
              }`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <p className="text-lg sm:text-2xl font-medium drop-shadow absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white">
            Electronics
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:gap-6 sm:row-span-2 sm:grid sm:grid-rows-2 sm:h-full">
          <div
            onClick={() => navigate("/products/Toys")}
            className="group cursor-pointer bg-neutral-500 rounded-2xl w-full relative overflow-hidden aspect-[24/10] sm:aspect-auto sm:h-full shadow-sm"
          >
            {loading ? (
              <Skeleton
                containerClassName="absolute inset-0"
                className={`w-full h-full ${lightMode ? "" : "brightness-50"}`}
              />
            ) : (
              <img
                loading="lazy"
                width="400"
                height="300"
                alt="toys image"
                src={Toys}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                  lightMode ? "brightness-75" : "brightness-100"
                }`}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <p className="text-lg sm:text-2xl font-medium drop-shadow absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white">
              Toys
            </p>
          </div>
          <div
            onClick={() => navigate("/products/Beauty")}
            className="group cursor-pointer bg-neutral-500 rounded-2xl w-full relative overflow-hidden aspect-[24/10] sm:aspect-auto sm:h-full shadow-sm"
          >
            {loading ? (
              <Skeleton
                containerClassName="absolute inset-0"
                className={`w-full h-full ${lightMode ? "" : "brightness-50"}`}
              />
            ) : (
              <img
                loading="lazy"
                width="400"
                height="300"
                alt="beauty image"
                src={Beauty}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                  lightMode ? "brightness-75" : "brightness-100"
                }`}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <p className="text-lg sm:text-2xl font-medium drop-shadow absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white">
              Beauty
            </p>
          </div>
        </div>
        <div
          onClick={() => navigate("/products/Automotive")}
          className="group cursor-pointer bg-neutral-500 rounded-2xl w-full relative overflow-hidden aspect-[24/10] sm:aspect-[4/5] sm:row-span-2 shadow-sm"
        >
          {loading ? (
            <Skeleton
              containerClassName="absolute inset-0"
              className={`w-full h-full ${lightMode ? "" : "brightness-50"}`}
            />
          ) : (
            <img
              loading="lazy"
              width="400"
              height="300"
              alt="automotive image"
              src={Automotive}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                lightMode ? "brightness-75" : "brightness-100"
              }`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <p className="text-lg sm:text-2xl font-medium drop-shadow absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white">
            Automotive
          </p>
        </div>
      </div>
    </div>
  );
};

export default Categories;
