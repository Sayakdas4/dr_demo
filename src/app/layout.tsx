import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DarkModeSwitcher from "@/components/DarkModeSwitcher";
import BodyWrapper from "@/components/BodyWrapper";
import { Providers } from './providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVars = `${geistSans.variable} ${geistMono.variable}`;
  return (
    <html lang="en" className="ssss">
      <head>
        <link rel="stylesheet" href="/dist/css/style-theme.css" />
      </head>
      {/* <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased login`}
      >
        {children}
        <DarkModeSwitcher />
      </body> */}
      <BodyWrapper fonts={fontVars}>
        <Providers>
          {children}
        </Providers>
        {/* <DarkModeSwitcher /> */}
      </BodyWrapper>
    </html>
  );
}
