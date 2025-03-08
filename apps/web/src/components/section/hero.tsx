import { useTranslations } from "next-intl";

import { AuroraText } from "@/components/magicui/aurora-text";
import { TypingAnimation } from "@/components/magicui/typing-animation";

export default function Hero() {
  const t = useTranslations("HomePage");

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center justify-center w-full h-full z-3">
        <h1 className="text-center text-4xl font-bold sm:text-8xl">
          {t("title")} <AuroraText>{t("project")}</AuroraText>
        </h1>
        <TypingAnimation
          className="px-4 py-6 text-center text-lg md:text-xl text-gh-text-secondary font-normal"
          duration={50}
        >
          {t("subtitle")}
        </TypingAnimation>
      </div>
      <p className="leading-6 text-muted-foreground text-center max-w-2xl mx-auto text-lg md:text-xl">
        {t("description")}
      </p>
    </div>
  );
}
