import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import hero2 from "../../assets/hero2.png";
import { Link } from "react-router-dom";
import PageWrapperRight from "./PageWrapperRight";

const Hero = () => {
  const { lightMode } = useContext(UserContext);

  return (
    <div
      className={`transition-all flex flex-col items-center pointer-events-none overflow-hidden sm:h-100 md:h-150 ${
        lightMode
          ? " bg-hero-light text-black"
          : "bg-hero-dark text-white lg:text-black"
      } relative`}
    >
      <PageWrapperRight>
        <div className="z-4 mt-20 sm:mt-0 px-5 h-full relative flex flex-col justify-end w-full lg:w-5xl mx-auto  sm:px-6 ">
          <div className="hero-font  items-start static md:absolute md:top-25 md:left-25 flex gap-4 md:gap-4 justify-start mt-4 md:mt-0">
            <div className="flex flex-col ">
              <p className="text-xl sm:text-3xl font-semibold">200+</p>
              <p className="text-black/80 sm:text-md text-sm">Suppliers</p>
            </div>
            <div className=" w-[1px] border-l border-black h-14"></div>
            <div className="flex flex-col ">
              <p className="text-xl sm:text-3xl font-semibold">2,000+</p>
              <p className="text-black/80 sm:text-md text-sm">
                High-Quality Products
              </p>
            </div>
            <div className=" w-[1px] border-l border-black h-14"></div>
            <div className="flex flex-col ">
              <p className="text-xl sm:text-3xl font-semibold">10,000+</p>
              <p className="text-black/80 sm:text-md text-sm">
                Happy customers
              </p>
            </div>
          </div>
          <p className="hero-font rounded-lg relative md:absolute md:top-50 md:left-25 w-100 text-6xl  md:text-7xl  md:w-50 mt-3 sm:mt-6 md:mt-0">
            <span className="hero-font md:tracking-widest">Because</span>{" "}
            Shopping Should Be Fun
          </p>
          <Link
            to={"/products/All"}
            draggable={false}
            className={`w-fit pointer-events-auto  relative md:absolute transition-all md:left-25 md:bottom-5 cursor-pointer text-black ${
              lightMode
                ? "bg-white active:scale-90 hover:scale-110 "
                : "bg-black text-white active:scale-90 hover:scale-110"
            } rounded-lg px-5 sm:px-6 text-xl sm:text-2xl md:text-3xl py-2.5 sm:py-3 flex items-center gap-2 sm:my-6 mt-3 sm:mt-6  md:my-0`}
          >
            Explore Now
          </Link>
        </div>
        <img
          alt="hero"
          className="z-0 sm:pt-20  md:pt-12 object-contain object-bottom lg:object-contain block sm:absolute mx-auto lg:w-full h-full sm:bottom-0 sm:ml-[30vw] lg:ml-40 sm:w-[90vw] w-[100vw]"
          src={hero2}
        />
      </PageWrapperRight>
    </div>
  );
};

export default Hero;
