import type { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: "Exhibition Stall Design & Fabrication Insights Blog | JAYGANGA",
  description: "Read expert articles on exhibition stall fabrication, trade show booth architecture, modular stand ROI, and expo design best practices in India.",
  alternates: {
    canonical: "https://www.stallfabricator.in/blog",
  },
  openGraph: {
    title: "Exhibition Stall Fabrication Insights & Blog | JAYGANGA",
    description: "Industry essays, spatial strategies, and design trends for trade shows and exhibitions across India.",
    url: "https://www.stallfabricator.in/blog",
    siteName: "JAYGANGA Expo Stall Fabrication",
    images: [
      {
        url: "/images/logo.png",
        width: 458,
        height: 458,
        alt: "JAYGANGA Blog",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
