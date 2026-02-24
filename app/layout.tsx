import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/layout/Nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Michelle Portfolio",
  description: "Professional portfolio for Christy Sebastini",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="absolute left-4 top-4 z-[100] -translate-y-full rounded bg-primary px-4 py-2 text-primary-foreground outline-none ring-2 ring-ring transition-transform focus:translate-y-0 focus:outline-none"
        >
          Skip to main content
        </a>
        <Nav />
        <main
          id="main-content"
          className="min-h-[calc(100vh-3.5rem)]"
          tabIndex={-1}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
