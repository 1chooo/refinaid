import { useState } from "react";
import { auth } from "@/firebase/config";
import { sendEmailVerification } from "firebase/auth";

export const useEmailVerification = () => {
  const [isEmailVerificationSent, setIsEmailVerificationSent] = useState(false);
  const [isEmailVerificationPending, setIsEmailVerificationPending] =
    useState(false);
  const [errorVerificationLink, setErrorVerificationLink] = useState<
    string | null
  >(null);

  const sendEmailVerificationLink = async () => {
    setIsEmailVerificationPending(true);

    try {
      const user = auth.currentUser;

      if (user) {
        await sendEmailVerification(user);
        setIsEmailVerificationSent(true);
      } else {
        setErrorVerificationLink("No user is currently logged in.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorVerificationLink(
        "Error sending verification email : " + error.message,
      );
    } finally {
      setIsEmailVerificationPending(false);
    }
  };

  return {
    isEmailVerificationSent,
    isEmailVerificationPending,
    errorVerificationLink,
    sendEmailVerificationLink,
  };
};
