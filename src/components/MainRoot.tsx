"use client"

import { fetcher } from "@/lib/api"
import { SWRConfig } from "swr"
import { ReactNode } from 'react';
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function MainRoot({ children, session }: { children: ReactNode, session: Session | null }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SessionProvider session={session}>
        <SWRConfig value={{
          fetcher: fetcher
        }} >{children}</SWRConfig>
      </SessionProvider>
    </LocalizationProvider>
  )
}