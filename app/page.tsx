import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: "JAYGANGA | Exhibition Stall Fabrication & 3D Booth Design India",
  description: "Top-rated exhibition stall fabrication and custom booth design company in India. 45,000 sq.ft mechanized workshops in Coimbatore executing turnkey expo stalls, modular pavilions, and trade show booths across India.",
  alternates: {
    canonical: "https://www.stallfabricator.in",
  },
  openGraph: {
    title: "JAYGANGA | Exhibition Stall Fabrication & 3D Booth Design India",
    description: "Top-rated exhibition stall fabrication company in India. Turnkey custom expo stalls, 3D modular booths, and trade show pavilions.",
    url: "https://www.stallfabricator.in",
    siteName: "JAYGANGA Expo Stall Fabrication",
    images: [
      {
        url: "/images/logo.png",
        width: 458,
        height: 458,
        alt: "JAYGANGA Expo Stall Fabrication Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function HomePage() {
  return <HomeClient />;
}
