"use client";
import * as React from "react";

interface PartnerCardProps {
  imageSrc: string;
  title: string;
  description: string;
  imageAlt?: string;
}

export const PartnerCard: React.FC<PartnerCardProps> = ({
  imageSrc,
  title,
  description,
  imageAlt
}) => {
  return (
    <article className="grow shrink min-w-60 w-[530px] max-md:max-w-full p-6">
      <img
        src={imageSrc}
        alt={imageAlt || title}
        className="w-full rounded-2xl aspect-video object-cover hover:scale-105 transition-transform duration-300"
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