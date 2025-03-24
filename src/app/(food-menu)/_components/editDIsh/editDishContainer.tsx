import CrossIcon from "../../_ui/crossIcon"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"

import EditIcon from "../../_ui/editIcon"
import EditDishContent from "./editDishContent"
type Foods = {
    category: string
    image: string
    foodName: string
    price: number
    ingredients: string[]
    _id: string
}

type PropsType = {
    onEditClick:() => void
    selectedFood: Foods | null;
    categoryName:string
}

const EditDishContainer = ({ onEditClick,selectedFood, categoryName}:PropsType) => {
   
    return (
        <Dialog>
            <DialogTrigger>
                <div className="w-11 h-11 bg-white flex items-center justify-center absolute top-32 right-4 rounded-full"
                    onClick={onEditClick}><EditIcon /></div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <div>
                            <h1>Dishes info</h1>
                            <DialogClose ></DialogClose>
                        </div>
                    </DialogTitle>
                        <EditDishContent selectedFood={selectedFood}
                        categoryName={categoryName}/>
                </DialogHeader>

            </DialogContent>
        </Dialog>
    )
}

export default EditDishContainer