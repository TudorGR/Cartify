import axios from "axios";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { UserContext } from "../../../context/userContext";
import { RiArrowDownSLine } from "react-icons/ri";

import { RiComputerLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { TbHorseToy } from "react-icons/tb";
import { LuBrush } from "react-icons/lu";
import { FaCar } from "react-icons/fa";
import { FaTshirt } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";
import { MdOutlineSportsBasketball } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { RiArrowDownSFill } from "react-icons/ri";

import logo from "../../assets/logo.png";

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
  const { lightMode, setLightMode, cart } = useContext(UserContext);

  async function handleSearch() {
    const q = searchValue.trim();
    if (!q) {
      setItems([]);
      setIsSearching(false);
      return;
    }

    try {
      setIsSearching(true);
      const response = await axios.post("http://localhost:3000/search", { q });
      setItems(response.data);
    } catch (error) {
      console.log(error);
      setItems([]);
    } finally {
      setIsSearching(false);
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
          color: lightMode ? "black" : "white",
          background:
            dropDown === true || searchBar === true
              ? lightMode
                ? "white"
                : "black"
              : "transparent",
        }}
      >
        <div className="flex justify-between items-center w-full max-w-5xl mx-auto h-16">
          <div className="flex-1 flex items-center">
            <img
              src={logo}
              alt="logo"
              className={`w-8 ${lightMode ? "" : "invert"}`}
            />
            <p className="headings uppercase text-2xl">Cartify</p>
          </div>
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
              className="relative py-4 text-nowrap flex items-center"
            >
              Categories
              <RiArrowDownSFill className="w-6 h-6" />
              <div
                className={`${
                  dropDown ? "open" : ""
                } dropdown overflow-hidden translate-x-[-50%] left-1/2 w-[120vw] top-[100%] ${
                  lightMode ? "text-black bg-white" : "text-white bg-black"
                } absolute`}
              >
                <ul className="justify-items-center flex max-w-5xl mx-auto w-full gap-4 p-6">
                  <div className="flex-1 flex justify-center">
                    <div className="flex flex-col gap-4">
                      <Link
                        onClick={() => setDropDown(false)}
                        to={"/products/Electronics"}
                        className={`flex items-center gap-2 hover:underline text-neutral-400 ${
                          lightMode ? "hover:text-black" : "hover:text-white"
                        }`}
                      >
                        <RiComputerLine />
                        Electronics
                      </Link>
                      <Link
                        onClick={() => setDropDown(false)}
                        to={"/products/HomeGoods"}
                        className={`flex items-center gap-2 hover:underline text-neutral-400 ${
                          lightMode ? "hover:text-black" : "hover:text-white"
                        }`}
                      >
                        <FaHome />
                        Home Goods
                      </Link>
                      <Link
                        onClick={() => setDropDown(false)}
                        to={"/products/Toys"}
                        className={`flex gap-2 items-center hover:underline text-neutral-400 ${
                          lightMode ? "hover:text-black" : "hover:text-white"
                        }`}
                      >
                        <TbHorseToy />
                        Toys
                      </Link>
                      <Link
                        onClick={() => setDropDown(false)}
                        to={"/products/Beauty"}
                        className={`flex gap-2 items-center hover:underline text-neutral-400 ${
                          lightMode ? "hover:text-black" : "hover:text-white"
                        }`}
                      >
                        <LuBrush />
                        Beauty
                      </Link>
                    </div>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="flex flex-col gap-4">
                      <Link
                        onClick={() => setDropDown(false)}
                        to={"/products/Automotive"}
                        className={`flex gap-2 items-center hover:underline text-neutral-400 ${
                          lightMode ? "hover:text-black" : "hover:text-white"
                        }`}
                      >
                        <FaCar />
                        Automotive
                      </Link>
                      <Link
                        onClick={() => setDropDown(false)}
                        to={"/products/Apparel"}
                        className={`flex gap-2 items-center hover:underline text-neutral-400 ${
                          lightMode ? "hover:text-black" : "hover:text-white"
                        }`}
                      >
                        <FaTshirt />
                        Apparel
                      </Link>
                      <Link
                        onClick={() => setDropDown(false)}
                        to={"/products/Books"}
                        className={`flex gap-2 items-center hover:underline text-neutral-400 ${
                          lightMode ? "hover:text-black" : "hover:text-white"
                        }`}
                      >
                        <FaBook />
                        Books
                      </Link>
                      <Link
                        onClick={() => setDropDown(false)}
                        to={"/products/Sports"}
                        className={`flex gap-2 items-center  hover:underline text-neutral-400 ${
                          lightMode ? "hover:text-black" : "hover:text-white"
                        }`}
                      >
                        <MdOutlineSportsBasketball />
                        Sports
                      </Link>
                    </div>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="flex flex-col gap-4">
                      <Link
                        onClick={() => setDropDown(false)}
                        to={"/products/Food"}
                        className={`flex gap-2 items-center hover:underline text-neutral-400 ${
                          lightMode ? "hover:text-black" : "hover:text-white"
                        }`}
                      >
                        <IoFastFoodOutline />
                        Food
                      </Link>
                      <Link
                        onClick={() => setDropDown(false)}
                        to={"/products/Pets"}
                        className={`flex gap-2 items-center  hover:underline text-neutral-400 ${
                          lightMode ? "hover:text-black" : "hover:text-white"
                        }`}
                      >
                        <MdOutlinePets />
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
              onClick={() => setLightMode(!lightMode)}
            >
              {lightMode ? (
                <FaMoon className="w-6 h-6" />
              ) : (
                <FaSun className="w-6 h-6" />
              )}
            </button>
            <button
              className="cursor-pointer"
              onClick={() => setSearchBar((prev) => !prev)}
            >
              <IoIosSearch className="w-8 h-8" />
            </button>
            <Link to={"/profile"}>
              <IoPersonCircleOutline className="w-8 h-8" />
            </Link>
            <Link to={"/cart"} className="flex gap-1 items-center">
              <IoCartOutline className="w-8 h-8" />
              {Array.from(cart.values()).reduce(
                (sum, item) => sum + item.quantity,
                0
              )}
            </Link>
          </div>
        </div>
      </div>
      {searchBar && (
        <>
          <div
            ref={searchBarRef}
            className={`absolute left-0 top-0 w-full border-b ${
              lightMode ? "border-neutral-300" : "border-neutral-700"
            }  z-20 flex items-center justify-center h-20 ${
              lightMode ? "bg-white" : "bg-black"
            }`}
          >
            <div className="max-w-2xl w-full flex">
              <input
                type="text"
                placeholder="Search products..."
                className={`w-full p-3 border border-neutral-300 rounded-2xl outline-none ${
                  lightMode
                    ? "text-black bg-white"
                    : "text-white bg-neutral-800 border-neutral-600"
                }`}
                autoFocus
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button
                className={`cursor-pointer px-4 py-2 ${
                  lightMode ? "text-black" : "text-white"
                }`}
                onClick={closeSearch}
              >
                <IoMdClose className="w-6 h-6" />
              </button>
            </div>
          </div>
          {isSearching && (
            <div
              ref={resultsRef}
              className={`absolute left-0 top-20 w-full border-b ${
                lightMode ? "border-neutral-300" : "border-neutral-700"
              }  z-20 flex items-center justify-center ${
                lightMode ? "bg-white" : "bg-black"
              }`}
            >
              <div className="w-full max-w-2xl flex gap-2 flex-col my-6 max-h-100 overflow-auto">
                <ul className="w-full max-w-2xl flex gap-2 flex-col max-h-100 overflow-auto">
                  <li className="mr-10 flex py-2 justify-between hover:text-black cursor-pointer text-neutral-400 hover:underline">
                    <Skeleton
                      containerClassName="w-[50%]"
                      className="rounded-2xl"
                      baseColor={lightMode ? "#f3f4f6" : "#374151"}
                      highlightColor={lightMode ? "#e5e7eb" : "#4b5563"}
                    />
                    <Skeleton
                      containerClassName="w-[9%]"
                      className="rounded-2xl"
                      baseColor={lightMode ? "#f3f4f6" : "#374151"}
                      highlightColor={lightMode ? "#e5e7eb" : "#4b5563"}
                    />
                  </li>
                  <li className="mr-10 flex py-2 justify-between hover:text-black cursor-pointer text-neutral-400 hover:underline">
                    <Skeleton
                      containerClassName="w-[30%]"
                      className="rounded-2xl"
                      baseColor={lightMode ? "#f3f4f6" : "#374151"}
                      highlightColor={lightMode ? "#e5e7eb" : "#4b5563"}
                    />
                    <Skeleton
                      containerClassName="w-[10%]"
                      className="rounded-2xl"
                      baseColor={lightMode ? "#f3f4f6" : "#374151"}
                      highlightColor={lightMode ? "#e5e7eb" : "#4b5563"}
                    />
                  </li>
                  <li className="mr-10 flex py-2 justify-between hover:text-black cursor-pointer text-neutral-400 hover:underline">
                    <Skeleton
                      containerClassName="w-[40%]"
                      className="rounded-2xl"
                      baseColor={lightMode ? "#f3f4f6" : "#374151"}
                      highlightColor={lightMode ? "#e5e7eb" : "#4b5563"}
                    />
                    <Skeleton
                      containerClassName="w-[15%]"
                      className="rounded-2xl"
                      baseColor={lightMode ? "#f3f4f6" : "#374151"}
                      highlightColor={lightMode ? "#e5e7eb" : "#4b5563"}
                    />
                  </li>
                </ul>
              </div>
            </div>
          )}
          {!isSearching && items.length > 0 && (
            <div
              ref={resultsRef}
              className={`absolute left-0 top-20 w-full border-b ${
                lightMode ? "border-neutral-300" : "border-neutral-700"
              } z-20 flex items-center justify-center ${
                lightMode ? "bg-white" : "bg-black"
              }`}
            >
              <ul className="w-full max-w-2xl flex gap-2 flex-col my-6 max-h-100 overflow-auto">
                {items.map((item) => (
                  <li
                    onClick={() => {
                      closeSearch();
                      navigate(`/product/${item.id}`);
                    }}
                    className={`mr-10 py-2 flex justify-between cursor-pointer hover:underline ${
                      lightMode
                        ? "text-neutral-600 hover:text-black"
                        : "text-neutral-400 hover:text-white"
                    }`}
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
              className={`absolute left-0 top-20 w-full border-b ${
                lightMode ? "border-neutral-300" : "border-neutral-700"
              } z-20 flex items-center justify-center ${
                lightMode ? "bg-white" : "bg-black"
              }`}
            >
              <div
                className={`w-full max-w-2xl my-6 px-2 ${
                  lightMode ? "text-neutral-500" : "text-neutral-400"
                }`}
              >
                No results found for "{searchValue}".
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Navbar;
