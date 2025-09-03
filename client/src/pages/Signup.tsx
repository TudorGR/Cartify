import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
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
    <div className="relative flex flex-col gap-20 overflow-hidden justify-between min-h-screen">
      <Navbar color="black" />
      <div className=" w-full max-w-5xl mx-auto h-full">
        <div className="mt-20 border border-neutral-200 overflow-hidden  w-full rounded-2xl flex">
          <form
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col gap-6 p-6 shrink-0"
          >
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
                  required
                  type="name"
                  className="border border-neutral-300 px-4 py-2 rounded-full"
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
                  className="border border-neutral-300 px-4 py-2 rounded-full"
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
                  className="border border-neutral-300 px-4 py-2 rounded-full"
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
                  className="border border-neutral-300 px-4 py-2 rounded-full"
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
          </form>
          <div className="flex-1 bg-neutral-500 p-6 shrink-0"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
