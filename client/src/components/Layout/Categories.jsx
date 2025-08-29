import Product from "./Product";

const Categories = () => {
  return (
    <section className="flex flex-col gap-6 min-h-200 items-center px-6">
      <div className="flex flex-col items-center gap-4 max-w-6xl w-full">
        <h1 className="text-3xl">View Our range of categories</h1>
        <p className="max-w-150 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae tempore
          velit fuga accusamus at.
        </p>
      </div>
      <div className="max-w-6xl flex-1 w-full grid grid-cols-3 gap-8">
        <div className="h-[70%]  bg-neutral-500 rounded-2xl"></div>
        <div className="flex flex-col justify-between max-h-[70%]">
          <div className="h-[45%]  bg-neutral-500 rounded-2xl"></div>
          <div className="h-[45%]  bg-neutral-500 rounded-2xl"></div>
        </div>
        <div className="h-[70%]  bg-neutral-500 rounded-2xl"></div>
      </div>
    </section>
  );
};

export default Categories;
