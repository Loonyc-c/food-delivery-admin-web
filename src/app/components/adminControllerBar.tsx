import FoodMenuIcon from "./icons/foodMenuIcon"
import NomNomIcon from "./icons/NomNomLogo"
import OrderIcon from "./icons/orderIcon"
import SettingsIcon from "./icons/settingsIcon"

const AdminControllerBar = () => {
  return(
    <div className="w-[15%] bg-green-500 h-full py-8 px-5">
        <NomNomIcon />
        <div className=" flex flex-col gap-4 mt-4">
            <button className="flex bg-black py-2 px-3 w-full justify-center items-center gap-2 rounded-full"> <FoodMenuIcon/> Food menu </button>
            <button className="flex py-2 px-3 w-full justify-center items-center gap-2 rounded-full text-black"> <OrderIcon/> Orders </button>
            <button className="flex py-2 px-3 w-full justify-center items-center gap-2 rounded-full text-black"> <SettingsIcon/> Settings </button>
        </div>
    </div>
  )
}

export default AdminControllerBar