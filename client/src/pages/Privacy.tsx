import { useContext } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { UserContext } from "../../context/userContext";

const Privacy = () => {
  const { lightMode } = useContext(UserContext);

  return (
    <div
      className={`${
        lightMode ? "bg-white text-black" : "bg-black text-white"
      } relative flex flex-col gap-20 overflow-hidden justify-between min-h-screen`}
    >
      <Navbar color="black" />
      <div className="mt-20 w-full max-w-5xl mx-auto h-full">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">
          At Cartify, your privacy is important to us. This Privacy Policy
          explains how we collect, use, and protect your personal information
          when you use our website and services.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">
          Information We Collect
        </h2>
        <ul className="list-disc ml-6 mb-4">
          <li>
            Personal information such as name, email address, shipping address,
            and payment details when you place an order.
          </li>
          <li>
            Usage data including pages visited, time spent on our site, and
            device information.
          </li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">
          How We Use Your Information
        </h2>
        <ul className="list-disc ml-6 mb-4">
          <li>To process and fulfill your orders.</li>
          <li>
            To communicate with you about your orders, account, or promotions.
          </li>
          <li>To improve our website and services.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">
          How We Protect Your Information
        </h2>
        <p className="mb-4">
          We use industry-standard security measures to safeguard your data.
          Your payment information is encrypted and securely processed.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">
          Sharing Your Information
        </h2>
        <p className="mb-4">
          We do not sell or rent your personal information. We may share data
          with trusted third parties only to provide our services (such as
          payment processors and shipping partners).
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Your Choices</h2>
        <p className="mb-4">
          You can update your account information or unsubscribe from marketing
          emails at any time. Contact us if you wish to delete your account or
          have questions about your data.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at{" "}
          <a href="mailto:info@cartify.io" className="text-blue-600 underline">
            info@cartify.io
          </a>
          .
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
