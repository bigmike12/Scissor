"use client";
import { analytics, db } from "@/firebase/config/firebase";
import { addHttpPrefix, removeLeadingSlash } from "@/lib/utils";
import { logEvent } from "firebase/analytics";
import { collection, getDocs, query, where } from "firebase/firestore";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const URLRedirect = () => {
  const pathname = usePathname();

  const path = removeLeadingSlash(pathname);
  if (typeof window !== "undefined" && analytics !== null) {
    logEvent(analytics, `/${path} visited`);
  }
  useEffect(() => {
    const redirect = async () => {
      const linksRef = collection(db, "links");
      const docRef = query(linksRef, where("shortURL", "==", `${path}`));
      const querySnapshot = await getDocs(docRef);
      // Either mothods below works
      querySnapshot.forEach((doc) => {
        // Access the document data using doc.data()
        const url = addHttpPrefix(doc.data().longURL);
        window.location.href = url;
      });

      // if (!querySnapshot.empty) {
      //   const doc = querySnapshot.docs[0];
      //   const url = addHttpPrefix(doc.data().longURL);
      //   window.location.href = url;
      // }
    };

    redirect();
  }, []);
  return <div></div>;
};

export default URLRedirect;
