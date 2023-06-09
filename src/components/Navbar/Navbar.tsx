/* eslint-disable react/jsx-key */
"use client";
import React, { useEffect, useState } from "react";
import { LoggedInNavbarData, NavbarData } from "./NavbarData";
import { Button } from "../../components/ui/button";
import Icon from "../../assets/Icons/icon";
import { Mulish } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import { NotificationTypes } from "@/lib/utils";
import { showToast } from "../ShowToast/showToast";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config/firebase";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const mulish = Mulish({ subsets: ["latin"] });

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const handleLogout = () => {
    localStorage.clear();
    auth.signOut();
    showToast("Logout Successful", NotificationTypes.SUCCESS);
    router.push("/");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div
        className={`md:hidden block ${mulish.className}text-black mt-3 ml-3 flex`}
      >
        <NavigationMenu>
          <NavigationMenuItem className="list-none">
            <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-[400px]">
              <div className="flex flex-col gap-3 p-3">
                {user === null
                  ? NavbarData.map((data) =>
                      data.id === 5 ? (
                        <Button className="text-base font-medium text-black">
                          <a href={data.url}>{data.title}</a>
                        </Button>
                      ) : (
                        <p
                          className={`font-medium text-xl ${
                            data.url === pathname
                              ? "text-primary"
                              : "text-black"
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
                            data.url === pathname
                              ? "text-primary"
                              : "text-black"
                          }`}
                        >
                          <a href={data.url}>{data.title}</a>
                        </p>
                      )
                    )}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenu>
        <a href="/">
          <Icon name="logo" />
        </a>
      </div>
      <div
        className={`hidden h-[80px] px-[120px] w-full lg:flex items-center justify-between mb-[30px] z-auto ${mulish.className}`}
      >
        <a href="/">
          <Icon name="logo" />
        </a>

        <div className="flex gap-12">
          {user === null
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
    </>
  );
};

export default Navbar;
