'use client'

import { useState } from "react"

type FoodNameProps = {
    foodNameValue: (foodName: string) => void;
}

const FoodNameEdit = ({foodNameValue}:FoodNameProps) => {

    const [foodName, setFoodName] = useState("")

    const foodNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFoodName(e.target.value)
        foodNameValue(e.target.value)
    }

    return (
        <div className="w-full h-auto">
            <p>Food name</p>
            <input
                className="border rounded-lg p-2 text-[14px] w-full h-auto"
                placeholder="Type food name"
                onChange={foodNameChange}
            />
        </div>
    )
}

export default FoodNameEdit