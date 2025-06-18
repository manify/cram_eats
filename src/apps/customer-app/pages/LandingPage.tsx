"use client";
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/ui/Layout';

// Feature Card Component
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="w-6/12 max-md:ml-0 max-md:w-full">
      <article className="flex flex-col grow items-center px-20 pt-8 pb-12 border border-green-400 border-solid rounded-[40px] max-md:px-5 max-md:mt-4 max-md:max-w-full">
        <div className="flex flex-col items-center max-w-full w-[427px]">
          <img
            src={icon}
            alt={`${title} icon`}
            className="object-contain max-w-full aspect-square w-[100px]"
          />
          <h3 className="mt-6 text-2xl font-bold text-center text-black">
            {title}
          </h3>
          <p className="self-stretch mt-9 text-xl text-stone-500 max-md:max-w-full">
            {description}
          </p>
        </div>
      </article>
    </div>
  );
}

// Partner Card Component
interface PartnerCardProps {
  image: string;
  title: string;
  description: string;
}

function PartnerCard({ image, title, description }: PartnerCardProps) {
  return (
    <article className="grow shrink pb-4 min-w-60 w-[530px] max-md:max-w-full">
      <img
        src={image}
        alt={`${title} illustration`}
        className="object-contain w-full rounded-2xl aspect-[1.78] max-md:max-w-full"
      />
      <div className="mt-4 w-full max-md:max-w-full">
        <h3 className="py-3.5 w-full text-3xl font-medium leading-none whitespace-nowrap text-neutral-900 max-md:max-w-full">
          {title}
        </h3>
        <p className="py-3.5 w-full text-2xl leading-8 text-slate-500 max-md:max-w-full">
          {description}
        </p>
      </div>
    </article>
  );
}

