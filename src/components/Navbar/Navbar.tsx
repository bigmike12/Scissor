"use client";
import React from "react";
import { NavbarData } from "./NavbarData";
import { Button } from "../../components/ui/button";
import Icon from "../../assets/Icons/icon";
import { Mulish } from "next/font/google";
import { usePathname } from "next/navigation";

const mulish = Mulish({ subsets: ["latin"] });

const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div
      className={`h-[80px] px-[120px] w-full flex items-center justify-between mb-[30px] z-auto ${mulish.className}`}
    >
      <a href="/">
        <Icon name="logo" />
      </a>

      <div className="flex gap-12">
        {NavbarData.map((data) => {
          return data.id === 5 ? (
            <Button className="text-base font-medium text-black">
              <a href={data.url}>Free sign up</a>
            </Button>
          ) : (
            <p
              className={`font-medium text-xl ${
                data.url === pathname ? "text-primary" : "text-white"
              }`}
            >
              <a href={data.url}>{data.title}</a>
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
