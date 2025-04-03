import axios from "axios";

export const catchCategories = async () => {
  try {
    const response = await axios.get(
      "https://food-delivery-service-b295.onrender.com/categories"
    );
    return response.data;
  } catch (error) {
    console.error("Error catching categories:", error);
  }
};

export const catchFoods = async () => {
  try {
    const response = await axios.get(
      "https://food-delivery-service-b295.onrender.com/food"
    );
    return response.data;
  } catch (error) {}
};
