"use client";

import React, { useEffect } from "react";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { DialogFooter } from "@/components/ui/dialog";
import FoodIngredientsEdit from "./FoodIngredients";
import FoodCategoryEdit from "./FoodCategory";
import InputField from "../InputField";
import FoodImageEdit from "./FoodImage";
import { DialogClose } from "@radix-ui/react-dialog";
import { updateFood } from "../../_utils/post";
import { editDishValidationSchema } from "../../_utils/validationSchemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Foods = {
  category: string;
  image: string | null;
  foodName: string;
  price: number;
  ingredients: string[];
  _id: string;
};

type FoodEditProps = {
  selectedFood: Foods | null;
  categoryName: string;
};

const EditDishContent = ({ selectedFood, categoryName }: FoodEditProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (values: {
      foodName: string;
      price: number;
      ingredients: string[];
      category: string;
      image: string | null;
    }) => {
      console.log("mutation values", values);
      if (selectedFood?._id) {
        const result = await updateFood(selectedFood._id, values);
        return result;
      }
    },
    onSuccess: async () => {
      try {
        await queryClient.invalidateQueries({ queryKey: ["foods"] });
        toast.success("Successfully updated dish !", {
          position: "top-right",
          autoClose: 5000,
        });
      } catch (error) {
        console.error("Error in onSuccess:", error);
      }
    },
    onError: (error) => {
      toast.error(`Failed to update dish: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
      });
    },
  });

  return (
    <Formik
      initialValues={{
        foodName: selectedFood ? selectedFood.foodName : "",
        price: selectedFood ? selectedFood.price : 0,
        ingredients: selectedFood ? selectedFood.ingredients.join(", ") : "",
        category: selectedFood ? selectedFood.category : "",
        image: selectedFood?.image ?? "",
      }}
      validationSchema={editDishValidationSchema}
      onSubmit={async (values) => {
        const cloudinaryResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/ddeq6vbyn/image/upload",
          values.image
        );
        const imageUrl = cloudinaryResponse.data.secure_url;

        const updatedValues = {
          foodName: values.foodName,
          price: values.price,
          ingredients: values.ingredients.split(",").map((i) => i.trim()),
          category: values.category,
          image: imageUrl,
        };

        mutation.mutate(updatedValues);
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
              onCategoryChange={(categoryId) =>
                setFieldValue("category", categoryId)
              }
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
              image={values.image}
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
};

export default EditDishContent;
