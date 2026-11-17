import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: "Stall Fabrication Services | Custom & Modular Expo Booths | JAYGANGA",
  description: "Comprehensive exhibition stall fabrication services: bespoke 3D stalls, modular trade show booths, corporate pavilions, stage rigging, and turnkey expo delivery across India.",
  alternates: {
    canonical: "https://www.stallfabricator.in/services",
  },
  openGraph: {
    title: "Exhibition Stall Fabrication Services | JAYGANGA",
    description: "Custom exhibition stall fabrication, modular booths, corporate pavilions, and turnkey expo setup across India.",
    url: "https://www.stallfabricator.in/services",
    siteName: "JAYGANGA Expo Stall Fabrication",
    images: [
      {
        url: "/images/logo.png",
        width: 458,
        height: 458,
        alt: "JAYGANGA Services",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
