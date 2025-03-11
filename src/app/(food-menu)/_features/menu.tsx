import NavigationBar from "../_components/navigationBar"
import FoodContainer from "../_components/foodsContainer"


const FoodMenu = () => {
    return(
        <div className="w-screen h-screen p-7 bg-[#F5F5F5] ">
            <NavigationBar />
            <FoodContainer />
        </div>
    )
}

export default FoodMenu 