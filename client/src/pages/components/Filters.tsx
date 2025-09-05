import { NavLink } from "react-router-dom";
import {
  useCallback,
  useContext,
  useEffect,
  useRef,
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

interface FilterProps {
  leftSlider: number;
  rightSlider: number;
  setLeftSlider: (value: number) => void;
  setRightSlider: (value: number) => void;
  fetchProducts: (leftSlider: number, rightSlider: number) => void;
  discount: boolean;
  setDiscount: Dispatch<SetStateAction<boolean>>;
}

const Filters = ({
  leftSlider,
  rightSlider,
  setLeftSlider,
  setRightSlider,
  fetchProducts,
  setDiscount,
  discount,
}: FilterProps) => {
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
    fetchProducts(leftSlider, rightSlider);
  }
  const clgFunc = useDebounce(clg, 1000);

  return (
    <div className="flex flex-col gap-6 w-80">
      <div
        className={`transition-all flex flex-col gap-4 border ${
          lightMode ? "border-neutral-300" : "border-neutral-700"
        } p-6 rounded-2xl`}
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
          lightMode ? "border-neutral-300" : "border-neutral-700"
        } p-6 rounded-2xl`}
      >
        <h2 className="text-2xl">Price</h2>
        <div
          className={`relative w-full h-1 my-6 ${
            lightMode ? "bg-neutral-300" : "bg-neutral-600"
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
            className="thumb absolute w-full bg-none top-[-300%] appearance-none"
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
            className="thumb  absolute w-full bg-none top-[-300%] appearance-none"
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
          lightMode ? "border-neutral-300" : "border-neutral-700"
        } p-6 rounded-2xl flex flex-col gap-4`}
      >
        <h2 className="text-2xl">Discount</h2>
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            name="discount"
            id="discount"
            className={`w-5 h-5 rounded-full appearance-none border cursor-pointer ${
              lightMode
                ? "bg-white border-neutral-300 checked:bg-black"
                : "bg-black border-neutral-600 checked:bg-white"
            } focus:outline-none  `}
            onChange={(e) => setDiscount(e.target.checked)}
            checked={discount}
          />
          <label
            htmlFor="discount"
            className={`${lightMode ? "text-neutral-800" : "text-neutral-200"}`}
          >
            Promotions
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filters;
