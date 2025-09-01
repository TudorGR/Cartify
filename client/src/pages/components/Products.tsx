import { useEffect } from "react";
import Product from "./Product";

const Products = ({ category }: { category: string }) => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-4xl">{category}</h2>
        <p>Showing 1-10 of 100 Products</p>
      </div>
      <div className="grid grid-cols-3 justify-items-center gap-6">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
      <button className="text-white bg-neutral-500 mx-auto mt-10 rounded-full w-fit px-6 py-3">
        Load More
      </button>
    </div>
  );
};

export default Products;
