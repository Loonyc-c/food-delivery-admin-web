'use client'

import { useState } from "react"
import {
    DialogClose,
    DialogFooter
} from "@/components/ui/dialog"

import FoodName from "./foodName"
import FoodPrice from "./foodPrice"
import FoodIngredients from "./foodIngredients"
import FoodImage from "./foodImage"
import axios from "axios"

const AddNewDishContent = () => {

    const [foodValue, setFoodValue] = useState({})

    const handleFoodNameValue = (value: string) => {
        setFoodValue({ ...foodValue, foodName: value })
    }

    const handleFoodPriceValue = (value: number) => {
        setFoodValue({ ...foodValue, foodPrice: value })
    }
    const handleFoodIngredientsValue = (value: string) => {
        setFoodValue({ ...foodValue, ingerdients: value })
    }
    const handleImageUrl = (value: string) => {
        setFoodValue({ ...foodValue, ImageUrl: value })
    }

    const handleAddDishButton = async () =>{ 
        try {
            const response = await axios.post("http://localhost:9999/food", {
                foodName: foodValue.foodName,
                price: foodValue.foodPrice,
                image:foodValue.ImageUrl,
                ingredients:foodValue.ingerdients,
            });
            console.log("CreatedFood successfully sent to DB:", response.data);
        } catch (error) {
            console.error(`Error posting password to DB:`, error);
        }
    }

    return (
        <div >
            <div className="flex flex-col gap-3">
                <div className="flex gap-5">
                    <FoodName value={handleFoodNameValue} />
                    <FoodPrice foodPrice={handleFoodPriceValue} />
                </div>
                <FoodIngredients foodIngredients={handleFoodIngredientsValue} />
                <FoodImage foodImageUrl={handleImageUrl} />
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

export default AddNewDishContent