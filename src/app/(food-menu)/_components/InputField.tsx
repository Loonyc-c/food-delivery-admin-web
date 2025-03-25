type InputProps = {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  type: string;
  placeholder?: string;
};

const InputField = ({ type, label, value, onChange }: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue =
      type === "number" ? parseFloat(e.target.value) : e.target.value;
    onChange(newValue);
  };

  return (
    <div className="w-full h-auto flex justify-between items-center">
      <p>{label}</p>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        className="w-[70%] border rounded-lg p-2 text-[14px]"
      />
    </div>
  );
};

export default InputField;
