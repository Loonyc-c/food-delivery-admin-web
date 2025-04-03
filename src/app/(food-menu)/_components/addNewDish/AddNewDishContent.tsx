"use client";

import { DialogClose, DialogFooter } from "@/components/ui/dialog";

import FoodIngredients from "./FoodIngredients";
import FoodImage from "./FoodImage";
import axios from "axios";
import { Formik, Form } from "formik";
import { foodValidationSchema } from "../../_utils/validationSchemas";
import InputField from "../InputField";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type PropsType = {
  categoryId: string;
};

const AddNewDishContent = ({ categoryId }: PropsType) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values: {
      foodName: string;
      price: number;
      image: string | null;
      ingredients: string[];
      category: string;
    }) => {
      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/ddeq6vbyn/image/upload",
        values.image
      );

      const imageUrl = cloudinaryResponse.data.secure_url;

      const foodResponse = await axios.post(
        "https://food-delivery-service-b295.onrender.com/food",
        {
          foodName: values.foodName,
          price: values.price,
          image: imageUrl,
          ingredients: values.ingredients,
          category: categoryId,
        }
      );
      return foodResponse;
    },
    onSuccess: async () => {
      try {
        await queryClient.invalidateQueries({ queryKey: ["foods"] });
        toast.success("Successfully added dish !", {
          position: "top-right",
          autoClose: 5000,
        });
      } catch (error) {
        console.error("Error in onSuccess:", error);
      }
    },
    onError: (error) => {
      toast.error(`Failed to add dish: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
      });
    },
  });

  return (
    <Formik
      initialValues={{
        foodName: "",
        price: 0,
        image: null,
        ingredients: "",
      }}
      validationSchema={foodValidationSchema}
      onSubmit={async (values) => {
        const addedFood = {
          foodName: values.foodName,
          price: values.price,
          image: values.image,
          ingredients: values.ingredients.split(",").map((i) => i.trim()),
          category: categoryId,
        };
        mutation.mutate(addedFood);
      }}
    >
      {({ setFieldValue, isSubmitting, errors, values, touched }) => (
        <Form>
          <div className="flex flex-col gap-3">
            <div className="flex gap-5">
              <InputField
                label="Food Name"
                type="text"
                value={values.foodName}
                onChange={(value) => setFieldValue("foodName", value)}
              />
              {errors.foodName && touched.foodName && (
                <p className="text-red-500 text-sm">{errors.foodName}</p>
              )}

              <InputField
                label="Price"
                type="number"
                value={values.price}
                onChange={(value) => setFieldValue("price", value)}
              />
              {errors.price && touched.price && (
                <p className="text-red-500 text-sm">{errors.price}</p>
              )}
            </div>
            <FoodIngredients
              foodIngredients={(value: string) =>
                setFieldValue("ingredients", value)
              }
            />
            <p className="text-red-700">{errors.ingredients}</p>{" "}
            <FoodImage
              setImage={(setImage: FormData) =>
                setFieldValue("image", setImage)
              }
            />
            <p className="text-red-700">{errors.image}</p>
          </div>

          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black text-white rounded-lg py-2 px-4 text-[14px]"
                >
                  {isSubmitting ? "Adding..." : "Add Dish"}
                </button>
              </div>
            </DialogClose>
          </DialogFooter>
        </Form>
      )}
    </Formik>
  );
};
export default AddNewDishContent;
