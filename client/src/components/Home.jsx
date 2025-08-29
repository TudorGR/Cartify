import Categories from "./Layout/Categories";
import Featured from "./Layout/Featured";
import Hero from "./Layout/Hero";

const Home = () => {
  return (
    <div className="flex flex-col gap-20">
      <Hero />
      <Featured />
      <Categories />
    </div>
  );
};

export default Home;
