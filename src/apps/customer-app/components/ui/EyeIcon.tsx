"use client";
import * as React from "react";

interface EyeIconProps {
  onClick?: () => void;
  className?: string;
}

export const EyeIcon: React.FC<EyeIconProps> = ({ onClick, className = "" }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer ${className}`}
      onClick={onClick}
    >
      <path
        d="M12.5 10C12.5 10.663 12.2366 11.2989 11.7678 11.7678C11.2989 12.2366 10.663 12.5 10 12.5C9.33696 12.5 8.70107 12.2366 8.23223 11.7678C7.76339 11.2989 7.5 10.663 7.5 10C7.5 9.33696 7.76339 8.70107 8.23223 8.23223C8.70107 7.76339 9.33696 7.5 10 7.5C10.663 7.5 11.2989 7.76339 11.7678 8.23223C12.2366 8.70107 12.5 9.33696 12.5 10Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.04834 9.99984C3.11001 6.619 6.26917 4.1665 10 4.1665C13.7317 4.1665 16.89 6.619 17.9517 9.99984C16.89 13.3807 13.7317 15.8332 10 15.8332C6.26917 15.8332 3.11001 13.3807 2.04834 9.99984Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
