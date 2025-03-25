"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { catchCategories } from "@/utils/axios";

type Categories = {
  category: string;
  _id: string;
};

type Props = {
  categoryName: string;
  onCategoryChange: (categoryId: string) => void;
};

const FoodCategoryEdit = ({ categoryName, onCategoryChange }: Props) => {
  const [categories, setCategories] = useState<Categories[]>([]);

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

  const handleCategoryChange = (categoryId: string) => {
    console.log("selected category id:", categoryId);
    onCategoryChange(categoryId);
  };

  return (
    <div className="flex justify-between">
      <div className="">
        <p>Dish category</p>
      </div>
      <div className="w-[70%] h-auto">
        <Select onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder={categoryName} />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat._id} value={cat._id}>
                {cat.category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FoodCategoryEdit;
