import { useState } from "react"
import FoodMenuIcon from "./icons/foodMenuIcon"
import NomNomIcon from "./icons/NomNomLogo"
import OrderIcon from "./icons/orderIcon"
import SettingsIcon from "./icons/settingsIcon"

const AdminControllerBar = ({setStep}:{setStep :(value: string)=> void}) => {

  const handleOnClicOnFoodMenu = () => {
    setStep("menu")
  }

  const handleOnClickOnOrders = () => {
    setStep("orders")
  }

  const handleOnClickOnSettings = () => {
    setStep("settings")
  }


  return(
    <div className="w-[15%] h-full py-8 px-5">
        <NomNomIcon />
        <div className=" flex flex-col gap-4 mt-8">
            <button className={`flex py-2 px-3 w-full justify-center items-center gap-2 rounded-full ${setStep} = "menu" ? " bg-black text-white" : "bg-white text-black"`} 
            onClick={handleOnClicOnFoodMenu}> <FoodMenuIcon/> Food menu </button>
            <button className="flex py-2 px-3 w-full justify-center items-center gap-2 rounded-full text-black"
            onClick={handleOnClickOnOrders}> <OrderIcon/> Orders </button>
            <button className="flex py-2 px-3 w-full justify-center items-center gap-2 rounded-full text-black"
            onClick={handleOnClickOnSettings}> <SettingsIcon/> Settings </button>
        </div>
    </div>
  )
}

export default AdminControllerBar