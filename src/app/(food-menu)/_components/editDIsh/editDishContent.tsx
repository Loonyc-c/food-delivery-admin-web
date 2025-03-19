'use client'

import { useState } from "react";
import {
    DialogClose,
    DialogFooter
} from "@/components/ui/dialog";

import FoodIngredientsEdit from "./foodIngredients";
import FoodCategoryEdit from "./foodCategory";
import InputField from "./inputField";

type FoodEditProps = {
    foodNameValue: (foodName: string) => void;
    foodPriceValue: (foodPrice: number) => void;
};

const EditDishContent = ({ foodNameValue, foodPriceValue }: FoodEditProps) => {

    const [foodName, setFoodName] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [ingredients, setIngredients] = useState<string>("");


    const handleFoodNameChange = (value: string | number) => {
        if (typeof value === "string") {
            setFoodName(value);
            foodNameValue(value);
        }
    };

    const handleFoodPriceChange = (value: string | number) => {
        if (typeof value === "number") {
            setPrice(value);
            foodPriceValue(value);
        }
    };


    const handleFoodIngredientsValue = (value: string) => {
        setIngredients(value);
    };

    return (
        <div>
            <div className="flex flex-col gap-3">
                <InputField
                    label="Food Name"
                    placeholder="Type food name"
                    type="text"
                    value={foodName}
                    onChange={handleFoodNameChange}
                />
                <FoodCategoryEdit />


                <FoodIngredientsEdit foodIngredients={handleFoodIngredientsValue} />
                <InputField
                    label="Price"
                    placeholder="Type food price"
                    type="number"
                    value={price}
                    onChange={handleFoodPriceChange}
                />

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
    );
};

export default EditDishContent;
