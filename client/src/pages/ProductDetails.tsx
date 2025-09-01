import { useEffect } from "react";
import DescriptionReview from "./components/DescriptionReview";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProductHero from "./components/ProductHero";
import SimilarProducts from "./components/SimilarProducts";

const ProductDetails = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="relative flex flex-col gap-20 pt-24 overflow-hidden">
      <Navbar color="black" />
      <ProductHero />
      <DescriptionReview />
      <SimilarProducts />
      <Footer />
    </div>
  );
};

export default ProductDetails;
