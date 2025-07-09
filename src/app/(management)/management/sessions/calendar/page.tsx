import { Suspense } from "react";
import { DetailPageLoader } from "@/components/ui/loaders";
import { SessionsCalendarClient } from "@/components/management/SessionsCalendarClient";

export default function SessionsCalendarPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 w-full">
      <Suspense fallback={<DetailPageLoader title="Loading Calendar..." subtitle="Please wait while we fetch your scheduled sessions" />}>
        <SessionsCalendarClient />
      </Suspense>
    </div>
  );
} 