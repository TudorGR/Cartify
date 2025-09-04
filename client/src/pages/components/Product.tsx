import { useState } from "react";
import { Link } from "react-router-dom";

interface ProductProps {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  [key: string]: any;
  discountedPrice: number;
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

  return (
    <div className="flex flex-col gap-2 relative">
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
          <p className="max-h-8 text-nowrap truncate max-w-50">{name}</p>
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
            clicked ? "bg-neutral-400" : "border border-gray-400"
          } cursor-pointer text-gray-400 rounded-full w-10 h-10 shrink-0 transition-all`}
        >
          {clicked ? "" : "+"}
        </button>
      </div>
    </div>
  );
};

export default Product;
