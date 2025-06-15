"use client";
import * as React from "react";

export function SignInForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ email, password, rememberMe });
  };

  return (
    <section className="flex flex-col pb-12 mt-8 w-full max-w-4xl bg-white rounded-2xl shadow-[0px_8px_32px_rgba(0,0,0,0.1)] max-md:max-w-full">
      <header className="flex flex-col justify-center items-center px-20 py-5 text-center text-white bg-green-400 rounded-2xl max-md:px-5 max-md:max-w-full">
        <div className="max-w-full w-[252px]">
          <h1 className="text-2xl font-medium leading-none">Welcome Back</h1>
          <p className="mt-2 text-base">Sign in to your restaurant account</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col self-center mt-9 max-w-full text-base font-medium w-[450px]">
        <div className="flex flex-col">
          <label htmlFor="email" className="self-start text-sm leading-none text-neutral-900">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-4 py-4 mt-2 rounded-lg border border-solid border-gray-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent max-md:pr-5 max-md:max-w-full"
            required
          />
        </div>

        <div className="flex flex-col mt-6">
          <label htmlFor="password" className="self-start text-sm leading-none text-neutral-900">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-4 mt-2 rounded-lg border border-solid border-gray-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent max-md:max-w-full"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-1"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/cc5f9833dc2842af8ff61a3c0ac52f46/4252c8c9142fe9115303ce1a096d3fd93ff3ed04?placeholderIfAbsent=true"
                className="object-contain w-5 aspect-square"
                alt="Toggle password visibility"
              />
            </button>
          </div>
        </div>

        <div className="flex gap-10 mt-6 w-full text-sm leading-none max-md:max-w-full">
          <label className="flex flex-1 gap-2 text-slate-500 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="sr-only"
            />
            <div className={`flex shrink-0 self-start rounded-sm border border-solid border-stone-500 h-[18px] w-[18px] ${rememberMe ? 'bg-green-400' : 'bg-white'}`}>
              {rememberMe && (
                <svg className="w-3 h-3 text-white m-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <span>Remember me</span>
          </label>
          <a href="#" className="text-green-400 hover:text-green-500 transition-colors">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="px-11 py-3 mt-6 text-center text-white bg-green-400 rounded-lg hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 max-md:px-5 max-md:max-w-full"
        >
          Sign In
        </button>

        <p className="self-center mt-5 leading-loose text-center text-neutral-900">
          Don't have an account?{" "}
          <a href="#" className="text-green-400 hover:text-green-500 transition-colors">
            SignUp
          </a>
        </p>
      </form>
    </section>
  );
}
