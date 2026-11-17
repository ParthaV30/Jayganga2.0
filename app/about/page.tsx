import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: "About Stall Fabricators in Coimbatore & Tamil Nadu | JAYGANGA Studio",
  description: "Discover JAYGANGA's 45,000 sq.ft mechanized fabrication workshops in Edayarpalayam, Coimbatore. Premier exhibition stall fabricators serving CODISSIA, Tamil Nadu, and pan-India with MSME certified engineering.",
  alternates: {
    canonical: "https://www.stallfabricator.in/about",
  },
  openGraph: {
    title: "About JAYGANGA | Stall Fabrication in Coimbatore & Tamil Nadu",
    description: "45,000 sq.ft mechanized workshops in Coimbatore, structural engineers, and MSME certified turnkey stall fabrication for CODISSIA, Tamil Nadu & pan-India.",
    url: "https://www.stallfabricator.in/about",
    siteName: "JAYGANGA Expo Stall Fabrication - Coimbatore",
    images: [
      {
        url: "/images/logo.png",
        width: 458,
        height: 458,
        alt: "JAYGANGA About Studio Coimbatore",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
