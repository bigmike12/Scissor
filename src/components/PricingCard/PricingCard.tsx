"use client";
import React, { useState } from "react";
import { Period, PricingData } from "./PricingCardData";
import Icon from "@/assets/Icons/icon";
import { Button } from "../ui/button";

export const PricingCardToggle = () => {
  const [plan, setPlan] = useState(1);

  const handleToggle = (id: number) => {
    setPlan(id);
  };

  return (
    <div className="w-60 bg-white text-black flex justify-between rounded-3xl p-1 mb-16">
      {Period.map((data) => {
        return (
          <div
            key={data.id}
            className={`px-4 py-2 w-[120px] h-12 flex justify-center items-center ${
              data.id === plan ? "bg-primary" : "bg-transparent"
            } rounded-3xl font-semibold hover:cursor-pointer`}
            onClick={() => handleToggle(data.id)}
          >
            {data.title}
          </div>
        );
      })}
    </div>
  );
};

const PricingCard = () => {
  return (
    <div className="flex lg:flex-row lg:gap-0 lg:justify-center flex-col gap-2 items-center text-black">
      {PricingData.map((data) => {
        const middle = data.id === 2;
        return (
          <div
            className={`${
              middle ? "h-[568px]" : "h-[444px]"
            } w-[307px] bg-white rounded-xl px-8 py-6 shadow-lg ${
              middle && "lg:z-10"
            }`}
            key={data.id}
          >
            <div className={`${middle && "mt-16"} mb-6`}>
              <h2 className="text-2xl">{data.name}</h2>
              <h1 className="text-[32px] font-semibold">{data.price}</h1>
              <p className="text-lg">{data.info}</p>
            </div>
            <div>
              {data.coverage.map((data, index) => (
                <div key={index} className="flex items-center mb-6">
                  <Icon name="mark" />
                  <p className="ml-2 text-sm">{data.covers}</p>
                </div>
              ))}
            </div>
            <Button className="text-base font-medium text-black w-full bg-transparent border border-primary">
              Select Plan
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default PricingCard;
