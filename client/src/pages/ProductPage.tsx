import Navbar from "./components/Navbar";

const ProductPage = () => {
  return (
    <div className="relative flex flex-col gap-20 pt-20">
      <Navbar color="black" />
      <div className="w-full max-w-5xl  mx-auto h-full">
        <p>Home {">"} All</p>
        <div className="flex"></div>
      </div>
    </div>
  );
};

export default ProductPage;
