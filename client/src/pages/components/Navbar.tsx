import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Product {
  id: number;
  name: string;
  price: string;
}

const Navbar = ({ color }: { color: string }) => {
  const [dropDown, setDropDown] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState<Product[]>([]);
  const searchBarRef = useRef<HTMLDivElement | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);

  async function handleSearch() {
    const q = searchValue.trim();
    if (!q) {
      setItems([]);
      setIsSearching(false); // end loading if cleared
      return;
    }

    try {
      // keep immediate loading feedback from useEffect, but safe to set here too
      setIsSearching(true);
      const response = await axios.post("http://localhost:3000/search", { q });
      setItems(response.data);
    } catch (error) {
      console.log(error);
      setItems([]); // ensure items is empty on error
    } finally {
      setIsSearching(false); // always end loading, even if 0 results
    }
  }

  function closeSearch() {
    setSearchBar(false);
    setSearchValue("");
    setItems([]);
  }

  useEffect(() => {
    if (!searchBar) return;
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      const clickedInsideSearchBar =
        searchBarRef.current?.contains(target) ?? false;
      const clickedInsideResults =
        resultsRef.current?.contains(target) ?? false;

      if (!clickedInsideSearchBar && !clickedInsideResults) {
        closeSearch();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchBar]);

  function useDebounce<T extends (...args: any[]) => void>(func: T, wait = 0) {
    const timeoutRef = useRef<number | null>(null);

    return useCallback(
      (...args: Parameters<T>) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(() => {
          func(...args);
        }, wait);
      },
      [func, wait]
    );
  }

  function clg() {
    handleSearch();
  }
  const clgFunc = useDebounce(clg, 1000);

  useEffect(() => {
    if (searchValue) {
      setIsSearching(true);
      clgFunc();
    } else {
      setIsSearching(false);
      setItems([]);
    }
  }, [searchValue]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/10 transition-opacity duration-300 ${
          dropDown || searchBar
            ? "opacity-100 z-5"
            : "opacity-0 pointer-events-none"
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
        <>
          <div
            ref={searchBarRef}
            className="absolute left-0 top-0 w-full bg-white border-b border-neutral-400 z-20 flex items-center justify-center h-20"
          >
            <div className="max-w-2xl w-full flex">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full p-3 border border-gray-300 rounded-2xl text-black outline-none"
                autoFocus
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />

              <button
                className="cursor-pointer ml-4 px-4 py-2"
                onClick={closeSearch}
              >
                X
              </button>
            </div>
          </div>
          {isSearching && (
            <div
              ref={resultsRef}
              className="absolute left-0 top-20 w-full bg-white border-b border-neutral-400 z-20 flex items-center justify-center"
            >
              <div className="w-full max-w-2xl flex gap-2 flex-col my-6 max-h-100 overflow-auto">
                <ul className="w-full max-w-2xl flex gap-2 flex-col  max-h-100 overflow-auto">
                  <li
                    className={
                      "mr-10 flex py-2 justify-between hover:text-black cursor-pointer text-neutral-400 hover:underline"
                    }
                  >
                    <Skeleton
                      containerClassName=" w-[50%]"
                      className=" rounded-2xl"
                    />

                    <Skeleton
                      containerClassName=" w-[9%]"
                      className=" rounded-2xl"
                    />
                  </li>
                  <li
                    className={
                      "mr-10 flex py-2 justify-between hover:text-black cursor-pointer text-neutral-400 hover:underline"
                    }
                  >
                    <Skeleton
                      containerClassName=" w-[30%]"
                      className=" rounded-2xl"
                    />

                    <Skeleton
                      containerClassName=" w-[10%]"
                      className=" rounded-2xl"
                    />
                  </li>
                  <li
                    className={
                      "mr-10 flex py-2 justify-between hover:text-black cursor-pointer text-neutral-400 hover:underline"
                    }
                  >
                    <Skeleton
                      containerClassName=" w-[40%]"
                      className=" rounded-2xl"
                    />

                    <Skeleton
                      containerClassName=" w-[15%]"
                      className=" rounded-2xl"
                    />
                  </li>
                </ul>
              </div>
            </div>
          )}
          {!isSearching && items.length > 0 && (
            <div
              ref={resultsRef}
              className="absolute left-0 top-20 w-full bg-white border-b border-neutral-400 z-20 flex items-center justify-center"
            >
              <ul className="w-full max-w-2xl flex gap-2 flex-col my-6 max-h-100 overflow-auto">
                {items.map((item) => (
                  <li
                    onClick={() => {
                      closeSearch();
                      navigate(`/product/${item.id}`);
                    }}
                    className={
                      "mr-10 py-2 flex justify-between hover:text-black cursor-pointer text-neutral-400 hover:underline"
                    }
                    key={item.id}
                  >
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!isSearching && searchValue && items.length === 0 && (
            <div
              ref={resultsRef}
              className="absolute left-0 top-20 w-full bg-white border-b border-neutral-400 z-20 flex items-center justify-center"
            >
              <div className="w-full max-w-2xl my-6 text-neutral-500 px-2">
                No results found for “{searchValue}”.
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Navbar;
