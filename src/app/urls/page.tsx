"use client";
import Icon from "@/assets/Icons/icon";
import React, { useEffect, useState } from "react";
import SideBar from "@/components/SideBar/SideBar";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/config/firebase";
import UrlCard from "@/components/UrlCard/UrlCard";
import { type TableData } from "@/lib/commons";
import { LocalStorageKeys, isNotEmptyArray } from "@/lib/utils";

const EmptyTable = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-[70px]">
      <div className="h-[300px] w-[300px] bg-backgroundVarOne flex justify-center items-center rounded-full">
        <Icon name="emptyLinks" />
      </div>
      <div className="text-center mt-4">
        <h1 className="text-[32px] font-semibold">No link found</h1>
        <p className="text-lg">You do not have any active links yet </p>
      </div>
    </div>
  );
};

const MyUrls = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [myUrlsData, setMyUrlsData] = useState<any[]>([]);

  let userID;

  if (typeof window !== "undefined") {
    // Perform localStorage action
    userID = localStorage.getItem(LocalStorageKeys.USERID);
  }

  useEffect(() => {
    const getList = async () => {
      // READ THE DATA
      try {
        const data = await getDocs(q);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setMyUrlsData(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getList();
  }, []);

  const linksCollectionRef = collection(db, "links");

  const q = query(linksCollectionRef, where("userID", "==", `${userID}`));

  const handleOpenDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="">
      {myUrlsData.length === 0 ? (
        <EmptyTable />
      ) : (
        <div className="mt-8">
          <div className="flex justify-center mb-6">
            <h2 className="font-bold text-[32px]">My recent URLs</h2>
          </div>
          <div className="flex flex-col gap-6">
            {isNotEmptyArray(myUrlsData) &&
              myUrlsData?.map((data: TableData, index: number) => (
                <div key={index}>
                  <UrlCard data={data} handleOpenDrawer={handleOpenDrawer} />
                </div>
              ))}
          </div>
        </div>
      )}
      <SideBar isDrawerOpen={drawerOpen} toggleDrawer={setDrawerOpen} />
    </div>
  );
};

export default MyUrls;
