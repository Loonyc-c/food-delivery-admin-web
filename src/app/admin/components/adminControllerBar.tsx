import FoodMenuIcon from "./icons/foodMenuIcon";
import NomNomIcon from "./icons/NomNomLogo";
import OrderIcon from "./icons/orderIcon";
import SettingsIcon from "./icons/settingsIcon";

const AdminControllerBar = ({
  step,
  setStep,
}: {
  step: string;
  setStep: (value: string) => void;
}) => {
  const handleOnClicOnFoodMenu = () => {
    setStep("menu");
  };

  const handleOnClickOnOrders = () => {
    setStep("orders");
  };

  const handleOnClickOnSettings = () => {
    setStep("settings");
  };

  return (
    <div className="w-[15%] h-screen py-8 px-5 bg-white">
      <NomNomIcon />
      <div className=" flex flex-col gap-4 mt-8 font-semibold">
        <button
          className={`flex py-2 px-3 w-full justify-center items-center gap-2 rounded-full ${
            step === "menu" ? "bg-black text-white" : "bg-white text-black"
          }`}
          onClick={handleOnClicOnFoodMenu}
        >
          {" "}
          <FoodMenuIcon color={step === "menu" ? "white" : "black"} /> Food menu{" "}
        </button>
        <button
          className={`flex py-2 px-3 w-full justify-center items-center gap-2 rounded-full ${
            step === "orders" ? "bg-black text-white" : "bg-white text-black"
          }`}
          onClick={handleOnClickOnOrders}
        >
          {" "}
          <OrderIcon
            color={step === "orders" ? "white" : "black"}
          /> Orders{" "}
        </button>
        <button
          className={`flex py-2 px-3 w-full justify-center items-center gap-2 rounded-full ${
            step === "settings" ? "bg-black text-white" : "bg-white text-black"
          }`}
          onClick={handleOnClickOnSettings}
        >
          {" "}
          <SettingsIcon color={step === "settings" ? "white" : "black"} />{" "}
          Settings{" "}
        </button>
      </div>
    </div>
  );
};

export default AdminControllerBar;
