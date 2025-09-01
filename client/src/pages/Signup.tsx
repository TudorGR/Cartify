import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const Signup = () => {
  return (
    <div className="relative flex flex-col gap-20 overflow-hidden justify-between min-h-screen">
      <Navbar color="black" />
      <div className=" w-full max-w-5xl mx-auto h-full">
        <div className="mt-20 border border-neutral-200 overflow-hidden  w-full rounded-2xl flex">
          <div className="flex-1 flex flex-col gap-6 p-6 shrink-0">
            <h2 className="text-3xl">Signup</h2>
            <p>
              Already have an Account?{" "}
              <Link to={"/login"} className="underline cursor-pointer">
                Login
              </Link>
            </p>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Full Name</label>
                <input
                  type="name"
                  className="border border-neutral-300 px-4 py-2 rounded-full"
                  name="name"
                  id="name"
                  placeholder="Michael Joe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Enter your Email Address</label>
                <input
                  type="email"
                  className="border border-neutral-300 px-4 py-2 rounded-full"
                  name="email"
                  id="email"
                  placeholder="example@email.com"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="border border-neutral-300 px-4 py-2 rounded-full"
                  name="password"
                  id="password"
                  placeholder="***********"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  className="border border-neutral-300 px-4 py-2 rounded-full"
                  name="password"
                  id="confirmPassword"
                  placeholder="***********"
                />
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <input type="checkbox" className="h-5 w-5" />
              <p>
                I have read and agreed to the{" "}
                <Link to={"/terms"} className="font-bold cursor-pointer">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to={"/privacy"} className="font-bold cursor-pointer">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            <button
              type="submit"
              className="bg-neutral-500 rounded-full px-6 py-3 w-full text-white"
            >
              Create Account
            </button>
          </div>
          <div className="flex-1 bg-neutral-500 p-6 shrink-0"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
