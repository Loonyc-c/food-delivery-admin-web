// "use client"

import { catchFoods } from "@/utils/axios" 
import { useEffect, useState } from "react"

type Foods = {
    category: string
    image:string
    foodName:string
    price:number
    ingredients:string[]
}

type FoodCardProps = {
    category:string
}


const FoodCard = ({ category }: FoodCardProps) => {

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


    console.log(foods)

    const filteredFoods = foods.filter(food => food.category === category);


    return(
        <div className="flex flex-wrap gap-5 ">
        {filteredFoods.length > 0 ? (
            filteredFoods.map((item, i) => (
                <div key={i} className="bg-white border mt-[20px] p-4 w-[400px] h-auto rounded-lg ">
                    <img
                        src={`xdata:image/png;base64,${item.image}`}
                        alt={item.foodName}
                        className="w-full h-48 object-cover"
                    />
                    <div>
                        <div className="flex justify-between">
                            <h3 className="text-lg font-semibold text-[24px] text-[#EF4444]">{item.foodName}</h3>
                            <p className="font-semibold text-black"> ${item.price}</p>
                        </div>
                        <div className="flex">
                        {
                            item?.ingredients.map((ingredient, i) => (
                                <p key={i} className="text-black">{ingredient},  </p>
                            ))
                        }
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