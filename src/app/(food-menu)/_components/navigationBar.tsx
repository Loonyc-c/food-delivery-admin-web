'use client'

import { catchCategories, catchFoods } from "@/utils/axios";
import { useEffect, useState } from "react"
import CrossIcon from "../_ui/crossIcon";
 

type Categories = {
    category: string
}

const NavigationBar = () => {

    const [categories, setCategories] = useState<Categories[]>([])
    const [foods, setFoods] = useState([])

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
                {categories.map((category, i) => (
                    <button key={i} className="bg-white py-2 px-3 rounded-full text-black flex gap-3 border"> {category.category} <div className="bg-black text-white rounded-full px-3">{foods.length}</div> </button>
                ))}
                <div className="w-9 h-9 rounded-full bg-[#EF4444] flex justify-center items-center"><CrossIcon /></div>
                </div>

            </div>
        </div>
    )
}

export default NavigationBar