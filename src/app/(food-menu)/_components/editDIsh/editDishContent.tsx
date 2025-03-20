"use client";

import { useFormik } from "formik";
import * as Yup from "yup"; // For validation
import {
    DialogClose,
    DialogFooter
} from "@/components/ui/dialog";

import FoodIngredientsEdit from "./foodIngredients";
import FoodCategoryEdit from "./foodCategory";
import InputField from "./inputField";

type FoodEditProps = {
    foodNameValue: (foodName: string) => void;
    foodPriceValue: (foodPrice: number) => void;
};

const EditDishContent = ({ foodNameValue, foodPriceValue }: FoodEditProps) => {

    const formik = useFormik({
        initialValues: {
            foodName: "",
            price: 0,
            ingredients: "",
        },
        validationSchema: Yup.object({
            foodName: Yup.string().required("Food name is required"),
            price: Yup.number().min(0, "Price must be a positive number").required("Price is required"),
        }),
        onSubmit: (values) => {
            foodNameValue(values.foodName);
            foodPriceValue(values.price);
            console.log("Submitted values:", values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-3">
                <InputField
                    label="Food Name"
                    placeholder="Type food name"
                    type="text"
                    value={formik.values.foodName}
                    onChange={formik.handleChange}
                />
                {formik.touched.foodName && formik.errors.foodName && (
                    <p className="text-red-500 text-sm">{formik.errors.foodName}</p>
                )}

                <FoodCategoryEdit />

                <FoodIngredientsEdit
                    foodIngredients={(value) => formik.setFieldValue("ingredients", value)}
                />

                <InputField
                    label="Price"
                    placeholder="Type food price"
                    type="number"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                />
                {formik.touched.price && formik.errors.price && (
                    <p className="text-red-500 text-sm">{formik.errors.price}</p>
                )}
            </div>

            <DialogFooter className="mt-5">
                <div className="flex justify-end">
                    <DialogClose asChild>
                        <button
                            type="submit"
                            className="bg-black text-white rounded-lg py-2 px-4 text-[14px]"
                        >
                            Add Dish
                        </button>
                    </DialogClose>
                </div>
            </DialogFooter>
        </form>
    );
};

export default EditDishContent;
