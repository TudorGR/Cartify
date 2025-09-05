import { useContext, useState } from "react";
import { UserContext } from "../../../context/userContext";

const DescriptionReview = () => {
  const [dorr, setDorr] = useState("r");
  const { lightMode } = useContext(UserContext);

  return (
    <div className={`${lightMode ? "bg-neutral-100" : "bg-neutral-900"}`}>
      <div className="w-full my-20 max-w-5xl mx-auto h-full flex flex-col gap-6">
        <div className="flex gap-4 text-2xl">
          <button
            className={`${
              dorr == "d"
                ? lightMode
                  ? "text-black"
                  : "text-white"
                : lightMode
                ? "text-neutral-400"
                : "text-neutral-400"
            } cursor-pointer`}
            onClick={() => setDorr("d")}
          >
            Description
          </button>
          <div className="border-l "></div>
          <button
            className={`${
              dorr == "r"
                ? lightMode
                  ? "text-black"
                  : "text-white"
                : lightMode
                ? "text-neutral-400"
                : "text-neutral-400"
            } cursor-pointer`}
            onClick={() => setDorr("r")}
          >
            Reviews
          </button>
        </div>
        {dorr == "d" ? (
          <>
            <p>
              Experience the perfect blend of quality, functionality, and style
              with this product. Designed with attention to detail, it offers
              durability you can rely on and comfort you’ll appreciate every
              day. Whether you’re using it at home, at work, or on the go, this
              item adapts seamlessly to your lifestyle. With its sleek design
              and premium materials, it not only performs exceptionally but also
              looks great in any setting. An ideal choice for those who value
              practicality without compromising on aesthetics.
            </p>
            <ul className="list-disc ml-6">
              <li>
                ♻️ Made from premium recycled materials, reducing waste and
                environmental impact
              </li>
              <li>🌱 Eco-friendly design that supports sustainable living</li>
              <li>
                💪 Durable and long-lasting, crafted to withstand daily use
              </li>
              <li>
                ✨ Stylish yet practical, blending modern aesthetics with
                functionality
              </li>
              <li>
                🌍 A responsible choice for those who value both quality and the
                planet
              </li>
            </ul>
          </>
        ) : (
          <>
            <div
              className={`flex gap-1 flex-col items-start ${
                lightMode ? "border-neutral-300" : "border-neutral-700"
              } border p-4 rounded-2xl`}
            >
              <div>★★★☆☆</div>
              <h2 className="text-xl">Alex B.</h2>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt,
                maxime reprehenderit quibusdam repudiandae eius sed dolore,
                atque voluptas deserunt alias vel cum. Iure quas optio est
                itaque praesentium necessitatibus voluptate!
              </p>
              <p>Posted on September 23, 2024</p>
            </div>
            <div
              className={`flex gap-1 flex-col items-start ${
                lightMode ? "border-neutral-300" : "border-neutral-700"
              } border p-4 rounded-2xl`}
            >
              <div>★★★☆☆</div>
              <h2 className="text-xl">Alex B.</h2>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt,
                maxime reprehenderit quibusdam repudiandae eius sed dolore,
                atque voluptas deserunt alias vel cum. Iure quas optio est
                itaque praesentium necessitatibus voluptate!
              </p>
              <p>Posted on September 23, 2024</p>
            </div>
            <div
              className={`flex gap-4 flex-col items-start ${
                lightMode ? "border-neutral-300" : "border-neutral-700"
              } border p-4 rounded-2xl`}
            >
              <div className="flex gap-4">
                <input
                  type="text"
                  className={`border ${
                    lightMode
                      ? "border-neutral-300 bg-white text-black"
                      : "border-neutral-600 bg-neutral-800 text-white"
                  } px-6 py-3 rounded-full`}
                  placeholder="Your Name"
                />
                <input
                  type="text"
                  className={`border ${
                    lightMode
                      ? "border-neutral-300 bg-white text-black"
                      : "border-neutral-600 bg-neutral-800 text-white"
                  } px-6 py-3 rounded-full`}
                  placeholder="example@email.com"
                />
              </div>
              <textarea
                name=""
                rows={4}
                placeholder="Write your review..."
                className={`w-full resize-none border ${
                  lightMode
                    ? "border-neutral-300 bg-white text-black"
                    : "border-neutral-600 bg-neutral-800 text-white"
                } px-6 py-3 rounded-4xl`}
              ></textarea>
              <div className="flex justify-between items-center w-full">
                <p>Your rating: ★★★☆☆</p>
                <button
                  className={`${
                    lightMode
                      ? "bg-neutral-800 hover:bg-neutral-700"
                      : "bg-neutral-500 hover:bg-neutral-400"
                  } text-white px-6 py-3 rounded-full transition-colors`}
                >
                  Post Review
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DescriptionReview;
