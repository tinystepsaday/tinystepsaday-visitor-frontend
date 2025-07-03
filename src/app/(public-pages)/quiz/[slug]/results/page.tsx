import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import QuizResultsClient from "@/components/quiz/QuizResultsClient";
import { getAllQuizzes, getQuizById } from "@/data/quizzes";

interface QuizResultsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const quizzes = getAllQuizzes();
  return quizzes.map((quiz) => ({
    slug: quiz.id,
  }));
}

export async function generateMetadata({ params }: QuizResultsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const quiz = getQuizById(slug);
  
  if (!quiz) {
    return {
      title: "Quiz Results Not Found - Tiny Steps A Day",
      description: "The requested quiz results could not be found.",
    };
  }

  return {
    title: `${quiz.title} - Results - Tiny Steps A Day`,
    description: `View your results for the ${quiz.title} quiz and get personalized recommendations.`,
    keywords: ["quiz results", "assessment results", "self-improvement", quiz.category.toLowerCase(), "tiny steps a day"],
    openGraph: {
      title: `${quiz.title} - Results - Tiny Steps A Day`,
      description: `View your results for the ${quiz.title} quiz and get personalized recommendations.`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${quiz.title} - Results - Tiny Steps A Day`,
      description: `View your results for the ${quiz.title} quiz and get personalized recommendations.`,
    },
  };
}

export default async function QuizResultsPage({ params }: QuizResultsPageProps) {
  const { slug } = await params;
  const quiz = getQuizById(slug);
  
  if (!quiz) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading quiz results...</div>}>
      <QuizResultsClient quiz={quiz} />
    </Suspense>
  );
}
