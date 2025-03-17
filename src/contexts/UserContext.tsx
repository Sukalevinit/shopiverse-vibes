
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserProfile } from "@/types";

interface UserContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  likedProducts: number[];
  toggleLikeProduct: (productId: number) => void;
  isProductLiked: (productId: number) => boolean;
  login: (userData: UserProfile) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user data from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedLikedProducts = localStorage.getItem("likedProducts");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    
    if (storedLikedProducts) {
      setLikedProducts(JSON.parse(storedLikedProducts));
    }
  }, []);

  // Save liked products to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
  }, [likedProducts]);

  const toggleLikeProduct = (productId: number) => {
    setLikedProducts(prevLikedProducts => {
      if (prevLikedProducts.includes(productId)) {
        return prevLikedProducts.filter(id => id !== productId);
      } else {
        return [...prevLikedProducts, productId];
      }
    });
  };

  const isProductLiked = (productId: number) => {
    return likedProducts.includes(productId);
  };

  const login = (userData: UserProfile) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        likedProducts,
        toggleLikeProduct,
        isProductLiked,
        login,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
