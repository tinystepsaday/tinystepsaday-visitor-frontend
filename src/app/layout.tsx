import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import ConditionalNavbar from "@/components/ConditionalNavbar"; 
import ConditionalFooter from "@/components/ConditionalFooter";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "%s - Tiny Steps A Day | Actionable steps and daily habits to improve your life",
  description: "Tiny Steps A Day is a source of actionable steps and daily habits to improve your life. Discover daily habits, tips, and strategies to make small changes that lead to big improvements. Start your journey to a better you today.",
  keywords: ["tiny steps a day", "tiny steps", "a day", "actionable steps", "improve your life", "personal growth", "self improvement", "daily habits", "tips", "strategies", "small changes", "big improvements", "start your journey to a better you today", "personal growth", "self improvement", "daily habits", "tips", "strategies", "meditation", "mindfulness", "mindfulness meditation", "mindfulness practice", "mindfulness exercises", "mindfulness techniques", "mindfulness tips", "mindfulness strategies", "spirituality", "career guidance", "career development", "career advice", "career tips", "career strategies", "career planning", "love", "the law of one", "the law of attraction", "the law of abundance", "the law of prosperity", "the law of success", "mental health", "life direction", "purpose", "mentorship"],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "%s - Tiny Steps A Day | Actionable steps and daily habits to improve your life",
    description: "Tiny Steps A Day is a source of actionable steps and daily habits to improve your life. Discover daily habits, tips, and strategies to make small changes that lead to big improvements. Start your journey to a better you today.",
    images: ["https://www.tinystepsaday.com/cover-image.jpg"],
    url: "https://www.tinystepsaday.com",
    siteName: "Tiny Steps A Day",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "%s - Tiny Steps A Day | Actionable steps and daily habits to improve your life",
    description: "Tiny Steps A Day is a source of actionable steps and daily habits to improve your life. Discover daily habits, tips, and strategies to make small changes that lead to big improvements. Start your journey to a better you today.",
    images: ["https://www.tinystepsaday.com/cover-image.jpg"],
  },
  alternates: {
    canonical: "https://www.tinystepsaday.com",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col w-full justify-start items-center`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConditionalNavbar />
          {children}
          <ConditionalFooter />
          <Toaster richColors />
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
