import { Suspense } from "react";
import { notFound } from "next/navigation";
import { DetailPageLoader } from "@/components/ui/loaders";
import EventEditFormClient from "./EventEditFormClient";
import { getEventById } from "@/data/events";

interface EventEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventEditPage({ params }: EventEditPageProps) {
  const { id } = await params;
  
  // Server-side data fetching
  const event = getEventById(id);
  
  if (!event) {
    notFound();
  }

  return (
    <Suspense fallback={<DetailPageLoader title="Loading Event Form..." subtitle="Please wait while we load the event information" backHref={`/management/events/${id}`} backText="Back to Event" />}>
      <EventEditFormClient eventId={id} initialEvent={event} />
    </Suspense>
  );
}
