import { catchCategories, catchFoods } from "@/utils/axios"
import axios from "axios"
import { useEffect, useState } from "react"
import FoodCard from "./foodCard"


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
                categories.map((item, id) => (
                    <div key={id} className="mt-4 rounded-lg bg-white py-8 px-5" >
                        <div className="text-[20px] text-black font-semibold">{item.category} {item.category}</div>
                        <FoodCard category={item._id}/>
                    </div>
                ))
            }


        </div>
    )

}

export default FoodContainer