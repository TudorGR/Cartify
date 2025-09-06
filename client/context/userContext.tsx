import axios from "axios";
import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
  type SetStateAction,
  type Dispatch,
} from "react";

interface User {
  name: string;
  email: string;
  phone?: number;
  street?: string;
  city?: string;
  country?: string;
  zip?: number;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number | null;
  image?: string;
  quantity: number;
}

interface FavouriteItem {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number | null;
  image?: string;
}

interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  lightMode: boolean;
  setLightMode: Dispatch<SetStateAction<boolean>>;
  cart: Map<string, CartItem>;
  setCart: Dispatch<SetStateAction<Map<string, CartItem>>>;
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  favourites: Map<string, FavouriteItem>;
  setFavourites: Dispatch<SetStateAction<Map<string, FavouriteItem>>>;
  addToFavourites: (product: FavouriteItem) => void;
  removeFromFavourites: (productId: string) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  lightMode: true,
  setLightMode: () => {},
  cart: new Map(),
  setCart: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  favourites: new Map(),
  setFavourites: () => {},
  addToFavourites: () => {},
  removeFromFavourites: () => {},
});

interface UserContextProviderProps {
  children: ReactNode;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [lightMode, setLightMode] = useState(() => {
    const saved = localStorage.getItem("lightMode");
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [cart, setCart] = useState<Map<string, CartItem>>(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const cartArray = JSON.parse(savedCart);
        return new Map(cartArray);
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
      }
    }
    return new Map();
  });
  const [favourites, setFavourites] = useState<Map<string, FavouriteItem>>(
    new Map()
  );

  useEffect(() => {
    const cartArray = Array.from(cart.entries());
    localStorage.setItem("cart", JSON.stringify(cartArray));
  }, [cart]);

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const newCart = new Map(prev);
      const existingItem = newCart.get(product.id);

      if (existingItem) {
        newCart.set(product.id, {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        });
      } else {
        newCart.set(product.id, {
          ...product,
          quantity: 1,
        });
      }

      return newCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const newCart = new Map(prev);
      newCart.delete(productId);
      return newCart;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prev) => {
      const newCart = new Map(prev);
      const existingItem = newCart.get(productId);

      if (existingItem && quantity > 0) {
        newCart.set(productId, {
          ...existingItem,
          quantity,
        });
      } else if (existingItem && quantity <= 0) {
        newCart.delete(productId);
      }

      return newCart;
    });
  };

  const addToFavourites = (product: FavouriteItem) => {
    setFavourites((prev) => {
      const newFavourites = new Map(prev);
      newFavourites.set(product.id, product);
      return newFavourites;
    });
  };

  const removeFromFavourites = (productId: string) => {
    setFavourites((prev) => {
      const newFavourites = new Map(prev);
      newFavourites.delete(productId);
      return newFavourites;
    });
  };
  useEffect(() => {
    if (!user) {
      axios
        .get("http://localhost:3000/profile", { withCredentials: true })
        .then(({ data }) => {
          setUser(data);
        });
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("lightMode", JSON.stringify(lightMode));
  }, [lightMode]);

  useEffect(() => {
    if (lightMode) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  }, [lightMode]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        lightMode,
        setLightMode,
        cart,
        setCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        favourites,
        setFavourites,
        addToFavourites,
        removeFromFavourites,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
