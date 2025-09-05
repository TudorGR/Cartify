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
    <div className="grid grid-cols-2 max-w-5xl w-full mx-auto">
      <div className="grid grid-cols-4 gap-4 p-4">
        <div
          className={`${
            lightMode ? "bg-neutral-600" : "bg-neutral-500"
          } rounded-xl text-white py-16 flex items-center justify-center flex-col`}
        >
          <div className="text-5xl">{countDown.days}</div>
          <div>Days</div>
        </div>
        <div
          className={`${
            lightMode ? "bg-neutral-600" : "bg-neutral-500"
          } rounded-xl text-white py-12 flex items-center justify-center flex-col`}
        >
          <div className="text-5xl">{countDown.hours}</div>
          <div>Hours</div>
        </div>
        <div
          className={`${
            lightMode ? "bg-neutral-600" : "bg-neutral-500"
          } rounded-xl text-white py-12 flex items-center justify-center flex-col`}
        >
          <div className="text-5xl">{countDown.minutes}</div>
          <div>Minutes</div>
        </div>
        <div
          className={`${
            lightMode ? "bg-neutral-600" : "bg-neutral-500"
          } rounded-xl text-white py-12 flex items-center justify-center flex-col`}
        >
          <div className="text-5xl">{countDown.seconds}</div>
          <div>Seconds</div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center">
        <p
          className={`${
            lightMode ? "text-black" : "text-white"
          } text-7xl hero-font`}
        >
          10%
        </p>

        <p className={` ${lightMode ? "text-black" : "text-white"} text-2xl`}>
          Special{" "}
          <span className="text-2xl  text-neutral-400 underline">
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
          } rounded-lg px-6 py-3 text-white transition-colors gap-1 flex items-center`}
        >
          Shop now
          <MdNavigateNext className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
};

export default SpecialDeal;
