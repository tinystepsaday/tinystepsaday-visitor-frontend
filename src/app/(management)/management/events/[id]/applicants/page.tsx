import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ListPageLoader } from "@/components/ui/loaders";
import EventApplicantsClient from "./EventApplicantsClient";
import { getEventById, getEventApplicants } from "@/data/events";

interface EventApplicantsPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventApplicantsPage({ params }: EventApplicantsPageProps) {
  const { id } = await params;
  
  // Server-side data fetching
  const event = getEventById(id);
  
  if (!event) {
    notFound();
  }

  const applicants = getEventApplicants(id);

  return (
    <Suspense fallback={<ListPageLoader title="Loading Applicants..." subtitle="Please wait while we load the applicant data" />}>
      <EventApplicantsClient eventId={id} initialEvent={event} initialApplicants={applicants} />
    </Suspense>
  );
} 