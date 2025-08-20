import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding - Start Your Journey",
  description: "Begin your personal growth journey with our personalized onboarding process. Take our assessment to get customized recommendations and start your transformation.",
  keywords: [
    "onboarding",
    "personal growth journey",
    "personalized assessment",
    "transformation start",
    "customized recommendations",
    "mindfulness journey",
    "wellness assessment"
  ],
  openGraph: {
    title: "Onboarding - Start Your Journey | Tiny Steps A Day",
    description: "Begin your personal growth journey with our personalized onboarding process. Take our assessment to get customized recommendations.",
    url: "https://www.tinystepsaday.com/onboarding",
    siteName: "Tiny Steps A Day",
    locale: "en_US",
    type: "website",
    images: ["https://www.tinystepsaday.com/cover-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Onboarding - Start Your Journey | Tiny Steps A Day",
    description: "Begin your personal growth journey with our personalized onboarding process. Take our assessment to get customized recommendations.",
    images: ["https://www.tinystepsaday.com/cover-image.jpg"],
  },
  robots: "noindex, nofollow",
  metadataBase: new URL("https://www.tinystepsaday.com"),
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
