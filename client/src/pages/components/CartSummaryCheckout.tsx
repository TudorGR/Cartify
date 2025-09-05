import { useContext } from "react";
import { UserContext } from "../../../context/userContext";

const CartSummaryCheckout = () => {
  const { lightMode, cart } = useContext(UserContext);

  const cartItems = Array.from(cart.values());
  const subtotal = cartItems.reduce((total, item) => {
    const price = item.discountedPrice || item.price;
    return total + price * item.quantity;
  }, 0);

  const discount = cartItems.reduce((total, item) => {
    if (item.discountedPrice) {
      return total + (item.price - item.discountedPrice) * item.quantity;
    }
    return total;
  }, 0);

  const deliveryFee = subtotal > 0 ? 10 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div
      className={`${
        lightMode
          ? "bg-neutral-100 border border-neutral-300"
          : "bg-neutral-900 border border-neutral-700"
      }  flex-1 h-fit rounded-xl flex flex-col gap-6 p-6`}
    >
      <h2>Order Summary</h2>
      <div className="flex">
        <p className="flex-2">Product</p>
        <p className="flex-1 text-center">Quantity</p>
        <p className="flex-1 text-end">Subtotal</p>
      </div>
      <div
        className={`border-b border-dashed ${
          lightMode ? "border-neutral-200" : "border-neutral-800"
        }`}
      ></div>
      <ul className="flex flex-col gap-2">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <li key={item.id} className="flex text-neutral-400">
              <p className="flex-2">{item.name}</p>
              <p className="flex-1 text-center">{item.quantity}</p>
              <p className="flex-1 text-end">
                $
                {((item.discountedPrice || item.price) * item.quantity).toFixed(
                  2
                )}
              </p>
            </li>
          ))
        ) : (
          <li className="flex text-neutral-400">
            <p className="flex-2">No items in cart</p>
            <p className="flex-1 text-center">-</p>
            <p className="flex-1 text-end">$0.00</p>
          </li>
        )}
      </ul>
      <div
        className={`border-b border-dashed ${
          lightMode ? "border-neutral-200" : "border-neutral-800"
        }`}
      ></div>
      <div className="flex justify-between w-full">
        <p>Subtotal</p>
        <p>${subtotal.toFixed(2)}</p>
      </div>
      <div
        className={`border-b border-dashed ${
          lightMode ? "border-neutral-200" : "border-neutral-800"
        }`}
      ></div>
      <div className="flex justify-between w-full">
        <p>Discount</p>
        <p>-${discount.toFixed(2)}</p>
      </div>
      <div
        className={`border-b border-dashed ${
          lightMode ? "border-neutral-200" : "border-neutral-800"
        }`}
      ></div>
      <div className="flex justify-between w-full">
        <p>Delivery Fee</p>
        <p>${deliveryFee.toFixed(2)}</p>
      </div>
      <div
        className={`border-b border-dashed ${
          lightMode ? "border-neutral-200" : "border-neutral-800"
        }`}
      ></div>
      <div className="flex justify-between w-full">
        <p>Total</p>
        <p>${total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartSummaryCheckout;
