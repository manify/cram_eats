"use client";
import * as React from "react";

interface AccountTypeSelectorProps {
  selectedType?: 'restaurant' | 'driver';
  onTypeSelect?: (type: 'restaurant' | 'driver') => void;
}

export function AccountTypeSelector({ selectedType = 'restaurant', onTypeSelect }: AccountTypeSelectorProps) {
  return (
    <section className="flex gap-4 mt-8 max-w-full text-lg font-medium leading-loose text-center whitespace-nowrap w-[416px]">
      <button
        onClick={() => onTypeSelect?.('restaurant')}
        className={`flex flex-1 gap-3 px-8 py-4 rounded-lg max-md:px-5 transition-colors ${
          selectedType === 'restaurant'
            ? 'text-white bg-green-400'
            : 'bg-white border border-solid text-neutral-900 hover:bg-gray-50'
        }`}
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/cc5f9833dc2842af8ff61a3c0ac52f46/15fd2f55d007c27a914369d2ee6a9394ec1ec5e1?placeholderIfAbsent=true"
          className="object-contain shrink-0 my-auto w-6 aspect-square"
          alt="Restaurant icon"
        />
        <span className="basis-auto">Restaurant</span>
      </button>
      <button
        onClick={() => onTypeSelect?.('driver')}
        className={`flex flex-1 gap-3 px-8 py-4 rounded-lg max-md:px-5 transition-colors ${
          selectedType === 'driver'
            ? 'text-white bg-green-400'
            : 'bg-white border border-solid text-neutral-900 hover:bg-gray-50'
        }`}
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/cc5f9833dc2842af8ff61a3c0ac52f46/6876b4ebd200b378e8e80794cf33c9a950d5b3e8?placeholderIfAbsent=true"
          className="object-contain shrink-0 my-auto w-6 aspect-square"
          alt="Driver icon"
        />
        <span>Driver</span>
      </button>
    </section>
  );
}
