import { useState } from "react";

const DescriptionReview = () => {
  const [dorr, setDorr] = useState("r");

  return (
    <div className="bg-neutral-100">
      <div className="w-full my-20 max-w-5xl mx-auto h-full flex flex-col gap-6">
        <div className="flex gap-4 text-2xl">
          <button
            className={`${
              dorr == "d" ? "text-black" : "text-neutral-400"
            } cursor-pointer`}
            onClick={() => setDorr("d")}
          >
            Description
          </button>
          <div className="border-l "></div>
          <button
            className={`${
              dorr == "r" ? "text-black" : "text-neutral-400"
            } cursor-pointer`}
            onClick={() => setDorr("r")}
          >
            Reviews
          </button>
        </div>
        {dorr == "d" ? (
          <>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
              atque enim ducimus nisi quisquam nihil facere tenetur explicabo
              modi soluta dicta voluptatum dignissimos impedit iure neque,
              possimus voluptatem veritatis minima! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Porro atque enim ducimus nisi
              quisquam nihil facere tenetur explicabo modi soluta dicta
              voluptatum dignissimos impedit iure neque, possimus voluptatem
              veritatis minima! veritatis minima! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Porro atque enim ducimus nisi
              quisquam nihil facere tenetur explicabo modi soluta dicta
              voluptatum dignissimos impedit iure neque, possimus voluptatem
              veritatis minima!
            </p>
            <ul className="list-disc ml-6">
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                fugiat vero maiores fuga esse error minus deleniti nam?
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                fugiat vero maiores fuga esse error minus deleniti nam?
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                fugiat vero maiores fuga esse error minus deleniti nam?
              </li>
            </ul>
          </>
        ) : (
          <>
            <div className="flex gap-1 flex-col items-start border-neutral-300 border p-4 rounded-2xl">
              <div>x x x x x</div>
              <h2 className="text-xl">Alex B.</h2>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt,
                maxime reprehenderit quibusdam repudiandae eius sed dolore,
                atque voluptas deserunt alias vel cum. Iure quas optio est
                itaque praesentium necessitatibus voluptate!
              </p>
              <p>Posted on September 23, 2024</p>
            </div>
            <div className="flex gap-1 flex-col items-start border-neutral-300 border p-4 rounded-2xl">
              <div>x x x x x</div>
              <h2 className="text-xl">Alex B.</h2>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt,
                maxime reprehenderit quibusdam repudiandae eius sed dolore,
                atque voluptas deserunt alias vel cum. Iure quas optio est
                itaque praesentium necessitatibus voluptate!
              </p>
              <p>Posted on September 23, 2024</p>
            </div>
            <div className="flex gap-4 flex-col items-start border-neutral-300 border p-4 rounded-2xl">
              <div className="flex gap-4">
                <input
                  type="text"
                  className="border border-neutral-300 px-6 py-3 rounded-full"
                  placeholder="Your Name"
                />
                <input
                  type="text"
                  className="border border-neutral-300 px-6 py-3 rounded-full"
                  placeholder="example@email.com"
                />
              </div>
              <textarea
                name=""
                rows={4}
                placeholder="Write your review..."
                className="w-full resize-none border border-neutral-300 px-6 py-3 rounded-4xl"
              ></textarea>
              <div className="flex justify-between items-center w-full">
                <p>Your rating: x x x x x</p>
                <button className="bg-neutral-500 text-white px-6 py-3 rounded-full">
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
