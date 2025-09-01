import { Link } from "react-router-dom";

const CartSummary = () => {
  return (
    <div className="border border-neutral-300 flex-1 h-fit rounded-2xl flex flex-col gap-6 p-6">
      <h2>Order Summary</h2>
      <div className="flex justify-between w-full">
        <p>Subtotal</p>
        <p>$599.99</p>
      </div>
      <div className="flex justify-between w-full">
        <p>Discount</p>
        <p>-$100</p>
      </div>
      <div className="flex justify-between w-full">
        <p>Delivery Fee</p>
        <p>$10</p>
      </div>
      <div className="border-b border-neutral-200"></div>
      <div className="flex justify-between w-full">
        <p>Total</p>
        <p>$509.99</p>
      </div>
      <Link
        to={"/checkout"}
        className="text-center bg-neutral-500 text-white px-6 py-3 rounded-full"
      >
        Proceed to Checkout
      </Link>
      <Link to={"/products"} className="text-center">
        Continue Shopping
      </Link>
    </div>
  );
};

export default CartSummary;
