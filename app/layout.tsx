import React, { ReactNode, useEffect, useState } from 'react';
import { Inter } from '@next/font/google';
import { logo } from '../assets';
import Link from 'next/link';
import Image from 'next/image';
import '../styles/globals.css';
interface props {
  children: React.ReactNode;
}
const inter = Inter({ subsets: ['latin-ext'] });

export default function Layout({ children }: props) {
  return (
    <html className={`${inter.className}`} lang="en">
      <head>
        <title>AI IMAGE</title>
      </head>

      <body>
        <header className="flex w-full items-center justify-between border-b border-b-[#e6ebf4] bg-white px-4 py-4 sm:px-8">
          <Link href="/">
            <Image
              width={112}
              height={112}
              src={logo}
              alt="logo"
              className="object-contain"
            ></Image>
          </Link>
          <Link
            href={'/create-post'}
            className="rounded bg-[#6469ff] px-4 py-2 font-medium text-white"
          >
            Create
          </Link>
        </header>
        <main className="min-h-[calc(100vh-73px)] w-full bg-[#f9fafe] px-4 py-8 sm:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
