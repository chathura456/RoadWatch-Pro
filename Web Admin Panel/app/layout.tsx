import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script"; // Import Script component for loading external scripts
import "./ui/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RoadWatch Pro",
  description: "Automating Traffic Violation Detection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add roboflow.js via Script tag */}
        <Script src="https://cdn.jsdelivr.net/npm/inferencejs"></Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
