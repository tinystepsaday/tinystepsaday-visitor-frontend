import { Metadata } from "next";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { getUpcomingEvents } from "@/data/events";
import { sharedMetadata } from "../../shared-metadata";

export const metadata: Metadata = {
  title: "Upcoming Events | Tiny Steps A Day",
  description: "Discover our upcoming mindfulness workshops, meditation retreats, and wellness events. Join our community for transformative experiences led by expert practitioners.",
  keywords: [
    "upcoming events",
    "mindfulness workshops",
    "meditation retreats",
    "wellness events",
    "mindfulness events",
    "meditation workshops",
    "yoga classes",
    "stress management",
    "personal growth events",
    "mental health workshops"
  ],
  openGraph: {
    title: "Upcoming Events | Tiny Steps A Day",
    description: "Discover our upcoming mindfulness workshops, meditation retreats, and wellness events. Join our community for transformative experiences.",
    url: `${sharedMetadata.metadataBase}/events`,
    images: [sharedMetadata.openGraph.images[0]],
    siteName: sharedMetadata.openGraph.siteName,
    locale: sharedMetadata.openGraph.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Upcoming Events | Tiny Steps A Day",
    description: "Discover our upcoming mindfulness workshops, meditation retreats, and wellness events. Join our community for transformative experiences.",
    images: sharedMetadata.twitter.images,
  },
  alternates: {
    canonical: `${sharedMetadata.metadataBase}/events`,
  },
  robots: sharedMetadata.robots,
};

export default function EventsPage() {
  const upcomingEvents = getUpcomingEvents();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Upcoming Events",
    description: "Discover our upcoming mindfulness workshops, meditation retreats, and wellness events. Join our community for transformative experiences.",
    startDate: upcomingEvents[0].date,
    endDate: upcomingEvents[0].date,
    location: {
      "@type": "Place",
      name: upcomingEvents[0].location,
      address: upcomingEvents[0].address,
    },
    organizer: {
      "@type": "Company",
      name: "Tiny Steps A Day",
    },
    offers: {
      "@type": "Offer",
      price: upcomingEvents[0].price,
      priceCurrency: "USD",
      availability: "InStock",
    },
    image: upcomingEvents[0].image,
    url: `${sharedMetadata.metadataBase}/events`,
    eventAttendanceMode: "OnlineEventAttendanceMode",
    eventStatus: "Upcoming",
    eventType: "Workshop",
    eventOrganizer: {
      "@type": "Company",
      name: "Tiny Steps A Day",
    },
    eventCurrency: "USD",
    eventCurrencyCode: "USD",
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-4xl mx-auto mt-16 md:mt-24">
        <div className="flex items-center gap-2 mb-8">
          <Calendar className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Upcoming Events</h1>
        </div>

        <div className="grid gap-6">
          {upcomingEvents.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>
                  {event.date} • {event.time} • {event.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{event.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {event.availableSeats} seats available
                  </span>
                  <Button asChild>
                    <Link href={`/events/${event.slug}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
