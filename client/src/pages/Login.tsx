import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import image from "../assets/cartify.webp";
import PageAnimationWrapper from "./components/PageAnimationWrapper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, setUser, lightMode } = useContext(UserContext);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const promise = axios
      .post("/login", {
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

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user]);

  return (
    <PageAnimationWrapper>
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

              <button
                type="button"
                onClick={handleGoogleLogin}
                className={`border-2 rounded-lg px-6 py-3 w-full transition-colors flex items-center justify-center gap-3 ${
                  lightMode
                    ? "border-neutral-300 text-black hover:bg-neutral-50"
                    : "border-neutral-600 text-white hover:bg-neutral-800"
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>

              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-neutral-300"></div>
                <span className="text-neutral-500">or</span>
                <div className="flex-1 h-px bg-neutral-300"></div>
              </div>

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
    </PageAnimationWrapper>
  );
};

export default Login;
