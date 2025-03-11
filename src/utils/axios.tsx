import axios from "axios";

export const catchCategories = async () => {
    try {
        const response = await axios.get("http://localhost:9999/categories");
        return(response.data);
    } catch (error) {
        console.error("Error catching categories:", error);
    }
};


export const catchFoods = async () => {
    try{
        const response = await axios.get("http://localhost:9999/food")
        return(response.data)
    }
    catch(error){

    }
}