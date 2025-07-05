import { Suspense } from "react";
import { ListPageLoader } from "@/components/ui/loaders";
import EventsListClient from "./EventsListClient";
import { getAllEvents, getEventStats } from "@/data/events";

export default async function EventsPage() {
  // Server-side data fetching
  const events = getAllEvents();
  const stats = getEventStats();

  return (
    <Suspense fallback={<ListPageLoader title="Loading Events..." subtitle="Please wait while we load the events data" createButtonText="Create Event" createHref="/management/events/create" />}>
      <EventsListClient initialEvents={events} initialStats={stats} />
    </Suspense>
  );
}
