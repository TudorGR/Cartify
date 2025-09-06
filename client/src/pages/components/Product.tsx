import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import {
  IoMdAdd,
  IoMdCheckmark,
  IoMdHeart,
  IoMdHeartEmpty,
} from "react-icons/io";
import toast from "react-hot-toast";
import LazyImage from "./LazyImage";

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
  const {
    user,
    lightMode,
    addToCart,
    cart,
    favourites,
    addToFavourites,
    removeFromFavourites,
  } = useContext(UserContext);

  const isInCart = cart.has(id);

  const isInFavourites = favourites.has(id);

  const handleFavouriteToggle = () => {
    if (!user) {
      toast.error("Log in to add to favourites");

      return;
    }

    if (isInFavourites) {
      removeFromFavourites(id);
    } else {
      addToFavourites({
        id,
        name,
        price,
        discountedPrice,
        image,
      });
    }
  };

  return (
    <div
      className={`shrink-0 transition-all flex flex-col gap-2 relative group ${
        lightMode ? "text-black" : "text-white"
      }`}
    >
      {discountedPrice && (
        <div className="absolute text-white w-fit h-fit rounded-full top-1 left-1 md:left-2 md:top-2 bg-red-500/70 px-2 right-0 z-10">
          -10%
        </div>
      )}

      <button
        aria-label="add to favourites"
        onClick={handleFavouriteToggle}
        className={`hover:scale-110 active:scale-90 absolute right-2 top-2 z-10 transition-all duration-200  rounded-full w-8 h-8 flex items-center justify-center cursor-pointer`}
      >
        {isInFavourites ? (
          <IoMdHeart className="w-6 h-6 " />
        ) : (
          <IoMdHeartEmpty className="w-6 h-6 " />
        )}
      </button>

      <Link to={`/product/${id}`}>
        <LazyImage
          loading="lazy"
          decoding="async"
          alt="some 'preview' hover effect..."
          className="pointer-events-none w-30 md:w-60 h-40 md:h-80 bg-neutral-200 rounded-lg md:rounded-xl object-cover"
          src={image}
        />
      </Link>
      <div className="flex justify-between max-w-30 md:max-w-60 w-full">
        <div>
          <p className="max-h-8 text-nowrap truncate max-w-29 md:max-w-49">
            {name}
          </p>
          {discountedPrice ? (
            <div className="flex gap-2 ">
              <p>${discountedPrice}</p>
              <p className="text-neutral-500 line-through">${price}</p>
            </div>
          ) : (
            <p className="">${price}</p>
          )}
        </div>
        <button
          className={`${
            lightMode
              ? "border border-neutral-300 active:bg-neutral-300"
              : "border border-neutral-700 active:bg-neutral-700"
          } active:scale-90 hover:scale-110  md:flex items-center justify-center cursor-pointer text-neutral-500 hidden rounded-full w-10 h-10 shrink-0 transition-all duration-100`}
          onClick={() => {
            addToCart({
              id,
              name,
              price,
              discountedPrice,
              image,
            });
            setClicked(!clicked);
          }}
        >
          <div>{isInCart ? <IoMdCheckmark /> : <IoMdAdd />}</div>
        </button>
      </div>
    </div>
  );
};

export default Product;
