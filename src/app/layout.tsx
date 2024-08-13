import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { dark } from '@clerk/themes';
import LeftBar from "@/components/LeftBar";
import RightBar from "@/components/RightBar";
import { ThemeProvider } from "@/providers/ThemeProvider"


const manrope = Manrope({ subsets: ["latin"] });

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
        <body className={`${manrope.className} flex w-full h-screen overflow-hidden`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <LeftBar />
            <section className="xl:w-1/2 w-2/3 
            bg-dark-primary h-screen overflow-y-auto">
              {children}
            </section>
            <RightBar />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}