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

type PropsType = {
    foodId: string;
    id: string
}

const EditDishContainer = ({ onEditClick }) => {

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
                        <EditDishContent />
                </DialogHeader>

            </DialogContent>
        </Dialog>
    )
}

export default EditDishContainer