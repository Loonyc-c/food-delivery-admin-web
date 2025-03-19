'use client'

import {
    DialogClose,
    DialogFooter
} from "@/components/ui/dialog"

import FoodName from "./foodName"
import FoodPrice from "./foodPrice"
import FoodIngredients from "./foodIngredients"
import FoodImage from "./foodImage"
import axios from "axios"
import { Formik, Form } from "formik"
import { foodValidationSchema } from "../_utils/validationSchemas"

type PropsType = {
    categoryId: string
}

const AddNewDishContent = ({ categoryId }: PropsType) => {
    const handleAddDishButton = async (values: any, { setSubmitting }: any) => {
        try {
            const cloudinaryResponse = await axios.post(
                'https://api.cloudinary.com/v1_1/ddeq6vbyn/image/upload',
                values.image,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const imageUrl = cloudinaryResponse.data.secure_url;
            console.log(imageUrl);

            const foodResponse = await axios.post("http://localhost:9999/food", {
                foodName: values.foodName,
                price: values.foodPrice,
                image: imageUrl,
                ingredients: values.ingerdients,
                category: categoryId,
            });

            console.log("Food added successfully:", foodResponse.data);
            setSubmitting(false);
        } catch (error) {
            console.error(`Error adding food:`, error);
            setSubmitting(false);
        }
    };

    return (

        <Formik
            initialValues={{
                foodName: "",
                foodPrice: 0,
                image: "null",
                ingerdients: ""
            }}
            validationSchema={foodValidationSchema}
            onSubmit={handleAddDishButton}
        >
            {({ setFieldValue, isSubmitting }) => (
                <Form>
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-5">
                            <FoodName value={(value: string) => setFieldValue("foodName", value)} />
                            <FoodPrice foodPrice={(value: number) => setFieldValue("foodPrice", value)} />
                        </div>
                        <FoodIngredients foodIngredients={(value: string) => setFieldValue("ingerdients", value)} />
                        <FoodImage setImage={(setImage: FormData) => setFieldValue("image", setImage)} />
                    </div>
                    <DialogFooter className="mt-5">
                        <div className="flex justify-end">
                            <DialogClose asChild>
                                <button
                                    type="submit"
                                    className="bg-black text-white rounded-lg py-2 px-4 text-[14px]"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Adding..." : "Add Dish"}
                                </button>
                            </DialogClose>
                        </div>
                    </DialogFooter>
                </Form>
            )}
        </Formik>
    )

}
export default AddNewDishContent