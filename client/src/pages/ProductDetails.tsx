import { useContext, useEffect, useState } from "react";
import DescriptionReview from "./components/DescriptionReview";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProductHero from "./components/ProductHero";
import SimilarProducts from "./components/SimilarProducts";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/userContext";

const ProductDetails = () => {
  const [data, setData] = useState({
    id: "",
    name: "",
    shortDescription: "",
    category: "",
    image: "",
    price: 0,
    discountedPrice: 0,
  });
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0 });

    async function fetchProduct() {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/product/${id}`);

        setData(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  const { lightMode } = useContext(UserContext);
  return (
    <div
      className={`transition-all relative flex flex-col gap-20 pt-24 overflow-hidden ${
        lightMode ? "bg-white text-black" : "bg-neutral-950 text-white"
      }`}
    >
      <Navbar color="black" />
      <ProductHero
        data={data}
        loading={loading}
        quantity={quantity}
        setQuantity={setQuantity}
      />
      <DescriptionReview />
      <SimilarProducts category={data.category} productId={data.id} />
      <Footer />
    </div>
  );
};

export default ProductDetails;
