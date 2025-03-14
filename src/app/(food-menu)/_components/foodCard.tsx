"use client"

import { catchFoods } from "@/utils/axios"
import { useEffect, useState } from "react"
import AddNewDish from "./addNewDish/addNewDish"

type Foods = {
    category: string
    image: string
    foodName: string
    price: number
    ingredients: string[]
}

type FoodCardProps = {
    category: string
    categoryName:string
}


const FoodCard = ({ category,categoryName }: FoodCardProps) => {

    const [foods, setFoods] = useState<Foods[]>([])

    useEffect(() => {
        const getFoods = async () => {
            try {
                const response = await catchFoods();
                setFoods(response)
            } catch (error) {
                console.error("Error getting categories:", error);
            }
        };


        getFoods()
    }, []);


    const filteredFoods = foods.filter(food => food.category === category);

    const categoryId = filteredFoods.length > 0 ? filteredFoods[0].categoryId : null;


    console.log(filteredFoods)


    return (
        <div className="flex flex-wrap  gap-5 ">
            <AddNewDish categoryName={categoryName}/>
            {filteredFoods.length > 0 ? (
                filteredFoods.map((item, i) => (
                    <div key={i} className="bg-white border mt-[20px] w-[340px] h-auto p-4 rounded-lg ">
                        <img
                            src={`xdata:image/png;base64,${item.image}`}
                            className="w-full h-48 object-cover"
                        />
                        <div className="w-full h-auto">
                            <div className="flex justify-between">
                                <h3 className="text-lg font-semibold text-[24px] text-[#EF4444]">{item.foodName}</h3>
                                <p className="font-semibold text-black"> {item.price}</p>
                            </div>
                            <div className="flex">
                                <p className="text-black">
                                    {item?.ingredients.join(', ') + '.'}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No foods available for this category.</p>
            )}
        </div>
    )

}

export default FoodCard