import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const PAGE_ORDER = [
  "/",
  "/products",
  "/product",
  "/contact",
  "/profile",
  "/cart",
  "/checkout",
  "/terms",
  "/privacy",
  "/login",
  "/signup",
];

interface NavigationContextType {
  direction: "left" | "right";
  previousPath: string;
  currentPath: string;
  shouldAnimate: boolean;
}

const NavigationContext = createContext<NavigationContextType>({
  direction: "right",
  previousPath: "/",
  currentPath: "/",
  shouldAnimate: true,
});

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState("/");
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [shouldAnimate, setShouldAnimate] = useState(true);

  const getBasePath = (path: string): string => {
    if (path.startsWith("/products/")) return "/products";
    if (path.startsWith("/product/")) return "/product";
    return path;
  };

  const getPageIndex = (path: string): number => {
    const basePath = getBasePath(path);
    const index = PAGE_ORDER.indexOf(basePath);
    return index === -1 ? 0 : index;
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const currentBasePath = getBasePath(currentPath);
    const previousBasePath = getBasePath(previousPath);
    const currentIndex = getPageIndex(currentPath);
    const previousIndex = getPageIndex(previousPath);

    if (currentBasePath === previousBasePath && previousPath !== "/") {
      setShouldAnimate(false);
    } else {
      setShouldAnimate(true);

      if (currentIndex > previousIndex) {
        setDirection("left");
      } else if (currentIndex < previousIndex) {
        setDirection("right");
      } else {
        setDirection("right");
      }
    }

    setPreviousPath(currentPath);
  }, [location.pathname]);

  return (
    <NavigationContext.Provider
      value={{
        direction,
        previousPath,
        currentPath: location.pathname,
        shouldAnimate,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
