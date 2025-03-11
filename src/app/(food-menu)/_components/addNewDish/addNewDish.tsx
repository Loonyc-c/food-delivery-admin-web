import CrossIcon from "../../ui/crossIcon"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"

import AddNewDishContent from "./addNewDishContent"


type CategoryNameProps = {
    categoryName: string
}

const AddNewDish = ({ categoryName }: CategoryNameProps) => {

    return (

        <Dialog>
            <DialogTrigger>
                <div className="mt-[20px] p-4 w-[340px] h-[302px] rounded-lg flex flex-col justify-center items-center border-2 border-dashed border-[#EF4444]">

                    <div className="w-9 h-9 rounded-full bg-[#EF4444] flex justify-center items-center"><CrossIcon /></div>
                    <p className="text-black mt-4">Add new Dish to {categoryName}</p>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add new Dish to {categoryName}</DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                </DialogHeader>
                <AddNewDishContent />

                <DialogFooter className="sm:justify-start">
                    <div className="flex justify-end">
                        <DialogClose asChild>
                            <button className="bg-black text-white rounded-lg py-2 px-4 text-[14px]">
                                Add Dish
                            </button>
                        </DialogClose>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default AddNewDish