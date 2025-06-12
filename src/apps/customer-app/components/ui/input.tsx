"use client";
import * as React from "react";
import { EyeIcon } from "../ui/EyeIcon";

interface InputFieldProps {
  label: string;
  type: "email" | "password" | "text";
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  showPasswordToggle?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  showPasswordToggle = false,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value || "");

  const inputType = type === "password" && showPassword ? "text" : type;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-6 max-sm:mb-5">
      <label className="mb-2 text-sm font-medium leading-5 text-neutral-900">
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          className={`box-border px-4 py-0 w-full text-base bg-white rounded-lg border border border-solid h-[50px] text-neutral-400 ${
            showPasswordToggle ? "pr-12" : ""
          }`}
        />
        {showPasswordToggle && (
          <div className="absolute right-[15px] top-1/2 transform -translate-y-1/2">
            <EyeIcon onClick={togglePasswordVisibility} />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;