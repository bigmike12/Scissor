import { LocalStorageKeys, NotificationTypes } from "@/lib/utils";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { showToast } from "@/components/ShowToast/showToast";

interface Props {
  email: string;
  password: string;
}

export default async function signIn({ email, password }: Props) {
  let result = null;
  let error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
    const userToken = await result.user.getIdToken();
    const userID = await result.user.uid;

    localStorage.setItem(LocalStorageKeys.TOKEN, userToken);
    localStorage.setItem(LocalStorageKeys.USERID, userID);
    showToast("Login Successful", NotificationTypes.SUCCESS);
  } catch (e) {
    error = e;
    console.log(e);
    showToast("Invalid Email or Password", NotificationTypes.ERROR);
  }

  return { result, error };
}
