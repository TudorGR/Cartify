import { useEffect } from "react";
import Product from "./Product";
import LoadingProduct from "./LoadingProduct";
import { Link } from "react-router-dom";

interface ProductType {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  [key: string]: any;
  discountedPrice: number;
}

interface ProductsProps {
  category: string;
  products: ProductType[];
  visible: number;
  setVisible: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  leftSlider: number;
  rightSlider: number;
}

const Products = ({
  category,
  products,
  visible,
  setVisible,
  loading,
  leftSlider,
  rightSlider,
}: ProductsProps) => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  function handleLoadMore() {
    setVisible((prev) => prev + 12);
    console.log(visible);
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-4xl">{category}</h2>
        <p>
          Showing {visible > products.length ? products.length : visible} of{" "}
          {products.length} Products
        </p>
      </div>
      <div className="grid grid-cols-3 justify-items-center gap-6">
        {products.length > 0 &&
          products
            .slice(0, visible)
            .map((product) => (
              <Product
                discountedPrice={product.discountedPrice}
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                category={product.category}
                image={product.image}
                price={product.price}
              />
            ))}
        {loading &&
          Array.from({ length: 18 }, (_, i) => <LoadingProduct key={i} />)}
      </div>
      {products.length == 0 && (
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center py-20">
          <h2>
            We're sorry, there are no products in the "{category}" category
            between ${leftSlider} and ${rightSlider} right now.
          </h2>
          <p>Why not explore some of our other great categories?</p>
          <Link to="/" style={{ textDecoration: "underline" }}>
            Go to Home Page
          </Link>
        </div>
      )}
      {products.length > visible && (
        <button
          onClick={handleLoadMore}
          className="cursor-pointer text-white bg-neutral-500 mx-auto mt-10 rounded-full w-fit px-6 py-3"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Products;
