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
    default: "Stall Fabrication in Coimbatore, Tamil Nadu | JAYGANGA Expo Stall Fabricators India",
    template: "%s | Stall Fabrication Coimbatore & India | JAYGANGA"
  },
  description: "Premier stall fabrication in Coimbatore & Tamil Nadu. JAYGANGA delivers turnkey exhibition stalls, custom 3D booths, and CODISSIA trade fair pavilions across Tamil Nadu and Pan-India from our 45,000 sq.ft in-house workshops.",
  keywords: [
    // 1. Coimbatore Keywords (Priority #1)
    "stall fabrication in coimbatore",
    "stall fabrication coimbatore",
    "stall fabricators in coimbatore",
    "stall fabricators coimbatore",
    "exhibition stall fabrication coimbatore",
    "codissia stall fabrication",
    "codissia exhibition stall fabricators",
    "exhibition stall designers in coimbatore",
    "custom stall fabrication coimbatore",
    "expo booth builders coimbatore",
    "trade show stall fabricator coimbatore",
    "stall fabrication edayarpalayam coimbatore",
    
    // 2. Tamil Nadu Keywords (Priority #2)
    "stall fabrication in tamil nadu",
    "stall fabricators in tamil nadu",
    "exhibition stall fabricators tamil nadu",
    "stall fabrication chennai",
    "stall fabricators chennai",
    "stall fabrication madurai",
    "stall fabrication tirupur",
    "stall fabrication salem",

    // 3. India / Pan-India Keywords (Priority #3)
    "stall fabrication in india",
    "stall fabricator in india",
    "stall fabrications",
    "exhibition stall fabrication india",
    "trade show booth fabrication india",
    "turnkey exhibition stalls india",
    "modular stall fabricators india",
    "pan india stall fabricators"
  ],
  authors: [{ name: "JAYGANGA Expo Stall Fabrication" }],
  creator: "JAYGANGA",
  publisher: "JAYGANGA",
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
  twitter: {
    card: "summary_large_image",
    title: "Stall Fabrication in Coimbatore, Tamil Nadu | JAYGANGA",
    description: "#1 Stall fabrication company in Coimbatore, Tamil Nadu. Turnkey custom expo stalls and CODISSIA trade show pavilions.",
    images: ["https://www.stallfabricator.in/images/logo.png"],
  },
  other: {
    "geo.region": "IN-TN",
    "geo.placename": "Coimbatore, Tamil Nadu, India",
    "geo.position": "11.0168;76.9558",
    "ICBM": "11.0168, 76.9558",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
      "@id": "https://www.stallfabricator.in/#organization",
      "name": "JAYGANGA Expo Stall Fabrication - Coimbatore, Tamil Nadu",
      "alternateName": [
        "Stall Fabrication in Coimbatore",
        "Stall Fabricators Coimbatore",
        "Exhibition Stall Fabrication Coimbatore",
        "Jayganga Stall Fabrication",
        "CODISSIA Stall Fabricators"
      ],
      "url": "https://www.stallfabricator.in",
      "logo": "https://www.stallfabricator.in/images/logo.png",
      "image": "https://www.stallfabricator.in/images/logo.png",
      "email": "info.jayganga@gmail.com",
      "telephone": "+919363333040",
      "priceRange": "₹₹ - ₹₹₹₹",
      "description": "Leading exhibition stall fabrication contractor based in Coimbatore, Tamil Nadu. Turnkey custom expo stalls, CODISSIA trade fair exhibition booths, and pan-India exhibition pavilions with 45,000 sq.ft in-house workshops.",
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
      "areaServed": [
        { "@type": "City", "name": "Coimbatore", "description": "Primary City & Fabrication Workshop Headquarters" },
        { "@type": "Place", "name": "CODISSIA Trade Fair Complex, Coimbatore" },
        { "@type": "AdministrativeArea", "name": "Tamil Nadu" },
        { "@type": "City", "name": "Chennai" },
        { "@type": "City", "name": "Tirupur" },
        { "@type": "City", "name": "Salem" },
        { "@type": "City", "name": "Madurai" },
        { "@type": "City", "name": "Bengaluru" },
        { "@type": "Country", "name": "India" }
      ],
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
      "name": "JAYGANGA Stall Fabrication Services Coimbatore",
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
        { "@type": "City", "name": "Coimbatore" },
        { "@type": "Place", "name": "CODISSIA Trade Fair Complex, Coimbatore" },
        { "@type": "AdministrativeArea", "name": "Tamil Nadu" },
        { "@type": "City", "name": "Chennai" },
        { "@type": "City", "name": "Bengaluru" },
        { "@type": "Country", "name": "India" }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Stall Fabrication in Coimbatore & India",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Custom Exhibition Stall Fabrication in Coimbatore",
              "description": "Bespoke handcrafted wooden, metal, and acrylic exhibition booths fabricated in Coimbatore for CODISSIA and pan-India venues."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Modular Stall Fabrication Tamil Nadu",
              "description": "High-grade lightweight aluminum and modular composite booths for multi-city expo tours across Tamil Nadu and India."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "CODISSIA Trade Fair Stall Fabrication",
              "description": "Fast-track turnkey exhibition stall construction, electrical rigging, and technical handover at CODISSIA Coimbatore."
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
      "name": "JAYGANGA Stall Fabrication Coimbatore",
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
          "name": "Who is the best stall fabricator in Coimbatore?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "JAYGANGA Expo Stall Fabrication is Coimbatore's premier exhibition stall fabrication company. Headquartered in Edayarpalayam, Coimbatore with a 45,000 sq.ft mechanized workshop equipped with 5-axis CNC routers and paint booths, JAYGANGA provides turnkey custom stall fabrication for CODISSIA Trade Fair Complex, Tamil Nadu, and across India."
          }
        },
        {
          "@type": "Question",
          "name": "Do you fabricate exhibition stalls for CODISSIA Trade Fair Complex in Coimbatore?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, JAYGANGA is an experienced stall fabricator for major exhibitions at CODISSIA Trade Fair Complex in Coimbatore, including INTEC, Agri Intex, Texfair, and international expos, providing fast setup, venue clearances, and 24/7 on-site technical standby."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide stall fabrication across Tamil Nadu and Pan-India?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, while our primary manufacturing base is in Coimbatore, Tamil Nadu, we provide turnkey stall fabrication across Chennai, Madurai, Bengaluru, Mumbai, Delhi, Hyderabad, and major expo convention centres pan-India."
          }
        },
        {
          "@type": "Question",
          "name": "What is the cost of exhibition stall fabrication in Coimbatore?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Stall fabrication costs in Coimbatore range from ₹1,200 to ₹2,500 per sq.ft for modular booths, and ₹2,500 to ₹6,000+ per sq.ft for custom luxury architectural pavilions, including 3D design, dry-fit workshop pre-assembly, CODISSIA on-site installation, and dismantling."
          }
        },
        {
          "@type": "Question",
          "name": "How early should I book a stall fabrication contractor in Coimbatore?",
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
