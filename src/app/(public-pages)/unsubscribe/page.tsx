import { Metadata } from "next";
import { UnsubscribeForm } from "@/components/unsubscribe/UnsubscribeForm";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Unsubscribe from Newsletter | Tiny Steps A Day",
  description: "Unsubscribe from our newsletter. We're sorry to see you go, but we respect your decision.",
  keywords: "unsubscribe, newsletter, email preferences, opt-out",
};

interface UnsubscribePageProps {
  searchParams: Promise<{
    email?: string;
    type?: string;
  }>;
}

export default async function UnsubscribePage({ searchParams }: UnsubscribePageProps) {
  const params = await searchParams;
  return (
    <div className="min-h-screen flex items-center justify-center p-4 w-full">
      <div className="max-w-md w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <UnsubscribeForm 
            initialEmail={params.email || ""} 
            initialType={params.type || ""} 
          />
        </Suspense>
      </div>
    </div>
  );
} 