import * as Yup from "yup";

export const foodValidationSchema = Yup.object({
  foodName: Yup.string()
    .required("Food name is required")
    .max(100, "Food name cannot be longer than 100 characters"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be a positive number"),
  ingredients: Yup.string().required("Ingredients are required"),

  // category: Yup.string().required("Category is required"),
  // image: Yup.string().required("Image is required")
});
