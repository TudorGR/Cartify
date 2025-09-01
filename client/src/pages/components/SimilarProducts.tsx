import Product from "./Product";

const SimilarProducts = () => {
  return (
    <div className="w-full max-w-5xl  mx-auto h-full gap-6 flex flex-col">
      <div className="flex justify-between">
        <h1 className="flex-1">Similar Products</h1>
        <p className="flex-1 text-neutral-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          praesentium expedita quod error.
        </p>
      </div>
      <div className="flex justify-between">
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </div>
  );
};

export default SimilarProducts;
