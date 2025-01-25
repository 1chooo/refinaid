"use client"

import { Input } from "@/components/ui/input"
import {
  CloudRainWind,
  Library,
  Bot,
  ChartSpline,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import React from "react"
import Hero from "@/components/hero";
import Link from "next/link";

type CardProps = {
  playgrounds: Playground[]
  title: string
}

type Playground = {
  label: string
  link: string
  keywords: string[]
  color: string
  icon: LucideIcon
}

const playgrounds = [
  {
    label: "Simple AI",
    links: [
      {
        label: "Classifier",
        link: "/#get-started",
        keywords: ["AI", "Machine Learning", "Model", "Predict"],
        color: "#fa5252",
        icon: Library,
      },
      {
        label: "Plum",
        link: "/#get-started",
        keywords: ["AI", "Machine Learning", "Model", "Predict"],
        color: "#40c057",
        icon: CloudRainWind,
      },
      {
        label: "Regressions",
        link: "/#get-started",
        keywords: ["AI", "Machine Learning", "Model", "Predict"],
        color: "#fd7e14",
        icon: ChartSpline,
      },
    ]
  },
  {
    label: "Chatger",
    links: [
      {
        label: "Judge",
        link: "/#get-started",
        keywords: ["Python", "Large Language Model", "Leetcode"],
        color: "#15aabf",
        icon: Bot
      },
    ]
  },
]


function Home() {
  const [value, setValue] = React.useState("")

  const filter = (playground: Playground): boolean =>
    playground.label.toLowerCase().includes(value.toLowerCase()) ||
    playground.keywords.some((keyword) =>
      keyword.toLowerCase().includes(value.toLowerCase())
    )

  return (
    <div>
      <Hero />
      <div className="flex flex-col items-start">
        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          placeholder="Search"
          className="w-full"
        />
        <div
          id="get-started"
          className="my-12 flex w-full scroll-mt-20 flex-col gap-6"
        >
          {value
            ? playgrounds.filter((t) => t.links.some((playground) => filter(playground))).map(
              (t) => {
                const { label, links } = t
                const filtered = links.filter((playground) => filter(playground))

                return <Card key={label} playgrounds={filtered} title={label} />
              }
            )
            : playgrounds.map((playground) => {
              const { label, links } = playground

              return <Card key={label} playgrounds={links} title={label} />
            })}
        </div>
      </div>
    </div>
  );
};

function Card({ playgrounds, title }: CardProps) {
  return (
    <div className="w-full rounded-lg border p-4">
      <div>{title}</div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {playgrounds.map((playground) => (
          <Item key={playground.label} {...playground} />
        ))}
      </div>
    </div>
  )
}

function Item({ color, icon, label, link }: Playground) {
  const Icon = icon

  return (
    <Link
      href={link}
      className="flex flex-col items-center justify-center rounded-lg bg-accent p-4 text-center transition-colors duration-300 hover:bg-accent-highlight"
    >
      <Icon color={color} size={32} />
      <div className="mt-1.5">{label}</div>
    </Link>
  )
}


export default Home;
