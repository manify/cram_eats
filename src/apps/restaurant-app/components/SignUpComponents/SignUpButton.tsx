"use client";
import * as React from "react";

interface SignInButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const SignInButton: React.FC<SignInButtonProps> = ({
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className="mb-5 w-full h-12 text-base font-medium leading-6 text-center text-white bg-green-400 rounded-lg cursor-pointer max-sm:mb-4 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
    >
      Sign Up
    </button>
  );
};
export default SignInButton;