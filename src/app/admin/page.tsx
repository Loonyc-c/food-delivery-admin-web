'use client'

import FoodMenu from "../(food-menu)/_features/menu";
import Orders from "../(orders)/_features/orders";
import Settings from "../(settings)/_features/menu";
import AdminControllerBar from "./components/adminControllerBar";
import { useState } from "react";

const AdminHome = () => {

  const [step, setStep] = useState("menu")

  return (
    <div className="w-screen h-screen flex">
      <AdminControllerBar setStep={setStep} />
      {step === "menu" && <FoodMenu />}
      {step === "orders" && <Orders />}
      {step === "settings" && <Settings />}
    </div>
  );
}

export default AdminHome