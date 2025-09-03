import { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";

interface ProductType {
  id: string | number;
  name: string;
  price: number;
  [key: string]: any;
}

const MayLike = () => {
  const [products, setProducts] = useState([]);

  async function fetchMayLike() {
    try {
      const response = await axios.get("http://localhost:3000/featured");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMayLike();
  }, []);

  return (
    <div className="w-full max-w-5xl  mx-auto h-full gap-6 flex flex-col">
      <h1 className="flex-1">You May Also Like</h1>
      <div className="flex justify-between">
        {products.map((p: ProductType) => (
          <Product key={p.id} id={p.id} name={p.name} price={p.price} />
        ))}
      </div>
    </div>
  );
};

export default MayLike;
