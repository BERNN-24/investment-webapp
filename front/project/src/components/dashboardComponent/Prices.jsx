// components/PricingSection.jsx
import React from 'react';
import plans from '../../utils/cardData';


import PricingCard from './CardPricing';
// COMPONENTS

export const PricingSection = () => {
  return (
  <div className="bg-[#F9FAFB] py-16 px-6 sm:px-12 lg:px-24 text-center">
    <div>
       <h1 className="text-4xl font-extrabold text-[#1F2937] mb-4">
           Choose Your Investment Plan
       </h1>
      <p className="text-[#6B7280] mb-10 max-w-2xl mx-auto">
        Limited-time offer! Earn daily returns by investing in our secure platform. Pick a plan that fits your goals.
      </p>
    </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {plans.map((plan) => {
    return <PricingCard key={plan.id} plan={plan} />
    })}
  </div>
</div>
  );
};

