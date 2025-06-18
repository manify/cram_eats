"use client";
import * as React from "react";

interface SignInLinkProps {
  onSignInClick: () => void;
}

export const SignInLink: React.FC<SignInLinkProps> = ({ onSignInClick }) => {
  return (
    <div className="mt-6 text-center text-base font-medium leading-8 text-neutral-900">
      <span>Already have an account? </span>
      <button
        type="button"
        onClick={onSignInClick}
        className="text-green-500 hover:underline cursor-pointer"
      >
        SignIn
      </button>
    </div>
  );
};
