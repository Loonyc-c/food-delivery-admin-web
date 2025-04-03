"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { emailValidation } from "@/utils/validations";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useUser } from "@/provider/UserProvider";

type LoginInputType = {
  email: string;
  password: string;
};

type LoginErrorType = {
  email?: string;
  password?: string;
  role?: string;
};

export default function Home() {
  const [loginValue, setLoginValue] = useState<LoginInputType>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<LoginErrorType>({});
  const router = useRouter();
  const { role } = useUser();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleValidation = async () => {
    const emailError = emailValidation(loginValue.email);
    if (!loginValue.password) {
      setError({ email: emailError, password: "Password is required" });
      return;
    }

    if (emailError) {
      setError({ ...error, email: emailError });
      return;
    }
    if (role === "USER") {
      setError({ ...error, role: "User don't have permission" });
      return;
    }
    try {
      const response = await axios.post(
        "https://food-delivery-service-b295.onrender.com/auth/sign-in",
        loginValue
      );

      localStorage.setItem("token", response.data.token);

      router.push("/admin");
      toast.success("Successfully logged in !", {
        position: "top-right",
        autoClose: 5000,
      });
    } catch (error: any) {
      console.error("Error during login:", error);
      if (error.response) {
        setError({ ...error, password: "Email or password is incorrect!" });
      } else {
        setError({
          ...error,
          password: "Something went wrong. Try again later!",
        });
      }
    }
  };

  return (
    <div className="w-screen h-screen flex px-[2%] py-[1%] gap-[3%] bg-white">
      <div className="w-[35%] h-full flex items-center pl-[5%]">
        <div className="w-full h-[50%] flex flex-col gap-[30px]">
          <div>
            <h1 className="font-semibold leading-8 text-2xl text-black">
              Log in
            </h1>
            <p className="text-[#71717A]">
              Log in to enjoy your favorite dishes.
            </p>
          </div>
          <div>
            <div>
              <input
                name="email"
                placeholder="Enter your email address"
                className="border rounded-lg p-1.5 w-full text-black placeholder-gray-400"
                value={loginValue.email}
                onChange={handleInputChange}
              />
              {error.email && (
                <p className="text-red-500 text-sm">{error.email}</p>
              )}
              {error.role && (
                <p className="text-red-500 text-sm">{error.role}</p>
              )}
            </div>
            <div className="mt-[15px]">
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="border rounded-lg p-1.5 w-full text-black placeholder-gray-400"
                value={loginValue.password}
                onChange={handleInputChange}
              />
              {error.password && (
                <p className="text-red-500 text-sm">{error.password}</p>
              )}
            </div>
          </div>

          <button
            className={`w-full h-9 rounded-lg `}
            onClick={handleValidation}
          >
            Log in
          </button>
        </div>
      </div>
      <div className="w-[65%] h-full">
        <img
          src="https://s3-alpha-sig.figma.com/img/5d86/e6a2/488bb31d983ecd581caec983f3a32842?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Qz7nvSjFvqpR42W0AUZB5Mak~05GiBcB78wCI~iVERuBLp-7tkyQkkpyyz-xzTXb7WM3~mek~nfFcXZwCu6yBI735p3AHmaYADVCFFEH1AYL7akWZxnYI~yUljNvmPD0QeJ2g7N0XHf75wuhal1Sf5ifG6QMvbLecxLkoFGN9IZr1HdLyJnwL-JpCC0gcrZqbyZkQLWz1aKD5c2PxAqljuxh3CrQq84QMTKe~M7hMjGh5cxce7xg1k0lF2Vu~Navb1wOSNOE4HRdyV~pdOksyBOBOgoTv1V0TcoTVhYPcdzxhW4yPzXQXehne8kAE~Cq8Oo2mwmZ15RJplW-roUVog__"
          className="rounded-3xl h-full"
        />
      </div>
    </div>
  );
}
