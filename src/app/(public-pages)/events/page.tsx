import { Metadata } from "next";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { getUpcomingEvents } from "@/data/events";
import { sharedMetadata } from "../../shared-metadata";

export const metadata: Metadata = {
  title: "Events",
  description: "Join our transformative events and workshops on mindfulness, personal growth, and well-being. Connect with like-minded individuals and experts.",
  alternates: {
    canonical: "https://www.tinystepsaday.com/events",
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

export default function EventsPage() {
  const upcomingEvents = getUpcomingEvents();

  // Only create JSON-LD if there are events
  const jsonLd = upcomingEvents.length > 0 ? {
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
  } : null;

  return (
    <div className="container mx-auto py-8 px-4">
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <div className="max-w-4xl mx-auto mt-16 md:mt-24">
        <div className="flex items-center gap-2 mb-8">
          <Calendar className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Upcoming Events</h1>
        </div>

        {upcomingEvents.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground text-lg">
                No upcoming events at the moment. Check back soon for new workshops and retreats!
              </p>
            </CardContent>
          </Card>
        ) : (
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
        )}
      </div>
    </div>
  );
}
