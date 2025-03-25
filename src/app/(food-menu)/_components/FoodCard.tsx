"use client";

import { useQuery } from "@tanstack/react-query";
import { catchFoods } from "@/utils/axios";
import AddNewDish from "./addNewDish/AddNewDish";
import FoodItem from "./FoodItem";
type Foods = {
  category: string;
  image: string;
  foodName: string;
  price: number;
  ingredients: string[];
  _id: string;
};

type FoodCardProps = {
  categoryId: string;
  categoryName: string;
};

const FoodCard = ({ categoryId, categoryName }: FoodCardProps) => {
  const {
    data: foods = [],
    isLoading,
    error,
  } = useQuery<Foods[]>({
    queryKey: ["foods"],
    queryFn: catchFoods,
  });
  const filteredFoods = foods.filter((food) => food.category === categoryId);

  if (isLoading) {
    return <p>Loading foods...</p>;
  }
  if (error) {
    return <p>Error loading foods</p>;
  }

  return (
    <div className="flex flex-wrap gap-5">
      <AddNewDish categoryName={categoryName} categoryId={categoryId} />
      {filteredFoods.length > 0 ? (
        filteredFoods.map((item) => (
          <FoodItem key={item._id} item={item} categoryName={categoryName} />
        ))
      ) : (
        <p className="text-gray-500">No foods available for this category.</p>
      )}
    </div>
  );
};

export default FoodCard;
