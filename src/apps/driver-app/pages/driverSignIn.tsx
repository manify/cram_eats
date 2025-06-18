"use client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { driverAuth } from "../api/Auth/driverAuth";

import Layout from "../../customer-app/components/ui/Layout";
import { InputField } from "../../customer-app/components/ui/input";
import { RememberMeSection } from "../../customer-app/components/ui/RememberMeSection";
import { SignInButton } from "../../customer-app/components/ui/SignInButton";
import { SignUpLink } from "../../customer-app/components/ui/SignUpLink";

// Header of the sign-in page
function LoginHeader() {
  return (
    <div className="bg-blue-400 text-white text-center py-8 rounded-none">
      <h1 className="text-2xl font-semibold">Welcome Back Driver</h1>
      <p className="text-lg">Sign in to your driver account</p>
    </div>
  );
}

const SignInDriver: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Use the login method from driverAuth
      await driverAuth.login({ email, password });

      // Remember Me
      if (rememberMe) {
        localStorage.setItem("rememberedDriverEmail", email);
      } else {
        localStorage.removeItem("rememberedDriverEmail");
      }

      // Navigate immediately to dashboard after successful login
      navigate("/driver/dashboard", { replace: true });
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedDriverEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSignUpClick = () => {
    navigate("/driver-signup");
  };

  return (
    <Layout>
      <main className="flex justify-center items-center p-5 min-h-screen bg-[#FFF6E5] max-sm:p-2.5">
        <div className="overflow-hidden relative bg-white rounded-2xl shadow-lg h-[516px] w-[896px] max-md:h-auto max-md:max-w-[600px] max-md:min-h-[500px] max-md:w-[90%] max-sm:w-full max-sm:h-auto max-sm:min-h-[480px]">
          <LoginHeader />

          <form
            onSubmit={handleSubmit}
            className="px-56 pt-9 pb-0 max-md:px-10 max-md:pt-9 max-md:pb-0 max-sm:px-5 max-sm:pt-6 max-sm:pb-0"
          >
            {error && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <InputField
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={setEmail}
            />

            <InputField
              label="Password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={setPassword}
            />

            <RememberMeSection
              rememberMe={rememberMe}
              onRememberMeChange={() => setRememberMe((prev) => !prev)}
              onForgotPasswordClick={() => alert("Forgot password clicked")}
            />

            <SignInButton
              onClick={handleSubmit}
              disabled={!email || !password || isLoading}
            />
          </form>

          <SignUpLink onSignUpClick={handleSignUpClick} />
        </div>
      </main>
    </Layout>
  );
};

export default SignInDriver;