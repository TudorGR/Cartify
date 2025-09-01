import CartSummaryCheckout from "./components/CartSummaryCheckout";
import CheckoutForm from "./components/CheckoutForm";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const Checkout = () => {
  return (
    <div className="relative flex flex-col justify-between gap-20 pt-24 overflow-hidden min-h-screen ">
      <Navbar color="black" />
      <div className="w-full max-w-5xl gap-6 mx-auto h-full flex">
        <CheckoutForm />
        <CartSummaryCheckout />
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
