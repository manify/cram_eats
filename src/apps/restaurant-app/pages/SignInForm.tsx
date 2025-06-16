"use client";
import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignInRestaurant from "./SignInRestaurant";
import signin from "../api/signin";
import { LoginHeader } from "../components/LoginHeader";
import InputField from "../../customer-app/components/ui/input";
import { RememberMeSection } from "../../restaurant-app/components/RememberMeSection";
import { SignInButton } from "../../restaurant-app/components/SignInButton";
import { SignUpLink } from "../../restaurant-app/components/SignUpLink";
export function SignInForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

    const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/restaurant-signup');
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      await signin(email, password);

      // Handle "remember me"
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      navigate('/restaurantdashboard');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  return (

  
    <main className="flex justify-center items-center p-5 min-h-screen max-sm:p-2.5">
      <div className="overflow-hidden relative bg-white rounded-2xl shadow-lg h-[516px] w-[896px] max-md:h-auto max-md:max-w-[600px] max-md:min-h-[500px] max-md:w-[90%] max-sm:w-full max-sm:h-auto max-sm:min-h-[480px]">
        <LoginHeader />

        <form onSubmit={handleSubmit} className="px-56 pt-9 pb-0 max-md:px-10 max-md:pt-9 max-md:pb-0 max-sm:px-5 max-sm:pt-6 max-sm:pb-0">
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
            onRememberMeChange={() => setRememberMe(prev => !prev)}
            onForgotPasswordClick={() => alert('Forgot password clicked')}
          />

          <SignInButton
            onClick={handleSubmit}
            disabled={!email || !password}
          />
        </form>

        <SignUpLink onSignUpClick={handleSignUpClick} />
      </div>
    </main>

  );
}
