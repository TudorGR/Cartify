import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const Signup = () => {
  const navigate = useNavigate();
  const { lightMode } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const promise = axios
      .post("http://localhost:3000/register", {
        name,
        email,
        password,
      })
      .then((response) => {
        if (response.data.error) {
          throw new Error(response.data.error);
        }
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/login");
        return "Signed up";
      });

    toast.promise(promise, {
      loading: "Signing up",
      success: (data) => data,
      error: (err) => err.message,
    });
  }

  return (
    <div
      className={`relative flex flex-col gap-20 overflow-hidden justify-between min-h-screen ${
        lightMode ? "bg-white text-black" : "bg-neutral-950 text-white"
      } transition-all`}
    >
      <Navbar color="black" />
      <div className="w-full max-w-5xl mx-auto h-full">
        <div
          className={`mt-20 border overflow-hidden w-full rounded-xl flex ${
            lightMode ? "border-neutral-300" : "border-neutral-700"
          }`}
        >
          <form
            onSubmit={handleSubmit}
            className={`flex-1 flex flex-col gap-6 p-6 shrink-0 ${
              lightMode ? "bg-white" : "bg-neutral-900"
            }`}
          >
            <h2 className="text-3xl">Signup</h2>
            <p>
              Already have an Account?{" "}
              <Link
                to={"/login"}
                className={`underline cursor-pointer ${
                  lightMode ? "text-blue-600" : "text-blue-400"
                } hover:opacity-80 transition-opacity`}
              >
                Login
              </Link>
            </p>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Full Name</label>
                <input
                  required
                  type="name"
                  className={`border px-4 py-2 rounded-lg ${
                    lightMode
                      ? "border-neutral-300 bg-white text-black"
                      : "border-neutral-600 bg-neutral-800 text-white"
                  }`}
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Michael Joe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Enter your Email Address</label>
                <input
                  required
                  type="email"
                  className={`border px-4 py-2 rounded-lg ${
                    lightMode
                      ? "border-neutral-300 bg-white text-black"
                      : "border-neutral-600 bg-neutral-800 text-white"
                  }`}
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <input
                  required
                  type="password"
                  className={`border px-4 py-2 rounded-lg ${
                    lightMode
                      ? "border-neutral-300 bg-white text-black"
                      : "border-neutral-600 bg-neutral-800 text-white"
                  }`}
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="***********"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  required
                  type="password"
                  className={`border px-4 py-2 rounded-lg ${
                    lightMode
                      ? "border-neutral-300 bg-white text-black"
                      : "border-neutral-600 bg-neutral-800 text-white"
                  }`}
                  name="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="***********"
                />
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <input required type="checkbox" className="h-5 w-5" />
              <p>
                I have read and agreed to the{" "}
                <Link
                  to={"/terms"}
                  className={`font-bold cursor-pointer ${
                    lightMode ? "text-blue-600" : "text-blue-400"
                  } hover:opacity-80 transition-opacity`}
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to={"/privacy"}
                  className={`font-bold cursor-pointer ${
                    lightMode ? "text-blue-600" : "text-blue-400"
                  } hover:opacity-80 transition-opacity`}
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            <button
              type="submit"
              className={`rounded-lg px-6 py-3 w-full text-white transition-colors ${
                lightMode
                  ? "bg-neutral-800 hover:bg-neutral-700"
                  : "bg-neutral-500 hover:bg-neutral-400"
              }`}
            >
              Create Account
            </button>
          </form>
          <div className="flex-1 bg-neutral-500 p-6 shrink-0"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
