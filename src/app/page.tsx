'use client'

import { useEffect } from "react";
import axios from "axios";
import AdminControllerBar from "./components/adminControllerBar";

export default function Home() {

  // useEffect(()=>{
  //   const getData = async () => {
  //     const response =  await axios.get("http://localhost:9999/service")
  //     console.log(response.data)
  //   }
  //   getData()
  // },[])


  return (
    <div className="bg-white w-screen h-screen">
      <AdminControllerBar/>

    </div>
  );
}
