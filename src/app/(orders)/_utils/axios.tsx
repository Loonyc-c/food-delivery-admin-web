import axios from "axios";

export const getUserOrders = async (userId: string | undefined) => {
  try {
    const response = axios.get(`http://localhost:9999/order/${userId}`);
    return response;
  } catch (error) {
    console.log("error in getting user food order ", error);
    throw error;
  }
};
