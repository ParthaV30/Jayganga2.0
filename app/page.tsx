import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: "Stall Fabrication in Coimbatore, Tamil Nadu | JAYGANGA Expo Stall Fabricators India",
  description: "Premier stall fabrication in Coimbatore & Tamil Nadu. JAYGANGA delivers turnkey exhibition stalls, custom 3D booths, and CODISSIA trade fair pavilions across Tamil Nadu and Pan-India from our 45,000 sq.ft in-house workshops.",
  alternates: {
    canonical: "https://www.stallfabricator.in",
  },
  openGraph: {
    title: "Stall Fabrication in Coimbatore, Tamil Nadu | JAYGANGA Expo Stall Fabricators India",
    description: "Top-rated exhibition stall fabrication in Coimbatore & Tamil Nadu. Turnkey custom expo stalls, CODISSIA trade fair booths, and pan-India exhibition pavilions.",
    url: "https://www.stallfabricator.in",
    siteName: "JAYGANGA Expo Stall Fabrication - Coimbatore",
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
