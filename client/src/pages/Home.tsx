import { useContext } from "react";
import Categories from "./components/Categories";
import Featured from "./components/Featured";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import NewsLetter from "./components/NewsLetter";
import SpecialDeal from "./components/SpecialDeal";
import Testimonials from "./components/Testimonials";
import { UserContext } from "../../context/userContext";
import Discounted from "./components/Discounted";

const Home = () => {
  const { lightMode } = useContext(UserContext);

  return (
    <div
      className={`transition-all relative flex flex-col gap-20 overflow-hidden ${
        lightMode ? "bg-white" : "bg-neutral-950"
      }`}
    >
      <Navbar color="white" />
      <Hero />
      <Featured />
      <div
        className={`h-[1px] border-b max-w-5xl w-full mx-auto ${
          lightMode ? "border-neutral-100" : "border-neutral-800"
        }`}
      ></div>
      <Categories />
      <SpecialDeal />
      <div
        className={`h-[1px] border-b max-w-5xl w-full mx-auto ${
          lightMode ? "border-neutral-100" : "border-neutral-800"
        }`}
      ></div>
      <Discounted />
      <Testimonials />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Home;
