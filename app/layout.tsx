import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
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
          className="fixed inset-x-0 top-0 z-[100] -translate-y-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground opacity-0 transition-[transform,opacity] duration-200 focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
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
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
