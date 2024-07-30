"use client"

import { fetcher } from "@/lib/api"
import { SWRConfig } from "swr"
import { ReactNode } from 'react';
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export default function MainRoot({ children, session }: { children: ReactNode, session: Session | null }) {
  return (
    <SessionProvider session={session}>
      <SWRConfig value={{
        fetcher: fetcher
      }} >{children}</SWRConfig>
    </SessionProvider>
  )
}