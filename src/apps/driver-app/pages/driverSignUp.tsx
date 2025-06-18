"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {driverAuth}  from "../api/Auth/driverAuth";

import Layout from "../../customer-app/components/ui/Layout";
import { InputField } from "../../customer-app/components/ui/input";
import { SignUpButton } from "../../customer-app/components/ui/SignUpButton";


function SignUpHeader() {
  return (
    <div className="bg-blue-400 text-white text-center py-8 rounded-none">
      <h1 className="text-2xl font-semibold">Join Our Delivery Team</h1>
      <p className="text-lg">Create your driver account</p>
    </div>
  );
}

const DriverSignUp: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    vehicleType: "",
    licenseNumber: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await driverAuth.register(formData); // Use register instead of login
      navigate("/driver/signin", { replace: true });
    } catch (err) {
      setError("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate("/driver-signin");
  };

  return (
    <Layout>
      <main className="flex justify-center items-center p-5 min-h-screen bg-[#FFF6E5] max-sm:p-2.5">
        <div className="overflow-hidden relative bg-white rounded-2xl shadow-lg h-auto w-[896px] max-md:max-w-[600px] max-md:w-[90%] max-sm:w-full">
          <SignUpHeader />

          <form
            onSubmit={handleSubmit}
            className="px-56 pt-9 pb-6 max-md:px-10 max-md:pt-9 max-sm:px-5 max-sm:pt-6"
          >
            {error && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-4">
              <InputField
                label="First Name"
                type="text"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={(value) => handleChange("firstName", value)}
              />
              <InputField
                label="Last Name"
                type="text"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={(value) => handleChange("lastName", value)}
              />
            </div>

            <InputField
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(value) => handleChange("email", value)}
            />

            <InputField
              label="Password"
              type="password"
              placeholder="Create password"
              value={formData.password}
              onChange={(value) => handleChange("password", value)}
            />

            <InputField
              label="Phone Number"
              type="text"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(value) => handleChange("phone", value)}
            />

            <InputField
              label="Vehicle Type"
              type="text"
              placeholder="Enter vehicle type"
              value={formData.vehicleType}
              onChange={(value) => handleChange("vehicleType", value)}
            />

            <InputField
              label="License Number"
              type="text"
              placeholder="Enter license number"
              value={formData.licenseNumber}
              onChange={(value) => handleChange("licenseNumber", value)}
            />

            <SignUpButton
              onClick={() => {}}
              disabled={
                !formData.firstName ||
                !formData.lastName ||
                !formData.email ||
                !formData.password ||
                !formData.phone ||
                !formData.vehicleType ||
                !formData.licenseNumber ||
                isLoading
              }
            />
          </form>

          
        </div>
      </main>
    </Layout>
  );
};

export default DriverSignUp;