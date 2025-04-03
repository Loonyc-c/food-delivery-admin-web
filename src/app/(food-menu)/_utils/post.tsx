import axios from "axios";

type FoodData = {
  foodName: string;
  price: number;
  image: string | null;
  ingredients: string[];
  category: string;
};

export const updateFood = async (id: string, updatedData: FoodData) => {
  try {
    const response = await axios.put(
      `https://food-delivery-service-b295.onrender.com/food/${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.log("Error updating food:", error);
  }
};
