import { useContext } from "react";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import NewsLetter from "./components/NewsLetter";
import { UserContext } from "../../context/userContext";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiTwitter,
  FiLinkedin,
  FiMessageCircle,
} from "react-icons/fi";
import hero from "../assets/hero.png";
import PageAnimationWrapper from "./components/PageAnimationWrapper";

const Contact = () => {
  const { lightMode } = useContext(UserContext);

  return (
    <PageAnimationWrapper>
      <div
        className={`${
          lightMode ? "bg-white" : "bg-neutral-950"
        } transition-all relative flex flex-col gap-20 overflow-hidden justify-between min-h-screen`}
      >
        <Navbar color="white" />
        <div
          className={` transition-all ${
            lightMode ? "bg-hero-light text-black" : "bg-hero-dark text-white"
          } `}
        >
          <div className="mt-20 w-full max-w-5xl relative mx-auto h-full  flex md:flex-row flex-col">
            <img
              src={hero}
              alt="hero"
              className="absolute h-full object-cover"
            />
            <div
              className={` mx-5 z-10 ${
                lightMode ? "bg-white/50" : "bg-black/50"
              } h-fit my-auto p-4 rounded-xl flex-1 gap-4  flex flex-col justify-center`}
            >
              <div className="flex items-center gap-3">
                <FiMessageCircle className="text-5xl" />
                <h2 className="text-5xl">Contact Us</h2>
              </div>
              <p className="max-w-60">
                Email, call, or complete the form to contact us regarding
                anything.
              </p>
              <div className="flex items-center gap-2">
                <FiMail className="text-xl" />
                <a
                  href="mailto:info@cartify.io"
                  className={`${
                    lightMode ? "text-blue-600" : "text-blue-400"
                  } underline hover:opacity-80 transition-opacity`}
                >
                  info@cartify.io
                </a>
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2">
                  <FiPhone className="text-lg" />
                  <span className="font-semibold">Phone:</span>{" "}
                  <a
                    href="tel:+1234567890"
                    className={`${
                      lightMode ? "text-blue-600" : "text-blue-400"
                    } underline hover:opacity-80 transition-opacity`}
                  >
                    +1 (234) 567-890
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <FiMapPin className="text-lg mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Office:</span> 123 Cartify
                    Lane, Suite 100, San Francisco, CA
                  </div>
                </div>
                <div className="flex gap-4 mt-4 pl-6">
                  <a
                    href="https://twitter.com/cartify"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${
                      lightMode ? "text-blue-600" : "text-blue-400"
                    } underline hover:opacity-80 transition-opacity flex items-center gap-1`}
                  >
                    <FiTwitter className="text-lg" />
                    Twitter
                  </a>
                  <a
                    href="https://linkedin.com/company/cartify"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${
                      lightMode ? "text-blue-600" : "text-blue-400"
                    } underline hover:opacity-80 transition-opacity flex items-center gap-1`}
                  >
                    <FiLinkedin className="text-lg" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>

        <section className="w-full max-w-5xl mx-auto py-12 px-4">
          <div className="flex items-center gap-3 mb-6">
            <FiMapPin className="text-4xl" />
            <h3
              className={`${lightMode ? "text-black" : "text-white"} text-4xl`}
            >
              Our Location
            </h3>
          </div>
          <div
            className={`rounded-xl ${
              lightMode ? "border-neutral-300" : "border-neutral-600"
            } border overflow-hidden`}
          >
            <iframe
              title="Cartify Office Location"
              src="https://www.google.com/maps?q=548+Market+St,+San+Francisco,+CA+94104&output=embed"
              width="100%"
              height="300"
              loading="lazy"
            ></iframe>
          </div>
        </section>
        <NewsLetter />
        <Footer />
      </div>
    </PageAnimationWrapper>
  );
};

export default Contact;
