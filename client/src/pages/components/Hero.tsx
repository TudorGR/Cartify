import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import hero2 from "../../assets/hero2.png";
import { Link } from "react-router-dom";

const Hero = () => {
  const { lightMode } = useContext(UserContext);

  return (
    <div
      className={`transition-all pointer-events-none overflow-hidden h-150 ${
        lightMode ? " bg-hero-light" : "bg-hero-dark"
      } relative`}
    >
      <img
        alt="hero"
        className="mt-10 object-contain absolute mx-auto w-full h-full top-0"
        src={hero2}
      />
      <div className="h-full relative top-0  w-5xl  mx-auto">
        <div className="hero-font absolute top-30 left-10 flex gap-4">
          <div className="flex flex-col text-black">
            <p className="text-3xl">200+</p>
            <p className="text-black/60">Suppliers</p>
          </div>
          <div className="w-[1px] border-l border-black h-14"></div>
          <div className="flex flex-col text-black">
            <p className="text-3xl">2,000+</p>
            <p className="text-black/60">High-Quality Products</p>
          </div>
          <div className="w-[1px] border-l border-black h-14"></div>
          <div className="flex flex-col text-black">
            <p className="text-3xl">10,000+</p>
            <p className="text-black/60">Happy customers</p>
          </div>
        </div>
        <p className="hero-font absolute top-28 left-132 rotate-16 text-7xl w-80">
          Your Next Gadget Awaits
        </p>
        <Link
          to={"/products/All"}
          draggable={false}
          className={` pointer-events-auto absolute transition-all right-12 bottom-20 cursor-pointer text-black ${
            lightMode
              ? "bg-white active:scale-90 hover:scale-110 "
              : "bg-black text-white active:scale-90 hover:scale-110"
          } rounded-full px-6 text-3xl py-3  flex items-center gap-2`}
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default Hero;
