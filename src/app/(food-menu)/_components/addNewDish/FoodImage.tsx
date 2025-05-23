import { useState } from "react";

type FoodImageUrlProps = {
  setImage: (setImage: FormData) => any;
};

const FoodImage = ({ setImage: setImageFood }: FoodImageUrlProps) => {
  const uploudPreset = "food_delivery";
  //   const apiKey = "192382554631654";

  const [imageUrl, setImageUrl] = useState<string>("");

  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageUrl(URL.createObjectURL(e.target.files[0]));
      const file = new FormData();
      file.append("file", e.target.files[0]);
      file.append("upload_preset", uploudPreset);
      setImageFood(file);
    }
  };

  const removeImage = () => {
    setImageUrl("");
  };

  return (
    <div className="flex flex-col gap-[5px] w-full h-auto cursor-pointer ">
      <label htmlFor="foodImage">Food image</label>
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
  );
};

export default FoodImage;
