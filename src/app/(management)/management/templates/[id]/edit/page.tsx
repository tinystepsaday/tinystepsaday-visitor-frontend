import { Suspense } from "react";
import { DetailPageLoader } from "@/components/ui/loaders";
import { TemplateFormClient } from "@/components/management/TemplateFormClient";

export default function EditTemplatePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 w-full">
      <Suspense fallback={<DetailPageLoader title="Loading Template..." subtitle="Please wait while we fetch the template details" />}>
        <TemplateFormClient />
      </Suspense>
    </div>
  );
}