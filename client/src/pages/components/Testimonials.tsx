import testimonials from "../../assets/testimonials.png";
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
      className={` relative h-150 ${
        lightMode ? "bg-neutral-300" : "bg-neutral-700"
      } `}
    >
      <img
        alt="hero"
        className="z-0 pointer-events-none opacity-60 object-contain absolute w-full h-full left-0 top-0"
        src={testimonials}
      />
      <div className="relative z-10 w-full max-w-5xl mx-auto h-full gap-6 flex justify-between items-center">
        <div
          className={`flex flex-col items-start gap-6 ${
            lightMode ? "bg-white" : "bg-black"
          } p-4 rounded-xl`}
        >
          <div className="flex flex-col gap-6">
            <h2
              className={`text-5xl ${lightMode ? "text-black" : "text-white"}`}
            >
              From our <br /> Customers.
            </h2>
            <p
              className={`${lightMode ? "text-black" : "text-white"} max-w-60`}
            >
              Here's what other customers had to say about Cartify.
            </p>
          </div>
          <div className="flex gap-6">
            <button
              disabled={btnPress}
              className={`flex items-center justify-center rounded-full ${
                lightMode
                  ? "bg-neutral-100 text-black"
                  : "bg-neutral-800 text-white"
              } w-14 h-14 transition-colors cursor-pointer`}
              onClick={handleLeftPress}
            >
              <FaAngleLeft className="w-7 h-7" />
            </button>
            <button
              disabled={btnPress}
              className={`flex items-center justify-center rounded-full ${
                lightMode
                  ? "bg-neutral-100 text-black"
                  : "bg-neutral-800 text-white"
              } w-14 h-14 transition-colors cursor-pointer`}
              onClick={handleRightPress}
            >
              <FaAngleRight className="w-7 h-7" />
            </button>
          </div>
        </div>
        <div
          className="pointer-events-none max-w-100 flex overflow-x-scroll scroll-smooth no-scrollbar"
          ref={scrollRef}
        >
          <div
            className={`${
              lightMode ? "text-black" : "text-white"
            } flex flex-col gap-6`}
          >
            <p className="text-2xl w-100 ">
              "Amazing shopping experience! Fast delivery and excellent customer
              service. Highly recommend Cartify to everyone!"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black font-semibold text-lg">
                SJ
              </div>
              <p>Sarah Johnson</p>
            </div>
          </div>
          <div
            className={`${
              lightMode ? "text-black" : "text-white"
            } flex flex-col gap-6`}
          >
            <p className="text-2xl w-100 ">
              "Great quality products at competitive prices. The website is easy
              to navigate and checkout was seamless."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black font-semibold text-lg">
                MC
              </div>
              <p>Michael Chen</p>
            </div>
          </div>
          <div
            className={`${
              lightMode ? "text-black" : "text-white"
            } flex flex-col gap-6`}
          >
            <p className="text-2xl w-100 ">
              "Outstanding customer support! They helped me find exactly what I
              needed. Will definitely shop here again."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black font-semibold text-lg">
                ER
              </div>
              <p>Emily Rodriguez</p>
            </div>
          </div>
          <div
            className={`${
              lightMode ? "text-black" : "text-white"
            } flex flex-col gap-6`}
          >
            <p className="text-2xl w-100 ">
              "Fast shipping and products exactly as described. The whole
              shopping experience exceeded my expectations!"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black font-semibold text-lg">
                DT
              </div>
              <p>David Thompson</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
