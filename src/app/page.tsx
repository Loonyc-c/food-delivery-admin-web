'use client'

import Link from "next/link"
import { ChangeEvent } from "react"
import { emailValidation } from "@/utils/validations"
import axios from "axios"
import { useState } from "react";

type Value = {
  email?:string,
  password?:string
}

type Error = {
  email?:string,
  password?:string
}
export default function Home() {
   
  const [loginValue,setLoginValue] = useState<Value>({})
    const [error,setError] = useState<Error>({})

    const getEmailValue = ((e: ChangeEvent<HTMLInputElement>) => {
        setLoginValue({...loginValue,email:e.target.value})
    })
    const getPasswordValue = ((e: ChangeEvent<HTMLInputElement>) => {
        setLoginValue({...loginValue,password:e.target.value})
    })

    const handleValidation = async () => {
        const emailValue = loginValue?.email
        const emailValidationError = emailValidation(emailValue as string)
        setError({...error,email:emailValidationError})

        try{
            const response = await axios.post("http://localhost:9999/auth/sign-in", {
                email: loginValue.email,
                password: loginValue.password
            });
            console.log("Log in data successfuly sent to db", response.data);
        }catch(error){
            console.error(`Error during login:`, error);
        }
    }

    return (
        <div className="w-screen h-screen flex px-[2%] py-[1%] gap-[3%] bg-white">
            <div className="w-[35%] h-full flex items-center pl-[5%]">
                <div className="w-full h-[50%] flex flex-col gap-[30px]">
                    <div>
                        <h1 className="font-semibold leading-8 text-2xl text-black">Log in</h1>
                        <p className="text-[#71717A]">Log in to enjoy your favorite dishes.</p>
                    </div>
                    <div>
                        <div>
                            <input
                                placeholder="Enter your email adress"
                                className="border rounded-lg p-1.5 w-full text-black" 
                                onChange={getEmailValue}/>
                            {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
                        </div>
                        <div className="mt-[15px]">
                            <input
                                placeholder="Password"
                                className="border rounded-lg p-1.5 w-full text-black"
                                onChange={getPasswordValue}
                            />
                        </div>
                    </div>


                    <button
                        className="w-full h-9 bg-[#71717A] rounded-lg"
                        onClick={handleValidation}
                    >

                        <p className="text-[14px] text-[#FAFAFA]">Let's go</p>

                    </button>
                    <div className="flex gap-[15px] justify-center">
                        <p className="text-[#71717A]">Don't have an account ?</p>
                        <Link href={"/auth/sign-up"}>
                            <button>
                                <p className="text-[#2563EB] hover:underline">Sign up</p>
                            </button>
                        </Link>

                    </div>

                </div>
            </div>
            <div className="w-[65%] h-full">
                <img src="https://s3-alpha-sig.figma.com/img/5d86/e6a2/488bb31d983ecd581caec983f3a32842?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Qz7nvSjFvqpR42W0AUZB5Mak~05GiBcB78wCI~iVERuBLp-7tkyQkkpyyz-xzTXb7WM3~mek~nfFcXZwCu6yBI735p3AHmaYADVCFFEH1AYL7akWZxnYI~yUljNvmPD0QeJ2g7N0XHf75wuhal1Sf5ifG6QMvbLecxLkoFGN9IZr1HdLyJnwL-JpCC0gcrZqbyZkQLWz1aKD5c2PxAqljuxh3CrQq84QMTKe~M7hMjGh5cxce7xg1k0lF2Vu~Navb1wOSNOE4HRdyV~pdOksyBOBOgoTv1V0TcoTVhYPcdzxhW4yPzXQXehne8kAE~Cq8Oo2mwmZ15RJplW-roUVog__"
                    className="rounded-3xl h-full"
                />
            </div>

        </div>
    )
}
