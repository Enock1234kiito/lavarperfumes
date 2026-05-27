import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lavara — A fragrance that lingers like memory",
    template: "%s · Lavara",
  },
  description:
    "Soft on skin. Powerful in presence. Lavara crafts timeless luxury perfumes for the quiet luxury era — rare ingredients, editorial bottles, lingering scent.",
  keywords: [
    "Lavara",
    "luxury perfume",
    "niche fragrance",
    "Santal Doux",
    "quiet luxury",
    "editorial perfume",
  ],
  metadataBase: new URL("https://lavara.example.com"),
  openGraph: {
    title: "Lavara — A fragrance that lingers like memory",
    description:
      "Timeless scents crafted with rare ingredients. Discover Lavara's signature collection.",
    url: "https://lavara.example.com",
    siteName: "Lavara",
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "Lavara luxury perfume",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lavara — A fragrance that lingers like memory",
    description:
      "Timeless scents crafted with rare ingredients. Discover Lavara's signature collection.",
    images: ["/images/og.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
