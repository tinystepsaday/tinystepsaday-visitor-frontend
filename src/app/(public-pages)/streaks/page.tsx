import { streaks } from "@/data/streaks";
import { Suspense } from "react";
import StreaksClient from "@/components/streaks/StreaksClient";
import { getStreakParams } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata = {
  title: "Streaks & Daily Challenges | Tiny Steps A Day Journey",
  description: "Build positive habits through daily practice. Join challenges and maintain your streaks with Tiny Steps A Day Journey.",
  keywords: [
    "streaks", "daily challenges", "habits", "tiny steps a day", "personal growth", "self improvement", "mindfulness", "wellness", "consistency", "motivation", "habit tracker", "challenge", "community"
  ],
  openGraph: {
    title: "Streaks & Daily Challenges | Tiny Steps A Day Journey",
    description: "Build positive habits through daily practice. Join challenges and maintain your streaks with Tiny Steps A Day Journey.",
    images: ["https://www.tinystepsaday.com/banner-image.jpg"],
    url: "https://www.tinystepsaday.com/streaks",
    siteName: "Tiny Steps A Day Journey",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Streaks & Daily Challenges | Tiny Steps A Day Journey",
    description: "Build positive habits through daily practice. Join challenges and maintain your streaks with Tiny Steps A Day Journey.",
    images: ["https://www.tinystepsaday.com/banner-image.jpg"],
  },
  alternates: {
    canonical: "https://www.tinystepsaday.com/streaks",
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

const ITEMS_PER_PAGE = 6;

interface StreakParams {
  page: string;
  sort: string;
  filter: string;
  viewMode: string;
}

export default async function StreaksPage() {
  const params: StreakParams = await getStreakParams() as StreakParams;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": streaks.map(streak => ({
      "@type": "ListItem",
      "position": streak.slug,
      "url": `https://www.tinystepsaday.com/streaks/${streak.slug}`,
      "name": streak.title,
      "description": streak.description,
      "image": `https://www.tinystepsaday.com/streaks/${streak.slug}/image.jpg`,
      "author": {
        "@type": "Person",
        "name": "Tiny Steps A Day Journey",
      },
      "publisher": {
        "@type": "Organization",
        "name": "Tiny Steps A Day Journey",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.tinystepsaday.com/logo.png",
        },
      },
      "datePublished": streak.startDate,
      "dateModified": streak.lastCheckIn,
      "dateCreated": streak.startDate,
      "keywords": [
        "streaks", "daily challenges", "habits", "tiny steps a day", "personal growth", "self improvement", "mindfulness", "wellness", "consistency", "motivation", "habit tracker", "challenge", "community"
      ],
      "inLanguage": "en-US",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "url": `https://www.tinystepsaday.com/streaks/${streak.slug}`,
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.tinystepsaday.com/streaks?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
      "isAccessibleForFree": true,
      "isPartOf": {
        "@type": "CollectionPage",
        "name": "Streaks & Daily Challenges",
        "url": "https://www.tinystepsaday.com/streaks",
      },
      "about": "Streaks & Daily Challenges",
    })),
  };

  const page = parseInt(params.page || "1", 10);
  const sort = params.sort || "popular"; // or 'recent', 'alphabetical', etc.
  const filter = params.filter || "";

  // Filter
  let filtered = streaks;
  if (filter) {
    filtered = filtered.filter(s =>
      s.title.toLowerCase().includes(filter.toLowerCase()) ||
      s.description.toLowerCase().includes(filter.toLowerCase())
    );
  }

  // Sort
  if (sort === "popular") {
    filtered = filtered.slice().sort((a, b) => b.enrolledCount - a.enrolledCount);
  } else if (sort === "recent") {
    filtered = filtered.slice().sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  } else if (sort === "alphabetical") {
    filtered = filtered.slice().sort((a, b) => a.title.localeCompare(b.title));
  }

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container py-12 w-full max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12"> 
          <SectionHeader
            title="Streaks & Daily Challenges"
            subtitle="Build positive habits through daily practice. Join challenges and maintain your streaks."
            centered={true}
          />
        </div>
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading streaks...</div>}>
          <StreaksClient
            streaks={paginated}
            currentPage={page}
            totalPages={totalPages}
            sort={sort}
            filter={filter}
          />
        </Suspense>
      </div>
    </>
  );
}
