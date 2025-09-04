import CartProducts from "./components/CartProducts";
import CartSummary from "./components/CartSummary";
import Footer from "./components/Footer";
import MayLike from "./components/MayLike";
import Navbar from "./components/Navbar";

const Cart = () => {
  return (
    <div className="relative flex flex-col gap-20 pt-24 overflow-hidden min-h-screen justify-between">
      <Navbar color="black" />
      <div className="flex flex-col gap-6">
        <div className="w-full max-w-5xl mx-auto h-full flex flex-col">
          <p className="my-2">Home {">"} Cart</p>
          <h2 className="text-4xl">Your Cart</h2>
        </div>
        <div className="w-full max-w-5xl gap-6 mx-auto h-full flex">
          <CartProducts />
          <CartSummary />
        </div>
        <MayLike />
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
