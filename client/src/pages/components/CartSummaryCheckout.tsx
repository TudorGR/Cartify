const CartSummaryCheckout = () => {
  return (
    <div className="bg-neutral-100 border border-neutral-300 flex-1 h-fit rounded-2xl flex flex-col gap-6 p-6">
      <h2>Order Summary</h2>
      <div className="flex">
        <p className="flex-2">Product</p>
        <p className="flex-1 text-center">Quantity</p>
        <p className="flex-1 text-end">Subtotal</p>
      </div>
      <div className="border-b border-dashed border-neutral-200"></div>
      <ul className="flex flex-col gap-2">
        <li className="flex text-neutral-400">
          <p className="flex-2">Product Name</p>
          <p className="flex-1 text-center">2</p>
          <p className="flex-1 text-end">$79.99</p>
        </li>
        <li className="flex text-neutral-400">
          <p className="flex-2">Product Name</p>
          <p className="flex-1 text-center">2</p>
          <p className="flex-1 text-end">$79.99</p>
        </li>
      </ul>
      <div className="border-b border-dashed border-neutral-200"></div>
      <div className="flex justify-between w-full">
        <p>Subtotal</p>
        <p>$599.99</p>
      </div>
      <div className="border-b border-dashed border-neutral-200"></div>
      <div className="flex justify-between w-full">
        <p>Discount</p>
        <p>-$100</p>
      </div>
      <div className="border-b border-dashed border-neutral-200"></div>
      <div className="flex justify-between w-full">
        <p>Delivery Fee</p>
        <p>$10</p>
      </div>
      <div className="border-b border-dashed border-neutral-200"></div>
      <div className="flex justify-between w-full">
        <p>Total</p>
        <p>$509.99</p>
      </div>
    </div>
  );
};

export default CartSummaryCheckout;
