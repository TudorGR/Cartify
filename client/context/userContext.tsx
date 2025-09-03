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

interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

interface UserContextProviderProps {
  children: ReactNode;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (!user) {
      axios
        .get("http://localhost:3000/profile", { withCredentials: true })
        .then(({ data }) => {
          setUser(data);
        });
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
