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
    import { useEffect } from "react";

    type Foods = {
        category: string
        image: string
        foodName: string
        price: number
        ingredients: string[]
        _id: string
    }


    type FoodEditProps = {
        selectedFood:Foods | null
        categoryName:string

    };

    const EditDishContent = ({ selectedFood,categoryName, }: FoodEditProps) => {

        const formik = useFormik({
            initialValues: {
                foodName: selectedFood ? selectedFood.foodName : "",
                price: selectedFood ? selectedFood.price : 0,
                ingredients: selectedFood ? selectedFood.ingredients.join(", ") : "",
                category: ""
            },
            validationSchema: Yup.object({
                foodName: Yup.string().required("Food name is required"),
                price: Yup.number().min(0, "Price must be a positive number").required("Price is required"),
            }),
            onSubmit: (values) => {
                console.log("Submitted values:", values);
            },

        });

        return (
            <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-3">

                    <InputField
                        label="Food Name"
                        type="text"
                        value={formik.values.foodName}
                        onChange={(value) => formik.setFieldValue("foodName", value)}
                        />
                    {formik.touched.foodName && formik.errors.foodName && (
                        <p className="text-red-500 text-sm">{formik.errors.foodName}</p>
                    )}

                    <FoodCategoryEdit 
                    categoryName={categoryName}
                    onCategoryChange={(categoryId) => formik.setFieldValue("category", categoryId)}/>

                    <FoodIngredientsEdit
                        onChange={(value) =>{
                             formik.setFieldValue("ingredients", value)}}
                        value={formik.values.ingredients}
                    />

                    <InputField
                        label="Price"
                        type="number"
                        value={formik.values.price}
                        onChange={(value) => formik.setFieldValue("price", value)}
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
