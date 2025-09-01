import { useState } from "react";
import CartSummaryCheckout from "./components/CartSummaryCheckout";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PaymentForm from "./components/PaymentForm";
import { Link } from "react-router-dom";

const Payment = () => {
  const [payed, setPayed] = useState<boolean>(false);

  return (
    <div className="relative flex flex-col justify-between gap-20 pt-24 overflow-hidden min-h-screen ">
      <Navbar color="black" />
      <div className="w-full max-w-5xl gap-6 mx-auto h-full flex">
        <PaymentForm setPayed={setPayed} />
        <CartSummaryCheckout />
      </div>
      <Footer />
      {payed && (
        <div className="absolute top-0 left-0 w-full h-screen bg-black/10 flex items-center justify-center">
          <div className="py-6 px-20 rounded-2xl flex items-center gap-4 flex-col w-fit h-fit bg-white">
            <img
              alt="checkmark"
              className="w-20 h-20 rounded-full bg-neutral-500"
            />
            <h2>Thank You!</h2>
            <p>
              Your order has been confirmed and it is on the way. Check your
              email for the details.
            </p>
            <Link
              to={"/"}
              className="bg-neutral-500 rounded-full px-6 py-3 w-fit text-white"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
