"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/header";
import { LanguageProvider } from "./lib/context/context";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <LanguageProvider>
    <html lang="en" dir="rtl">
      <head>
        <link rel="stylesheet" href="http://cdn.font-store.ir/ganjnameh.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-serif`}
      >
        <Header/>
        {children}
      </body>
    </html>
    </LanguageProvider>
  );
}
