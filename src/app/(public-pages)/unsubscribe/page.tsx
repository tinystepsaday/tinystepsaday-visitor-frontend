import { Metadata } from "next";
import { UnsubscribeForm } from "@/components/unsubscribe/UnsubscribeForm";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Unsubscribe from Newsletter | Tiny Steps A Day",
  description: "Unsubscribe from our newsletter. We're sorry to see you go, but we respect your decision.",
  keywords: "unsubscribe, newsletter, email preferences, opt-out",
  openGraph: {
    title: "Unsubscribe from Newsletter | Tiny Steps A Day",
    description: "Unsubscribe from our newsletter. We're sorry to see you go, but we respect your decision.",
    url: "https://www.tinystepsaday.com/unsubscribe",
    siteName: "Tiny Steps A Day",
    locale: "en_US",
    type: "website",
    images: ["https://www.tinystepsaday.com/cover-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unsubscribe from Newsletter | Tiny Steps A Day",
    description: "Unsubscribe from our newsletter. We're sorry to see you go, but we respect your decision.",
    images: ["https://www.tinystepsaday.com/cover-image.jpg"],
  },
  alternates: {
    canonical: "https://www.tinystepsaday.com/unsubscribe",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  metadataBase: new URL("https://www.tinystepsaday.com"),
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