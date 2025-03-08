import Link from "next/link";
import { cn } from "@/lib/utils";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export default function OpenSourceBadge() {
  return (
    <div className="mt-10 z-10 flex items-center justify-center">
      <div
        className={cn(
          "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
        )}
      >
        <Link
          href="https://github.com/1chooo/stonix/stargazers"
          target="_blank"
          rel="noreferrer"
          aria-label="Star on GitHub"
        >
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span>✨ Proudly Open Source</span>
            <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedShinyText>
        </Link>
      </div>
    </div>
  );
}
