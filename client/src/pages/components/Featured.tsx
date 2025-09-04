import { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";
import LoadingProduct from "./LoadingProduct";

interface ProductType {
  id: string | number;
  name: string;
  price: number;
  [key: string]: any;
  discountedPrice: number;
}

const Featured = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchFeatured() {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/featured");
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchFeatured();
  }, []);

  return (
    <div className="w-full max-w-5xl  mx-auto h-full gap-6 flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="flex-1 text-2xl">Featured Products</h1>
        <p className="flex-1 text-neutral-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          praesentium expedita quod error.
        </p>
      </div>
      <div className="flex justify-between">
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
        {loading && Array.from({ length: 4 }, (_, i) => <LoadingProduct />)}
      </div>
    </div>
  );
};

export default Featured;
