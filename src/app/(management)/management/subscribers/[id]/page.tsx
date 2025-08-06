import { Metadata } from "next";
import { SubscriberDetailClient } from "@/components/management/SubscriberDetailClient";
import { Suspense } from "react";
import { ListPageLoader } from "@/components/ui/loaders";

export const metadata: Metadata = {
  title: "Subscriber Details | Tiny Steps A Day",
  description: "View and manage subscriber details and subscription information.",
  keywords: "subscriber details, subscription management, subscriber information",
  robots: "noindex, nofollow",
};

interface SubscriberDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SubscriberDetailPage({ params }: SubscriberDetailPageProps) {
  const { id } = await params;
  
  return (
    <div className="flex flex-col gap-4">
      <Suspense fallback={<ListPageLoader />}>
        <SubscriberDetailClient subscriberId={id} />
      </Suspense>
    </div>
  );
}
