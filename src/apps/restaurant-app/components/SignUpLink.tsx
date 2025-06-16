"use client";
import * as React from "react";

interface SignUpLinkProps {
  onSignUpClick: () => void;
}

export const SignUpLink: React.FC<SignUpLinkProps> = ({ onSignUpClick }) => {
  return (
    <div className="absolute bottom-8 left-2/4 text-base font-medium leading-8 text-center -translate-x-2/4 text-neutral-900 max-sm:relative max-sm:bottom-auto max-sm:left-auto max-sm:mt-4 max-sm:mb-5">
      <span>Don't have an account? </span>
      <button
        type="button"
        onClick={onSignUpClick}
        className="text-green-400 hover:underline cursor-pointer"
      >
        SignUp
      </button>
    </div>
  );
};
