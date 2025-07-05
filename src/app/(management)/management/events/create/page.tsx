import { Suspense } from "react";
import { DetailPageLoader } from "@/components/ui/loaders";
import EventFormClient from "./EventFormClient";

export default function CreateEventPage() {
  return (
    <Suspense fallback={<DetailPageLoader title="Loading Event Form..." subtitle="Please wait while we load the event creation form" backHref="/management/events" backText="Back to Events" />}>
      <EventFormClient />
    </Suspense>
  );
}
