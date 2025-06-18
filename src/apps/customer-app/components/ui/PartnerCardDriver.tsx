"use client";
import * as React from "react";
import { useNavigate } from "react-router-dom";

interface PartnerCardDriverProps {
  imageSrc: string;
  title: string;
  description: string;
  imageAlt?: string;
  onClick?: () => void;
}

export const PartnerCardDriver: React.FC<PartnerCardDriverProps> = ({
  imageSrc,
  title,
  description,
  imageAlt,
  onClick
}) => {
  const navigate = useNavigate();
  
  const handlePartnerCardClickDriver = () => {
    navigate('/driver-signin');
  };
  return (
    <article className="grow shrink min-w-60 w-[530px] max-md:max-w-full p-6">
      <img
        src={imageSrc}
        alt={imageAlt || title}
        className="w-full rounded-2xl aspect-video object-cover hover:scale-105 transition-transform duration-300"
        onClick={handlePartnerCardClickDriver} // Default click handler for restaurant card
      />
      <div className="mt-6 space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          {title}
        </h2>
        <p className="text-base text-neutral-600">
          {description}
        </p>
      </div>
    </article>
  );
};