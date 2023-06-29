/* eslint-disable react/jsx-key */
"use client";
import React, { useEffect, useState } from "react";
import { LoggedInNavbarData, NavbarData } from "./NavbarData";
import { Button } from "../../components/ui/button";
import Icon from "../../assets/Icons/icon";
import { Mulish } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import { LocalStorageKeys, NotificationTypes } from "@/lib/utils";
import { showToast } from "../ShowToast/showToast";

const mulish = Mulish({ subsets: ["latin"] });

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [loggenIn, setLoggedIn] = useState<boolean>(false);

  const handleLogout = () => {
    localStorage.clear();
    showToast("Logout Successful", NotificationTypes.SUCCESS);
    router.push("/");
  };

  useEffect(() => {
    const checkUser = () => {
      const userID = localStorage.getItem(LocalStorageKeys.USERID);

      if (userID) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    };
    checkUser();

    if (typeof window !== "undefined") {
      window.addEventListener("storage", () => {
        // When storage changes refetch
        checkUser();
      });

      return () => {
        window.removeEventListener("storage", checkUser);
      };
    }
  }, []);

  return (
    <div
      className={`h-[80px] px-[120px] w-full flex items-center justify-between mb-[30px] z-auto ${mulish.className}`}
    >
      <a href="/">
        <Icon name="logo" />
      </a>

      <div className="flex gap-12">
        {!loggenIn
          ? NavbarData.map((data) =>
              data.id === 5 ? (
                <Button className="text-base font-medium text-black">
                  <a href={data.url}>{data.title}</a>
                </Button>
              ) : (
                <p
                  className={`font-medium text-xl ${
                    data.url === pathname ? "text-primary" : "text-white"
                  }`}
                >
                  <a href={data.url}>{data.title}</a>
                </p>
              )
            )
          : LoggedInNavbarData.map((data) =>
              data.id === 4 ? (
                <Button
                  className="text-base font-medium text-black"
                  onClick={handleLogout}
                >
                  {data.title}
                </Button>
              ) : (
                <p
                  className={`font-medium text-xl ${
                    data.url === pathname ? "text-primary" : "text-white"
                  }`}
                >
                  <a href={data.url}>{data.title}</a>
                </p>
              )
            )}
      </div>
    </div>
  );
};

export default Navbar;
