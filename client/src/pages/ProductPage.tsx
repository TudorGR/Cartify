import Filters from "./components/Filters";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/userContext";

export interface ProductType {
  id: string;
  name: string;
  price: number;
  image?: string;
  discountedPrice?: number | null;
}

const ProductPage = () => {
  const { category } = useParams();
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [leftSlider, setLeftSlider] = useState(0);
  const [rightSlider, setRightSlider] = useState(500);
  const [discount, setDiscount] = useState(false);
  const [visible, setVisible] = useState(18);
  const { lightMode } = useContext(UserContext);

  async function fetchProducts(leftSlider: number, rightSlider: number) {
    try {
      setProducts([]);
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/products/${category}`
      );
      const filtered = response.data.filter(
        (item: ProductType) =>
          item.price >= leftSlider && item.price <= rightSlider
      );
      setAllProducts(filtered);
      setProducts(filtered);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts(leftSlider, rightSlider);
  }, [category]);

  useEffect(() => {
    if (discount) {
      const discountedProducts = allProducts.filter(
        (p) => p.discountedPrice != null
      );
      setProducts(discountedProducts);
    } else {
      setProducts(allProducts);
    }
  }, [discount, allProducts]);

  return (
    <div
      className={`${
        lightMode ? "bg-white text-black" : "bg-neutral-950 text-white"
      } relative flex flex-col gap-20 pt-24 overflow-hidden min-h-screen justify-between transition-all`}
    >
      <Navbar color="black" />
      <div className="px-4 sm:px-5 w-full max-w-6xl mx-auto h-full">
        <p className="my-2">
          Home {">"} All {category && category != "All" ? `> ${category}` : ""}
        </p>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <Filters
            discount={discount}
            setDiscount={setDiscount}
            leftSlider={leftSlider}
            rightSlider={rightSlider}
            setLeftSlider={setLeftSlider}
            setRightSlider={setRightSlider}
            fetchProducts={fetchProducts}
          />
          <div className="w-full">
            <Products
              leftSlider={leftSlider}
              rightSlider={rightSlider}
              category={category ?? "All"}
              products={products}
              visible={visible}
              setVisible={setVisible}
              loading={loading}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
