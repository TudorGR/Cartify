import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/userContext";

const CartSummary = () => {
  const { lightMode, cart } = useContext(UserContext);

  const { subtotal, discount, total, itemCount, deliveryFee } = useMemo(() => {
    let subtotalNum = 0;
    let discountNum = 0;
    let itemCount = 0;

    Array.from(cart.values()).forEach((item) => {
      subtotalNum += item.price * item.quantity;

      if (item.discountedPrice) {
        discountNum += (item.price - item.discountedPrice) * item.quantity;
      }

      itemCount += item.quantity;
    });

    const deliveryFee = subtotalNum > 0 ? 10 : 0;
    const totalNum = subtotalNum - discountNum + deliveryFee;

    return {
      subtotal: subtotalNum.toFixed(2),
      discount: discountNum.toFixed(2),
      total: totalNum.toFixed(2),
      itemCount,
      deliveryFee: deliveryFee.toFixed(2),
    };
  }, [cart]);

  if (cart.size === 0) {
    return (
      <div
        className={`border ${
          lightMode
            ? "border-neutral-300 bg-neutral-50"
            : "border-neutral-700 bg-neutral-900"
        } flex-1 h-fit rounded-xl flex flex-col gap-6 p-6`}
      >
        <h2>Order Summary</h2>
        <p className="text-center text-neutral-500">Your cart is empty</p>
        <Link
          to={"/products/All"}
          className={`text-center ${
            lightMode
              ? "bg-neutral-800 hover:bg-neutral-700"
              : "bg-neutral-500 hover:bg-neutral-400"
          } text-white px-6 py-3 rounded-lg transition-colors`}
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`border ${
        lightMode
          ? "border-neutral-300 bg-neutral-50"
          : "border-neutral-700 bg-neutral-900"
      } flex-1 h-fit rounded-xl flex flex-col gap-6 p-6`}
    >
      <h2>Order Summary</h2>
      <div className="flex justify-between w-full">
        <p>Subtotal ({itemCount} items)</p>
        <p>${subtotal}</p>
      </div>
      {parseFloat(discount) > 0 && (
        <div className="flex justify-between w-full">
          <p>Discount</p>
          <p className="text-green-600">-${discount}</p>
        </div>
      )}
      <div className="flex justify-between w-full">
        <p>Delivery Fee</p>
        <p>${deliveryFee}</p>
      </div>
      <div
        className={`border-b ${
          lightMode ? "border-neutral-200" : "border-neutral-800"
        }`}
      ></div>
      <div className="flex justify-between w-full font-semibold">
        <p>Total</p>
        <p>${total}</p>
      </div>
      <Link
        to={"/checkout"}
        className={`text-center ${
          lightMode
            ? "bg-neutral-800 hover:bg-neutral-700"
            : "bg-neutral-500 hover:bg-neutral-400"
        } text-white px-6 py-3 rounded-lg transition-colors`}
      >
        Proceed to Checkout
      </Link>
      <Link
        to={"/products/All"}
        className={`text-center ${
          lightMode ? "text-blue-600" : "text-blue-400"
        } hover:underline transition-all`}
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default CartSummary;
