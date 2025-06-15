"use client";
import * as React from "react";

import { AccountTypeSelector } from "../components/AccountTypeSelector";
import { SignInForm } from "./SignInForm";


export function SignInRestaurant() {
  const [selectedAccountType, setSelectedAccountType] = React.useState<'restaurant' | 'driver'>('restaurant');

  return (
    <div className="overflow-hidden bg-white">
      <div className="flex flex-col items-center pt-4 w-full bg-yellow-50 max-md:max-w-full">
        

        <main className="flex flex-col items-center">
          <section className="text-center mt-11 max-md:mt-10">
            <h1 className="text-4xl font-medium leading-none text-center text-neutral-900">
              Join CramEats
            </h1>
            <p className="mt-5 text-xl leading-snug text-center text-slate-500">
              Choose your account type to get started
            </p>
          </section>

          <AccountTypeSelector
            selectedType={selectedAccountType}
            onTypeSelect={setSelectedAccountType}
          />

          <SignInForm />
        </main>

       
      </div>
    </div>
  );
}

export default SignInRestaurant;
