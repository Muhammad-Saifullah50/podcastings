import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { dark } from '@clerk/themes';
import LeftBar from "@/components/LeftBar";
import RightBar from "@/components/RightBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Podcastings",
  description: "AI powered Podcast Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark
      }}>

      <html lang="en">
        <body className={`${inter.className} flex w-full`}>
          <LeftBar />
          {children}
          <RightBar />
        </body>
      </html>
    </ClerkProvider>
  )
}