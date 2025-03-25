"use client";

import { DialogClose, DialogFooter } from "@/components/ui/dialog";

import FoodIngredients from "./FoodIngredients";
import FoodImage from "./FoodImage";
import axios from "axios";
import { Formik, Form } from "formik";
import { foodValidationSchema } from "../../_utils/validationSchemas";
import InputField from "../InputField";
import { toast } from "react-toastify";

type PropsType = {
  categoryId: string;
};

const AddNewDishContent = ({ categoryId }: PropsType) => {
  const handleAddDishButton = async (values: any, { setSubmitting }: any) => {
    try {
      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/ddeq6vbyn/image/upload",
        values.image
      );

      const imageUrl = cloudinaryResponse.data.secure_url;
      console.log(imageUrl);

      const foodResponse = await axios.post("http://localhost:9999/food", {
        foodName: values.foodName,
        price: values.price,
        image: imageUrl,
        ingredients: values.ingredients,
        category: categoryId,
      });

      console.log("Food added successfully:", foodResponse.data);
      toast.success("Dish added successfully !");
      setSubmitting(false);
    } catch (error) {
      toast.error("Something went wrong.");
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        foodName: "",
        price: 0,
        image: null,
        ingredients: "",
      }}
      validationSchema={foodValidationSchema}
      onSubmit={handleAddDishButton}
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
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black text-white rounded-lg py-2 px-4 text-[14px]"
              >
                {isSubmitting ? "Adding..." : "Add Dish"}
              </button>
            </div>
          </DialogFooter>
        </Form>
      )}
    </Formik>
  );
};
export default AddNewDishContent;
