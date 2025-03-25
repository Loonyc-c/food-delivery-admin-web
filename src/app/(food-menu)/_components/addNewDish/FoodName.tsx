"use client";

import { ChangeEvent } from "react";

type FoodNameProps = {
  value: string;
  onChange: (value: string) => void;
};

const FoodName = ({ value, onChange }: FoodNameProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event?.target?.value);
  };

  return (
    <div className="w-[50%] h-auto">
      <p>Food name</p>
      <input
        value={value}
        onChange={handleChange}
        placeholder="Type food name"
        className="border rounded-lg p-2 text-[14px] w-full h-auto"
      />
    </div>
  );
};

export default FoodName;
