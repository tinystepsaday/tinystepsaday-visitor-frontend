import { Suspense } from "react";
import { DetailPageLoader } from "@/components/ui/loaders";
import { ScheduledSessionsClient } from "@/components/management/ScheduledSessionsClient";

export default function ScheduledSessionsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 w-full">
      <Suspense fallback={<DetailPageLoader title="Loading Scheduled Sessions..." subtitle="Please wait while we fetch your scheduled sessions" />}>
        <ScheduledSessionsClient />
      </Suspense>
    </div>
  );
} 