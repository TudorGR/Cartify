import Filters from "./components/Filters";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface ProductType {
  id: string | number;
  name: string;
  price: number;
  image?: string;
}

const ProductPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [leftSlider, setLeftSlider] = useState(0);
  const [rightSlider, setRightSlider] = useState(500);
  const [visible, setVisible] = useState(18);

  async function fetchProducts(leftSlider: number, rightSlider: number) {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/products/${category}`
      );
      const filtered = response.data.filter(
        (item: ProductType) =>
          item.price >= leftSlider && item.price <= rightSlider
      );
      setProducts(filtered);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchProducts(leftSlider, rightSlider);
  }, [category]);

  return (
    <div className="relative flex flex-col gap-20 pt-24 overflow-hidden min-h-screen justify-between">
      <Navbar color="black" />
      <div className="w-full max-w-5xl  mx-auto h-full">
        <p className="my-2">
          Home {">"} All {category && category != "All" ? `> ${category}` : ""}
        </p>
        <div className="flex gap-6">
          <Filters
            leftSlider={leftSlider}
            rightSlider={rightSlider}
            setLeftSlider={setLeftSlider}
            setRightSlider={setRightSlider}
            fetchProducts={fetchProducts}
          />
          <Products
            category={category ?? "All"}
            products={products}
            visible={visible}
            setVisible={setVisible}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
