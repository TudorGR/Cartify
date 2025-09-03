import { CartProduct } from "./CartProduct";

const CartProducts = () => {
  return (
    <div className="h-fit p-6 border border-neutral-300 flex-2  rounded-2xl">
      <ul className="flex flex-col gap-6">
        <CartProduct />
        <CartProduct />
        <CartProduct />
      </ul>
    </div>
  );
};

export default CartProducts;
