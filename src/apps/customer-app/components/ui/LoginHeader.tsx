import * as React from "react";

export const LoginHeader: React.FC = () => {
  return (
    <header className="flex justify-center items-center w-full bg-green-400 rounded-2xl h-[103px] max-sm:h-20">
      <div className="flex flex-col gap-2 items-center max-sm:gap-1">
        <h1 className="text-2xl font-medium leading-8 text-center text-white max-md:text-2xl max-sm:text-xl max-sm:leading-7">
          Welcome Back
        </h1>
        <p className="text-base leading-6 text-center text-white max-md:text-base max-sm:text-sm max-sm:leading-5">
          Sign in to your account
        </p>
      </div>
    </header>
  );
};
