'use client'

import { useState } from "react"
import {
    DialogClose,
    DialogFooter
} from "@/components/ui/dialog"

import FoodName from "./foodName"

type foodValue = {
    image:File | null
}

const AddNewDishContent = () => {

    const [foodValue, setFoodValue] = useState({})


    const priceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFoodValue({ ...foodValue, price: e.target.value })
    }

    const ingredientsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFoodValue({ ...foodValue, ingredients: e.target.value })
    }

    const imageChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
        setFoodValue({ ...foodValue, image: e.target.files[0] })
    }

    const removeImage = () => {
        setFoodValue({ ...foodValue, image: null })

    }

    console.log(foodValue)



    return (
        <div >
            <div className="flex flex-col gap-3">
                <div className="flex gap-5">
                    <FoodName />

                    <div className="w-[50%] h-auto">
                        <p>Price</p>
                        <input
                            className="border rounded-lg p-2 text-[14px] w-full h-auto"
                            placeholder="Type food price"
                            onChange={priceChange}
                        />
                    </div>
                </div>

                <div className="">
                    <p>Ingredients</p>
                    <input
                        className="border rounded-lg w-full h-[100px] p-2 text-[14px] "
                        placeholder="List ingredients"
                        onChange={ingredientsChange}
                    />
                </div>

                <div className="flex flex-col gap-[5px] w-full h-auto cursor-pointer ">
                    <label htmlFor="foodImage">
                        Food image
                    </label>
                    <input
                        id="foodImage"
                        accept="image/*"
                        type="file"
                        className="w-full h-[240px] opacity-0 absolute z-10 "
                        onChange={imageChange}
                    />
                    <div className="w-full h-[240px] rounded-lg flex bg-[#2563EB0D] justify-center items-center border-2 border-[#2563EB33] border-dashed">
                        <p>Choose a file or drag & drop it here</p>
                        {foodValue?.image && (
                                <div className=" absolute w-full z-20 h-[240px] object-cover rounded-lg">
                                    <img
                                        className="w-full h-full object-cover rounded-lg"
                                        src={URL.createObjectURL(foodValue.image)}
                                        alt="Preview"
                                    />
                                    <button onClick={removeImage} className="absolute ">X</button>
                                </div>
                            )}
                    </div>
                </div>
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