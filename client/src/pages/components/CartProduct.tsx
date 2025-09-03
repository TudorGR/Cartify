export const CartProduct = () => {
  return (
    <li className="flex gap-6">
      <img
        alt="product"
        className="h-20 w-15 shrink-0 bg-neutral-500 rounded-2xl"
      />
      <div className="flex justify-between w-full">
        <div className="flex flex-col justify-between">
          <h2>Product Name</h2>
          <div className="flex gap-6 border border-neutral-200 px-4 py-2 rounded-full">
            <button>{"-"}</button>
            <p>1</p>
            <button>{"+"}</button>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between">
          <button>X</button>
          <p>$399.99</p>
        </div>
      </div>
    </li>
  );
};
