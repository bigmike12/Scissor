/* eslint-disable @typescript-eslint/await-thenable */
import { LocalStorageKeys } from "@/lib/utils";
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";

export default async function googleSignIn() {
  let result = null;
  let error = null;
  try {
    result = await signInWithPopup(auth, googleProvider);
    const userToken = await result.user.getIdToken();
    const userID = await result.user.uid;

    localStorage.setItem(LocalStorageKeys.TOKEN, userToken);
    localStorage.setItem(LocalStorageKeys.USERID, userID);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
