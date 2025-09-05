import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn, FaYoutube } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const { lightMode } = useContext(UserContext);
  const navigate = useNavigate();

  const wrapperClasses = lightMode
    ? "bg-neutral-50 text-neutral-600 border-neutral-200"
    : "bg-neutral-900 text-neutral-300 border-neutral-800";
  const headingClasses = lightMode ? "text-neutral-900" : "text-neutral-100";
  const linkBase =
    "transition-colors hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-sm";

  return (
    <footer className={`w-full border-t ${wrapperClasses}`}>
      <div className="max-w-5xl mx-auto  py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <div
              onClick={() => navigate("/")}
              className="flex-1 flex items-center cursor-pointer"
            >
              <img
                src={logo}
                alt="logo"
                className={`w-5 ${lightMode ? "" : "invert"}`}
              />
              <p className="headings text-black uppercase text-lg">Cartify</p>
            </div>
            <p className="mt-3 text-sm leading-6">
              Your modern e‑commerce destination. Discover products you love
              with a smooth, secure checkout experience.
            </p>
          </div>

          <div>
            <h3
              className={`text-sm font-semibold uppercase tracking-wider ${headingClasses}`}
            >
              Shop
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="/" className={linkBase}>
                  Home
                </a>
              </li>
              <li>
                <a href="/cart" className={linkBase}>
                  Cart
                </a>
              </li>
              <li>
                <a href="/checkout" className={linkBase}>
                  Checkout
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3
              className={`text-sm font-semibold uppercase tracking-wider ${headingClasses}`}
            >
              Account
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="/login" className={linkBase}>
                  Login
                </a>
              </li>
              <li>
                <a href="/signup" className={linkBase}>
                  Create Account
                </a>
              </li>
              <li>
                <a href="/profile" className={linkBase}>
                  Profile
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3
              className={`text-sm font-semibold uppercase tracking-wider ${headingClasses}`}
            >
              Legal & Support
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="/terms" className={linkBase}>
                  Terms
                </a>
              </li>
              <li>
                <a href="/privacy" className={linkBase}>
                  Privacy
                </a>
              </li>
              <li>
                <a href="/contact" className={linkBase}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`mt-10 border-t ${
            lightMode ? "border-neutral-200" : "border-neutral-800"
          }`}
        />

        <div className="mt-6 flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs">
            &copy; {new Date().getFullYear()} Cartify. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cartify on X (Twitter)"
              className={`${linkBase} p-2 inline-flex`}
            >
              <span className="sr-only">X (Twitter)</span>
              <FaXTwitter className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/tudor-gradinaru/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cartify on LinkedIn"
              className={`${linkBase} p-2 inline-flex`}
            >
              <span className="sr-only">LinkedIn</span>
              <FaLinkedinIn className="w-5 h-5" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cartify on YouTube"
              className={`${linkBase} p-2 inline-flex`}
            >
              <span className="sr-only">YouTube</span>
              <FaYoutube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
