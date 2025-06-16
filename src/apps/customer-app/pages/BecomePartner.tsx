import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/ui/Layout';
import { PartnerCard } from '../components/ui/PartnerCard';

export default function BecomePartner() {
   const navigate = useNavigate();
  
  return (
    <Layout>
      <main className="flex flex-col md:flex-row justify-center items-center gap-8 p-5 min-h-screen bg-[#FFF6E5] max-sm:p-2.5">
        <PartnerCard
          
          
          imageSrc="https://cdn.builder.io/api/v1/image/assets/cc5f9833dc2842af8ff61a3c0ac52f46/43057984f92741cbb9a78c2a60c6bfed716c0176?placeholderIfAbsent=true"
          title="Restaurants"
          description="Expand your customer base and streamline your catering operations with our platform."
          imageAlt="Restaurant partnership illustration"
        />
        <PartnerCard
          imageSrc="https://cdn.builder.io/api/v1/image/assets/cc5f9833dc2842af8ff61a3c0ac52f46/ec30994870cb8b84d29a3cc40ef392b94b1979c3?placeholderIfAbsent=true"
          title="Drivers"
          description="Enjoy flexible hours and competitive earnings by joining our delivery team."
          imageAlt="Driver partnership illustration"
        />
      </main>
    </Layout>
  );
}