import { useContext } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { UserContext } from "../../context/userContext";

const Terms = () => {
  const { lightMode } = useContext(UserContext);

  return (
    <div
      className={`${
        lightMode ? "bg-white text-black" : "bg-black text-white"
      } transition-all relative flex flex-col gap-20 overflow-hidden justify-between min-h-screen`}
    >
      <Navbar color="black" />
      <div className="mt-20 px-5 w-full max-w-5xl mx-auto h-full">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        <p className="mb-4">
          Welcome to Cartify! By accessing or using our website and services,
          you agree to comply with and be bound by the following terms and
          conditions.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Use of Our Services</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>
            You must provide accurate and complete information when creating an
            account or placing an order.
          </li>
          <li>
            You agree not to use our site for any unlawful or prohibited
            activities.
          </li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">Orders and Payment</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>All orders are subject to acceptance and availability.</li>
          <li>
            Prices and product details are subject to change without notice.
          </li>
          <li>
            Payment must be made in full before your order is processed and
            shipped.
          </li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">
          Shipping and Returns
        </h2>
        <ul className="list-disc ml-6 mb-4">
          <li>
            Shipping times and costs may vary based on your location and
            selected shipping method.
          </li>
          <li>
            Please review our return policy for information on returns and
            exchanges.
          </li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">
          Intellectual Property
        </h2>
        <p className="mb-4">
          All content on Cartify, including text, images, logos, and designs, is
          the property of Cartify and may not be used without permission.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">
          Limitation of Liability
        </h2>
        <p className="mb-4">
          Cartify is not liable for any indirect, incidental, or consequential
          damages arising from the use of our website or services.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Changes to Terms</h2>
        <p className="mb-4">
          We may update these terms and conditions at any time. Please review
          this page periodically for changes.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
        <p>
          If you have any questions about these Terms and Conditions, please
          contact us at{" "}
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

export default Terms;
