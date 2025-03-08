import { useState } from "react";
import { auth } from "@/firebase/config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

export const useGoogleLogin = () => {
  const [errorGoogleLogin, setErrorGoogleLogin] = useState<boolean | null>(
    null,
  );
  const [isPendingGoogleLogin, setIsPendingGoogleLogin] = useState(false);
  const provider = new GoogleAuthProvider();

  const googleLogin = async () => {
    setErrorGoogleLogin(null);
    setIsPendingGoogleLogin(true);

    try {
      const res = await signInWithPopup(auth, provider);
      if (!res) {
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorGoogleLogin(error.code);
      await signOut(auth);
    } finally {
      setIsPendingGoogleLogin(false);
    }
  };

  return { googleLogin, errorGoogleLogin, isPendingGoogleLogin };
};
