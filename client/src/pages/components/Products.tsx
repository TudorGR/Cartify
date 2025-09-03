import { useEffect } from "react";
import Product from "./Product";
import { Link } from "react-router-dom";

interface ProductType {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  [key: string]: any;
}

interface ProductsProps {
  category: string;
  products: ProductType[];
}

const Products = ({ category, products }: ProductsProps) => {
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
        {products.length > 0 &&
          products.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              category={product.category}
              image={product.image}
              price={product.price}
            />
          ))}
      </div>
      {products.length == 0 && (
        <div className="flex flex-col items-center justify-center p-20">
          <h2>
            We're sorry, there are no products in the "{category}" category
            right now.
          </h2>
          <p>Why not explore some of our other great categories?</p>
          <Link to="/" style={{ textDecoration: "underline" }}>
            Go to Home Page
          </Link>
        </div>
      )}
      <button className="text-white bg-neutral-500 mx-auto mt-10 rounded-full w-fit px-6 py-3">
        Load More
      </button>
    </div>
  );
};

export default Products;
