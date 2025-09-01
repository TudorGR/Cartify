import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ color }: { color: string }) => {
  const [dropDown, setDropDown] = useState(false);

  return (
    <div
      className="w-full top-0 absolute"
      style={{
        color: color == "black" ? "black" : dropDown ? "black" : "white",
        background: dropDown ? "white" : "transparent",
      }}
    >
      <div className=" flex justify-between items-center w-full max-w-5xl mx-auto  h-16">
        <img alt="img" className="flex-1" />
        <div className="flex gap-4 flex-1">
          <Link to={"/"} className="py-4">
            Home
          </Link>
          <Link to={"/products"} className="py-4">
            Shop
          </Link>
          <div
            onMouseLeave={() => setDropDown(false)}
            onMouseEnter={() => setDropDown(true)}
            className="relative py-4"
          >
            Categories ↓
            <div
              className={`${
                dropDown ? "open" : ""
              }  dropdown mt-4 overflow-hidden translate-x-[-50%] w-[120vw] top-[1]  bg-white absolute`}
            >
              <ul className="text-black w-full flex flex-col items-center h-100 p-6">
                <li>Electronics</li>
                <li>Clothing</li>
                <li>Accessories</li>
                <li>Electronics</li>
                <li>Clothing</li>
                <li>Accessories</li>
              </ul>
            </div>
          </div>
          <Link to={"/contact"} className="py-4">
            Contact Us
          </Link>
        </div>
        <div className="flex justify-end gap-4 flex-1">
          <button>Search</button>
          <button>Profile</button>
          <Link to={"/cart"}>Cart</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
