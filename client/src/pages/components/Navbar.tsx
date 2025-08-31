import { Link } from "react-router-dom";

const Navbar = ({ color }: { color: string }) => {
  return (
    <div
      className="w-full absolute top-0"
      style={{ color: color == "black" ? "black" : "white" }}
    >
      <div className="flex justify-between items-center w-full max-w-5xl mx-auto  h-16">
        <img alt="img" className="flex-1" />
        <nav>
          <ul className="flex gap-4 flex-1">
            <Link to={"/"}>Home</Link>
            <Link to={"/products"}>Shop</Link>
            <li>Categories</li>
            <li>Contact Us</li>
          </ul>
        </nav>
        <div className="flex justify-end gap-4 flex-1">
          <button>Search</button>
          <button>Profile</button>
          <button>Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
