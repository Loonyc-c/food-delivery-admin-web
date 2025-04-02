"use client";

import { jwtDecode } from "jwt-decode";
import { useState, useEffect, createContext, useContext } from "react";

type DecodedToken = {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

type UserContextType = {
  email: string | undefined;
  role: string | undefined;
  userId: string | undefined;
};

const getDecodedToken = async (token: string | null) => {
  if (!token) return null;

  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [client, setClient] = useState<DecodedToken | null>();

  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    const user = await getDecodedToken(storedToken);
    setClient(user);
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        email: client?.email,
        role: client?.role,
        userId: client?.userId,
      }}
    >
      {loading ? <p>...Loading user context</p> : children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    console.log("hello");
  }
  return context;
};
