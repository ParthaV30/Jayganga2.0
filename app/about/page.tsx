import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: "About Our Studio | Turnkey Stall Fabrication Facilities & Engineering",
  description: "Learn about JAYGANGA's 45,000 sq.ft mechanized fabrication facilities in Coimbatore, structural engineers, and MSME certified turnkey exhibition stall production across India.",
  alternates: {
    canonical: "https://www.stallfabricator.in/about",
  },
  openGraph: {
    title: "About JAYGANGA | Exhibition Stall Fabrication Workshops",
    description: "45,000 sq.ft mechanized workshops in Coimbatore, structural engineers, and MSME certified turnkey stall fabrication.",
    url: "https://www.stallfabricator.in/about",
    siteName: "JAYGANGA Expo Stall Fabrication",
    images: [
      {
        url: "/images/logo.png",
        width: 458,
        height: 458,
        alt: "JAYGANGA About Studio",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
