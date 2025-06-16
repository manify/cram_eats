"use client";
import * as React from "react";

interface BusinessInfoFormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const BusinessInfoForm: React.FC<BusinessInfoFormProps> = ({ formData, handleChange }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  return (
    <div className="flex-1">
      <h2 className="pb-2.5 mb-9 text-lg font-medium leading-7 border-b border-solid border-b-[0.8px] text-neutral-900">
        Business Information
      </h2>
      <div className="mb-16 max-sm:mb-8">
        <label className="mb-2 text-sm font-medium leading-5 text-neutral-900">
          Business Name
        </label>
        <input
          type="text"
          placeholder="Enter your business name"
          className="relative pl-4 text-base rounded-lg border border border-solid h-[50px] text-neutral-400 w-[324px] max-md:w-full"
        />
      </div>
      <div className="mb-16 max-sm:mb-8">
        <label className="mb-2 text-sm font-medium leading-5 text-neutral-900">
          Password
        </label>
        <div className="flex relative items-center rounded-lg border border border-solid h-[50px] w-[324px] max-md:w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            className="pl-4 text-base text-neutral-400 w-full h-full bg-transparent border-none outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            <div
              dangerouslySetInnerHTML={{
                __html:
                  "<svg id=\"93:133\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"eye-icon\" style=\"width: 20px; height: 20px; cursor: pointer\"> <path d=\"M12.5 10C12.5 10.663 12.2366 11.2989 11.7678 11.7678C11.2989 12.2366 10.663 12.5 10 12.5C9.33696 12.5 8.70107 12.2366 8.23223 11.7678C7.76339 11.2989 7.5 10.663 7.5 10C7.5 9.33696 7.76339 8.70107 8.23223 8.23223C8.70107 7.76339 9.33696 7.5 10 7.5C10.663 7.5 11.2989 7.76339 11.7678 8.23223C12.2366 8.70107 12.5 9.33696 12.5 10Z\" stroke=\"black\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path> <path d=\"M2.04834 9.99984C3.11001 6.619 6.26917 4.1665 10 4.1665C13.7317 4.1665 16.89 6.619 17.9517 9.99984C16.89 13.3807 13.7317 15.8332 10 15.8332C6.26917 15.8332 3.11001 13.3807 2.04834 9.99984Z\" stroke=\"black\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path> </svg>",
              }}
            />
          </button>
        </div>
      </div>
      <div className="mb-16 max-sm:mb-8">
        <label className="mb-2 text-sm font-medium leading-5 text-neutral-900">
          Confirm Password
        </label>
        <div className="flex relative items-center rounded-lg border border border-solid h-[50px] w-[324px] max-md:w-full">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            className="pl-4 text-base text-neutral-400 w-full h-full bg-transparent border-none outline-none"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            <div
              dangerouslySetInnerHTML={{
                __html:
                  "<svg id=\"93:139\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"eye-icon\" style=\"width: 20px; height: 20px; cursor: pointer\"> <path d=\"M12.5 10C12.5 10.663 12.2366 11.2989 11.7678 11.7678C11.2989 12.2366 10.663 12.5 10 12.5C9.33696 12.5 8.70107 12.2366 8.23223 11.7678C7.76339 11.2989 7.5 10.663 7.5 10C7.5 9.33696 7.76339 8.70107 8.23223 8.23223C8.70107 7.76339 9.33696 7.5 10 7.5C10.663 7.5 11.2989 7.76339 11.7678 8.23223C12.2366 8.70107 12.5 9.33696 12.5 10Z\" stroke=\"black\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path> <path d=\"M2.04834 9.99984C3.11001 6.619 6.26917 4.1665 10 4.1665C13.7317 4.1665 16.89 6.619 17.9517 9.99984C16.89 13.3807 13.7317 15.8332 10 15.8332C6.26917 15.8332 3.11001 13.3807 2.04834 9.99984Z\" stroke=\"black\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path> </svg>",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
