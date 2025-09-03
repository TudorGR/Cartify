import { NavLink } from "react-router-dom";
import { useCallback, useEffect, useRef } from "react";

interface FilterProps {
  leftSlider: number;
  rightSlider: number;
  setLeftSlider: (value: number) => void;
  setRightSlider: (value: number) => void;
  fetchProducts: (leftSlider: number, rightSlider: number) => void;
}

const Filters = ({
  leftSlider,
  rightSlider,
  setLeftSlider,
  setRightSlider,
  fetchProducts,
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

  function clg() {
    fetchProducts(leftSlider, rightSlider);
  }
  const clgFunc = useDebounce(clg, 1000);

  return (
    <div className="flex flex-col gap-6 w-80">
      <div className="flex flex-col gap-4 border border-neutral-300 p-6 rounded-2xl">
        <h2 className="text-2xl">Categories</h2>
        <ul className="flex flex-col gap-3">
          <NavLink
            className={({ isActive }) => `${isActive ? "underline" : ""}`}
            to={"/products/All"}
          >
            All
          </NavLink>
          <NavLink
            className={({ isActive }) => `${isActive ? "underline" : ""}`}
            to={"/products/Electronics"}
          >
            Electronics
          </NavLink>
          <NavLink
            className={({ isActive }) => `${isActive ? "underline" : ""}`}
            to={"/products/HomeGoods"}
          >
            Home Goods
          </NavLink>
          <NavLink
            className={({ isActive }) => `${isActive ? "underline" : ""}`}
            to={"/products/Toys"}
          >
            Toys
          </NavLink>
          <NavLink
            className={({ isActive }) => `${isActive ? "underline" : ""}`}
            to={"/products/Beauty"}
          >
            Beauty
          </NavLink>
          <NavLink
            className={({ isActive }) => `${isActive ? "underline" : ""}`}
            to={"/products/Automotive"}
          >
            Automotive
          </NavLink>
          <NavLink
            className={({ isActive }) => `${isActive ? "underline" : ""}`}
            to={"/products/Apparel"}
          >
            Apparel
          </NavLink>
          <NavLink
            className={({ isActive }) => `${isActive ? "underline" : ""}`}
            to={"/products/Books"}
          >
            Books
          </NavLink>
          <NavLink
            className={({ isActive }) => `${isActive ? "underline" : ""}`}
            to={"/products/Sports"}
          >
            Sports
          </NavLink>
          <NavLink
            className={({ isActive }) => `${isActive ? "underline" : ""}`}
            to={"/products/Food"}
          >
            Food
          </NavLink>
          <NavLink
            className={({ isActive }) => `${isActive ? "underline" : ""}`}
            to={"/products/Pets"}
          >
            Pets
          </NavLink>
        </ul>
      </div>
      <div className="border border-neutral-300 p-6 rounded-2xl">
        <h2 className="text-2xl">Price</h2>
        <div className="relative w-full h-1 my-6 bg-neutral-300">
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
    </div>
  );
};

export default Filters;
