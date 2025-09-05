import { useContext, useState } from "react";
import { UserContext } from "../../../context/userContext";
import { IoMail } from "react-icons/io5";
import toast from "react-hot-toast";

const NewsLetter = () => {
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setTimeout(() => {
      setText("");
      toast.success("Subscribed");
    }, Math.floor(Math.random() * (500 - 200 + 1)) + 200);
  }

  const { lightMode } = useContext(UserContext);
  return (
    <div className="h-75">
      <div className="w-full max-w-5xl mx-auto h-full flex flex-col gap-6 items-center">
        <h2 className={`${lightMode ? "text-black" : "text-white"} text-4xl`}>
          Get 10% off your first order!
        </h2>
        <p className={`${lightMode ? "text-black" : "text-white"}`}>
          Subscribe to our newsletter to get a 10% off your first order and to
          never miss any discounts.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="email"
            placeholder="example@email.com"
            className={`${
              lightMode
                ? "text-black bg-white border-neutral-300"
                : "text-white bg-neutral-800 border-neutral-600"
            } rounded-lg px-6 py-3 border`}
          />
          <button
            type="submit"
            className={`cursor-pointer text-white ${
              lightMode
                ? "bg-neutral-800 hover:bg-neutral-700"
                : "bg-neutral-500 hover:bg-neutral-400"
            } rounded-lg px-6 py-3 transition-colors flex items-center gap-2`}
          >
            Subscribe
            <IoMail className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
