'use client'

import { useEffect } from "react";
import jwt from "jsonwebtoken"; 
import { useRouter } from "next/navigation";

const AuthProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
    
        if (!token) {     
            router.push("/")       

        } else  {
            try {
                const tokenData = jwt.verify(token!, "123");
                if(tokenData.role === "ADMIN"){
                    router.push("/admin")
                }
            } catch (error) {
                console.error("Invalid token", error);
                router.push("/");
            }
        }
    }, [router]);

    return <>{children}</>;
};

export default AuthProvider;
