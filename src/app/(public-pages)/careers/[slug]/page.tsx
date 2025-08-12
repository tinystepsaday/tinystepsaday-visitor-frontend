import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCareerById } from "@/data/careers";
import CareerPositionClient from "@/components/careers/CareerPositionClient";

interface CareerPositionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CareerPositionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const career = getCareerById(slug);

  if (!career) {
    return {
      title: "Position Not Found",
      description: "The job position you're looking for doesn't exist or has been filled.",
    };
  }

  return {
    title: `${career.title}`,
    description: career.summary,
    keywords: [
      career.title.toLowerCase(),
      career.department.toLowerCase(),
      "job",
      "career",
      "employment",
      "remote work",
      "mindfulness",
      "personal growth",
      "tiny steps a day",
    ],
    openGraph: {
      title: `${career.title} | Tiny Steps A Day`,
      description: career.summary,
      url: `https://www.tinystepsaday.com/careers/${slug}`,
      siteName: "Tiny Steps A Day",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${career.title} | Tiny Steps A Day`,
      description: career.summary,
    },
    alternates: {
      canonical: `https://www.tinystepsaday.com/careers/${slug}`,
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

export default async function CareerPositionPage({ params }: CareerPositionPageProps) {
  const { slug } = await params;
  const career = getCareerById(slug);

  if (!career) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": career.title,
    "description": career.summary,
    "datePosted": career.postedDate,
    "validThrough": "2025-12-31",
    "employmentType": career.type,
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Tiny Steps A Day",
      "url": "https://www.tinystepsaday.com",
      "logo": "https://www.tinystepsaday.com/tinystepsaday-logo.png"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": career.location === "Remote" ? "Remote" : "San Francisco",
        "addressRegion": career.location === "Remote" ? "Remote" : "CA",
        "addressCountry": "US"
      }
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": career.salary.replace(/[$,]/g, "").split(" - ")[0]
    },
    "qualifications": "See job description for requirements",
    "responsibilities": "See job description for responsibilities",
    "url": `https://www.tinystepsaday.com/careers/${slug}`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CareerPositionClient career={career} careerId={slug} />
    </>
  );
}
