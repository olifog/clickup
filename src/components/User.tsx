"use client";

import { Team } from "@/app/api/clickup/team/route";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export const User = ({team}: {team?: Team}) => {
  const { data: session } = useSession();

  return (
    <div className="space-x-2 w-full flex justify-end items-center px-4">
      {
        session && session.user.name && (
          <span className="font-semibold">{session.user.name}</span>
        )
      }
      {
        team && (
          <span className="font-bold text-white px-2 rounded-xl py-1" style={{backgroundColor: team ? team.color : "#1233BA"}}>{team.name}</span>
        )
      }
      <Button variant="outline" onClick={() => signOut()}>Sign Out</Button>
    </div>
  )
}
