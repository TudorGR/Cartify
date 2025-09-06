import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import hero2 from "../../assets/hero2.png";
import { Link } from "react-router-dom";
import PageWrapperRight from "./PageWrapperRight";

const Hero = () => {
  const { lightMode } = useContext(UserContext);

  return (
    <div
      className={`transition-all flex flex-col items-center pointer-events-none overflow-hidden sm:h-100 lg:h-150 ${
        lightMode
          ? " bg-hero-light text-black"
          : "bg-hero-dark text-white lg:text-black"
      } relative`}
    >
      <PageWrapperRight>
        <div className="z-4 mt-20 sm:mt-0 px-5 h-full relative flex flex-col justify-end w-full lg:w-5xl mx-auto  sm:px-6 ">
          <div className="hero-font  items-start static lg:absolute lg:top-30 lg:left-10 flex gap-4 lg:gap-4 justify-start mt-4 lg:mt-0">
            <div className="flex flex-col ">
              <p className="text-3xl font-semibold">200+</p>
              <p className="text-black/80">Suppliers</p>
            </div>
            <div className=" w-[1px] border-l border-black h-14"></div>
            <div className="flex flex-col ">
              <p className="text-3xl font-semibold">2,000+</p>
              <p className="text-black/80">High-Quality Products</p>
            </div>
            <div className=" w-[1px] border-l border-black h-14"></div>
            <div className="flex flex-col ">
              <p className="text-3xl font-semibold">10,000+</p>
              <p className="text-black/80">Happy customers</p>
            </div>
          </div>
          <p className=" hero-font rounded-lg relative lg:absolute lg:top-27 lg:left-130 lg:rotate-16 rotate-0 text-4xl  lg:text-7xl  lg:w-80 mt-6 lg:mt-0">
            Your Next Gadget Awaits
          </p>
          <Link
            to={"/products/All"}
            draggable={false}
            className={`w-fit pointer-events-auto  relative lg:absolute transition-all lg:right-12 lg:bottom-20 cursor-pointer text-black ${
              lightMode
                ? "bg-white active:scale-90 hover:scale-110 "
                : "bg-black text-white active:scale-90 hover:scale-110"
            } rounded-lg px-5 sm:px-6 text-xl sm:text-2xl lg:text-3xl py-2.5 sm:py-3 flex items-center gap-2 my-6  lg:my-0`}
          >
            Shop Now
          </Link>
        </div>
        <img
          alt="hero"
          className="z-0 lg:pt-12 object-cover lg:object-contain block sm:absolute mx-auto w-full h-full lg:bottom-0"
          src={hero2}
        />
      </PageWrapperRight>
    </div>
  );
};

export default Hero;
