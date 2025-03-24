'use client'

import { useState } from "react"

type FoodNameProps = {
    value: (foodName: string) => void;
}

const FoodName = ({value}:FoodNameProps) => {

    const [foodName, setFoodName] = useState("")

    const foodNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFoodName(e.target.value)
        value(e.target.value)
    }

    return (
        <div className="w-[50%] h-auto">
            <p>Food name</p>
            <input
                className="border rounded-lg p-2 text-[14px] w-full h-auto"
                placeholder="Type food name"
                onChange={foodNameChange}
            />
        </div>
    )
}

export default FoodName