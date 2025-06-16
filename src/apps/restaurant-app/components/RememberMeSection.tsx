"use client";
import * as React from "react";

interface RememberMeSectionProps {
  rememberMe: boolean;
  onRememberMeChange: (checked: boolean) => void;
  onForgotPasswordClick: () => void;
}

export const RememberMeSection: React.FC<RememberMeSectionProps> = ({
  rememberMe,
  onRememberMeChange,
  onForgotPasswordClick,
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onRememberMeChange(e.target.checked);
  };

  return (
    <div className="flex justify-between items-center mb-6 max-sm:flex-col max-sm:gap-3 max-sm:items-start max-sm:mb-5">
      <div className="flex gap-2 items-center max-sm:self-start">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={handleCheckboxChange}
          className="w-4 h-4 bg-white rounded-sm border border-solid border-stone-500"
        />
        <label className="text-sm leading-5 text-slate-500">
          Remember me
        </label>
      </div>
      <button
        type="button"
        onClick={onForgotPasswordClick}
        className="text-sm leading-5 text-green-400 cursor-pointer max-sm:self-end hover:underline"
      >
        Forgot password?
      </button>
    </div>
  );
};
