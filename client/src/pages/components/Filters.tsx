import { NavLink } from "react-router-dom";
import {
  useCallback,
  useContext,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { UserContext } from "../../../context/userContext";

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
import { FiFilter, FiChevronDown } from "react-icons/fi";
import { CiCircleChevUp } from "react-icons/ci";
import { CiCircleChevDown } from "react-icons/ci";
import { CiNoWaitingSign } from "react-icons/ci";

interface FilterProps {
  leftSlider: number;
  rightSlider: number;
  setLeftSlider: (value: number) => void;
  setRightSlider: (value: number) => void;
  fetchProducts: (
    leftSlider: number,
    rightSlider: number,
    order: string
  ) => void;
  discount: boolean;
  setDiscount: Dispatch<SetStateAction<boolean>>;
  order: string;
  setOrder: Dispatch<SetStateAction<string>>;
}

const Filters = ({
  leftSlider,
  rightSlider,
  setLeftSlider,
  setRightSlider,
  fetchProducts,
  setDiscount,
  discount,
  order,
  setOrder,
}: FilterProps) => {
  // Mobile expand/collapse state
  const [isOpen, setIsOpen] = useState(false);
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
  const { lightMode } = useContext(UserContext);

  function clg() {
    fetchProducts(leftSlider, rightSlider, order);
  }
  const clgFunc = useDebounce(clg, 1000);

  const activeFilterCount =
    (leftSlider > 0 || rightSlider < 500 ? 1 : 0) + (discount ? 1 : 0);

  return (
    <div className="flex flex-col gap-4 md:gap-6 w-full md:w-70 md:shrink-0">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="filters-panel"
        onClick={() => setIsOpen((v) => !v)}
        className={`md:hidden flex items-center justify-between w-full px-4 py-3 rounded-xl border transition-all ${
          lightMode
            ? "bg-neutral-50 border-neutral-200 text-neutral-900"
            : "bg-neutral-900 border-neutral-800 text-neutral-100"
        }`}
      >
        <span className="flex items-center gap-2">
          <FiFilter />
          Filters
          {activeFilterCount > 0 && (
            <span
              className={`ml-2 inline-flex items-center justify-center text-xs px-2 py-0.5 rounded-full ${
                lightMode
                  ? "bg-neutral-200 text-neutral-800"
                  : "bg-neutral-700 text-neutral-100"
              }`}
            >
              {activeFilterCount}
            </span>
          )}
        </span>
        <FiChevronDown
          className={`transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        id="filters-panel"
        className={`${isOpen ? "block" : "hidden"} md:flex flex flex-col gap-4`}
      >
        <div
          className={`transition-all flex flex-col gap-4 border ${
            lightMode
              ? "bg-neutral-50 border-neutral-200"
              : " bg-neutral-900 border-neutral-800"
          } p-6 rounded-xl`}
        >
          <h2 className="text-2xl">Categories</h2>
          <ul className="flex flex-col gap-3">
            <NavLink
              className={({ isActive }) =>
                `${isActive ? "underline ml-6" : "ml-6"}`
              }
              to={"/products/All"}
            >
              All Categories
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive ? "underline" : ""}`
              }
              to={"/products/Electronics"}
            >
              <RiComputerLine />
              Electronics
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive ? "underline" : ""}`
              }
              to={"/products/HomeGoods"}
            >
              <FaHome />
              Home Goods
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive ? "underline" : ""}`
              }
              to={"/products/Toys"}
            >
              <TbHorseToy />
              Toys
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive ? "underline" : ""}`
              }
              to={"/products/Beauty"}
            >
              <LuBrush />
              Beauty
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive ? "underline" : ""}`
              }
              to={"/products/Automotive"}
            >
              <FaCar />
              Automotive
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive ? "underline" : ""}`
              }
              to={"/products/Apparel"}
            >
              <FaTshirt />
              Apparel
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive ? "underline" : ""}`
              }
              to={"/products/Books"}
            >
              <FaBook />
              Books
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive ? "underline" : ""}`
              }
              to={"/products/Sports"}
            >
              <MdOutlineSportsBasketball />
              Sports
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive ? "underline" : ""}`
              }
              to={"/products/Food"}
            >
              <IoFastFoodOutline />
              Food
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive ? "underline" : ""}`
              }
              to={"/products/Pets"}
            >
              <MdOutlinePets />
              Pets
            </NavLink>
          </ul>
        </div>
        <div
          className={`transition-all border ${
            lightMode
              ? "bg-neutral-50 border-neutral-200"
              : " bg-neutral-900 border-neutral-800"
          } p-6 rounded-xl`}
        >
          <h2 className="text-2xl">Price</h2>
          <div
            className={`relative w-full h-1 my-6 ${
              lightMode ? "bg-neutral-200" : "bg-neutral-600"
            }`}
          >
            <span className="h-full absolute bg-red-500"></span>
            <input
              type="range"
              name="min_val"
              min={0}
              max={500}
              value={leftSlider}
              step={10}
              onChange={(e) => {
                clgFunc();
                const newValue = Number(e.target.value);
                if (newValue <= rightSlider - 50) {
                  setLeftSlider(newValue);
                }
              }}
              className="thumb absolute w-full bg-none top-[-200%] appearance-none"
            />
            <input
              type="range"
              name="max_val"
              min={0}
              max={500}
              value={rightSlider}
              step={10}
              onChange={(e) => {
                clgFunc();
                const newValue = Number(e.target.value);
                if (newValue >= leftSlider + 50) {
                  setRightSlider(newValue);
                }
              }}
              className="thumb  absolute w-full bg-none top-[-200%] appearance-none"
            />
            <div></div>
            <div></div>
          </div>
          <div className="flex justify-between">
            <p>{leftSlider}</p>
            <p>{rightSlider}</p>
          </div>
        </div>
        <div
          className={`transition-all border ${
            lightMode
              ? "bg-neutral-50 border-neutral-200"
              : " bg-neutral-900 border-neutral-800"
          } p-6 rounded-xl flex flex-col gap-4`}
        >
          <h2 className="text-2xl">Discount</h2>
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              name="discount"
              id="discount"
              className={`w-5 h-5 rounded-full appearance-none border cursor-pointer ${
                lightMode
                  ? "bg-white border-neutral-200 checked:bg-black"
                  : "bg-black border-neutral-600 checked:bg-white"
              } focus:outline-none  `}
              onChange={(e) => setDiscount(e.target.checked)}
              checked={discount}
            />
            <label
              htmlFor="discount"
              className={`${
                lightMode ? "text-neutral-800" : "text-neutral-200"
              }`}
            >
              Promotions
            </label>
          </div>
        </div>
        <div
          className={`transition-all border ${
            lightMode
              ? "bg-neutral-50 border-neutral-200"
              : " bg-neutral-900 border-neutral-800"
          } p-6 rounded-xl flex flex-col gap-4`}
        >
          <h2 className="text-2xl">Order</h2>
          <div className="flex flex-col gap-4 items-start">
            <p
              onClick={() => setOrder("none")}
              className={`flex gap-2 items-center cursor-pointer ${
                order == "none" ? "text-black" : "text-neutral-400"
              }`}
            >
              <CiNoWaitingSign className="w-6 h-6" />
              None
            </p>
            <p
              onClick={() => setOrder("high")}
              className={`flex gap-2 items-center cursor-pointer ${
                order == "high" ? "text-black" : "text-neutral-400"
              }`}
            >
              <CiCircleChevUp className="w-6 h-6" />
              High
            </p>
            <p
              onClick={() => setOrder("low")}
              className={`flex gap-2 items-center cursor-pointer ${
                order == "low" ? "text-black" : "text-neutral-400"
              }`}
            >
              <CiCircleChevDown className="w-6 h-6" />
              Low
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
