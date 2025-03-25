"use client";

import React from "react";
import { Formik } from "formik";
import {
    DialogFooter
} from "@/components/ui/dialog";

import FoodIngredientsEdit from "./FoodIngredients";
import FoodCategoryEdit from "./FoodCategory";
import InputField from "../InputField";
import FoodImageEdit from "./FoodImage";
import { DialogClose } from "@radix-ui/react-dialog";
import { updateFood } from "../../_utils/updateFood";
import { foodValidationSchema } from "../../_utils/validationSchemas";

type Foods = {
    category: string;
    image: string | null | FormData
    foodName: string;
    price: number;
    ingredients: string[];
    _id: string;
};

type FoodEditProps = {
    selectedFood: Foods | null;
    categoryName: string;
};

const EditDishContent = ({ selectedFood, categoryName }: FoodEditProps) => (
    <Formik
        initialValues={{
            foodName: selectedFood ? selectedFood.foodName : "",
            price: selectedFood ? selectedFood.price : 0,
            ingredients: selectedFood ? selectedFood.ingredients.join(", ") : "",
            category: selectedFood ? selectedFood.category : "",
            image: selectedFood ? selectedFood.image : null,
        }}
        validationSchema={foodValidationSchema}
        onSubmit={async (values) => {
            try {
                const updatedValues = {
                    foodName: values.foodName,
                    price: values.price,
                    ingredients: values.ingredients.split(',').map(i => i.trim()),
                    category: values.category,
                    image: values.image,
                };

                const updatedFood = await updateFood(selectedFood?._id, updatedValues);
                console.log("Food updated successfully", updatedFood);
            } catch (error) {
                console.log("Update failed:", error);
            }
        }}
    >
        {({
            values,
            errors,
            touched,
            handleSubmit,
            isSubmitting,
            setFieldValue,
        }) => (
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3">

                    <InputField
                        label="Food Name"
                        type="text"
                        value={values.foodName}
                        onChange={(value) => setFieldValue("foodName", value)}
                    />
                    {errors.foodName && touched.foodName && (
                        <p className="text-red-500 text-sm">{errors.foodName}</p>
                    )}

                    <FoodCategoryEdit
                        categoryName={categoryName}
                        onCategoryChange={(categoryId) => setFieldValue("category", categoryId)}
                    />

                    <FoodIngredientsEdit
                        onChange={(value) => setFieldValue("ingredients", value)}
                        value={values.ingredients}
                    />

                    <InputField
                        label="Price"
                        type="number"
                        value={values.price}
                        onChange={(value) => setFieldValue("price", value)}
                    />
                    {errors.price && touched.price && (
                        <p className="text-red-500 text-sm">{errors.price}</p>
                    )}

                    <FoodImageEdit
                        image={selectedFood?.image || ""}
                        setImage={(formData) => setFieldValue("image", formData)}
                    />
                </div>

                <DialogFooter className="mt-5">
                    <DialogClose asChild>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-black text-white rounded-lg py-2 px-4 text-[14px]"
                            >
                                Save Changes
                            </button>
                        </div>
                    </DialogClose>
                </DialogFooter>
            </form>
        )}
    </Formik>
);

export default EditDishContent;
