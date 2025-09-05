import { useContext } from "react";
import { UserContext } from "../../../context/userContext";

const Footer = () => {
  const { lightMode } = useContext(UserContext);

  return (
    <footer
      className={`w-full ${
        lightMode
          ? "bg-neutral-300 text-neutral-600"
          : "bg-neutral-700 text-neutral-400"
      } py-6`}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex gap-4 flex-1">
          <p>Twitter</p>
          <p>Linkedin</p>
          <p>Youtube</p>
        </div>
        <div className="flex gap-6 flex-1 justify-center">
          <a href="/terms" className="hover:underline">
            Terms
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </div>
        <div className="flex-1 text-end">
          &copy; {new Date().getFullYear()} Cartify. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
