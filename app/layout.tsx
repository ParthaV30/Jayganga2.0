import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#202522",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.stallfabricator.in'),
  title: {
    default: "JAYGANGA | Exhibition Stall Fabrication & 3D Booth Design India",
    template: "%s | JAYGANGA Stall Fabrication"
  },
  description: "Top-rated exhibition stall fabrication and custom booth design company in India. 45,000 sq.ft mechanized workshops in Coimbatore executing turnkey expo stalls, modular pavilions, and trade show booths across India.",
  keywords: [
    "stall fabrication",
    "stall fabrications",
    "exhibition stall fabrication",
    "expo stall fabrication",
    "custom stall fabrication",
    "stall fabricator in india",
    "stall fabrication coimbatore",
    "trade show booth fabrication",
    "exhibition booth builder",
    "3d stall design",
    "turnkey exhibition stalls",
    "modular stall fabrication",
    "stall fabrication bangalore",
    "stall fabrication chennai",
    "stall fabrication mumbai",
    "stall fabrication delhi"
  ],
  authors: [{ name: "JAYGANGA Expo Stall Fabrication" }],
  creator: "JAYGANGA",
  publisher: "JAYGANGA",
  alternates: {
    canonical: "https://www.stallfabricator.in",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/logo.png", type: "image/png", sizes: "458x458" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  verification: {
    google: "google9dafb4de4a510060",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
  twitter: {
    card: "summary_large_image",
    title: "JAYGANGA | Exhibition Stall Fabrication & Booth Design India",
    description: "Top-rated exhibition stall fabrication company in India. Turnkey custom expo stalls and trade show pavilions.",
    images: ["https://www.stallfabricator.in/images/logo.png"],
  },
  other: {
    "geo.region": "IN-TN",
    "geo.placename": "Coimbatore",
    "geo.position": "11.0168;76.9558",
    "ICBM": "11.0168, 76.9558",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.stallfabricator.in/#organization",
      "name": "JAYGANGA Expo Stall Fabrication",
      "alternateName": ["Jayganga Stall Fabrication", "Jayganga Exhibition Stall Fabrication", "Jayganga Coimbatore"],
      "url": "https://www.stallfabricator.in",
      "logo": "https://www.stallfabricator.in/images/logo.png",
      "email": "info.jayganga@gmail.com",
      "telephone": "+919363333040",
      "description": "Leading exhibition stall fabrication, custom expo booth design, and turnkey trade show construction company in India.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "31, Nanjammal Illam, 3rd St, Pari Nagar, Edayarpalayam",
        "addressLocality": "Coimbatore",
        "addressRegion": "Tamil Nadu",
        "postalCode": "641025",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 11.0168,
        "longitude": 76.9558
      },
      "sameAs": [
        "https://linkedin.com/company/jayganga",
        "https://instagram.com/jayganga.expo",
        "https://facebook.com/jaygangaexpo",
        "https://x.com/jayganga",
        "https://youtube.com/@jayganga"
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.stallfabricator.in/#service",
      "name": "JAYGANGA Expo Stall Fabrication",
      "image": "https://www.stallfabricator.in/images/logo.png",
      "url": "https://www.stallfabricator.in",
      "telephone": "+919363333040",
      "priceRange": "₹₹ - ₹₹₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "31, Nanjammal Illam, 3rd St, Pari Nagar, Edayarpalayam",
        "addressLocality": "Coimbatore",
        "addressRegion": "Tamil Nadu",
        "postalCode": "641025",
        "addressCountry": "IN"
      },
      "areaServed": [
        { "@type": "Country", "name": "India" },
        { "@type": "City", "name": "Coimbatore" },
        { "@type": "City", "name": "Chennai" },
        { "@type": "City", "name": "Bengaluru" },
        { "@type": "City", "name": "Mumbai" },
        { "@type": "City", "name": "Delhi" },
        { "@type": "City", "name": "Hyderabad" },
        { "@type": "City", "name": "Ahmedabad" }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Exhibition Stall Fabrication Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Custom Exhibition Stall Fabrication",
              "description": "Bespoke handcrafted wooden, metal, and acrylic exhibition booths tailored to brand identity."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Modular Stall Fabrication",
              "description": "High-grade lightweight aluminum and modular composite booths for multi-city expo tours."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Corporate Event Fabrication & Stage Sets",
              "description": "Turnkey stage sets, keynote backdrops, entrance arches, and experiential lounges."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "3D Stall Design & VR Renders",
              "description": "Photorealistic 4K 3D isometric designs and VR walkthroughs before physical fabrication."
            }
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.stallfabricator.in/#website",
      "url": "https://www.stallfabricator.in",
      "name": "JAYGANGA Stall Fabrication",
      "publisher": {
        "@id": "https://www.stallfabricator.in/#organization"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.stallfabricator.in/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is exhibition stall fabrication?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Exhibition stall fabrication is the end-to-end engineering, manufacturing, and on-site assembly of custom or modular trade show booths. It involves 3D structural CAD design, CNC carpentry, high-tensile metal welding, paint finishing, graphic printing, electrical rigging, and venue handover."
          }
        },
        {
          "@type": "Question",
          "name": "Where can I find the best stall fabricator in India?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "JAYGANGA Expo Stall Fabrication provides premier turnkey stall fabrication across India, with an in-house mechanized 45,000 sq.ft workshop in Coimbatore and on-site deployment in major convention hubs including Mumbai, Delhi, Bengaluru, Chennai, Hyderabad, and Ahmedabad."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between custom and modular stall fabrication?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Custom stall fabrication uses tailor-made woodwork, structural steel, acrylics, and flush finishes to create unique, high-impact architectural pavilions. Modular stall fabrication uses reusable aluminum sub-frames and interchangeable panel systems for rapid assembly and cost-efficiency across multiple trade shows."
          }
        },
        {
          "@type": "Question",
          "name": "How much does exhibition stall fabrication cost in India?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The cost of stall fabrication depends on booth size, design complexity, height permits, lighting, and materials. Modular stalls typically range from ₹1,200 to ₹2,500 per sq.ft, while custom luxury architectural pavilions range from ₹2,500 to ₹6,000+ per sq.ft including complete turnkey installation and dismantle."
          }
        },
        {
          "@type": "Question",
          "name": "How early should I book a stall fabrication contractor?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It is best to engage your stall fabricator 45 to 90 days before the exhibition. This provides sufficient time for 3D conceptual design approvals, venue engineering clearances, dry-fit workshop pre-assembly, and hassle-free venue setup."
          }
        }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F2EFE8] text-[#292B28] selection:bg-[#C65D36] selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
