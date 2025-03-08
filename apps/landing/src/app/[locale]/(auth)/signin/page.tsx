"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useAuthContext } from "@/context/auth-context";
import { useGoogleLogin } from "@/firebase/auth/google-login";
import { useEmailPasswordLogin } from "@/firebase/auth/email-password-login";
import { useEmailPasswordRegistration } from "@/firebase/auth/email-password-registration";
import { useEmailVerification } from "@/firebase/auth/email-verification-link";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export default function Home() {
  const { user } = useAuthContext();
  const locale = useLocale();
  const router = useRouter();

  const { googleLogin, isPendingGoogleLogin } = useGoogleLogin();
  const {
    emailPasswordLogin,
    errorEmailPasswordLogin,
    isPendingEmailPasswordLogin,
  } = useEmailPasswordLogin();
  const { errorEmailPasswordRegistration, isPendingEmailPasswordRegistration } =
    useEmailPasswordRegistration();
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
    if (user?.emailVerified) {
      router.push(`/${locale}/dashboard`);
    }
  }, [user, locale, router]);

  async function onSubmitEmailPasswordLogin(
    data: z.infer<typeof FormSchemaEmailPassword>,
  ) {
    await emailPasswordLogin(data.email, data.password);
  }

  const handleSendVerificationEmail = async () => {
    try {
      await sendEmailVerificationLink();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 -mt-16">
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
          <div className="w-full">
            <Card className="shadow-xl bg-slate-50 dark:bg-slate-900">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Welcome back</CardTitle>
                <CardDescription>Login to your Stonix account</CardDescription>
              </CardHeader>

              <CardContent className=" px-6 pb-6 space-y-6">
                <div className="grid gap-6">
                  <div className="space-y-3">
                    <Button
                      className="w-full"
                      type="button"
                      variant="secondary"
                      onClick={googleLogin}
                      disabled={
                        isPendingGoogleLogin ||
                        isPendingEmailPasswordLogin ||
                        isPendingEmailPasswordRegistration ||
                        isEmailVerificationPending
                      }
                    >
                      {isPendingGoogleLogin ? (
                        <Shell className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                          />
                        </svg>
                      )}
                      Sign in with Google
                    </Button>
                  </div>

                  <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

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
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link
                          href={`/${locale}/forgot-password`}
                          className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormField
                        control={formEmailPassword.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                id="password"
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
                    </div>

                    <div className="w-full flex items-center gap-2">
                      <Button
                        className="w-full"
                        type="submit"
                        disabled={
                          isPendingGoogleLogin ||
                          isPendingEmailPasswordLogin ||
                          isPendingEmailPasswordRegistration ||
                          isEmailVerificationPending
                        }
                        onClick={formEmailPassword.handleSubmit(
                          onSubmitEmailPasswordLogin,
                        )}
                      >
                        {isPendingEmailPasswordLogin && (
                          <Shell className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Sign in
                      </Button>
                    </div>
                    {(errorEmailPasswordLogin ||
                      errorEmailPasswordRegistration) && (
                      <span className="text-red-500 text-center text-sm block mt-4 font-semibold">
                        {errorEmailPasswordLogin ===
                          "auth/invalid-login-credentials" &&
                          "Invalid email or password"}
                        <br />
                        {errorEmailPasswordRegistration ===
                          "auth/email-already-in-use" &&
                          "This user already exists "}
                      </span>
                    )}
                  </form>
                </Form>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href={`/${locale}/signup`}
                    className="underline underline-offset-4"
                  >
                    Sign up
                  </Link>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary ">
              By clicking continue, you agree to our{" "}
              <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
