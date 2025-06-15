"use client";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  rememberMe: boolean;
  onRememberMeChange: () => void;
}

export function RememberMeSection({
  rememberMe,
  onRememberMeChange,
}: Props) {
  const navigate = useNavigate();

  const handleForgotPasswordClick = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="flex items-center justify-between mt-4 mb-6">
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={onRememberMeChange}
          className="form-checkbox h-4 w-4 text-green-500"
        />
        <span className="text-sm text-gray-600">Remember me</span>
      </label>
      <button
        type="button"
        onClick={handleForgotPasswordClick}
        className="text-sm text-green-500 hover:underline"
      >
        Forgot password?
      </button>
    </div>
  );
}