// Food Category Menu Component
function FoodCategoryMenu() {
  const categories = [
    { name: "Dish", icon: "https://cdn.builder.io/api/v1/image/assets/e212dd7ea28d4d5fb22c09ce9a305a74/697c83c1baf90de55521f8d000468998a5665604?placeholderIfAbsent=true" },
    { name: "Drinks", icon: "https://cdn.builder.io/api/v1/image/assets/e212dd7ea28d4d5fb22c09ce9a305a74/3c847b7165d92d90fb3408294d4a8f8dda2b9d44?placeholderIfAbsent=true" },
    { name: "Snacks", icon: "https://cdn.builder.io/api/v1/image/assets/e212dd7ea28d4d5fb22c09ce9a305a74/d8cde879e9b40389845b4919f5c0d42ebf0aed8f?placeholderIfAbsent=true" },
    { name: "Groceries", icon: "https://cdn.builder.io/api/v1/image/assets/e212dd7ea28d4d5fb22c09ce9a305a74/e72d522e93aea87e1bc083a77606edc400cfb15c?placeholderIfAbsent=true" },
    { name: "Dessert", icon: "https://cdn.builder.io/api/v1/image/assets/e212dd7ea28d4d5fb22c09ce9a305a74/e02ccf8cdd5098ce29f09a7fe42ab1a5780cd14c?placeholderIfAbsent=true" }
  ];

  return (
    <div className="flex grow gap-2.5 items-center py-28 pr-12 pl-20 w-full text-xl font-extrabold text-center text-black whitespace-nowrap bg-green-400 min-h-[567px] rounded-[70px_0px_0px_70px] max-md:px-5 max-md:py-24">
      <div className="self-stretch my-auto w-[202px]">
        {categories.map((category, index) => (
          <div key={category.name} className={`w-full rounded-none max-w-[202px] ${index > 0 ? 'mt-3' : ''}`}>
            <button className="flex gap-8 px-1 py-1 bg-white rounded-[40px] w-full">
              <img
                src={category.icon}
                alt={`${category.name} icon`}
                className="object-contain shrink-0 rounded-full aspect-square w-[52px]"
              />
              <span className="grow shrink my-auto">
                {category.name}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}



// Hero Section Component
function HeroSection() {
  return (
    <section className="mt-16 w-full max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="w-[45%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col self-stretch my-auto w-full max-md:mt-10 max-md:max-w-full">
            <div className="w-full max-md:max-w-full">
              <h1 className="text-6xl font-extrabold text-indigo-950 max-md:max-w-full max-md:text-4xl">
                The Finger Licking Delicious Taste
              </h1>
              <p className="mt-4 text-xl text-stone-500 max-md:max-w-full">
                Get your favorite food delivered in a flash. You'll see when
                your rider's picked up your order, and be able to follow
                them along the way. You'll get a notification when they're
                nearby, too.
              </p>
            </div>
            <button className="gap-2.5 self-start px-5 py-7 mt-7 text-lg font-semibold text-center text-white bg-amber-300 min-h-[73px] rounded-[50px]">
              Become a Partner
            </button>
          </div>
        </div>

        <div className="ml-5 w-[55%] max-md:ml-0 max-md:w-full">
         <div className="container mx-auto px-4">
  <div className="flex flex-col md:flex-row items-center justify-between">
    {/* Image Container */}
    <div className="relative w-full md:w-1/3 mb-8 md:mb-0">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/e212dd7ea28d4d5fb22c09ce9a305a74/e9ae7f6f3d4eb5c8b1753d5ec3d5f0b5837c8002?placeholderIfAbsent=true"
        alt="Food delivery illustration"
        className="w-[200px] md:w-[250px] mx-auto object-contain"
      />
    </div>

    {/* Food Category Menu Container */}
    <div className="w-full md:w-2/3">
      <FoodCategoryMenu />
    </div>
  </div>
</div>
        </div>
      </div>
    </section>
  );
}

// Why Choose Section Component
function WhyChooseSection() {
  const features = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/e212dd7ea28d4d5fb22c09ce9a305a74/a2603a3b544486edbb7e0d0944a38beeb6428124?placeholderIfAbsent=true",
      title: "Real-time Tracking",
      description: "Track your orders from kitchen to doorstep"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/e212dd7ea28d4d5fb22c09ce9a305a74/e4ef676e2ee89dffeda8f40a691eef93836f9f35?placeholderIfAbsent=true",
      title: "Fast Delivery",
      description: "Quick delivery times with optimized routes"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/e212dd7ea28d4d5fb22c09ce9a305a74/acd1a9c66d438ed7bb2f860291206494c775915b?placeholderIfAbsent=true",
      title: "Premium Quality",
      description: "Curated restaurants and quality assured meals"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/e212dd7ea28d4d5fb22c09ce9a305a74/a0dfd798522ad335af6aceaa168e96cc91efda85?placeholderIfAbsent=true",
      title: "Multi-platform",
      description: "Seamless experience across all platforms"
    }
  ];

  return (
    <section className="mt-32 max-w-full w-full max-md:mt-10">
      <div className="max-w-full text-center w-[834px] mx-auto">
        <h2 className="text-4xl font-bold text-black max-md:max-w-full">
          Why Choose CRAM?
        </h2>
        <p className="mt-5 text-xl text-stone-500 max-md:max-w-full">
          Experience the next generation of food delivery with our cutting-edge
          platform designed for everyone.
        </p>
      </div>

      <div className="mt-16 w-full max-w-[1334px] mx-auto max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <FeatureCard {...features[0]} />
          <FeatureCard {...features[1]} />
        </div>
      </div>

      <div className="mt-4 w-full max-w-[1334px] mx-auto max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <FeatureCard {...features[2]} />
          <FeatureCard {...features[3]} />
        </div>
      </div>
    </section>
  );
}

// Welcome Section Component
function WelcomeSection() {
  return (
    <section className="px-20 py-20 mt-16 max-w-full bg-yellow-50 rounded-[40px] w-[1470px] max-md:px-5 max-md:mt-10">
      <div className="flex gap-5 max-md:flex-col">
        <div className="w-[59%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow items-center px-20 w-full bg-green-400 rounded-[70px_0px_0px_70px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <div className="flex relative z-10 flex-col items-start px-8 pb-3.5 mt-0 max-w-full aspect-[0.616] pt-[478px] w-[365px] max-md:px-5 max-md:pt-24">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/e212dd7ea28d4d5fb22c09ce9a305a74/b47e40dfdcfc662b83d02958937b4caf6351afb7?placeholderIfAbsent=true"
                alt="Food background"
                className="object-cover absolute inset-0 size-full"
              />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/e212dd7ea28d4d5fb22c09ce9a305a74/531cbc6560f58c2bb7ae372e1c7dbd0b2a5bf3f1?placeholderIfAbsent=true"
                alt="CRAM app interface"
                className="object-contain max-w-full aspect-[1.95] w-[199px]"
              />
            </div>
          </div>
        </div>

        <div className="ml-5 w-[41%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col mt-11 w-full max-md:mt-10 max-md:max-w-full">
            <h2 className="text-4xl font-bold text-black max-md:mr-2.5 max-md:max-w-full">
              Welcome to CRAM
              <br />
              A place to enjoy food
            </h2>
            <p className="mt-10 text-xl text-stone-500 max-md:mt-10 max-md:max-w-full">
              Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
              Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Curabitur tempus urna at turpis
              condimentum lobortis. Ut commodo efficitur neque.
            </p>
            <button className="gap-2.5 self-start px-5 py-7 mt-6 text-lg font-semibold text-center text-white bg-amber-300 min-h-[73px] rounded-[50px]">
              Become a Partner
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Partners Section Component
function PartnersSection() {
  const partners = [
    {
      image: "https://cdn.builder.io/api/v1/image/assets/e212dd7ea28d4d5fb22c09ce9a305a74/01f9847fc5560f56185d3bdd3914d0f677fbbae4?placeholderIfAbsent=true",
      title: "Restaurants",
      description: "Expand your customer base and streamline your catering operations with our platform."
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/e212dd7ea28d4d5fb22c09ce9a305a74/b6690a5ce92a2fd22b0be2064f4a543f8beb310a?placeholderIfAbsent=true",
      title: "Drivers",
      description: "Enjoy flexible hours and competitive earnings by joining our delivery team."
    }
  ];

  return (
    <section className="flex flex-col justify-center items-center mt-40 max-w-full text-center w-[928px] max-md:mt-10">
      <div className="max-w-full text-4xl font-bold text-black w-[720px] max-md:max-w-full">
        Our Partners
      </div>
      <p className="mt-4 max-w-full text-xl text-stone-500 w-[720px] max-md:max-w-full">
        We work with a diverse range of partners, from local eateries to large
        restaurant chains and independent delivery drivers.
      </p>

      <div className="mt-16 w-full max-w-[1341px] min-h-[528px] max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-wrap gap-4 w-full min-h-[503px] max-md:max-w-full">
          {partners.map((partner, index) => (
            <PartnerCard key={index} {...partner} />
          ))}
        </div>
      </div>
    </section>
  );
}



// Main Landing Page Component
export default function LandingPage() {
  return (
    <Layout>
      <div className="flex overflow-hidden flex-col items-center pt-6 bg-stone-50">
        <div className="flex flex-col pt-9 pb-24 pl-16 w-full bg-yellow-50 max-w-[1470px] rounded-[40px] max-md:pl-5 max-md:max-w-full rounded-t-[70px]">

          
          <HeroSection />
        </div>

        <WhyChooseSection />
        <WelcomeSection />
        <PartnersSection />
        
      </div>
    </Layout>
  );
}
