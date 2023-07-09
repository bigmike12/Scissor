import React from "react";
import { Socials } from "./FooterData";
import Icon from "@/assets/Icons/icon";
import { Mulish } from "next/font/google";

const mulish = Mulish({ subsets: ["latin"] });

interface Social {
  icon: string;
  url: string;
}

const Footer = () => {
  return (
    <div
      className={`mt-0 bottom-0 w-full h-20 bg-backgroundVarOne px-8 lg:px-[120px] fixed flex items-center justify-between ${mulish.className} z-30`}
    >
      <div>
        <p className="lg:text-base text-xs">
          &#169; 2023 Scissor. All rights reserved
        </p>
      </div>
      <div className="flex gap-3">
        {Socials.map((data: Social, index: number) => (
          <div
            className="bg-ScissorLemon w-[30px] h-[30px] rounded-full flex justify-center items-center"
            key={index}
          >
            <a href={data.url}>
              <Icon name={data.icon} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
