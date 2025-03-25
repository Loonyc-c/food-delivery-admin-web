'use client'

import { catchCategories, catchFoods } from "@/utils/axios";
import { useEffect, useState } from "react"
import AddCategoriesContainer from "./addCategories/AddCategoriesContainer";


type Categories = {
    category: string
    _id: string
}

type Food = {
    name: string
    category: string
}

const NavigationBar = () => {

    const [categories, setCategories] = useState<Categories[]>([])
    const [foods, setFoods] = useState<Food[]>([])

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

    useEffect(() => {
        const getFoods = async () => {
            try {
                const response = await catchFoods()
                setFoods(response)
            }
            catch (error) {
                console.log("error while getting foods", error)
            }
        }
        getFoods()
    }, [])

    return (
        <div className="w-full h-auto ">
            <div className="w-full h-[50px] text-black"> profile picture here</div>
            <div className="py-8 px-5 flex flex-col gap-4 bg-white rounded-lg">
                <h1 className="text-[24px] font-semibold text-black">Dish categories</h1>
                <div className="flex-wrap gap-[10px] flex">
                    {categories.map((category, i) => {
                        const filteredFoods = foods.filter(food => food.category === category._id);
                        return (
                            <button key={i} className="bg-white py-2 px-3 rounded-full text-black flex gap-3 border">
                                {category.category}
                                <div className="bg-black text-white rounded-full px-3">{filteredFoods.length}</div>
                            </button>
                        )
                    })}
                    <AddCategoriesContainer />
                </div>

            </div>
        </div>
    )
}

export default NavigationBar