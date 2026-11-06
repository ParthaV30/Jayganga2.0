import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#202522",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "AURA FORGE | Architectural Stall Fabrication & Exhibition Solutions",
  description: "Established international exhibition stall design, precision fabrication, and turnkey execution company creating world-class architectural brand environments.",
  keywords: [
    "Stall Fabrication",
    "Exhibition Booth Design",
    "3D Exhibition Stall",
    "Custom Pavilions",
    "Modular Stalls",
    "Trade Show Architecture",
    "Auto Expo Stalls",
    "Turnkey Exhibition Solutions"
  ],
  authors: [{ name: "AURA FORGE Spatial Architecture" }],
  openGraph: {
    title: "AURA FORGE | Architectural Stall Fabrication & Exhibition Solutions",
    description: "Transforming empty exhibition concrete into extraordinary brand experiences through precision engineering and turnkey execution.",
    type: "website",
    locale: "en_US",
    siteName: "AURA FORGE"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F2EFE8] text-[#292B28] selection:bg-[#C65D36] selection:text-white">
        {children}
      </body>
    </html>
  );
}
