import FoodMenuIcon from "./icons/foodMenuIcon"
import NomNomIcon from "./icons/NomNomLogo"

const AdminControllerBar = () => {
  return(
    <div>
        <NomNomIcon />
        <div>
            <button className="flex"> <FoodMenuIcon/> Food <menu></menu> </button>
        </div>
    </div>
  )
}

export default AdminControllerBar