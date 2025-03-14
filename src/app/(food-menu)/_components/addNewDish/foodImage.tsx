import { useState } from "react"
type FoodImageUrlProps = {
    foodImageUrl: (foodImageUrl: string) => void;
}

const FoodImage = ({foodImageUrl}:FoodImageUrlProps) => {

    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>("");

    const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
            setImageUrl(URL.createObjectURL(e.target.files[0]));
            foodImageUrl(URL.createObjectURL(e.target.files[0]));

        }
    };

    const removeImage = () => {
        setImage(null);
        setImageUrl("");
    };

    console.log(image)
    console.log(imageUrl)


    return(
        <div className="flex flex-col gap-[5px] w-full h-auto cursor-pointer ">
        <label htmlFor="foodImage">
            Food image
        </label>
        <input
            id="foodImage"
            accept="image/*"
            type="file"
            className="w-full h-[240px] opacity-0 absolute z-10 "
            onChange={imageChange}
        />
        <div className="w-full h-[240px] rounded-lg flex bg-[#2563EB0D] justify-center items-center border-2 border-[#2563EB33] border-dashed">
            {imageUrl ? (
                    <div className="absolute w-full h-[240px] object-cover rounded-lg">
                        <img
                            src={imageUrl}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute top-4 right-12 bg-red-500 text-white rounded-full px-2"
                        >
                            X
                        </button>
                    </div>
                ) : (
                    <p>Choose a file or drag & drop it here</p>
                )}
        </div>
    </div>

    )
}

export default FoodImage