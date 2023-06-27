import { LocalStorageKeys } from "@/lib/utils";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

interface Props {
  email: string;
  password: string;
}

export default async function signUp({ email, password }: Props) {
  let result = null;
  let error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    const userToken = await result.user.getIdToken();
    const userID = await result.user.uid;

    localStorage.setItem(LocalStorageKeys.TOKEN, userToken);
    localStorage.setItem(LocalStorageKeys.USERID, userID);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
