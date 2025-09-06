import { useContext, useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";
import LoadingProduct from "./LoadingProduct";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/userContext";

interface ProductType {
  id: string;
  name: string;
  price: number;
  [key: string]: any;
  discountedPrice: number;
}
interface SimilarProps {
  category: string | undefined;
  productId?: string | number;
}

const SimilarProducts = ({ category, productId }: SimilarProps) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { lightMode } = useContext(UserContext);

  async function fetchFeatured() {
    try {
      if (!category) {
        setProducts([]);
        setLoading(true);
        return;
      }
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/products/${category}`
      );
      const items = response.data
        // exclude current product if present
        .filter((p: any) => String(p.id) !== String(productId))
        .slice(0, 4);
      setProducts(items);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchFeatured();
  }, [category, productId]);

  return (
    <div className="px-5 w-full max-w-5xl  mx-auto h-full gap-6 flex flex-col">
      <div className="flex justify-between items-center">
        <h1
          className={`hero-font flex-2 sm:flex-1 text-5xl ${
            lightMode ? "text-black" : "text-white"
          }`}
        >
          Similar Products
        </h1>
        <div className=" flex flex-1 gap-4 justify-end">
          <p className=" sm:block hidden text-end text-neutral-400">
            Discover products that match your interests and find items you'll
            love.
          </p>
          <Link
            to={`/products/${category}`}
            className={`${
              lightMode
                ? "bg-neutral-800 hover:bg-neutral-700"
                : "bg-neutral-500 hover:bg-neutral-400"
            } text-white h-fit px-6 py-3 rounded-lg transition-colors`}
          >
            See
          </Link>
        </div>
      </div>
      <div className="flex gap-2 justify-between w-full overflow-auto">
        {!loading &&
          products.map((p: ProductType) => (
            <Product
              discountedPrice={p.discountedPrice}
              key={p.id}
              image={p.image}
              id={p.id}
              name={p.name}
              price={p.price}
            />
          ))}
        {!loading && products.length == 0 && (
          <div
            className={`${lightMode ? "text-neutral-600" : "text-neutral-400"}`}
          >
            No similar products found.
          </div>
        )}
        {loading &&
          Array.from({ length: 4 }, (_, i) => <LoadingProduct key={i} />)}
      </div>
    </div>
  );
};

export default SimilarProducts;
