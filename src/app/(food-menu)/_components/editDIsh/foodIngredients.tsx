'use client'

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"

type FoodIngredientsProps = {
    foodIngredients: (foodIngredients: string) => void;
}

const FoodIngredientsEdit = ({foodIngredients}:FoodIngredientsProps) => {

    const [ingredients, setIngredients] = useState("")

    const ingredientsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setIngredients(e.target.value)
        foodIngredients(e.target.value)
    }

    return (

        <div className="">
            <p>Ingredients</p>

            <Textarea
             className="w-full h-[100px]"
             placeholder="List ingredients"
             onChange={ingredientsChange} 
             value={ingredients}/>
        </div>
    )
}

export default FoodIngredientsEdit