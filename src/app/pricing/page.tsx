import PricingCard, {
  PricingCardToggle,
} from "@/components/PricingCard/PricingCard";
import { analytics } from "@/firebase/config/firebase";
import { logEvent } from "firebase/analytics";
import React from "react";

const Pricing = () => {
  if (analytics !== null) {
    logEvent(analytics, "Pricing Visited");
  }
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-center text-[32px] font-bold">
          Find a plan that meets your needs
        </h1>
      </div>
      <div className="bg-backgroundVarOne h-[785px] w-full flex items-center flex-col justify-center">
        <PricingCardToggle />
        <PricingCard />
      </div>
    </div>
  );
};

export default Pricing;
