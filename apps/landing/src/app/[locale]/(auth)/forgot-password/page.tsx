import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useLocale } from "next-intl";

export default function Login() {
  const locale = useLocale();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 -mt-16">
      <div className="w-full max-w-md space-y-8">
        <Card className="shadow-xl bg-slate-50 dark:bg-slate-900">
          <CardContent className="pt-8 px-6 pb-6 space-y-6">
            <h1 className="text-3xl font-semibold mb-8 text-center">
              Forgot your password?
            </h1>

            <p className="text-center text-gray-400">
              To reset your password, please enter the email address of your
              Stonix account.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm" htmlFor="email">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-12"
                />
              </div>
            </div>

            <Button className="w-full h-12 font-medium">
              Reset my password
            </Button>

            <p className="text-center text-gray-400">
              <Link
                href={`/${locale}/signin`}
                className="transition-colors underline"
              >
                Go to sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
