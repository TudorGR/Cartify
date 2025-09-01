import { Link } from "react-router-dom";

const Product = () => {
  return (
    <div className="flex flex-col gap-2">
      <Link to={"/product/:1"}>
        <img
          alt="some 'preview' hover effect..."
          className=" w-60 h-80  bg-neutral-500 rounded-2xl"
        />
      </Link>
      <div className="flex justify-between">
        <div>
          <p>Product Name</p>
          <p>$299.99</p>
        </div>
        <button className="rounded-full border w-30">+</button>
      </div>
    </div>
  );
};

export default Product;
