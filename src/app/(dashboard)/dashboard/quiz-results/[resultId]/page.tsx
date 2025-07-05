import QuizResultDetails from "@/components/dashboard/QuizResultDetails";
import { getQuizResultById } from "@/data/quizzes";
import { notFound } from "next/navigation";

interface QuizResultPageProps {
  params: Promise<{ resultId: string }>;
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
