import Filters from "./components/Filters";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Products from "./components/Products";

const ProductPage = () => {
  return (
    <div className="relative flex flex-col gap-20 pt-24 overflow-hidden">
      <Navbar color="black" />
      <div className="w-full max-w-5xl  mx-auto h-full">
        <p className="my-2">Home {">"} All</p>
        <div className="flex gap-6">
          <Filters />
          <Products category="All" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
