import type { Metadata } from "next";
import { Instrument_Serif, Instrument_Sans } from "next/font/google";
import { DesktopGuard } from "@/components/DesktopGuard";
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

export const metadata: Metadata = {
  title: "Kyrgyzstan - Land of Celestial Mountains",
  description: "A journey through the history, culture, and landscapes of Kyrgyzstan.",
  icons: {
    icon: "/flag.svg",
    shortcut: "/flag.svg",
    apple: "/flag.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSerif.variable} ${instrumentSans.variable} antialiased font-sans bg-zinc-50 text-zinc-900`}
      >
        <DesktopGuard>
          {children}
        </DesktopGuard>
      </body>
    </html>
  );
}
