'use client'

import { catchCategories, catchFoods } from "@/utils/axios"
import { useEffect, useState } from "react"
import FoodCard from "./foodCard"
import AddNewDish from "./addNewDish/addNewDish"


type Categories = {
    category: string
    _id: string
}



const FoodContainer = () => {

    const [categories, setCategories] = useState<Categories[]>([])
    
    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await catchCategories();
                setCategories(response);
            } catch (error) {
                console.error("Error getting categories:", error);
            }
        };
        getCategories();
    }, []);

    return (
        <div className="w-full h-auto mt-9 flex flex-col gap-4">
            {
                categories.map((item, i) => (
                    <div key={i} className="mt-4 rounded-lg bg-white py-8 px-5" >
                        <div className="text-[20px] text-black font-semibold">{item.category} </div>
                        <div className="flex gap-5 ">
                            <FoodCard categoryId={item._id} categoryName= {item.category}/>
                        </div>
                    </div>
                ))
            }

        </div>
    )

}

export default FoodContainer