import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ color }: { color: string }) => {
  const [dropDown, setDropDown] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  function handleSearch() {
    console.log(searchValue);
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/10 transition-opacity duration-300 ${
          dropDown ? "opacity-100 z-5" : "opacity-0 pointer-events-none"
        }`}
      ></div>
      <div
        className="w-full top-0 absolute z-10"
        style={{
          color:
            color == "black"
              ? "black"
              : dropDown === true || searchBar === true
              ? "black"
              : "white",
          background:
            dropDown === true || searchBar === true ? "white" : "transparent",
        }}
      >
        <div className=" flex justify-between items-center w-full max-w-5xl mx-auto  h-16">
          <img alt="img" className="flex-1" />
          <div className="flex gap-4 flex-1 justify-between">
            <Link to={"/"} className="py-4">
              Home
            </Link>
            <Link to={"/products/All"} className="py-4">
              Shop
            </Link>
            <div
              onMouseLeave={() => setDropDown(false)}
              onMouseEnter={() => setDropDown(true)}
              className="relative py-4 text-nowrap"
            >
              Categories ↓
              <div
                className={`${
                  dropDown ? "open" : ""
                }  dropdown overflow-hidden translate-x-[-50%] left-1/2 w-[120vw] top-[100%]  bg-white  absolute`}
              >
                <ul className="text-black  justify-items-center flex max-w-5xl mx-auto w-full gap-4 p-6">
                  <div className="flex-1 flex justify-center">
                    <div className="flex flex-col gap-4">
                      <Link
                        onClick={() => setDropDown(false)}
                        to={"/products/Electronics"}
                        className="hover:underline text-neutral-400 hover:text-black"
                      >
                        Electronics
                      </Link>
                      <Link
                        onClick={() => setDropDown(false)}
                        to={"/products/HomeGoods"}
                        className="hover:underline text-neutral-400 hover:text-black"
                      >
                        Home Goods
                      </Link>
                      <Link
                        onClick={() => setDropDown(false)}
                        to={"/products/Toys"}
                        className="hover:underline text-neutral-400 hover:text-black"
                      >
                        Toys
                      </Link>
                      <Link
                        onClick={() => setDropDown(false)}
                        to={"/products/Beauty"}
                        className="hover:underline text-neutral-400 hover:text-black"
                      >
                        Beauty
                      </Link>
                    </div>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="flex flex-col gap-4">
                      <Link
                        onClick={() => setDropDown(false)}
                        to={"/products/Automotive"}
                        className="hover:underline text-neutral-400 hover:text-black"
                      >
                        Automotive
                      </Link>
                      <Link
                        onClick={() => setDropDown(false)}
                        to={"/products/Apparel"}
                        className="hover:underline text-neutral-400 hover:text-black"
                      >
                        Apparel
                      </Link>
                      <Link
                        onClick={() => setDropDown(false)}
                        to={"/products/Books"}
                        className="hover:underline text-neutral-400 hover:text-black"
                      >
                        Books
                      </Link>
                      <Link
                        onClick={() => setDropDown(false)}
                        to={"/products/Sports"}
                        className="hover:underline text-neutral-400 hover:text-black"
                      >
                        Sports
                      </Link>
                    </div>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="flex flex-col gap-4">
                      <Link
                        onClick={() => setDropDown(false)}
                        to={"/products/Food"}
                        className="hover:underline text-neutral-400 hover:text-black"
                      >
                        Food
                      </Link>
                      <Link
                        onClick={() => setDropDown(false)}
                        to={"/products/Pets"}
                        className="hover:underline text-neutral-400 hover:text-black"
                      >
                        Pets
                      </Link>
                    </div>
                  </div>
                </ul>
              </div>
            </div>
            <Link to={"/contact"} className="py-4 text-nowrap">
              Contact Us
            </Link>
          </div>
          <div className="flex justify-end gap-4 flex-1">
            <button
              className="cursor-pointer"
              onClick={() => setSearchBar((prev) => !prev)}
            >
              Search
            </button>
            <Link to={"/profile"}>Profile</Link>
            <Link to={"/cart"}>Cart</Link>
          </div>
        </div>
      </div>
      {searchBar && (
        <div className="absolute left-0 top-0 w-full bg-white border-b border-neutral-300 z-20 flex items-center justify-center h-20">
          <div className="max-w-2xl w-full flex">
            <div className="w-full relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full p-3 border border-gray-300 rounded-2xl text-black outline-none"
                autoFocus
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="cursor-pointer absolute px-6 right-0 rounded-r-2xl bg-neutral-500 text-white h-full"
              >
                Search
              </button>
            </div>
            <button
              className="cursor-pointer ml-4 px-4 py-2"
              onClick={() => setSearchBar(false)}
            >
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
