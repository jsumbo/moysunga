import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Mono, DM_Sans, Playfair_Display } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { SkipLink } from "@/components/skip-link";
import { eventContent } from "@/lib/event-content";

import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: eventContent.meta.title,
  description: eventContent.meta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-cream font-sans text-ink antialiased">
        <SkipLink />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
