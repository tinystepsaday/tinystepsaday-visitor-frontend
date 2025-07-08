import { Suspense } from "react";
import { DetailPageLoader } from "@/components/ui/loaders";
import { TemplatesClient } from "@/components/management/TemplatesClient";

export default function TemplatesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 w-full">
      <Suspense fallback={<DetailPageLoader title="Loading Templates..." subtitle="Please wait while we fetch your templates" />}>
        <TemplatesClient />
      </Suspense>
    </div>
  );
}
