"use client";

import EditDishContainer from "./editDIsh/EditDishContainer";
import React from "react";
import { useState } from "react";

type Foods = {
  category: string;
  image: string;
  foodName: string;
  price: number;
  ingredients: string[];
  _id: string;
};

const FoodItem = ({
  item,
  categoryName,
}: {
  item: Foods;
  categoryName: string;
}) => {
  const [selectedFood, setSelectedFood] = useState<Foods | null>(null);

  const handleEditDishClick = () => {
    setSelectedFood(item);
  };
  return (
    <div className="bg-white border mt-[20px] w-[340px] h-auto p-4 rounded-lg">
      <div className="relative">
        <img
          src={item.image}
          className="w-full h-48 object-cover rounded-lg"
          alt={item.foodName}
        />
        <EditDishContainer
          onEditClick={handleEditDishClick}
          selectedFood={selectedFood}
          categoryName={categoryName}
        />
      </div>
      <div className="w-full h-auto">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold text-[24px] text-[#EF4444]">
            {item.foodName}
          </h3>
          <p className="font-semibold text-black">$ {item.price}</p>
        </div>
        <div className="flex">
          <p className="text-black">{item?.ingredients.join(", ") + "."}</p>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
