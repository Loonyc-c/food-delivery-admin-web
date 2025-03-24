'use client'

import {
    DialogClose,
    DialogFooter
} from "@/components/ui/dialog"

import FoodName from "./FoodName"
import FoodPrice from "./FoodPrice"
import FoodIngredients from "./FoodIngredients"
import FoodImage from "./FoodImage"
import axios from "axios"
import { Formik, Form } from "formik"
import { foodValidationSchema } from "../../_utils/validationSchemas"


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
                image: null,
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
                                    type="submit" disabled={isSubmitting}

                                    className="bg-black text-white rounded-lg py-2 px-4 text-[14px]"
                                >
                                    Add Dish
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

// <Formik
//     initialValues={{
//         foodName: '',
//         price: 0,
//         image: null,
//         ingerdients: '',
//     }}
//     validationSchema={foodValidationSchema}
//     onSubmit={async (values) => {
//         try {
//             const cloudinaryResponse = await axios.post(
//                 'https://api.cloudinary.com/v1_1/ddeq6vbyn/image/upload',
//                 values.image,
//                 {
//                     headers: {
//                         "Content-Type": "multipart/form-data",
//                     },
//                 }
//             )

//             const imageUrl = cloudinaryResponse.data.secure_url
//             console.log(imageUrl)

//             const foodResponse = await axios.post("http://localhost:9999/food", {
//                 foodName: values.foodName,
//                 price: values.price,
//                 image: imageUrl,
//                 ingredients: values.ingerdients,
//                 category: categoryId,
//             })

//             console.log("Food added successfully:", foodResponse.data)
//         } catch (error) {
//             console.error(`Error adding food:`, error)
//         }
//     }}
// >
//     {({ errors, touched, values, setFieldValue, isSubmitting }) => (
//         <Form>
//             <div className="flex flex-col gap-3">
//                 <div className="flex gap-5">
//                     <InputField
//                         label="Food Name"
//                         type="text"
//                         value={values.foodName}
//                         onChange={(value) => setFieldValue("foodName", value)} />
//                     {errors.foodName && touched.foodName && (
//                         <p className="text-red-500 text-sm">{errors.foodName}</p>
//                     )}

//                     <InputField
//                         label="Price"
//                         type="number"
//                         value={values.price}
//                         onChange={(value) => setFieldValue("price", value)} />
//                 </div>
//                 <FoodIngredients foodIngredients={(value: string) => setFieldValue("ingerdients", value)} />
//                 <FoodImage setImage={(setImage: FormData) => setFieldValue("image", setImage)} />
//             </div>
//             <div className="mt-5 flex justify-end">
//                 <DialogClose asChild>
//                     <button
//                         type="submit"
//                         className="bg-black text-white rounded-lg py-2 px-4 text-[14px]"
//                         disabled={isSubmitting}
//                     >
//                         {isSubmitting ? "Adding..." : "Add Dish"}
//                     </button>
//                 </DialogClose>
//             </div>
//         </Form>
//     )}
// </Formik>
