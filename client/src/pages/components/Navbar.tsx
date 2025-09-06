import axios from "axios";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { UserContext } from "../../../context/userContext";

import { RiArrowDownSLine } from "react-icons/ri";
import { RiComputerLine } from "react-icons/ri";
import { RiArrowDownSFill } from "react-icons/ri";

import { FaHome } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { FaTshirt } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { FaBars } from "react-icons/fa";

import { TbHorseToy } from "react-icons/tb";
import { LuBrush } from "react-icons/lu";

import { FaBook } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";

import { MdOutlineSportsBasketball } from "react-icons/md";
import { MdOutlinePets } from "react-icons/md";

import { IoFastFoodOutline } from "react-icons/io5";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

import logo from "../../assets/logo.png";

interface Product {
  id: number;
  name: string;
  price: string;
}

const Navbar = ({ color: _color }: { color: string }) => {
  const [dropDown, setDropDown] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState<Product[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const searchBarRef = useRef<HTMLDivElement | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const { lightMode, setLightMode, cart } = useContext(UserContext);

  // Badge animation state
  const [cartBump, setCartBump] = useState(false);
  const prevCartCountRef = useRef(0);
  const cartCount = Array.from(cart.values()).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  useEffect(() => {
    const prev = prevCartCountRef.current;
    if (cartCount > prev) {
      setCartBump(true);
      const t = setTimeout(() => setCartBump(false), 200);
      prevCartCountRef.current = cartCount;
      return () => clearTimeout(t);
    }
    prevCartCountRef.current = cartCount;
  }, [cartCount]);

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
    setSelectedIndex(-1);
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
    setMobileCategoriesOpen(false);
  }

  function navigateToProduct(productId: number) {
    closeSearch();
    navigate(`/product/${productId}`);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!items.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < items.length - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          navigateToProduct(items[selectedIndex].id);
        }
        break;
      case "Escape":
        closeSearch();
        break;
    }
  }

  // Reset selected index when items change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [items]);

  // Close mobile menu with Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeMobileMenu();
      }
    }
    if (mobileMenuOpen) {
      window.addEventListener("keydown", onKey);
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

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
        className={`fixed inset-0 ${
          lightMode ? "bg-black/10" : "bg-black/20"
        }  transition-opacity duration-300 ${
          dropDown || searchBar || mobileMenuOpen
            ? "opacity-100 z-10"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          // clicking backdrop closes any open overlays
          if (mobileMenuOpen) closeMobileMenu();
          if (dropDown) setDropDown(false);
          if (searchBar) closeSearch();
        }}
      ></div>
      <div
        className="w-full px-5 top-0 absolute z-20"
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
          <div
            onClick={() => navigate("/")}
            className="flex-1 flex items-center cursor-pointer"
          >
            <img
              src={logo}
              alt="logo"
              className={`w-8 ${lightMode ? "" : "invert"}`}
            />
            <p className="headings uppercase text-2xl">Cartify</p>
          </div>
          <div className="hidden md:flex gap-5 flex-1 justify-around">
            <Link to={"/"} className="py-4 font-semibold">
              Home
            </Link>
            <Link to={"/products/All"} className="py-4 font-semibold">
              Shop
            </Link>
            <div
              onMouseLeave={() => setDropDown(false)}
              onMouseEnter={() => setDropDown(true)}
              className=" relative py-4 text-nowrap flex items-center font-semibold"
            >
              Categories
              <RiArrowDownSFill className="w-6 h-6" />
              <div
                className={`font-normal ${
                  dropDown ? (lightMode ? "open" : "open2") : ""
                } dropdown overflow-hidden translate-x-[-50%] left-1/2 w-[120vw] top-[100%] ${
                  lightMode ? "text-black bg-white" : " text-white bg-black"
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
            <Link to={"/contact"} className="py-4 text-nowrap font-semibold">
              Contact Us
            </Link>
          </div>
          <div className="flex justify-end gap-4 flex-1">
            <button
              aria-label="theme switch"
              className="cursor-pointer"
              onClick={() => setLightMode(!lightMode)}
            >
              {lightMode ? (
                <FaMoon className="w-7 h-7" />
              ) : (
                <FaSun className="w-7 h-7" />
              )}
            </button>
            <button
              aria-label="search bar"
              className="cursor-pointer"
              onClick={() => setSearchBar((prev) => !prev)}
            >
              <FaMagnifyingGlass className="w-7 h-7" />
            </button>
            <Link to={"/profile"} className="hidden md:block">
              <IoPersonSharp className="w-7 h-7" />
            </Link>
            <Link to={"/cart"} className="relative flex items-center">
              <FaShoppingCart className="w-7 h-7" />
              {cartCount > 0 && (
                <span
                  className={`absolute -top-1 -right-2 min-w-[18px] h-[18px] px-1 rounded-full text-[11px] leading-[18px] text-white bg-rose-600 text-center transform transition-transform duration-200 ${
                    cartBump ? "scale-110" : "scale-100"
                  }`}
                  aria-label={`Cart items: ${cartCount}`}
                >
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              aria-label="Open menu"
              className="md:hidden cursor-pointer"
              onClick={() => setMobileMenuOpen(true)}
            >
              <FaBars className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 h-full w-3/4 max-w-sm z-30 transform transition-transform duration-300 ${
          lightMode ? "bg-white text-black" : "bg-black text-white"
        } ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        role="dialog"
        aria-label="menu"
        aria-modal="true"
      >
        <div className="flex items-center justify-between h-16 px-5 border-b border-neutral-700/20">
          <div className="flex items-center ">
            <img
              src={logo}
              alt="logo"
              className={`w-8 ${lightMode ? "" : "invert"}`}
            />
            <span className="headings text-2xl">Cartify</span>
          </div>
          <button
            aria-label="Close menu"
            className="p-2"
            onClick={closeMobileMenu}
          >
            <IoMdClose className="w-6 h-6" />
          </button>
        </div>
        <nav className="px-5 py-4">
          <Link onClick={closeMobileMenu} to="/" className="block py-3">
            Home
          </Link>
          <Link
            onClick={closeMobileMenu}
            to="/products/All"
            className="block py-3"
          >
            Shop
          </Link>
          <button
            className="w-full flex items-center justify-between py-3"
            onClick={() => setMobileCategoriesOpen((v) => !v)}
            aria-expanded={mobileCategoriesOpen}
          >
            <span>Categories</span>
            <RiArrowDownSLine
              className={`w-5 h-5 transition-transform ${
                mobileCategoriesOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {mobileCategoriesOpen && (
            <div className="pl-4 pb-2 flex flex-col gap-2 text-neutral-400">
              <Link
                onClick={closeMobileMenu}
                to="/products/Electronics"
                className="flex items-center gap-2"
              >
                <RiComputerLine /> Electronics
              </Link>
              <Link
                onClick={closeMobileMenu}
                to="/products/HomeGoods"
                className="flex items-center gap-2"
              >
                <FaHome /> Home Goods
              </Link>
              <Link
                onClick={closeMobileMenu}
                to="/products/Toys"
                className="flex items-center gap-2"
              >
                <TbHorseToy /> Toys
              </Link>
              <Link
                onClick={closeMobileMenu}
                to="/products/Beauty"
                className="flex items-center gap-2"
              >
                <LuBrush /> Beauty
              </Link>
              <Link
                onClick={closeMobileMenu}
                to="/products/Automotive"
                className="flex items-center gap-2"
              >
                <FaCar /> Automotive
              </Link>
              <Link
                onClick={closeMobileMenu}
                to="/products/Apparel"
                className="flex items-center gap-2"
              >
                <FaTshirt /> Apparel
              </Link>
              <Link
                onClick={closeMobileMenu}
                to="/products/Books"
                className="flex items-center gap-2"
              >
                <FaBook /> Books
              </Link>
              <Link
                onClick={closeMobileMenu}
                to="/products/Sports"
                className="flex items-center gap-2"
              >
                <MdOutlineSportsBasketball /> Sports
              </Link>
              <Link
                onClick={closeMobileMenu}
                to="/products/Food"
                className="flex items-center gap-2"
              >
                <IoFastFoodOutline /> Food
              </Link>
              <Link
                onClick={closeMobileMenu}
                to="/products/Pets"
                className="flex items-center gap-2"
              >
                <MdOutlinePets /> Pets
              </Link>
            </div>
          )}
          <Link onClick={closeMobileMenu} to="/contact" className="block py-3">
            Contact Us
          </Link>
          <Link onClick={closeMobileMenu} to="/profile" className="block py-3">
            Profile
          </Link>
        </nav>
      </div>
      {searchBar && (
        <>
          <div
            ref={searchBarRef}
            className={`px-5 absolute left-0 top-0 w-full border-b ${
              lightMode ? "border-neutral-300" : "border-neutral-700"
            }  z-20 flex items-center justify-center h-20 ${
              lightMode ? "bg-white" : "bg-black"
            }`}
          >
            <div className="max-w-2xl w-full flex">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search products..."
                className={`w-full p-3 border border-neutral-300 rounded-lg outline-none ${
                  lightMode
                    ? "text-black bg-white"
                    : "text-white bg-neutral-800 border-neutral-600"
                }`}
                autoFocus
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
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
              <div className="px-4 w-full max-w-2xl flex gap-2 flex-col my-6 max-h-100 overflow-auto">
                <ul className="w-full max-w-2xl flex gap-2 flex-col max-h-100 overflow-auto">
                  <li className="mr-10 flex py-2 justify-between hover:text-black cursor-pointer text-neutral-400 hover:underline">
                    <Skeleton
                      containerClassName="w-[50%]"
                      className="rounded-xl"
                      baseColor={lightMode ? "#f3f4f6" : "#374151"}
                      highlightColor={lightMode ? "#e5e7eb" : "#4b5563"}
                    />
                    <Skeleton
                      containerClassName="w-[9%]"
                      className="rounded-xl"
                      baseColor={lightMode ? "#f3f4f6" : "#374151"}
                      highlightColor={lightMode ? "#e5e7eb" : "#4b5563"}
                    />
                  </li>
                  <li className="mr-10 flex py-2 justify-between hover:text-black cursor-pointer text-neutral-400 hover:underline">
                    <Skeleton
                      containerClassName="w-[30%]"
                      className="rounded-xl"
                      baseColor={lightMode ? "#f3f4f6" : "#374151"}
                      highlightColor={lightMode ? "#e5e7eb" : "#4b5563"}
                    />
                    <Skeleton
                      containerClassName="w-[10%]"
                      className="rounded-xl"
                      baseColor={lightMode ? "#f3f4f6" : "#374151"}
                      highlightColor={lightMode ? "#e5e7eb" : "#4b5563"}
                    />
                  </li>
                  <li className="mr-10 flex py-2 justify-between hover:text-black cursor-pointer text-neutral-400 hover:underline">
                    <Skeleton
                      containerClassName="w-[40%]"
                      className="rounded-xl"
                      baseColor={lightMode ? "#f3f4f6" : "#374151"}
                      highlightColor={lightMode ? "#e5e7eb" : "#4b5563"}
                    />
                    <Skeleton
                      containerClassName="w-[15%]"
                      className="rounded-xl"
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
                {items.map((item, index) => (
                  <li
                    onClick={() => navigateToProduct(item.id)}
                    className={`mr-10 py-2 px-4 flex justify-between cursor-pointer hover:underline ${
                      index === selectedIndex
                        ? lightMode
                          ? "bg-neutral-100 text-black  rounded-lg"
                          : "bg-neutral-800 text-white  rounded-lg"
                        : lightMode
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
