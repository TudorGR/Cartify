import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

interface CartItem {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number | null;
  image?: string;
  quantity: number;
}

interface CartProductProps {
  item: CartItem;
}

export const CartProduct = ({ item }: CartProductProps) => {
  const { lightMode, removeFromCart, updateQuantity } = useContext(UserContext);

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const displayPrice = item.discountedPrice || item.price;

  return (
    <li className="flex gap-6">
      <img
        alt={item.name}
        src={item.image}
        className={`h-20 w-15 shrink-0 rounded-lg object-cover ${
          lightMode ? "bg-neutral-300" : "bg-neutral-600"
        }`}
      />
      <div className="flex justify-between w-full">
        <div className="flex flex-col justify-between">
          <Link to={`/product/${item.id}`}>{item.name}</Link>
          <div
            className={`w-fit  flex gap-6 border px-4 py-2 rounded-lg ${
              lightMode
                ? "bg-white border-neutral-300"
                : "bg-black border-neutral-600"
            }`}
          >
            <button onClick={handleDecrement} className="cursor-pointer">
              -
            </button>
            <p>{item.quantity}</p>
            <button onClick={handleIncrement} className="cursor-pointer">
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between">
          <button
            onClick={handleRemove}
            className={`cursor-pointer rounded-lg border ${
              lightMode
                ? "border-red-400 bg-red-200 text-red-400"
                : "border-red-600 bg-red-800 text-red-600"
            } p-1`}
          >
            <MdDelete className="w-6 h-6" />
          </button>
          <div className="text-right">
            <p>${displayPrice}</p>
            {item.discountedPrice && (
              <p className="text-sm text-neutral-400 line-through">
                ${item.price}
              </p>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};
