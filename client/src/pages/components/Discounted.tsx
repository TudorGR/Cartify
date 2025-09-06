import { useContext, useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";
import LoadingProduct from "./LoadingProduct";
import { UserContext } from "../../../context/userContext";

interface ProductType {
  id: string;
  name: string;
  price: number;
  [key: string]: any;
  discountedPrice: number;
}

const Discounted = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { lightMode } = useContext(UserContext);

  async function fetchFeatured() {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/discounted");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchFeatured();
  }, []);

  return (
    <div className="pl-5 lg:px-5 w-full max-w-5xl  mx-auto h-full gap-6 flex flex-col">
      <div className="flex justify-between items-center gap-2">
        <h1
          className={`hero-font flex-1 text-5xl ${
            lightMode ? "text-black" : "text-white"
          }`}
        >
          Promotions
        </h1>
        <p className="pr-5 lg:pr-0 hidden sm:block md:flex-1 text-neutral-400 flex-2 text-end">
          Discover our handpicked selection of discounted products, carefully
          curated for quality and customer satisfaction.
        </p>
      </div>
      <div className="flex justify-between gap-2 w-full overflow-auto">
        {products.map((p: ProductType) => (
          <Product
            discountedPrice={p.discountedPrice}
            key={p.id}
            id={p.id}
            name={p.name}
            price={p.price}
            image={p.image}
          />
        ))}
        {loading &&
          Array.from({ length: 4 }, (_, i) => <LoadingProduct key={i} />)}
      </div>
    </div>
  );
};

export default Discounted;
