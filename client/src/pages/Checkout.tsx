import { useContext, useState } from "react";
import CartSummaryCheckout from "./components/CartSummaryCheckout";
import CheckoutForm from "./components/CheckoutForm";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { UserContext } from "../../context/userContext";
import PaymentForm from "./components/PaymentForm";
import { Link } from "react-router-dom";
import { IoMdDoneAll } from "react-icons/io";
import axios from "axios";
import { toast } from "react-hot-toast"; // Add this import

const Checkout = () => {
  const { lightMode, cart, setCart } = useContext(UserContext);
  const [corp, setCorp] = useState("c");
  const [payed, setPayed] = useState<boolean>(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: 0,
    street: "",
    city: "",
    country: "",
    zip: 0,
  });
  const [card, setCard] = useState({
    name: "",
    number: "",
    date: "",
    code: "",
  });

  async function pay() {
    try {
      if (!data.name.trim()) {
        toast.error("Please enter your name");
        return;
      }

      if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email)) {
        toast.error("Please enter a valid email address");
        return;
      }

      if (!data.phone || data.phone <= 0) {
        toast.error("Please enter a valid phone number");
        return;
      }

      if (!data.street.trim()) {
        toast.error("Please enter your street address");
        return;
      }

      if (!data.city.trim()) {
        toast.error("Please enter your city");
        return;
      }

      if (!data.country.trim()) {
        toast.error("Please enter your country");
        return;
      }

      if (!data.zip || data.zip <= 0) {
        toast.error("Please enter a valid ZIP code");
        return;
      }

      if (!card.name.trim()) {
        toast.error("Please enter the cardholder name");
        return;
      }

      if (!card.number.trim() || card.number.replace(/\s/g, "").length < 13) {
        toast.error("Please enter a valid card number");
        return;
      }

      if (!card.code.trim() || card.code.length < 3) {
        toast.error("Please enter a valid CVV code");
        return;
      }

      if (cart.size === 0) {
        toast.error("Your cart is empty");
        return;
      }

      let subtotalNum = 0;
      let discountNum = 0;

      Array.from(cart.values()).forEach((item) => {
        subtotalNum += item.price * item.quantity;

        if (item.discountedPrice) {
          discountNum += (item.price - item.discountedPrice) * item.quantity;
        }
      });

      const deliveryFee = subtotalNum > 0 ? 10 : 0;
      const totalNum = subtotalNum - discountNum + deliveryFee;

      const response = await axios.post("http://localhost:3000/orders", {
        email: data.email,
        productsIds: Array.from(cart.values()).map((item) => item.id),
        totalPrice: totalNum,
        orderDate: new Date(),
      });

      setCart(new Map());

      toast.success("Payment successful! Order confirmed.");
      setPayed(true);
    } catch (error) {
      console.log(error);
      toast.error("Payment failed. Please try again.");
    }
  }

  return (
    <div
      className={`transition-all relative flex flex-col justify-between gap-20 pt-24 overflow-hidden min-h-screen ${
        lightMode ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      <Navbar color="black" />
      <div>
        <div className="mx-auto w-fit my-10 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                corp === "c"
                  ? lightMode
                    ? "bg-black text-white"
                    : "bg-white text-black"
                  : lightMode
                  ? "bg-neutral-200 text-neutral-500"
                  : "bg-neutral-700 text-neutral-400"
              }`}
            >
              1
            </div>
            <button
              className={`font-medium transition-all duration-300 ${
                corp === "c"
                  ? lightMode
                    ? "text-black"
                    : "text-white"
                  : lightMode
                  ? "text-neutral-500"
                  : "text-neutral-400"
              }`}
            >
              Checkout
            </button>
          </div>

          <div
            className={`flex-1 h-[2px] mx-4 transition-all duration-300 ${
              corp === "p"
                ? lightMode
                  ? "bg-black"
                  : "bg-white"
                : lightMode
                ? "bg-neutral-200"
                : "bg-neutral-700"
            }`}
            style={{ minWidth: "60px" }}
          ></div>

          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                corp === "p"
                  ? lightMode
                    ? "bg-black text-white"
                    : "bg-white text-black"
                  : lightMode
                  ? "bg-neutral-200 text-neutral-500"
                  : "bg-neutral-700 text-neutral-400"
              }`}
            >
              2
            </div>
            <button
              className={`font-medium transition-all duration-300 ${
                corp === "p"
                  ? lightMode
                    ? "text-black"
                    : "text-white"
                  : lightMode
                  ? "text-neutral-500"
                  : "text-neutral-400"
              }`}
            >
              Payment
            </button>
          </div>
        </div>
        {corp == "c" ? (
          <div className="w-full max-w-5xl gap-6 mx-auto h-full flex">
            <CheckoutForm data={data} setData={setData} setCorp={setCorp} />
            <CartSummaryCheckout />
          </div>
        ) : (
          <div className="w-full max-w-5xl gap-6 mx-auto h-full flex">
            <PaymentForm
              card={card}
              setCard={setCard}
              setPayed={setPayed}
              setCorp={setCorp}
              pay={pay}
            />
            <CartSummaryCheckout />
          </div>
        )}
      </div>
      <Footer />
      {payed && (
        <div className="z-20 absolute top-0 left-0 w-full h-screen bg-black/10 flex items-center justify-center">
          <div
            className={`py-6 px-20 rounded-xl flex items-center gap-4 flex-col w-fit h-fit ${
              lightMode ? "bg-white text-black" : "bg-neutral-800 text-white"
            }`}
          >
            <div className="w-20 h-20 rounded-full bg-neutral-500 flex items-center justify-center">
              <IoMdDoneAll className="w-8 h-8" />
            </div>
            <h2>Thank You!</h2>
            <p>
              Your order has been confirmed and it is on the way. Check your
              email for the details.
            </p>
            <Link
              to={"/"}
              className={`${
                lightMode
                  ? "bg-neutral-800 hover:bg-neutral-700"
                  : "bg-neutral-600 hover:bg-neutral-500"
              } rounded-lg px-6 py-3 w-fit text-white transition-colors`}
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
