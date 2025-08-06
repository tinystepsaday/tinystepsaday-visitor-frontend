import { Suspense } from "react";
import { notFound } from "next/navigation";
import { DetailPageLoader } from "@/components/ui/loaders";
import { MessageDetailClient } from "@/components/management/MessageDetailClient";

interface MessagePageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: "Message Details",
  description: "View message details",
};

export default async function MessagePage({ params }: MessagePageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Suspense fallback={<DetailPageLoader title="Loading Message..." subtitle="Please wait while we fetch the message details" />}>
        <MessageDetailClient messageId={id} />
      </Suspense>
    </div>
  );
} 