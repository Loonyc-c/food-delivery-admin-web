import * as Yup from "yup"


export const foodValidationSchema = Yup.object({
    foodName: Yup.string().required("Food name is required"),
    foodPrice: Yup.number().min(1, "Price must be greater than 0").required("Price is required"),
    ingredients: Yup.string().min(1, "Too low ")
})