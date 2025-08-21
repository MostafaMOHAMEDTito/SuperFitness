/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// Context type
interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

// Create the context with an initial undefined value
export const tokenContext = createContext<AuthContextType | undefined>(
  undefined
);

// Auth Context Provider component
export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const val = localStorage.getItem("token");
    if (val) {
      setToken(val);
    }
  }, []);

  return (
    <tokenContext.Provider value={{ token, setToken }}>
      {children}
    </tokenContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(tokenContext);
  if (!context) return null;
  return context;
}