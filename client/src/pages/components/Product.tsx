import { useState } from "react";
import { Link } from "react-router-dom";

interface ProductProps {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  [key: string]: any;
}

const Product = ({
  id,
  name,
  // description,
  // category,
  // image,
  price,
}: ProductProps) => {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="flex flex-col gap-2 ">
      <Link to={`/product/${id}`}>
        <img
          alt="some 'preview' hover effect..."
          className="w-60 h-80  bg-neutral-500 rounded-2xl"
        />
      </Link>
      <div className="flex justify-between max-w-60 w-full">
        <div>
          <p className="max-h-8 text-nowrap truncate max-w-50">{name}</p>
          <p>${price}</p>
        </div>
        <button
          onClick={() => setClicked(!clicked)}
          className={`${
            clicked ? "bg-neutral-500" : ""
          } cursor-pointer rounded-full border w-10 h-10 shrink-0 transition-all`}
        >
          {clicked ? "" : "+"}
        </button>
      </div>
    </div>
  );
};

export default Product;
