
const AddNewDishContent = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-5">
                <div className="w-[50%] h-auto">
                    <p>Food name</p>
                    <input
                        className="border rounded-lg p-2 text-[14px] w-full h-auto"
                        placeholder="Type food name"
                    />
                </div>
                <div className="w-[50%] h-auto">
                    <p>Price</p>
                    <input
                        className="border rounded-lg p-2 text-[14px] w-full h-auto"
                        placeholder="Type food price"
                    />
                </div>
            </div>

            <div className="">
                <p>Ingredients</p>
                <input
                    className="border rounded-lg w-full h-[100px] p-2 text-[14px] "
                    placeholder="List ingredients"
                />
            </div>

            <div className="flex flex-col gap-[5px] w-full h-auto cursor-pointer ">
                <label htmlFor="foodImage">
                    Food image
                </label>
                <input
                    id="foodImage"
                    accept="image/*"
                    type="file"
                    className="w-full h-[240px] opacity-0 absolute z-10 "
                />
                <div className="w-full h-[240px] rounded-lg flex bg-[#2563EB0D] justify-center items-center border-2 border-[#2563EB33] border-dashed">
                    <p>Choose a file or drag & drop it here</p>
                </div>
            </div>
        </div>

    )
}

export default AddNewDishContent