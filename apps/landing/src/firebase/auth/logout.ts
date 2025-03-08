import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";

export const useLogout = () => {
  const logout = async () => {
    try {
      await signOut(auth);
      console.log("user logged out");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return { logout };
};
