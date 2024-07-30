import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainRoot from "@/components/MainRoot";
import { auth } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ClickUp Mobile Mini",
  description: "A mobile mini app for ClickUp",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <MainRoot session={session}>{children}</MainRoot>
      </body>
    </html>
  );
}
