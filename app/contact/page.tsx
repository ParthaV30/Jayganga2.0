import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: "Contact JAYGANGA | Exhibition Stall Fabrication Quotes & Inquiries",
  description: "Get in touch with JAYGANGA Expo Stall Fabrication in Coimbatore for pan-India trade show booth fabrication, 3D designs, and custom exhibition pricing.",
  alternates: {
    canonical: "https://www.stallfabricator.in/contact",
  },
  openGraph: {
    title: "Contact JAYGANGA Expo Stall Fabrication",
    description: "Request a proposal or 3D booth design quotation. Serving major expo centers across Coimbatore, Bangalore, Chennai, Mumbai, and pan-India.",
    url: "https://www.stallfabricator.in/contact",
    siteName: "JAYGANGA Expo Stall Fabrication",
    images: [
      {
        url: "/images/logo.png",
        width: 458,
        height: 458,
        alt: "Contact JAYGANGA",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
