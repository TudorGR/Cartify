import testimonials from "../../assets/testimonials.webp";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../../../context/userContext";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [btnPress, setBtnPress] = useState(false);
  const { lightMode } = useContext(UserContext);

  function handleLeftPress() {
    setBtnPress(true);
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 400;
    }
    setTimeout(() => setBtnPress(false), 250);
  }
  function handleRightPress() {
    setBtnPress(true);
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 400;
    }
    setTimeout(() => setBtnPress(false), 250);
  }

  return (
    <div
      className={`px-5 py-10 sm:py-16 relative ${
        lightMode ? "bg-neutral-300" : "bg-neutral-700"
      }`}
    >
      <img
        loading="lazy"
        alt="hero"
        className="z-0 pointer-events-none opacity-50 object-cover absolute w-full h-full left-0 top-0"
        src={testimonials}
      />
      <div className="relative z-10 w-full flex-col sm:flex-row max-w-5xl mx-auto gap-6 flex justify-center items-center">
        <div
          className={`mx-auto sm:w-fit flex flex-col items-center sm:items-start gap-2 sm:gap-4 ${
            lightMode ? "bg-white" : "bg-black"
          } p-4 rounded-xl shadow-sm`}
        >
          <div className="flex flex-col gap-2 sm:gap-6 ">
            <h2
              className={`text-2xl sm:text-4xl font-semibold ${
                lightMode ? "text-black" : "text-white"
              }`}
            >
              From our <br /> Customers.
            </h2>
            <p
              className={`${
                lightMode ? "text-black/80" : "text-white/80"
              } max-w-72 text-sm sm:text-base`}
            >
              Here's what other customers had to say about Cartify.
            </p>
          </div>
          <div className="flex justify-between gap-4 sm:gap-6 w-full sm:justify-center">
            <button
              aria-label="previous"
              disabled={btnPress}
              className={`flex items-center justify-center rounded-full border ${
                lightMode
                  ? "bg-neutral-100 text-black border-neutral-200 hover:bg-neutral-200"
                  : "bg-neutral-800 text-white border-neutral-700 hover:bg-neutral-700"
              } w-12 h-12 sm:w-14 sm:h-14 transition-colors cursor-pointer`}
              onClick={handleLeftPress}
            >
              <FaAngleLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
            <button
              aria-label="next"
              disabled={btnPress}
              className={`flex items-center justify-center rounded-full border ${
                lightMode
                  ? "bg-neutral-100 text-black border-neutral-200 hover:bg-neutral-200"
                  : "bg-neutral-800 text-white border-neutral-700 hover:bg-neutral-700"
              } w-12 h-12 sm:w-14 sm:h-14 transition-colors cursor-pointer`}
              onClick={handleRightPress}
            >
              <FaAngleRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </div>
        </div>
        <div
          className="max-w-full sm:max-w-100 flex overflow-x-auto scroll-smooth no-scrollbar gap-8 snap-x snap-mandatory touch-pan-x"
          ref={scrollRef}
        >
          <div
            className={`${
              lightMode ? "text-black" : "text-white"
            } flex-shrink-0 w-[85vw] sm:w-100 flex flex-col gap-4 sm:gap-6 snap-start`}
          >
            <p className="text-lg sm:text-2xl w-100 leading-relaxed">
              "Amazing shopping experience! Fast delivery and excellent customer
              service. Highly recommend Cartify to everyone!"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center text-black font-semibold text-base sm:text-lg">
                SJ
              </div>
              <p className="text-sm sm:text-base opacity-90">Sarah Johnson</p>
            </div>
          </div>
          <div
            className={`${
              lightMode ? "text-black" : "text-white"
            } flex-shrink-0 w-[85vw] sm:w-100 flex flex-col gap-4 sm:gap-6 snap-start`}
          >
            <p className="text-lg sm:text-2xl w-100 leading-relaxed">
              "Great quality products at competitive prices. The website is easy
              to navigate and checkout was seamless."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center text-black font-semibold text-base sm:text-lg">
                MC
              </div>
              <p className="text-sm sm:text-base opacity-90">Michael Chen</p>
            </div>
          </div>
          <div
            className={`${
              lightMode ? "text-black" : "text-white"
            } flex-shrink-0 w-[85vw] sm:w-100 flex flex-col gap-4 sm:gap-6 snap-start`}
          >
            <p className="text-lg sm:text-2xl w-100 leading-relaxed">
              "Outstanding customer support! They helped me find exactly what I
              needed. Will definitely shop here again."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center text-black font-semibold text-base sm:text-lg">
                ER
              </div>
              <p className="text-sm sm:text-base opacity-90">Emily Rodriguez</p>
            </div>
          </div>
          <div
            className={`${
              lightMode ? "text-black" : "text-white"
            } flex-shrink-0 w-[85vw] sm:w-100 flex flex-col gap-4 sm:gap-6 snap-start`}
          >
            <p className="text-lg sm:text-2xl w-100 leading-relaxed">
              "Fast shipping and products exactly as described. The whole
              shopping experience exceeded my expectations!"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center text-black font-semibold text-base sm:text-lg">
                DT
              </div>
              <p className="text-sm sm:text-base opacity-90">David Thompson</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
