import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/userContext";

const ContactForm = () => {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  const { lightMode } = useContext(UserContext);

  return (
    <div className="my-20 z-10 h-full flex-1 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className={`rounded-2xl p-6 flex flex-col gap-4 ${
          lightMode ? "bg-white text-black" : "bg-neutral-900 text-white"
        }`}
      >
        <h2 className="text-4xl">Get in Touch</h2>
        <p>You can reach us anytime</p>
        <div className="flex gap-4">
          <input
            required
            className={`flex-1 border ${
              lightMode
                ? "border-neutral-300 bg-white text-black"
                : "border-neutral-600 bg-neutral-800 text-white"
            } px-4 py-2 rounded-lg`}
            type="text"
            placeholder="First Name"
          />
          <input
            required
            className={`flex-1 border ${
              lightMode
                ? "border-neutral-300 bg-white text-black"
                : "border-neutral-600 bg-neutral-800 text-white"
            } px-4 py-2 rounded-lg`}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          className={`border ${
            lightMode
              ? "border-neutral-300 bg-white text-black"
              : "border-neutral-600 bg-neutral-800 text-white"
          } px-4 py-2 rounded-lg`}
          type="text"
          placeholder="example@email.com"
        />
        <input
          required
          className={`border ${
            lightMode
              ? "border-neutral-300 bg-white text-black"
              : "border-neutral-600 bg-neutral-800 text-white"
          } px-4 py-2 rounded-lg`}
          type="tel"
          placeholder="+1 (XXX) XXX - XXXX"
        />
        <textarea
          rows={4}
          required
          placeholder="How can we help?"
          className={`resize-none border ${
            lightMode
              ? "border-neutral-300 bg-white text-black"
              : "border-neutral-600 bg-neutral-800 text-white"
          } px-4 py-2 rounded-lg`}
        ></textarea>
        <div className="flex gap-4">
          <button
            type="submit"
            className={`${
              lightMode
                ? "bg-neutral-800 hover:bg-neutral-700"
                : "bg-neutral-500 hover:bg-neutral-400"
            } rounded-lg px-6 py-3 w-fit text-white transition-colors`}
          >
            Submit
          </button>
          <p>
            By contacting us, you agree to our{" "}
            <Link
              to={"/terms"}
              className={`font-bold cursor-pointer ${
                lightMode ? "text-blue-600" : "text-blue-400"
              } hover:underline transition-all`}
            >
              Terms of service
            </Link>{" "}
            and{" "}
            <Link
              to={"/privacy"}
              className={`font-bold cursor-pointer ${
                lightMode ? "text-blue-600" : "text-blue-400"
              } hover:underline transition-all`}
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
