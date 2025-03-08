"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuthContext } from "@/context/auth-context";
import { useEmailPasswordLogin } from "@/firebase/auth/email-password-login";
import { useEmailPasswordRegistration } from "@/firebase/auth/email-password-registration";
import { useEmailVerification } from "@/firebase/auth/email-verification-link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Shell } from "lucide-react";

const FormSchemaEmailPassword = z.object({
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email({
      message: "Please enter a valid email.",
    }),
  password: z
    .string({
      required_error: "Password is required.",
    })
    .min(8, {
      message: "Password must be at least 8 characters.",
    }),
});

export default function SignUpPage() {
  const { user } = useAuthContext();
  const locale = useLocale();
  const router = useRouter();

  const { isPendingEmailPasswordLogin } = useEmailPasswordLogin();
  const {
    emailPasswordRegistration,
    errorEmailPasswordRegistration,
    isPendingEmailPasswordRegistration,
  } = useEmailPasswordRegistration();
  const {
    isEmailVerificationSent,
    isEmailVerificationPending,
    errorVerificationLink,
    sendEmailVerificationLink,
  } = useEmailVerification();

  const formEmailPassword = useForm<z.infer<typeof FormSchemaEmailPassword>>({
    resolver: zodResolver(FormSchemaEmailPassword),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user && user.emailVerified) {
      router.push(`/${locale}/dashboard`);
    }
  }, [user, locale, router]);

  async function onSubmitEmailPasswordRegistration(
    data: z.infer<typeof FormSchemaEmailPassword>,
  ) {
    await emailPasswordRegistration(data.email, data.password);
  }

  const handleSendVerificationEmail = async () => {
    try {
      await sendEmailVerificationLink();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 -mt-20">
      <div className="w-full max-w-md space-y-8">
        {user ? (
          <div className="w-full flex flex-col items-center gap-4">
            <h1 className="text-center text-xl font-bold">Connected !</h1>
            <p>
              Hey{" "}
              <b className="italic underline underline-offset-4">
                {user.email}
              </b>{" "}
              👋
            </p>
            {user.emailVerified ? (
              <p className="text-green-900 text-md font-semibold">
                Your email is verified. Redirecting to dashboard...
              </p>
            ) : (
              <>
                <p className="text-red-600 text-md font-semibold">
                  Your email is not verified.
                </p>
                <Button
                  disabled={
                    isPendingEmailPasswordLogin ||
                    isPendingEmailPasswordRegistration ||
                    isEmailVerificationPending
                  }
                  onClick={handleSendVerificationEmail}
                >
                  {isEmailVerificationPending && (
                    <Shell className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Send verification email
                </Button>
              </>
            )}
            {isEmailVerificationSent && (
              <p className="text-green-900 text-md font-semibold">
                The email was successfully sent, check your email box to confirm
              </p>
            )}
            {errorVerificationLink && (
              <p className="text-red-900 text-md font-semibold">
                {errorVerificationLink}
              </p>
            )}
          </div>
        ) : (
          <Card className="shadow-xl bg-slate-50 dark:bg-slate-900">
            <CardContent className="pt-8 px-6 pb-6 space-y-6">
              <h1 className="text-3xl font-semibold  mb-8">Get Started</h1>

              <Form {...formEmailPassword}>
                <form className="w-full space-y-6">
                  <FormField
                    control={formEmailPassword.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="m@example.com"
                            required
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formEmailPassword.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="************"
                            required
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="w-full h-12 font-medium"
                    type="button"
                    disabled={
                      isPendingEmailPasswordLogin ||
                      isPendingEmailPasswordRegistration ||
                      isEmailVerificationPending
                    }
                    onClick={formEmailPassword.handleSubmit(
                      onSubmitEmailPasswordRegistration,
                    )}
                  >
                    {isPendingEmailPasswordRegistration && (
                      <Shell className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Sign Up
                  </Button>
                  {errorEmailPasswordRegistration && (
                    <span className="text-red-500 text-center text-sm block mt-4 font-semibold">
                      {errorEmailPasswordRegistration ===
                        "auth/email-already-in-use" &&
                        "This user already exists "}
                    </span>
                  )}
                </form>
              </Form>

              <p className="text-center text-gray-400">
                Have an account?{" "}
                <Link
                  href={`/${locale}/signin`}
                  className="transition-colors underline"
                >
                  Sign in now
                </Link>
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
