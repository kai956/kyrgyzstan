"use client";

import { useEffect, useState } from "react";
import type { Metadata } from "next";
import { Instrument_Serif, Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Kyrgyzstan - Land of Celestial Mountains</title>
        <meta name="description" content="A journey through the history, culture, and landscapes of Kyrgyzstan." />
      </head>
      <body
        className={`${instrumentSerif.variable} ${instrumentSans.variable} antialiased font-sans bg-zinc-50 text-zinc-900`}
      >
        {isMobile ? (
          <div className="flex h-screen w-full items-center justify-center bg-zinc-950 p-8">
            <div className="text-center">
              <h1 className="mb-4 font-serif text-4xl text-white">Desktop Only</h1>
              <p className="text-lg text-zinc-400">
                This presentation is designed for desktop viewing only.
                <br />
                Please open this site on a desktop or laptop computer.
              </p>
            </div>
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
