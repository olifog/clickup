
import NextAuth from "next-auth";
import clickUp from "next-auth/providers/click-up";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [clickUp({
    clientId: process.env.AUTH_CLICKUP_CLIENT_ID,
    clientSecret: process.env.AUTH_CLICKUP_CLIENT_SECRET
  })]
})
