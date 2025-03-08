import { useState } from "react";
import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export const useEmailPasswordLogin = () => {
  const [errorEmailPasswordLogin, setErrorEmailPasswordLogin] = useState(null);
  const [isPendingEmailPasswordLogin, setIsPendingEmailPasswordLogin] =
    useState(false);

  const emailPasswordLogin = async (email: string, password: string) => {
    setErrorEmailPasswordLogin(null);
    setIsPendingEmailPasswordLogin(true);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (!res.user) {
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorEmailPasswordLogin(error.code);
      await signOut(auth);
    } finally {
      setIsPendingEmailPasswordLogin(false);
    }
  };

  return {
    emailPasswordLogin,
    errorEmailPasswordLogin,
    isPendingEmailPasswordLogin,
  };
};
