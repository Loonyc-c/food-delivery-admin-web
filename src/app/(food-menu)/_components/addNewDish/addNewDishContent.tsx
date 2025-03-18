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
import * as yup from "yup"


type FoodValue = {
    foodName: string
    foodPrice: number
    imageUrl: string
    ingerdients: string
}

type PropsType = {
    categoryId:string
}


const foodValidationSchema = yup
const AddNewDishContent = ({categoryId}:PropsType) => {

    const [foodValue, setFoodValue] = useState<FoodValue>({
        foodName: "",
        foodPrice: 0,
        imageUrl: "",
        ingerdients: ""
    });

    const [image, setImage] = useState<FormData>()

    const handleFoodNameValue = (value: string) => {
        setFoodValue({ ...foodValue, foodName: value })
    }

    const handleFoodPriceValue = (value: number) => {
        setFoodValue({ ...foodValue, foodPrice: value })
    }
    const handleFoodIngredientsValue = (value: string) => {
        setFoodValue({ ...foodValue, ingerdients: value })
    }

    const handleAddDishButton = async () => {
        try {
            const cloudinaryResponse = await axios.post(
                'https://api.cloudinary.com/v1_1/ddeq6vbyn/image/upload', 
                image, 
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            
            const imageUrl = cloudinaryResponse.data.secure_url;
            console.log(imageUrl)
            
            const foodResponse = await axios.post("http://localhost:9999/food", {
                foodName: foodValue.foodName,
                price: foodValue.foodPrice,
                image: imageUrl,
                ingredients: foodValue.ingerdients,
                category:categoryId

            });
            
            console.log("Food added successfully:", foodResponse.data);
        } catch (error) {
            console.error(`Error adding food:`, error);
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
                <FoodImage setImage={setImage} />
            </div>
            <DialogFooter className="mt-5">
                <div className="flex justify-end">
                    <DialogClose asChild>
                        <button className="bg-black text-white rounded-lg py-2 px-4 text-[14px]"
                        onClick={handleAddDishButton}>
                            Add Dish
                        </button>
                    </DialogClose>
                </div>
            </DialogFooter>
        </div>
    )

}
export default AddNewDishContent