"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useJwt } from "react-jwt";

type DecodedToken = {
  role: string;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const { decodedToken, isExpired } = useJwt<DecodedToken>(token || "");

  useEffect(() => {
    const checkTokenAndRoute = () => {
      if (!token || isExpired) {
        router.push("/");
      }

      if (pathname === "/" && decodedToken?.role === "ADMIN") {
        router.push("/admin");
      }
    };

    checkTokenAndRoute();
  }, [token, isExpired, decodedToken]);

  return <>{children}</>;
};

export default AuthProvider;
