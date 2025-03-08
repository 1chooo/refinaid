import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { ArrowUpRightIcon } from "@primer/octicons-react";
import { useLocale } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { getGitHubStars } from "@/lib/github";
import { numberFormatter } from "@/lib/utils";

export async function GitHubStars() {
  const stars = await getGitHubStars();
  return (
    <>
      <Badge variant="secondary" className="ml-1 hidden sm:block">
        {numberFormatter(stars)}
      </Badge>
      <Badge variant="secondary" className="ml-1 block sm:hidden">
        {stars}
      </Badge>
    </>
  );
}

export function GitHubStarsFallback() {
  return (
    <Badge variant="secondary" className="ml-1">
      ~
    </Badge>
  );
}

export default function GetStarted() {
  const locale = useLocale();

  return (
    <div className="my-10 grid gap-2 sm:grid-cols-2">
      <div className="text-center sm:block sm:text-right">
        <Button className="w-48 rounded-full sm:w-auto" asChild>
          <Link href={`/${locale}/dashboard`}>
            Get Started
            <ArrowUpRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
      <div className="text-center sm:block sm:text-left">
        <Button
          variant="outline"
          className="w-48 rounded-full sm:w-auto"
          asChild
        >
          <Link
            href="https://github.com/1chooo/stonix"
            target="_blank"
            rel="noreferrer"
            aria-label="Star on GitHub"
          >
            Star on GitHub{" "}
            <Suspense fallback={<GitHubStarsFallback />}>
              <GitHubStars />
            </Suspense>
          </Link>
        </Button>
      </div>
    </div>
  );
}
