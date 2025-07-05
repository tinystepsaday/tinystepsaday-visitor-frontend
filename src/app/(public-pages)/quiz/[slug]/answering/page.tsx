import { Metadata } from "next";
import { notFound } from "next/navigation";
import QuizTakingClient from "@/components/quiz/QuizTakingClient";
import { getAllQuizzes, getQuizById } from "@/data/quizzes";

interface QuizAnsweringPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const quizzes = await getAllQuizzes();
  return quizzes.map((quiz) => ({
    slug: quiz.id,
  }));
}

export async function generateMetadata({ params }: QuizAnsweringPageProps): Promise<Metadata> {
  const { slug } = await params;
  const quiz = await getQuizById(slug);
  
  if (!quiz) {
    return {
      title: "Quiz Not Found - Tiny Steps A Day",
      description: "The requested quiz could not be found.",
    };
  }

  return {
    title: `Taking ${quiz.title} - Quiz - Tiny Steps A Day`,
    description: `Take the ${quiz.title} quiz to discover your personalized recommendations.`,
    keywords: ["quiz", "assessment", "self-improvement", quiz.category.toLowerCase(), "tiny steps a day"],
    openGraph: {
      title: `Taking ${quiz.title} - Quiz - Tiny Steps A Day`,
      description: `Take the ${quiz.title} quiz to discover your personalized recommendations.`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Taking ${quiz.title} - Quiz - Tiny Steps A Day`,
      description: `Take the ${quiz.title} quiz to discover your personalized recommendations.`,
    },
  };
}

export default async function QuizAnsweringPage({ params }: QuizAnsweringPageProps) {
  const { slug } = await params;
  const quiz = await getQuizById(slug);
  
  if (!quiz) {
    notFound();
  }

  return <QuizTakingClient quiz={quiz} />;
} 