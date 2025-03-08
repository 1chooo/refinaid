import React from "react";

import Hero from "@/components/section/hero";
import { Gradient } from "@/components/gradient";
import { Particles } from "@/components/magicui/particles";
import GetStarted from "@/components/section/get-started";
import OpenSourceBadge from "@/components/section/open-source-badge";
import Reviews from "@/components/section/reviews";

export default function HomePage() {
  return (
    <>
      <Gradient />
      <Particles
        className="absolute top-0 left-0 w-full h-full"
        quantity={50}
      />
      <main className="relative mx-auto mb-16 max-w-4xl px-8 pt-24">
        <OpenSourceBadge />
        <div className="mt-10 flex flex-col items-center justify-center">
          <Hero />
          <GetStarted />
        </div>
      </main>
      <div className="pb-24">
        <Reviews />
      </div>
    </>
  );
}
