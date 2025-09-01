import Product from "./Product";

const MayLike = () => {
  return (
    <div className="w-full max-w-5xl  mx-auto h-full gap-6 flex flex-col">
      <h1 className="flex-1">You May Also Like</h1>
      <div className="flex justify-between">
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </div>
  );
};

export default MayLike;
