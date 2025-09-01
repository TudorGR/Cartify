import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const Login = () => {
  return (
    <div className="relative flex flex-col gap-20 overflow-hidden justify-between min-h-screen">
      <Navbar color="black" />
      <div className=" w-full max-w-5xl mx-auto h-full">
        <div className="mt-20 border border-neutral-200 overflow-hidden  w-full rounded-2xl flex">
          <div className="flex-1 flex flex-col gap-6 p-6 shrink-0">
            <h2 className="text-3xl">Login</h2>
            <p>
              Do not have an account?{" "}
              <Link to={"/signup"} className="underline cursor-pointer">
                create a new one
              </Link>
            </p>
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
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Enter your Password</label>
              <input
                type="password"
                className="border border-neutral-300 px-4 py-2 rounded-full"
                name="password"
                id="password"
                placeholder="***********"
              />
            </div>
            <button
              type="submit"
              className="bg-neutral-500 rounded-full px-6 py-3 w-full text-white"
            >
              Login
            </button>
            <p className="text-center underline">Forgot your password</p>
          </div>
          <div className="flex-1 bg-neutral-500 p-6 shrink-0"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
