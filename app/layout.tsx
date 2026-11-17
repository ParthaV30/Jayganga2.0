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
  metadataBase: new URL('https://www.stallfabricator.in'),
  title: "JAYGANGA | Expo Stall Fabrication & Exhibition Solutions",
  description: "Established exhibition stall design, precision fabrication, and turnkey execution company based in Coimbatore, creating premier brand environments across India.",
  keywords: [
    "Stall Fabrication",
    "Exhibition Booth Design",
    "3D Exhibition Stall",
    "Custom Pavilions",
    "Modular Stalls",
    "Trade Show Architecture",
    "Auto Expo Stalls",
    "Turnkey Exhibition Solutions",
    "Coimbatore Stall Fabrication"
  ],
  authors: [{ name: "JAYGANGA Expo Stall Fabrication" }],
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  verification: {
    google: "google9dafb4de4a510060",
  },
  openGraph: {
    title: "JAYGANGA | Expo Stall Fabrication & Exhibition Solutions",
    description: "Transforming empty exhibition concrete into extraordinary brand experiences through precision engineering and turnkey execution across India.",
    url: "https://www.stallfabricator.in",
    siteName: "JAYGANGA",
    images: [
      {
        url: "/images/logo.png",
        width: 458,
        height: 458,
        alt: "JAYGANGA Expo Stall Fabrication",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
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
