'use client'

import { Input } from "@/components/ui/input"
import {
  FileTextIcon,
  PencilLine,
  Network,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import React from 'react'
import Hero from "@/components/hero";
import Link from "next/link";

type CardProps = {
  tools: Tool[]
  title: string
}

type Tool = {
  label: string
  link: string
  keywords: string[]
  color: string
  icon: LucideIcon
}

const TOOLS = [
  {
    label: 'Generator',
    links: [
      {
        label: 'E-mail Signature Generator',
        link: '/email-signature',
        keywords: ['Generator', 'Password', 'Random'],
        color: '#f783ac',
        icon: PencilLine
      }
    ]
  },
  {
    label: 'Network',
    links: [
      {
        label: 'Subnet Calculator',
        link: '/#get-started',
        keywords: ['PDF', 'Viewer', 'Document', 'File', 'Document'],
        color: '#15aabf',
        icon: Network
      }
    ]
  },
  {
    label: 'Editor',
    links: [
      {
        label: 'Markdown Previewer',
        link: '/markdown-previewer',
        keywords: ['Word', 'Counter', 'Calculation', 'Text'],
        color: '#4c6ef5',
        icon: FileTextIcon
      }
    ]
  },
]


function Home() {
  const [value, setValue] = React.useState('')

  const filter = (tool: Tool): boolean =>
    tool.label.toLowerCase().includes(value.toLowerCase()) ||
    tool.keywords.some((keyword) =>
      keyword.toLowerCase().includes(value.toLowerCase())
    )

  return (
    <div>
      <Hero />
      <div className='flex flex-col items-start'>
        <Input
          type='text'
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          placeholder='Search'
          className='w-full'
        />
        <div
          id='get-started'
          className='my-12 flex w-full scroll-mt-20 flex-col gap-6'
        >
          {value
            ? TOOLS.filter((t) => t.links.some((tool) => filter(tool))).map(
              (t) => {
                const { label, links } = t
                const filtered = links.filter((tool) => filter(tool))

                return <Card key={label} tools={filtered} title={label} />
              }
            )
            : TOOLS.map((tool) => {
              const { label, links } = tool

              return <Card key={label} tools={links} title={label} />
            })}
        </div>
      </div>
    </div>
  );
};

function Card({ tools, title }: CardProps) {
  return (
    <div className='w-full rounded-lg border p-4'>
      <div>{title}</div>
      <div className='mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3'>
        {tools.map((tool) => (
          <Item key={tool.label} {...tool} />
        ))}
      </div>
    </div>
  )
}

function Item({ color, icon, label, link }: Tool) {
  const Icon = icon

  return (
    <Link
      href={link}
      className='flex flex-col items-center justify-center rounded-lg bg-accent p-4 text-center transition-colors duration-300 hover:bg-accent-highlight'
    >
      <Icon color={color} size={32} />
      <div className='mt-1.5'>{label}</div>
    </Link>
  )
}


export default Home;
