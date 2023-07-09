/* eslint-disable react/no-unescaped-entities */
import React from "react";
import {
  Sheet,
  SheetContent,
  // SheetHeader,
  // SheetTitle,
  // SheetDescription,
  // SheetFooter,
  // SheetClose,
} from "@/components/ui/sheet";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { Label } from "@/components/ui/label";

interface Props {
  isDrawerOpen: boolean;
  toggleDrawer: any;
}

const SideBar: React.FC<Props> = ({ isDrawerOpen, toggleDrawer }) => {
  return (
    <div>
      <Sheet open={isDrawerOpen} onOpenChange={toggleDrawer}>
        <SheetContent
          position="right"
          className="border-none bg-foregroundVarOne lg:w-[580px] w-3/4 flex justify-center items-center"
        >
          {/* <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
         
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter> */}
          <Button className=" text-black bg-transparent border border-primary h-[48px] lg:w-[138px] w-full font-medium">
            <Link href="/">Coming Soon</Link>
          </Button>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SideBar;
