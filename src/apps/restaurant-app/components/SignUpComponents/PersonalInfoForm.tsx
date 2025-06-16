"use client";
import * as React from "react";

interface PersonalInfoFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    [key: string]: any;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ formData, handleChange }) => {
  return (
    <div className="flex-1">
      <h2 className="pb-2.5 mb-6 text-lg font-medium leading-7 border-b border-solid text-neutral-900">
        Personal Information
      </h2>
      <div className="mb-6 max-sm:mb-4">
        <label className="mb-1.5 text-sm font-medium leading-5 text-neutral-900 block">
          Contact Name
        </label>
        <input
          type="text"
          placeholder="Enter your full name"
          className="relative pl-4 text-base rounded-lg border border-solid h-[50px] text-neutral-400 w-[324px] max-md:w-full"
        />
      </div>
      <div className="mb-6 max-sm:mb-4">
        <label className="mb-1.5 text-sm font-medium leading-5 text-neutral-900 block">
          Email Address
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          className="relative pl-4 text-base rounded-lg border border-solid h-[50px] text-neutral-400 w-[324px] max-md:w-full"
        />
      </div>
      <div className="mb-6 max-sm:mb-4">
        <label className="mb-1.5 text-sm font-medium leading-5 text-neutral-900 block">
          Phone Number
        </label>
        <input
          type="tel"
          placeholder="Enter your phone number"
          className="relative pl-4 text-base rounded-lg border border-solid h-[50px] text-neutral-400 w-[324px] max-md:w-full"
        />
      </div>
      <div className="mb-6 max-sm:mb-4">
        <label className="mb-1.5 text-sm font-medium leading-5 text-neutral-900 block">
          Address
        </label>
        <textarea
          className="relative pl-4 pt-2 text-base rounded-lg border border-solid h-[98px] w-[324px] max-md:w-full"
          placeholder="Enter your address"
        />
      </div>
    </div>
  );
};
