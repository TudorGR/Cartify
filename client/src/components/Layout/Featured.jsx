import Product from "./Product";

const Featured = () => {
  return (
    <section className="flex flex-col gap-6 min-h-150 items-center px-6">
      <div className="flex justify-between max-w-6xl w-full">
        <h1 className="text-3xl">Featured Products</h1>
        <p className="max-w-100">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae tempore
          velit fuga accusamus at.
        </p>
      </div>
      <div>
        <ol className="flex gap-8">
          <Product />
          <Product />
          <Product />
          <Product />
        </ol>
      </div>
    </section>
  );
};

export default Featured;
