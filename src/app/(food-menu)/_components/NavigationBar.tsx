"use client";

import { catchCategories, catchFoods } from "@/utils/axios";
import AddCategoriesContainer from "./addCategories/AddCategoriesContainer";
import { useQuery } from "@tanstack/react-query";

type Categories = {
  category: string;
  _id: string;
};

type Food = {
  name: string;
  category: string;
};

const NavigationBar = () => {
  const { data: foods = [] } = useQuery<Food[]>({
    queryKey: ["foods"],
    queryFn: catchFoods,
  });

  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery<Categories[]>({
    queryKey: ["categories"],
    queryFn: catchCategories,
  });

  if (isLoading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>Error loading categories: {error.message}</p>;
  }

  return (
    <div className="w-full h-auto ">
      <div className="w-full h-[50px] text-black"> profile picture here</div>
      <div className="py-8 px-5 flex flex-col gap-4 bg-white rounded-lg">
        <h1 className="text-[24px] font-semibold text-black">
          Dish categories
        </h1>
        <div className="flex-wrap gap-[10px] flex">
          {categories.map((category, i) => {
            const filteredFoods = foods.filter(
              (food) => food.category === category._id
            );
            return (
              <button
                key={i}
                className="bg-white py-2 px-3 rounded-full text-black flex gap-3 border"
              >
                {category.category}
                <div className="bg-black text-white rounded-full px-3">
                  {filteredFoods.length}
                </div>
              </button>
            );
          })}
          <AddCategoriesContainer />
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
