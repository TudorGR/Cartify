import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import image from "../assets/cartify.webp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, setUser, lightMode } = useContext(UserContext);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const promise = axios
      .post("http://localhost:3000/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.error) {
          throw new Error(response.data.error);
        }
        setEmail("");
        setPassword("");
        setUser(response.data);
        navigate("/");
        return "Logged in";
      });

    toast.promise(promise, {
      loading: "Logging in...",
      success: (data) => data,
      error: (err) => err.message,
    });
  }

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user]);

  return (
    <div
      className={`relative sm:px-5 flex flex-col gap-20 overflow-hidden justify-between min-h-screen ${
        lightMode ? "bg-white text-black" : "bg-neutral-950 text-white"
      } transition-all`}
    >
      <Navbar color="black" />
      <div className="w-full max-w-5xl mx-auto h-full">
        <div
          className={`mt-20 sm:border overflow-hidden w-full rounded-2xl flex ${
            lightMode ? " sm:border-neutral-300" : " sm:border-neutral-700"
          }`}
        >
          <form
            onSubmit={handleSubmit}
            className={`flex-1 flex flex-col gap-6 p-6 shrink-0 ${
              lightMode ? "bg-white" : "bg-neutral-900"
            }`}
          >
            <h2 className="text-3xl">Login</h2>
            <p>
              Do not have an account?{" "}
              <Link
                to={"/signup"}
                className={`underline cursor-pointer ${
                  lightMode ? "text-blue-600" : "text-blue-400"
                } hover:opacity-80 transition-opacity`}
              >
                create a new one
              </Link>
            </p>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Enter your Email Address</label>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className={`border px-4 py-2 rounded-lg ${
                  lightMode
                    ? "border-neutral-300 bg-white text-black"
                    : "border-neutral-600 bg-neutral-800 text-white"
                }`}
                name="email"
                id="email"
                placeholder="example@email.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Enter your Password</label>
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className={`border px-4 py-2 rounded-lg ${
                  lightMode
                    ? "border-neutral-300 bg-white text-black"
                    : "border-neutral-600 bg-neutral-800 text-white"
                }`}
                name="password"
                id="password"
                placeholder="***********"
              />
            </div>
            <button
              type="submit"
              className={`${
                lightMode
                  ? "bg-neutral-800 hover:bg-neutral-700"
                  : "bg-neutral-500 hover:bg-neutral-400"
              } rounded-lg px-6 py-3 w-full text-white transition-colors`}
            >
              Login
            </button>
            <p
              className={`text-center underline cursor-pointer ${
                lightMode ? "text-blue-600" : "text-blue-400"
              } hover:opacity-80 transition-opacity`}
            >
              Forgot your password
            </p>
          </form>
          <div
            className={`sm:block hidden flex-1 shrink-0 ${
              lightMode ? "bg-neutral-200" : "bg-neutral-700"
            }`}
          >
            <img src={image} alt="" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
