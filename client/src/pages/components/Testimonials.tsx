import { useRef, useState } from "react";

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [btnPress, setBtnPress] = useState(false);

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
    <div className="h-150 bg-neutral-500">
      <div className="w-full max-w-5xl  mx-auto h-full gap-6 flex justify-between items-center">
        <div className="flex flex-col items-start gap-6">
          <div className="flex flex-col gap-6">
            <h2 className="text-5xl">
              From out <br /> Customers.
            </h2>
            <p className="max-w-60">
              Here's what other customers had to say about Cartify.
            </p>
          </div>
          <div className="flex gap-6">
            <button
              disabled={btnPress}
              className="rounded-full bg-white w-14 h-14"
              onClick={handleLeftPress}
            >
              left
            </button>
            <button
              disabled={btnPress}
              className="rounded-full bg-white w-14 h-14"
              onClick={handleRightPress}
            >
              right
            </button>
          </div>
        </div>
        <div
          className="max-w-100 flex overflow-x-scroll scroll-smooth no-scrollbar"
          ref={scrollRef}
        >
          <div className="flex flex-col gap-6">
            <p className="text-2xl w-100">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Exercitationem magni soluta sit.
            </p>
            <div className="flex items-center gap-4">
              <img alt="img" className="w-16 h-16 rounded-full bg-white" />
              <p>John Smith</p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-2xl w-100">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Exercitationem magni soluta sit.
            </p>
            <div className="flex items-center gap-4">
              <img alt="img" className="w-16 h-16 rounded-full bg-white" />
              <p>John Smith</p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-2xl w-100">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Exercitationem magni soluta sit.
            </p>
            <div className="flex items-center gap-4">
              <img alt="img" className="w-16 h-16 rounded-full bg-white" />
              <p>John Smith</p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-2xl w-100">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Exercitationem magni soluta sit.
            </p>
            <div className="flex items-center gap-4">
              <img alt="img" className="w-16 h-16 rounded-full bg-white" />
              <p>John Smith</p>
            </div>
          </div>
          <div className="flex flex-col gap-6 ">
            <p className="text-2xl w-100">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Exercitationem magni soluta sit.
            </p>
            <div className="flex items-center gap-4">
              <img alt="img" className="w-16 h-16 rounded-full bg-white" />
              <p>John Smith</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
