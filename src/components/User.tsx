"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export const User = () => {
  const { data: session } = useSession();

  return (
    <div>
      <span>{(session?.user || {name: ""}).name}</span>
      <Button variant="outline" onClick={() => signOut()}>Sign Out</Button>
    </div>
  )
}
