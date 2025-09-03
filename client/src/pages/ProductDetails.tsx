import { useEffect, useState } from "react";
import DescriptionReview from "./components/DescriptionReview";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProductHero from "./components/ProductHero";
import SimilarProducts from "./components/SimilarProducts";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const [data, setData] = useState({
    id: "",
    name: "",
    shortDescription: "",
    category: "",
    image: "",
    price: 0,
  });
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0 });

    async function fetchProduct() {
      try {
        const response = await axios.get(`http://localhost:3000/product/${id}`);

        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchProduct();
  }, []);

  return (
    <div className="relative flex flex-col gap-20 pt-24 overflow-hidden">
      <Navbar color="black" />
      <ProductHero data={data} />
      <DescriptionReview />
      <SimilarProducts />
      <Footer />
    </div>
  );
};

export default ProductDetails;
