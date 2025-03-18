'use client'

import { useState } from "react"
import {
    DialogClose,
    DialogFooter
} from "@/components/ui/dialog"

import FoodNameEdit from "./foodName"
import FoodIngredientsEdit from "./foodIngredients"
import FoodPriceEdit from "./foodPrice"
import FoodCategoryEdit from "./foodCategory"
type FoodValue = {
    foodName: string
    foodPrice: number
    imageUrl: string
    ingerdients: string
}

const EditDishContent = () => {

    const [foodValue, setFoodValue] = useState<FoodValue>({
        foodName: "",
        foodPrice: 0,
        imageUrl: "",
        ingerdients: ""
    });
    const handleFoodNameValue = (value: string) => {
        setFoodValue({ ...foodValue, foodName: value })
    }

    const handleFoodPriceValue = (value: number) => {
        setFoodValue({ ...foodValue, foodPrice: value })
    }
    const handleFoodIngredientsValue = (value: string) => {
        setFoodValue({ ...foodValue, ingerdients: value })
    }

    return(
        <div >
            <div className="flex flex-col gap-3">
                <FoodNameEdit foodNameValue={handleFoodNameValue} />
                <FoodPriceEdit foodPrice={handleFoodPriceValue} />
                <FoodIngredientsEdit foodIngredients={handleFoodIngredientsValue}/>
                <FoodCategoryEdit />
            </div>
            <DialogFooter className="mt-5">
                <div className="flex justify-end">
                    <DialogClose asChild>
                        <button className="bg-black text-white rounded-lg py-2 px-4 text-[14px]">
                            Add Dish
                        </button>
                    </DialogClose>
                </div>
            </DialogFooter>
        </div>
    )
}

export default EditDishContent