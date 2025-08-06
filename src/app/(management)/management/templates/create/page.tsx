import { Suspense } from "react";
import { DetailPageLoader } from "@/components/ui/loaders";
import { TemplateFormClient } from "@/components/management/TemplateFormClient";

export const metadata = {
  title: "Create Template",
  description: "Create a new template",
};

export default function CreateTemplatePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 w-full">
      <Suspense fallback={<DetailPageLoader title="Loading..." subtitle="Please wait" />}>
        <TemplateFormClient />
      </Suspense>
    </div>
  );
}
