"use client";

import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastTestButton = () => {
  const handleToast = () => {
    toast.success("Test Toast Worked!", {
      position: "top-right",
      autoClose: 5000,
    });
  };

  return (
    <button
      onClick={handleToast}
      className="bg-blue-500 text-white p-2 rounded"
    >
      Test Toast
    </button>
  );
};

export default ToastTestButton;
