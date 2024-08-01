import NextAuth from "next-auth";
import clickUp from "next-auth/providers/click-up";

export type MySession = {
  user: {
    name: string;
    email: string;
    id: string;
    timezone: string;
    accessToken: string;
  };
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    clickUp({
      clientId: process.env.AUTH_CLICKUP_CLIENT_ID,
      clientSecret: process.env.AUTH_CLICKUP_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, profile, account }) {
      const profileUser = profile?.user as {
        email: string;
        timezone: string;
        id: string;
      };
      if (profile && account) {
        token.id = profileUser.id;
        token.name = user.name;
        token.email = profileUser.email;
        token.timezone = profileUser.timezone;
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        name: token.name || "",
        email: token.email || "",
        id: token.id as string,
        timezone: token.timezone as string,
        accessToken: token.accessToken as string,
        emailVerified: null,
      };
      return session;
    },
  },
});
