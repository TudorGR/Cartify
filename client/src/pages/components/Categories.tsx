const Categories = () => {
  return (
    <div className="w-full max-w-5xl  mx-auto h-full gap-6 flex flex-col items-center">
      <div className="max-w-xl flex flex-col gap-2 items-center">
        <p className="text-">View our range of categoris</p>
        <p className="text-neutral-400 text-center">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus
          delectus soluta consectetur, sint eum voluptatem quaerat sunt unde
          inventore.
        </p>
      </div>
      <div className="grid-cols-3 grid h-100 gap-6 w-full">
        <div className="bg-neutral-500 rounded-2xl w-full h-full relative">
          <p className="absolute bottom-6 left-6 text-white">
            Nice hover animations
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <div className="bg-neutral-500 rounded-2xl w-full flex-1 relative">
            <p className="absolute bottom-6 left-6 text-white">
              Nice hover animations
            </p>
          </div>
          <div className="bg-neutral-500 rounded-2xl w-full flex-1 relative">
            <p className="absolute bottom-6 left-6 text-white">
              Nice hover animations
            </p>
          </div>
        </div>
        <div className="bg-neutral-500 rounded-2xl w-full h-full relative">
          <p className="absolute bottom-6 left-6 text-white">
            Nice hover animations
          </p>
        </div>
      </div>
    </div>
  );
};

export default Categories;
