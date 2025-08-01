import { Metadata } from "next";
import { notFound } from "next/navigation";
import QuizDetailsClient from "@/components/quiz/QuizDetailsClient";
import { getAllQuizzes, getQuizById } from "@/data/quizzes";

interface QuizPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const quizzes = await getAllQuizzes();
  return quizzes.map((quiz) => ({
    slug: quiz.id,
  }));
}

export async function generateMetadata({ params }: QuizPageProps): Promise<Metadata> {
  const { slug } = await params;
  const quiz = await getQuizById(slug);
  
  if (!quiz) {
    return {
      title: "Quiz Not Found - Tiny Steps A Day",
      description: "The requested quiz could not be found.",
    };
  }

  return {
    title: `${quiz.title} - Quiz - Tiny Steps A Day`,
    description: quiz.description,
    keywords: ["quiz", "assessment", "self-improvement", quiz.category.toLowerCase(), "tiny steps a day"],
    openGraph: {
      title: `${quiz.title} - Quiz - Tiny Steps A Day`,
      description: quiz.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${quiz.title} - Quiz - Tiny Steps A Day`,
      description: quiz.description,
    },
  };
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { slug } = await params;
  const quiz = await getQuizById(slug);
  
  if (!quiz) {
    notFound();
  }

  return <QuizDetailsClient quiz={quiz} />;
}
