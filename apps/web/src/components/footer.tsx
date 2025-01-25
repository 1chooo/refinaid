import React from 'react'
import { Github, Mail } from 'lucide-react'
import Link from 'next/link'

import Image from 'next/image'

const Footer = () => {
  return (
    <div
      className="flex w-full flex-col items-center justify-between gap-10 border-t dark:border-[#ffffff20] py-20 lg:flex-row border-[#00000020]"
    >
      <div className="flex flex-col items-center gap-4 lg:ml-32 lg:items-start">
        <div className="flex items-center gap-2 text-xl font-bold">
          <Image
            src="https://www.1chooo.com/favicon.ico"
            alt="Logo of 1chooo"
            quality={100}
            width={32}
            height={32}
            draggable={false}
          />1chooo
        </div>
        <span className="text-xs text-[#00000070] dark:text-[#ffffff70]">
          Copyright © {new Date().getFullYear()} 1chooo
        </span>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="https://github.com/1chooo"
            className="cursor-pointer text-[#00000070] dark:text-[#ffffff70] transition-all hover:text-black dark:hover:text-white"
            target='_blank'
            rel='noreferrer noopener'
            aria-label='GitHub'
          >
            <Github />
          </Link>
          <Link
            href="mailto:hugo970217@gmail.com"
            className="ml-1 cursor-pointer text-[#00000070] dark:text-[#ffffff70] transition-all hover:text-black dark:hover:text-white"
            target='_blank'
            rel='noreferrer noopener'
            aria-label="Mail"
          >
            <Mail />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-20 sm:grid-cols-3 lg:mr-64">
        <div className="flex flex-col gap-2">
          <div className="font-medium">COMMUNITY</div>
          <Link
            href="/#"
            className="text-sm text-[#00000070] dark:text-[#ffffff70] transition-all hover:text-black dark:hover:text-white">Blog</Link>
          <Link
            href="https://github.com/1chooo/tools/issues"
            className="text-sm text-[#00000070] dark:text-[#ffffff70] transition-all hover:text-black dark:hover:text-white"
            target='_blank'
            rel='noreferrer noopener'
            aria-label="Feedback"
          >Feedback</Link>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-medium">PRODUCT</div>
          <Link
            href="/#get-started"
            className="text-sm text-[#00000070] dark:text-[#ffffff70] transition-all hover:text-black dark:hover:text-white"
          >Features</Link>
          <Link
            href="/#"
            className="text-sm text-[#00000070] dark:text-[#ffffff70] transition-all hover:text-black dark:hover:text-white"
          >Mechanism</Link>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-medium">COMPANY</div>
          <Link
            href="/#"
            className="text-sm text-[#00000070] dark:text-[#ffffff70] transition-all hover:text-black dark:hover:text-white"
          >Privacy</Link>
          <Link
            href="/#"
            className="text-sm text-[#00000070] dark:text-[#ffffff70] transition-all hover:text-black dark:hover:text-white"
          >Terms</Link>
          <Link
            href="https://github.com/1chooo/tools/blob/main/LICENSE"
            className="text-sm text-[#00000070] dark:text-[#ffffff70] transition-all hover:text-black dark:hover:text-white"
          >License</Link>
        </div>
      </div>
    </div>
  )
}

export default Footer