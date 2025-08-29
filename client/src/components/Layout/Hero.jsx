import Navbar from "./Navbar";

const Hero = () => {
  return (
    <section className="relative min-h-200 flex items-center justify-center bg-neutral-500">
      <Navbar />
      <div className="flex flex-col items-center gap-6">
        <h1 className="max-w-2xl text-center text-wrap text-4xl">
          Crating cmfort, redfie space, your home your signature
        </h1>
        <p className="max-w-xl text-center text-wrap text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, facere
          repe llat nostrum nihil asperiores numquam laboriosam.
        </p>
        <input
          placeholder="Search an item"
          type="text"
          className="rounded-3xl border text-xl px-4 py-2"
        />
      </div>
    </section>
  );
};
export default Hero;
