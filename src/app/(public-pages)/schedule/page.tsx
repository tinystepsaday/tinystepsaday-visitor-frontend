import { Metadata } from "next";
import { CalendarCheck } from "lucide-react";
import { ScheduleForm } from "@/components/schedule/ScheduleForm";
import { sharedMetadata } from "../../shared-metadata";

export const metadata: Metadata = {
  title: "Schedule a Consultation",
  description: "Book your personalized consultation with our expert practitioners. Choose from individual sessions, couple's therapy, group sessions, or initial assessments. Start your journey to better mental health and personal growth.",
  keywords: [
    "consultation booking",
    "therapy sessions",
    "mental health consultation",
    "individual therapy",
    "couple's therapy",
    "group therapy",
    "initial assessment",
    "online consultation",
    "video therapy",
    "mental health booking",
    "therapy appointment",
    "counseling session"
  ],
  openGraph: {
    title: "Schedule a Consultation | Tiny Steps A Day",
    description: "Book your personalized consultation with our expert practitioners. Choose from individual sessions, couple's therapy, group sessions, or initial assessments.",
    url: `${sharedMetadata.metadataBase}/schedule`,
    images: [sharedMetadata.openGraph.images[0]],
    siteName: sharedMetadata.openGraph.siteName,
    locale: sharedMetadata.openGraph.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Schedule a Consultation | Tiny Steps A Day",
    description: "Book your personalized consultation with our expert practitioners. Choose from individual sessions, couple's therapy, group sessions, or initial assessments.",
    images: sharedMetadata.twitter.images,
  },
  alternates: {
    canonical: `${sharedMetadata.metadataBase}/schedule`,
  },
  robots: sharedMetadata.robots,
};

export default function SchedulePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Consultation Booking Service",
    description: "Book your personalized consultation with our expert practitioners. Choose from individual sessions, couple's therapy, group sessions, or initial assessments.",
    provider: {
      "@type": "Company",
      name: "Tiny Steps A Day",
      url: sharedMetadata.metadataBase.toString(),
      logo: sharedMetadata.openGraph.images[0],
    },
    serviceType: "Mental Health Consultation",
    areaServed: "Worldwide",
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${sharedMetadata.metadataBase}/schedule`,
      serviceType: "Online Consultation",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Consultation Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Individual Session (60 min)",
            description: "One-on-one consultation session",
            price: 99,
            priceCurrency: "USD",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Couple's Session (90 min)",
            description: "Couple's therapy session",
            price: 149,
            priceCurrency: "USD",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Group Session (120 min)",
            description: "Group therapy session",
            price: 199,
            priceCurrency: "USD",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Initial Assessment (45 min)",
            description: "Initial consultation and assessment",
            price: 75,
            priceCurrency: "USD",
          },
        },
      ],
    },
    url: `${sharedMetadata.metadataBase}/schedule`,
  }
  return (
    <div className="container mx-auto py-12 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-4xl mx-auto mt-16 md:mt-24">
        <div className="flex items-center gap-2 mb-8">
          <CalendarCheck className="h-6 w-6 text-primary" />
          <h1 className="text-4xl md:text-5xl text-primary font-bold">Schedule a Consultation</h1>
        </div>

        <ScheduleForm />
      </div>
    </div>
  );
} 