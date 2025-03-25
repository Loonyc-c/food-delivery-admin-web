
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import CrossIcon from "../../_ui/crossIcon"
import { useState } from "react"
import axios from "axios"


const AddCategoriesContainer = () => {

    const [category, setCategory] = useState("")

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value)
    }

    const handleAddCategoryButton = async () => {
        try {
            const response = await axios.post("http://localhost:9999/categories", {
                category
            })
            return response.data
        } catch (error) {
            console.log("Error adding category:", error);
        }
    }

    return (

        <Dialog>
            <DialogTrigger asChild>
                <div className="w-9 h-9 rounded-full bg-[#EF4444] flex justify-center items-center">
                    <CrossIcon />
                </div>

            </DialogTrigger>
            <DialogContent >
                <DialogHeader className="flex justify-center">
                    <DialogTitle>Add new category</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>

                <div>
                    <h1 className="font-semibold mb-2">Category name</h1>
                    <input
                        placeholder="Type category name"
                        className="w-full border rounded-lg p-2 text-[14px]"
                        onChange={onChange} />
                </div>

                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <button
                            className="bg-black text-white rounded-lg py-2 px-4 text-[14px]"
                            onClick={handleAddCategoryButton}
                        >
                            Add category
                        </button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddCategoriesContainer
