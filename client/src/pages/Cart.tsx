import { useContext } from "react";
import CartProducts from "./components/CartProducts";
import CartSummary from "./components/CartSummary";
import Footer from "./components/Footer";
import MayLike from "./components/MayLike";
import Navbar from "./components/Navbar";
import { UserContext } from "../../context/userContext";
import PageAnimationWrapper from "./components/PageAnimationWrapper";

const Cart = () => {
  const { lightMode } = useContext(UserContext);

  return (
    <PageAnimationWrapper>
      <div
        className={`transition-all relative flex flex-col gap-20 pt-24 overflow-hidden min-h-screen justify-between ${
          lightMode ? "bg-white text-black" : "bg-neutral-950 text-white"
        }`}
      >
        <Navbar color="black" />
        <div className=" flex flex-col gap-6">
          <div className="px-5 w-full max-w-5xl mx-auto h-full flex flex-col">
            <p className="my-2">Home {">"} Cart</p>
            <h2 className="text-4xl hero-font">Your Cart</h2>
          </div>
          <div className="px-5 w-full max-w-5xl gap-6 mx-auto h-full flex sm:flex-row flex-col">
            <CartProducts />
            <CartSummary />
          </div>
          <MayLike />
        </div>
        <Footer />
      </div>
    </PageAnimationWrapper>
  );
};

export default Cart;
