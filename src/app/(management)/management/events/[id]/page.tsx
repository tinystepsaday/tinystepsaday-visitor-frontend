import { Suspense } from "react";
import { notFound } from "next/navigation";
import { DetailPageLoader } from "@/components/ui/loaders";
import EventDetailsClient from "./EventDetailsClient";
import { getEventById, getEventApplicants } from "@/data/events";

interface EventDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailsPage({ params }: EventDetailsPageProps) {
  const { id } = await params;
  
  // Server-side data fetching
  const event = getEventById(id);
  
  if (!event) {
    notFound();
  }

  const applicants = getEventApplicants(id);

  return (
    <Suspense fallback={<DetailPageLoader title="Loading Event Details..." subtitle="Please wait while we load the event information" />}>
      <EventDetailsClient eventId={id} initialEvent={event} initialApplicants={applicants} />
    </Suspense>
  );
}
