import { Suspense } from "react";
import { DetailPageLoader } from "@/components/ui/loaders";
import { getAllSessionRequests, getSessionRequestById, SessionRequest } from "@/data/sessions";
import { notFound } from "next/navigation";
import { SessionDetailClient } from "@/components/management/SessionDetailClient";

interface SessionDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: SessionDetailPageProps) {
  const { id } = await params;
  const session = getSessionRequestById(id);
  return {
    title: `Session Details - ${session?.name || "Session"}`,
  };
}

export async function generateStaticParams() {
  const sessions = getAllSessionRequests();
  return sessions.map((session: SessionRequest) => ({
    id: session.id,
  }));
}

export default async function SessionDetailPage({ params }: SessionDetailPageProps) {
  const { id } = await params;
  const session = getSessionRequestById(id);

  if (!session) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 w-full">
      <Suspense fallback={<DetailPageLoader title="Loading Session..." subtitle="Please wait while we fetch the session details" />}>
        <SessionDetailClient session={session} />
      </Suspense>
    </div>
  );
} 