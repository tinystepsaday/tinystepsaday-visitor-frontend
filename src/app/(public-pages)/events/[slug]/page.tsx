import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
    Calendar,
    MapPin,
    Clock,
    ChevronLeft,
    Package,
    FileText
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { getEventBySlug, events } from "@/data/events";
import { EventBookingCard } from "@/components/events/EventBookingCard";
import { sharedMetadata } from "../../../shared-metadata";

export async function generateStaticParams() {
    return events.map((event) => ({
        slug: event.slug,
    }));
}

interface EventPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
    const { slug } = await params;
    const event = getEventBySlug(slug);

    if (!event) {
        return {
            title: "Event Not Found | Tiny Steps A Day",
            description: "The event you're looking for doesn't exist or has been removed.",
        };
    }

    return {
        title: `${event.title} | Tiny Steps A Day`,
        description: event.description,
        keywords: [
            event.title.toLowerCase(),
            "mindfulness",
            "meditation",
            "wellness",
            "personal growth",
            "mental health",
            "workshop",
            "retreat",
            "event",
            "booking"
        ],
        openGraph: {
            title: `${event.title} | Tiny Steps A Day`,
            description: event.description,
            url: `${sharedMetadata.metadataBase}/events/${event.slug}`,
            images: [event.image],
            siteName: sharedMetadata.openGraph.siteName,
            locale: sharedMetadata.openGraph.locale,
            type: "website",
        },
        twitter: {
            card: "summary_large_image" as const,
            title: `${event.title} | Tiny Steps A Day`,
            description: event.description,
            images: [event.image],
        },
        alternates: {
            canonical: `${sharedMetadata.metadataBase}/events/${event.slug}`,
        },
        robots: sharedMetadata.robots,
    };
}

export default async function EventPage({ params }: EventPageProps) {
    const { slug } = await params;
    const event = getEventBySlug(slug);

    if (!event) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Event",
        name: event.title,
        description: event.description,
        startDate: event.date,
        endDate: event.date,
        location: {
            "@type": "Place",
            name: event.location,
            address: event.address,
        },
        organizer: {
            "@type": "Company",
            name: "Tiny Steps A Day",
        },
        offers: {
            "@type": "Offer",
            price: event.price,
            priceCurrency: "USD",
            availability: "InStock",
        },
        image: event.image,
        url: `${sharedMetadata.metadataBase}/events/${event.slug}`,
        eventAttendanceMode: "OnlineEventAttendanceMode",
        eventStatus: "Upcoming",
        eventType: "Workshop",
        eventAttendee: {
            "@type": "Person",
            name: "John Doe",
        },
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
                <Link href="/events" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Events
                </Link>

                <div className="relative rounded-xl overflow-hidden h-64 mb-6">
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                        <h1 className="text-3xl font-bold text-white mb-2">{event.title}</h1>
                        <div className="flex items-center text-white/80">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span className="mr-4">{event.date}</span>
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{event.time}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Event details */}
                    <div className="md:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>About This Event</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-6">{event.description}</p>

                                <h3 className="text-lg font-semibold mb-3">What to Expect</h3>
                                <ul className="list-disc pl-5 space-y-2 mb-6">
                                    {event.agenda.map((item, index) => (
                                        <li key={index} className="text-muted-foreground">{item}</li>
                                    ))}
                                </ul>

                                <h3 className="text-lg font-semibold mb-3">Facilitator</h3>
                                <p className="text-muted-foreground">
                                    <strong>{event.facilitator}</strong> - {event.facilitatorBio}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Requirements and Materials */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {event.requirements && event.requirements.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Package className="h-5 w-5" />
                                            Requirements
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {event.requirements.map((requirement, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                                    <span className="text-sm text-muted-foreground">{requirement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            )}

                            {event.materials && event.materials.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <FileText className="h-5 w-5" />
                                            Materials
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {event.materials.map((material, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                                    <span className="text-sm text-muted-foreground">{material}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Location</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-start">
                                    <MapPin className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-medium">{event.location}</h3>
                                        <p className="text-muted-foreground">{event.address}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Booking card */}
                    <div>
                        <EventBookingCard event={event} />
                    </div>
                </div>
            </div>
        </div>
    );
}
