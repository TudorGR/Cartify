import { lazy, Suspense, useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
const Categories = lazy(() => import("./components/Categories"));
const Footer = lazy(() => import("./components/Footer"));
const NewsLetter = lazy(() => import("./components/NewsLetter"));
const SpecialDeal = lazy(() => import("./components/SpecialDeal"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Featured = lazy(() => import("./components/Featured"));
const Discounted = lazy(() => import("./components/Discounted"));
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import PageAnimationWrapper from "./components/PageAnimationWrapper";

const Home = () => {
  const { lightMode } = useContext(UserContext);

  const LoadingFallback = () => (
    <div
      className={`h-screen w-full flex items-center justify-center ${
        lightMode ? "bg-white" : "bg-neutral-950"
      }`}
    >
      <UseAnimations animation={loading} size={50} />
    </div>
  );

  return (
    <PageAnimationWrapper>
      <div
        className={`transition-all relative flex flex-col gap-20 overflow-hidden ${
          lightMode ? "bg-white" : "bg-neutral-950"
        }`}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Navbar color="white" />
          <Hero />
          <Featured />
          <div
            className={`h-[1px] border-b max-w-5xl w-[90%] mx-auto ${
              lightMode ? "border-neutral-100" : "border-neutral-800"
            }`}
          ></div>
          <Categories />
          <SpecialDeal />
          <div
            className={`h-[1px] border-b max-w-5xl w-[90%] mx-auto ${
              lightMode ? "border-neutral-100" : "border-neutral-800"
            }`}
          ></div>
          <Discounted />
          <Testimonials />
          <NewsLetter />
          <Footer />
        </Suspense>
      </div>
    </PageAnimationWrapper>
  );
};

export default Home;
