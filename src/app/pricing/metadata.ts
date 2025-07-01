import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - Choose Your Transformation Plan",
  description: "Explore our pricing plans to find the perfect fit for your transformational journey.",
  openGraph: {
    title: "Pricing - Choose Your Transformation Plan",
    description: "Explore our pricing plans to find the perfect fit for your transformational journey.",
    url: "/pricing",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "https://www.tinystepsaday.com/pricing",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,  
      follow: true,
    },
  },
  metadataBase: new URL("https://www.tinystepsaday.com"),
};