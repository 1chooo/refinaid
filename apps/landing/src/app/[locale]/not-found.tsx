import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLocale } from "next-intl";

/**
 * @see https://github.com/amannn/next-intl/tree/main/examples/example-app-router
 */
export default function LocaleNotFoundPage() {
  const locale = useLocale();
  return (
    <div className="flex h-full flex-col items-center justify-center gap-10 mt-24">
      <div className="flex flex-col items-center gap-2">
        <h1 className="flex items-center gap-2 text-9xl font-bold text-primary">
          404
        </h1>
        <h1 className="flex max-w-sm items-center gap-5 text-center text-sm text-gray-300">
          The page you are looking for doesn&apos;t exist. Please go back to the
          home page.
        </h1>
      </div>
      <Link href={`/${locale}`}>
        <Button>Home</Button>
      </Link>
    </div>
  );
}
