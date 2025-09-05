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
        <p className="hero-font absolute top-73 left-35 rotate-16 text-5xl w-100 text-white">
          Up to 50% Off
        </p>
        <p className="hero-font absolute top-28 left-132 rotate-16 text-7xl w-80">
          Your Next Gadget Awaits
        </p>
        <Link
          to={"/products/All"}
          className={`pointer-events-auto absolute shadow-2xl right-12 bottom-20 cursor-pointer text-white ${
            lightMode
              ? "border border-neutral-800 hover:border-neutral-500"
              : "border border-neutral-500 hover:border-neutral-400"
          } rounded-full px-6 text-3xl py-3 transition-colors flex items-center gap-2`}
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default Hero;
