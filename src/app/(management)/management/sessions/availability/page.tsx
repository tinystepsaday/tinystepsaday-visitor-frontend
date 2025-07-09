import { Suspense } from "react";
import { DetailPageLoader } from "@/components/ui/loaders";
import { AvailabilityClient } from "@/components/management/AvailabilityClient";

export default function AvailabilityPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 w-full">
      <Suspense fallback={<DetailPageLoader title="Loading Availability..." subtitle="Please wait while we fetch team member schedules" />}>
        <AvailabilityClient />
      </Suspense>
    </div>
  );
} 