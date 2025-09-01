const Filters = () => {
  return (
    <div className="flex flex-col gap-6 w-80">
      <div className="flex flex-col gap-4 border border-neutral-500 p-6 rounded-2xl">
        <h2>Categories</h2>
        <ul>
          <li>Category 1</li>
          <li>Category 2</li>
          <li>Category 3</li>
          <li>Category 4</li>
          <li>Category 5</li>
          <li>Category 6</li>
        </ul>
      </div>
      <div className="border border-neutral-500 p-6 rounded-2xl">
        <h2>Price</h2>
        <p>/2 SLIDER points/</p>
      </div>
    </div>
  );
};

export default Filters;
