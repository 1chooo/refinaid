import { useState } from "react";
import { auth } from "@/firebase/config";
import { GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";

export const useGithubLogin = () => {
  const [errorGithubLogin, setErrorGithubLogin] = useState<boolean | null>(
    null,
  );
  const [isPendingGithubLogin, setIsPendingGithubLogin] = useState(false);
  const provider = new GithubAuthProvider();

  const githubLogin = async () => {
    setErrorGithubLogin(null);
    setIsPendingGithubLogin(true);

    try {
      const res = await signInWithPopup(auth, provider);
      if (!res) {
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorGithubLogin(error.code);
      await signOut(auth);
    } finally {
      setIsPendingGithubLogin(false);
    }
  };

  return { githubLogin, errorGithubLogin, isPendingGithubLogin };
};
