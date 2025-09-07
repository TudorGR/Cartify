import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import { MdNavigateNext } from "react-icons/md";

const SpecialDeal = () => {
  const [countDown, setCountDown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { lightMode } = useContext(UserContext);

  const [countDownDay, setCountDownDay] = useState("");
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setHours(24, 0, 0, 0);

    const jsDay = today.getDay();
    const mondayIndex = (jsDay + 6) % 7;

    setCountDownDay(days[mondayIndex]);

    const x = setInterval(() => {
      const now = new Date().getTime();
      let diff = tomorrow.getTime() - now;

      if (diff < 0) {
        setCountDown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(x);
        return;
      }

      let days = Math.floor(diff / (1000 * 60 * 60 * 24));
      let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountDown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(x);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center max-w-5xl w-full mx-auto px-5">
      <div className="grid grid-cols-4 gap-2 sm:gap-4 p-3 sm:p-4 self-center">
        <div
          className={`min-h-18 sm:min-h-28 ${
            lightMode ? "bg-neutral-600" : "bg-neutral-500"
          } rounded-xl text-white py-4 sm:py-12 flex items-center justify-center flex-col shadow-sm`}
        >
          <div className="text-2xl md:text-5xl font-semibold">
            {countDown.days}
          </div>
          <div className="hidden sm:block">Days</div>
          <div className="block sm:hidden">D</div>
        </div>
        <div
          className={`min-h-18 sm:min-h-28 ${
            lightMode ? "bg-neutral-600" : "bg-neutral-500"
          } rounded-xl text-white py-4 sm:py-12 flex items-center justify-center flex-col shadow-sm`}
        >
          <div className="text-2xl md:text-5xl font-semibold">
            {countDown.hours}
          </div>
          <div className="hidden sm:block">Hours</div>
          <div className="block sm:hidden">H</div>
        </div>
        <div
          className={`min-h-18 sm:min-h-28 ${
            lightMode ? "bg-neutral-600" : "bg-neutral-500"
          } rounded-xl text-white py-4 sm:py-12 flex items-center justify-center flex-col shadow-sm`}
        >
          <div className="text-2xl md:text-5xl font-semibold">
            {countDown.minutes}
          </div>
          <div className="hidden sm:block">Minutes</div>
          <div className="block sm:hidden">M</div>
        </div>
        <div
          className={`min-h-18 sm:min-h-28 ${
            lightMode ? "bg-neutral-600" : "bg-neutral-500"
          } rounded-xl text-white py-4 sm:py-12 flex items-center justify-center flex-col shadow-sm`}
        >
          <div className="text-2xl md:text-5xl font-semibold">
            {countDown.seconds}
          </div>
          <div className="hidden sm:block">Seconds</div>
          <div className="block sm:hidden">S</div>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:gap-4 items-center justify-center text-center sm:text-left">
        <p
          className={`${
            lightMode ? "text-black" : "text-white"
          } text-5xl sm:text-7xl hero-font leading-none`}
        >
          10%
        </p>

        <p
          className={`${
            lightMode ? "text-black" : "text-white"
          } text-xl sm:text-2xl`}
        >
          Special{" "}
          <span className="text-2xl  text-neutral-500 underline">
            {countDownDay}
          </span>{" "}
          Deal
        </p>
        <Link
          to={"/products/All"}
          className={`cursor-pointer ${
            lightMode
              ? "bg-neutral-800 hover:bg-neutral-700"
              : "bg-neutral-500 hover:bg-neutral-400"
          } rounded-lg px-5 sm:px-6 py-2.5 sm:py-3 text-white transition-colors gap-1 inline-flex items-center`}
        >
          Shop now
          <MdNavigateNext className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
};

export default SpecialDeal;
