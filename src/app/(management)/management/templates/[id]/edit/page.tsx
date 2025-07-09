import { Suspense } from "react";
import { notFound } from "next/navigation";
import { DetailPageLoader } from "@/components/ui/loaders";
import { getTemplateById } from "@/data/messages";
import { TemplateFormClient } from "@/components/management/TemplateFormClient";

interface EditTemplatePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTemplatePage({ params }: EditTemplatePageProps) {
  const { id } = await params;
  console.log(id);
  const template = getTemplateById(id);

  if (!template) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 w-full">
      <Suspense fallback={<DetailPageLoader title="Loading..." subtitle="Please wait" />}>
        <TemplateFormClient template={template} />
      </Suspense>
    </div>
  );
}