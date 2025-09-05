import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import { IoMdAdd, IoMdCheckmark } from "react-icons/io";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  image?: string;
  [key: string]: any;
  discountedPrice: number | null;
}

const Product = ({
  id,
  name,
  // description,
  // category,
  discountedPrice,
  image,
  price,
}: ProductProps) => {
  const [clicked, setClicked] = useState(false);
  const { lightMode, addToCart, cart } = useContext(UserContext);

  // Check if item is in cart
  const isInCart = cart.has(id);

  return (
    <div
      className={`transition-all flex flex-col gap-2 relative ${
        lightMode ? "text-black" : "text-white"
      }
      `}
    >
      {discountedPrice && (
        <div className="absolute text-white w-fit h-fit rounded-full left-2 top-2 bg-red-500/50 px-2 right-0">
          -10%
        </div>
      )}
      <Link to={`/product/${id}`}>
        <img
          alt="some 'preview' hover effect..."
          className="pointer-events-none w-60 h-80  bg-neutral-200 rounded-2xl object-cover"
          src={image}
        />
      </Link>
      <div className="flex justify-between max-w-60 w-full">
        <div>
          <p className="max-h-8 text-nowrap truncate max-w-49">{name}</p>
          {discountedPrice ? (
            <div className="flex gap-2">
              <p>${discountedPrice}</p>
              <p className="text-neutral-400 line-through">${price}</p>
            </div>
          ) : (
            <p>${price}</p>
          )}
        </div>
        <button
          onClick={() => setClicked(!clicked)}
          className={`${
            lightMode
              ? "border border-neutral-400 active:bg-neutral-300"
              : "border border-neutral-600 active:bg-neutral-700"
          } cursor-pointer text-neutral-400  rounded-full w-10 h-10 shrink-0 transition-all`}
        >
          <div
            onClick={() =>
              addToCart({
                id,
                name,
                price,
                discountedPrice,
                image,
              })
            }
            className="cursor-pointer w-full h-full flex items-center justify-center"
          >
            {isInCart ? <IoMdCheckmark /> : <IoMdAdd />}
          </div>
        </button>
      </div>
    </div>
  );
};

export default Product;
