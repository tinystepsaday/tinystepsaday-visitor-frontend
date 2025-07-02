import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCareerById } from "@/data/careers";
import CareerApplicationClient from "@/components/careers/CareerApplicationClient";

interface CareerApplicationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CareerApplicationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const career = getCareerById(slug);

  if (!career) {
    return {
      title: "Position Not Found | Tiny Steps A Day",
      description: "The job position you're looking for doesn't exist or has been filled.",
    };
  }

  return {
    title: `Apply for ${career.title} | Careers | Tiny Steps A Day`,
    description: `Apply for the ${career.title} position at Tiny Steps A Day. ${career.summary}`,
    keywords: [
      "apply",
      "job application",
      career.title.toLowerCase(),
      career.department.toLowerCase(),
      "career",
      "employment",
      "remote work",
      "mindfulness",
      "personal growth",
      "tiny steps a day",
    ],
    openGraph: {
      title: `Apply for ${career.title} | Tiny Steps A Day`,
      description: `Apply for the ${career.title} position at Tiny Steps A Day. ${career.summary}`,
      url: `https://www.tinystepsaday.com/careers/${slug}/apply`,
      siteName: "Tiny Steps A Day",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Apply for ${career.title} | Tiny Steps A Day`,
      description: `Apply for the ${career.title} position at Tiny Steps A Day. ${career.summary}`,
    },
    alternates: {
      canonical: `https://www.tinystepsaday.com/careers/${slug}/apply`,
    },
    robots: {
      index: false, // Don't index application pages
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
    metadataBase: new URL("https://www.tinystepsaday.com"),
  };
}

export async function generateStaticParams() {
  // This would be replaced with actual data fetching in a real app
  return [
    { slug: "mindfulness-coach" },
    { slug: "content-writer" },
    { slug: "ux-designer" },
    { slug: "frontend-developer" },
    { slug: "community-manager" },
  ];
}

export default async function CareerApplicationPage({ params }: CareerApplicationPageProps) {
  const { slug } = await params;
  const career = getCareerById(slug);

  if (!career) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Apply for ${career.title}`,
    "description": `Application form for the ${career.title} position at Tiny Steps A Day`,
    "url": `https://www.tinystepsaday.com/careers/${slug}/apply`,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Tiny Steps A Day",
      "url": "https://www.tinystepsaday.com"
    },
          "mainEntity": {
        "@type": "JobPosting",
        "title": career.title,
        "description": career.summary,
        "datePosted": career.postedDate,
        "employmentType": career.type,
      "hiringOrganization": {
        "@type": "Organization",
        "name": "Tiny Steps A Day",
        "url": "https://www.tinystepsaday.com"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CareerApplicationClient career={career} careerId={slug} />
    </>
  );
}
