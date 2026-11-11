import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#202522",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "JAYGANGA | Architectural Stall Fabrication & Exhibition Solutions",
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
  authors: [{ name: "JAYGANGA Spatial Architecture" }],
  openGraph: {
    title: "JAYGANGA | Architectural Stall Fabrication & Exhibition Solutions",
    description: "Transforming empty exhibition concrete into extraordinary brand experiences through precision engineering and turnkey execution.",
    type: "website",
    locale: "en_US",
    siteName: "JAYGANGA"
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
      className={`${outfit.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F2EFE8] text-[#292B28] selection:bg-[#C65D36] selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
