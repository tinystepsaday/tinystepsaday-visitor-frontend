import StreakCreateClient from "@/components/streaks/StreakCreateClient";

// Force dynamic rendering to prevent build errors
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Create Your Own Streak | Tiny Steps A Day",
  description: "Create a custom streak challenge and invite others to join your journey.",
  openGraph: {
    title: "Create Your Own Streak | Tiny Steps A Day",
    description: "Create a custom streak challenge and invite others to join your journey.",
    images: ["https://www.tinystepsaday.com/banner-image.jpg"],
    url: "https://www.tinystepsaday.com/streaks/create",
    siteName: "Tiny Steps A Day",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Your Own Streak | Tiny Steps A Day",
    description: "Create a custom streak challenge and invite others to join your journey.",
    images: ["https://www.tinystepsaday.com/banner-image.jpg"],
  },
  alternates: {
    canonical: "https://www.tinystepsaday.com/streaks/create",
  },
  robots: {
    index: false,
    follow: false,
  },
  metadataBase: new URL("https://www.tinystepsaday.com"),
};

export default function CreateStreakPage() {
  return <StreakCreateClient />;
} 