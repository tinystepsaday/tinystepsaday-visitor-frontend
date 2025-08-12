import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import QuizResultsClient from "@/components/quiz/QuizResultsClient";
import { getAllQuizzes, getQuizById } from "@/data/quizzes";
import { sharedMetadata } from "@/app/shared-metadata";

interface QuizResultsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const quizzes = await getAllQuizzes();
  return quizzes.map((quiz) => ({
    slug: quiz.id,
  }));
}

export async function generateMetadata({ params }: QuizResultsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const quiz = await getQuizById(slug);
  
  if (!quiz) {
    return {
      title: "Quiz Results Not Found",
      description: "The requested quiz results could not be found.",
    };
  }

  return {
    title: `${quiz.title} | Tiny Steps A Day`,
    description: `View your results for the ${quiz.title} quiz and get personalized recommendations.`,
    keywords: ["quiz results", "assessment results", "self-improvement", quiz.category.toLowerCase(), "tiny steps a day"],
    openGraph: {
      title: `${quiz.title} | Tiny Steps A Day`,
      description: `View your results for the ${quiz.title} quiz and get personalized recommendations.`,
      type: "website",
      url: `${sharedMetadata.metadataBase}/quiz/${quiz.id}/results`,
      images: [sharedMetadata.openGraph.images[0]],
      siteName: sharedMetadata.openGraph.siteName,
      locale: sharedMetadata.openGraph.locale,
    },
    twitter: {
      card: "summary_large_image" as const,
        title: `${quiz.title} | Tiny Steps A Day`,
      description: `View your results for the ${quiz.title} quiz and get personalized recommendations.`,
      images: [sharedMetadata.twitter.images[0]],
    },
    alternates: {
      canonical: `${sharedMetadata.metadataBase}/quiz/${quiz.id}/results`,
    },
    robots: sharedMetadata.robots,
  };
}

export default async function QuizResultsPage({ params }: QuizResultsPageProps) {
  const { slug } = await params;
  const quiz = await getQuizById(slug);
  
  if (!quiz) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading quiz results...</div>}>
      <QuizResultsClient quiz={quiz} />
    </Suspense>
  );
}
