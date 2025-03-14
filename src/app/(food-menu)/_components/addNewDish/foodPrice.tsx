'use client'


import { useState } from "react"
type FoodPriceProps = {
    foodPrice: (foodPrice: number) => void;
}

const FoodPrice = ({foodPrice}:FoodPriceProps) => {

    const [price,setPrice] = useState(0)

    const priceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setPrice(value)
        foodPrice(value)
    }


    return (

        <div className="w-[50%] h-auto">
            <p>Price</p>
            <input
                className="border rounded-lg p-2 text-[14px] w-full h-auto"
                placeholder="Type food price"
                onChange={priceChange}
            />
        </div>
    )
}

export default FoodPrice