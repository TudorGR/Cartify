import Categories from "./components/Categories";
import Featured from "./components/Featured";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import NewsLetter from "./components/NewsLetter";
import SpecialDeal from "./components/SpecialDeal";
import Testimonials from "./components/Testimonials";

const Home = () => {
  return (
    <div className="relative flex flex-col gap-20 overflow-hidden">
      <Navbar color="white" />
      <Hero />
      <Featured />
      <Categories />
      <SpecialDeal />
      <Testimonials />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Home;
