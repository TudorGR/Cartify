import { useEffect, useState } from "react";

const SpecialDeal = () => {
  const [countDown, setCountDown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
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
        <div className="bg-neutral-500 rounded-3xl text-white py-16 flex items-center justify-center flex-col">
          <div className="text-5xl">{countDown.days}</div>
          <div>Days</div>
        </div>
        <div className="bg-neutral-500 rounded-3xl text-white py-12 flex items-center justify-center flex-col">
          <div className="text-5xl">{countDown.hours}</div>
          <div>Hours</div>
        </div>
        <div className="bg-neutral-500 rounded-3xl text-white py-12 flex items-center justify-center flex-col">
          <div className="text-5xl">{countDown.minutes}</div>
          <div>Minutes</div>
        </div>
        <div className="bg-neutral-500 rounded-3xl text-white py-12 flex items-center justify-center flex-col">
          <div className="text-5xl">{countDown.seconds}</div>
          <div>Seconds</div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center">
        <p className="text-7xl">10%</p>
        <p className="text-3xl">
          Special{" "}
          <span className="text-neutral-400 underline">{countDownDay}</span>{" "}
          Deal
        </p>
        <button className="bg-neutral-500 rounded-full px-4 py-2">
          Shop now
        </button>
      </div>
    </div>
  );
};

export default SpecialDeal;
