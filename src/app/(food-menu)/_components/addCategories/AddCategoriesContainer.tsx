import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import CrossIcon from "../../_ui/crossIcon";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import { addCategoryValidationSchema } from "../../_utils/validationSchemas";

const AddCategoriesContainer = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (values: { category: string }) => {
      try {
        const response = await axios.post(
          "http://localhost:9999/categories",
          values
        );
        return response.data;
      } catch (error) {
        console.error("Error in mutation function:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Successfully added category!", {
        position: "top-right",
        autoClose: 5000,
      });
    },
    onError: (error: any) => {
      toast.error(`Failed to add category: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
      });
    },
  });

  return (
    <Formik
      initialValues={{
        category: "",
      }}
      validationSchema={addCategoryValidationSchema}
      onSubmit={async (values) => {
        try {
          const result = await mutation.mutateAsync(values);
          console.log("Mutation result:", result);
        } catch (error) {
          console.error("Submission error:", error);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => (
        // <Form onSubmit={handleSubmit}>
        <Dialog>
          <DialogTrigger asChild>
            <div className="w-9 h-9 rounded-full bg-[#EF4444] flex justify-center items-center">
              <CrossIcon />
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="flex justify-center">
              <DialogTitle>Add new category</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>

            <div>
              <h1 className="font-semibold mb-2">Category name</h1>
              <input
                type="text"
                name="category"
                placeholder="Type category name"
                className="w-full border rounded-lg p-2 text-[14px]"
                value={values.category}
                onChange={handleChange}
              />
              {errors.category && touched.category && (
                <p className="text-red-500 text-sm">{errors.category}</p>
              )}
            </div>

            <DialogFooter className="sm:justify-start">
              {/* <DialogClose asChild> */}
              <button
                className="bg-black text-white rounded-lg py-2 px-4 text-[14px]"
                type="submit"
                disabled={isSubmitting}
                onClick={() => handleSubmit()}
              >
                Add category
              </button>
              {/* </DialogClose> */}
            </DialogFooter>
          </DialogContent>
        </Dialog>
        // </Form>
      )}
    </Formik>
  );
};

export default AddCategoriesContainer;
