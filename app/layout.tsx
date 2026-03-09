import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

const fontHeading = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const fontBody = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sparkle Marketing Communication",
  description:
    "Event organization for government, local companies in Bangladesh, and beyond. We create events that matter.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontHeading.variable} ${fontBody.variable} font-sans antialiased`}
      >
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
