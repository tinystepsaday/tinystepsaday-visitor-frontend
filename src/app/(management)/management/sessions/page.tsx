import { Suspense } from "react";
import { DetailPageLoader } from "@/components/ui/loaders";
import { SessionsClient } from "@/components/management/SessionsClient";

export default function SessionsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 w-full">
      <Suspense fallback={<DetailPageLoader title="Loading Sessions..." subtitle="Please wait while we fetch your session requests" />}>
        <SessionsClient />
      </Suspense>
    </div>
  );
}
