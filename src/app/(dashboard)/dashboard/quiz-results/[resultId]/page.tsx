import QuizResultDetails from "@/components/dashboard/QuizResultDetails";
import { getQuizResultById } from "@/data/quizzes";
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

  return {
    title: `Quiz Result - ${result.title || 'Assessment'} | Tiny Steps A Day`,
    description: `View detailed results for your ${result.title || 'quiz'} assessment. Score: ${result.score || 'N/A'}`,
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
