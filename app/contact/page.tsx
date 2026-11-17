import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: "Contact Stall Fabricators in Coimbatore | JAYGANGA Expo Stalls",
  description: "Contact JAYGANGA for stall fabrication in Coimbatore & Tamil Nadu. Visit our Edayarpalayam Coimbatore facility or call +91 93633 33040 for CODISSIA & pan-India exhibition pricing.",
  alternates: {
    canonical: "https://www.stallfabricator.in/contact",
  },
  openGraph: {
    title: "Contact JAYGANGA | Stall Fabrication in Coimbatore, Tamil Nadu & India",
    description: "Request an exhibition stall proposal or 3D booth design quotation. Headquartered in Coimbatore, serving CODISSIA, Tamil Nadu, and pan-India expo venues.",
    url: "https://www.stallfabricator.in/contact",
    siteName: "JAYGANGA Expo Stall Fabrication - Coimbatore",
    images: [
      {
        url: "/images/logo.png",
        width: 458,
        height: 458,
        alt: "Contact JAYGANGA Coimbatore",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
