import axios from "axios";

export const getUserOrders = async (userId: string | undefined) => {
  try {
    const response = axios.get(
      `https://food-delivery-service-b295.onrender.com/order/${userId}`
    );
    return response;
  } catch (error) {
    console.log("error in getting user food order ", error);
    throw error;
  }
};
