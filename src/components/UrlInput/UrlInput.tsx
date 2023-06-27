"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icon from "@/assets/Icons/icon";
import { Loader2 } from "lucide-react";
import { LocalStorageKeys, NotificationTypes } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config/firebase";
import { showToast } from "../ShowToast/showToast";
import { type TableData } from "@/lib/commons";

interface FormInput {
  longURL: string | undefined;
  domain: string;
  shortURL: string | undefined;
}

interface Props {
  data?: TableData;
  edit?: boolean;
}

const defaultState: FormInput = { longURL: "", domain: "", shortURL: "" };

const UrlInput: React.FC<Props> = ({ data, edit }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [formInput, setFormInput] = useState<FormInput>({
    longURL: "" || data?.longURL,
    domain: "",
    shortURL: "" || data?.shortURL,
  });
  const linksCollectionRef = collection(db, "links");
  const updateLinksCollectionRef = doc(db, "links", `${data?.id}`);
  console.log("links collection", updateLinksCollectionRef);

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    const userToken = localStorage.getItem(LocalStorageKeys.TOKEN);
    const userID = localStorage.getItem(LocalStorageKeys.USERID);

    if (!userToken) {
      router.push("/auth/signup");
    }
    try {
      await addDoc(linksCollectionRef, {
        longURL: formInput.longURL,
        shortURL: formInput.shortURL,
        userID,
      });
      showToast(
        "Link has been shortened successfully",
        NotificationTypes.SUCCESS
      );

      setFormInput((prevState) => ({
        ...prevState,
        ...defaultState,
      }));
    } catch (e) {
      console.error(e);
      showToast("Error shortening link", NotificationTypes.ERROR);
    }
    setLoading(false);
  };

  const handleEdit = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    const userID = localStorage.getItem(LocalStorageKeys.USERID);

    try {
      updateDoc(updateLinksCollectionRef, {
        longURL: formInput.longURL,
        shortURL: formInput.shortURL,
        userID,
      });
      setLoading(false);
      showToast(
        "Link has been updated successfully",
        NotificationTypes.SUCCESS
      );
    } catch (error) {
      console.error(e);
      showToast("Error updating link", NotificationTypes.ERROR);
    }
    setLoading(false);
  };

  return (
    <div>
      <Card className="w-[508px] h-[496px] bg-neutral">
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={!edit ? handleSubmit : handleEdit}>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="url" className="font-medium text-lg text-black">
                Shorten your URL
              </Label>
              <Input
                id="url"
                tabIndex={-1}
                name="longURL"
                value={formInput.longURL}
                placeholder="Paste URL here"
                className="rounded-3xl border-primary h-14"
                onChange={handleFormInput}
              />
            </div>
            <div className="flex flex-col space-y-1.5 mt-[35px]">
              <Label htmlFor="url" className="font-medium text-lg text-black">
                Customise your link (optional)
              </Label>
              <div className="flex gap-4">
                <Input
                  id="url"
                  name="domain"
                  tabIndex={-1}
                  placeholder="Add domain"
                  onChange={handleFormInput}
                  className="rounded-3xl border-primary h-14 active:border-primary focus:border-primary"
                />
                <Input
                  id="url"
                  name="shortURL"
                  tabIndex={-1}
                  value={formInput.shortURL}
                  placeholder="Enter alias"
                  onChange={handleFormInput}
                  className="rounded-3xl border-primary h-14"
                />
              </div>
            </div>
            <Button
              className="w-full h-14 text-lg text-black font-semibold gap-4 mt-8"
              type="submit"
            >
              {!loading ? (
                <>
                  {!edit ? (
                    <p className="cursor-pointer">Shorten URL</p>
                  ) : (
                    <p className="cursor-pointer">Edit URL</p>
                  )}
                  <Icon name="magic" />
                </>
              ) : (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col mt-2">
          <p className="text-center text-black text-sm mt-3">
            By clicking Shorten URL, I agree to the Terms of Service, Privacy
            Policy and Use of Cookies.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UrlInput;
