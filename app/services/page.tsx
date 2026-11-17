import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: "Stall Fabrication Services in Coimbatore, Tamil Nadu & India | JAYGANGA",
  description: "Leading stall fabrication services in Coimbatore & Tamil Nadu: bespoke 3D stalls, CODISSIA trade fair booths, modular pavilions, and turnkey expo delivery across India.",
  alternates: {
    canonical: "https://www.stallfabricator.in/services",
  },
  openGraph: {
    title: "Stall Fabrication Services in Coimbatore, Tamil Nadu & India | JAYGANGA",
    description: "Custom exhibition stall fabrication, modular booths, CODISSIA trade fair stalls, and turnkey expo setup across Tamil Nadu & India.",
    url: "https://www.stallfabricator.in/services",
    siteName: "JAYGANGA Expo Stall Fabrication - Coimbatore",
    images: [
      {
        url: "/images/logo.png",
        width: 458,
        height: 458,
        alt: "JAYGANGA Stall Fabrication Services Coimbatore",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
