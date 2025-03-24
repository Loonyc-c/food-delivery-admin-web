import axios from "axios";

export const updateFood = async (id, updatedData) => {
    try {
        const response = await axios.put(`http://localhost:9999/food/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.log("Error updating food:", error);
    }
};
