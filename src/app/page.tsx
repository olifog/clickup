"use client"

import { User } from "@/components/User";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useSWR from "swr";

export default function Home() {
  const {data: session} = useSession()

  const { data: teams, isLoading } = useSWR(session ? {url: '/api/clickup/team', accessToken: session.user.accessToken} : null)
  if (!session) {
    redirect("/api/auth/signin")
  }

  console.log(teams)

  return (
    <div>
      <User />
      <div>
        {teams ? teams.teams.map((team: any) => <div key={team.id}>{team.name}</div>) : "Loading..."}
      </div>
    </div>
  )
}