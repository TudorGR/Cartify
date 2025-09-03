import { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";

interface ProductType {
  id: string | number;
  name: string;
  price: number;
  [key: string]: any;
}

const Featured = () => {
  const [products, setProducts] = useState([]);

  async function fetchFeatured() {
    try {
      const response = await axios.get("http://localhost:3000/featured");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchFeatured();
  }, []);

  return (
    <div className="w-full max-w-5xl  mx-auto h-full gap-6 flex flex-col">
      <div className="flex justify-between">
        <h1 className="flex-1">Featured Products</h1>
        <p className="flex-1 text-neutral-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          praesentium expedita quod error.
        </p>
      </div>
      <div className="flex justify-between">
        {products.map((p: ProductType) => (
          <Product key={p.id} id={p.id} name={p.name} price={p.price} />
        ))}
      </div>
    </div>
  );
};

export default Featured;
