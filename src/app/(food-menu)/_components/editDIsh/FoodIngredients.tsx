import { Textarea } from "@/components/ui/textarea";

type FoodIngredientsProps = {
  value: string;
  onChange: (value: string) => void;
};

const FoodIngredientsEdit = ({ value, onChange }: FoodIngredientsProps) => {
  const ingredientsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  return (
    <div className="">
      <p>Ingredients</p>

      <Textarea
        className="w-full h-[100px]"
        placeholder="List ingredients"
        onChange={ingredientsChange}
        value={value}
      />
    </div>
  );
};

export default FoodIngredientsEdit;
