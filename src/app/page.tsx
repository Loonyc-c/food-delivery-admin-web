'use client'

import { useEffect } from "react";
import axios from "axios";

export default function Home() {

  useEffect(()=>{
    const getData = async () => {
      const response =  await axios.get("http://localhost:9999/service")
      console.log(response)
    }
    getData()
  },[])


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
"hello world ADMIN WEB"
    </div>
  );
}
