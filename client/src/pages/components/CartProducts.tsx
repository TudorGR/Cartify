import { useContext } from "react";
import { CartProduct } from "./CartProduct";
import { UserContext } from "../../../context/userContext";

const CartProducts = () => {
  const { lightMode, cart } = useContext(UserContext);

  return (
    <div
      className={`h-fit  p-6 border  flex-2  rounded-xl ${
        lightMode
          ? "bg-neutral-50 border-neutral-300"
          : "bg-neutral-900 border-neutral-700"
      }`}
    >
      <ul className="flex flex-col gap-6">
        {cart.size === 0 ? (
          <p className="text-center py-8 text-neutral-500">
            Your cart is empty
          </p>
        ) : (
          Array.from(cart.values()).map((item) => (
            <CartProduct key={item.id} item={item} />
          ))
        )}
      </ul>
    </div>
  );
};

export default CartProducts;
