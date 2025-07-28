import QuizResultDetails from "@/components/dashboard/QuizResultDetails";
import { getQuizResultById, getQuizById } from "@/data/quizzes";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface QuizResultPageProps {
  params: Promise<{ resultId: string }>;
}

export async function generateMetadata({ params }: QuizResultPageProps): Promise<Metadata> {
  const { resultId } = await params;
  const result = await getQuizResultById(resultId);
  
  if (!result) {
    return {
      title: "Quiz Result Not Found | Tiny Steps A Day",
      description: "The requested quiz result could not be found.",
      robots: "noindex, nofollow",
    };
  }

  // Get the quiz data to access the title
  const quiz = await getQuizById(result.quizId);
  const quizTitle = quiz?.title || 'Assessment';

  return {
    title: `Quiz Result - ${quizTitle} | Tiny Steps A Day`,
    description: `View detailed results for your ${quizTitle} assessment. Score: ${result.score || 'N/A'}`,
    keywords: "quiz result, assessment score, learning progress, detailed results",
    robots: "noindex, nofollow", // Dashboard pages should not be indexed
  };
}

export default async function QuizResultPage({ params }: QuizResultPageProps) {
  const { resultId } = await params;
  
  // Get the specific quiz result
  const result = await getQuizResultById(resultId);
  
  if (!result) {
    notFound();
  }

  return <QuizResultDetails resultId={resultId} />;
}
