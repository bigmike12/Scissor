import React from "react";
import { LandingPageData } from "@/components/LandingPage/LandingPageData";
import Icon from "@/assets/Icons/icon";
import UrlInput from "@/components/UrlInput/UrlInput";

const LandingPage = () => {
  return (
    <div className="lg:flex w-full items-center">
      <div className="lg:w-2/4 w-full">
        <h2 className="font-extrabold text-[50px] lg:text-[64px] leading-[150%]">
          Shorten your URLs in seconds
        </h2>
        <div className="flex flex-col gap-[40px] mt-[58px]">
          {LandingPageData.map((data) => (
            <div className="flex items-center" key={data.id}>
              <Icon name="check" />
              <p className="font-normal text-[32px] ml-[14px]">{data.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:w-2/4 w-full lg:flex justify-center my-5">
        <UrlInput />
      </div>
    </div>
  );
};

export default LandingPage;
