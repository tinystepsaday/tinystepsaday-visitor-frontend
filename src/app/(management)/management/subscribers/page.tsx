import { Metadata } from "next";
import { SubscribersClient } from "@/components/management/SubscribersClient";
import { Suspense } from "react";
import { ListPageLoader } from "@/components/ui/loaders";

export const metadata: Metadata = {
  title: "Subscribers Management | Tiny Steps A Day",
  description: "Manage newsletter subscribers, track subscription analytics, and monitor engagement metrics.",
  keywords: "subscribers management, newsletter subscribers, subscription analytics, email marketing, subscriber engagement",
  robots: "noindex, nofollow", // Management pages should not be indexed
};

export default function SubscribersPage() {
  return (
    <div className="flex flex-col gap-4">
      <Suspense fallback={<ListPageLoader />}>
        <SubscribersClient />
      </Suspense>
    </div>
  );
}
