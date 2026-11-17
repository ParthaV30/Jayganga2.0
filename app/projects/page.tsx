import type { Metadata } from 'next';
import ProjectsClient from './ProjectsClient';

export const metadata: Metadata = {
  title: "Exhibition Stall Fabrication Projects & Portfolio | JAYGANGA",
  description: "Explore our portfolio of custom exhibition stalls, modular trade show booths, corporate pavilions, and event fabrication across India by JAYGANGA.",
  alternates: {
    canonical: "https://www.stallfabricator.in/projects",
  },
  openGraph: {
    title: "Exhibition Stall Portfolio & Projects | JAYGANGA",
    description: "Architectural stall fabrication portfolio: custom exhibition stands, modular booths, and turnkey expo installations.",
    url: "https://www.stallfabricator.in/projects",
    siteName: "JAYGANGA Expo Stall Fabrication",
    images: [
      {
        url: "/images/logo.png",
        width: 458,
        height: 458,
        alt: "JAYGANGA Projects Portfolio",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
