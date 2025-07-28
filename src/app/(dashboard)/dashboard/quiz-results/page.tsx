import QuizResults from "@/components/dashboard/QuizResults";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz Results | Tiny Steps A Day",
  description: "View your quiz results and track your learning progress across all assessments.",
  keywords: "quiz results, assessment scores, learning progress, test results",
  robots: "noindex, nofollow", // Dashboard pages should not be indexed
};

export default function QuizResultsPage() {
  return <QuizResults />;
}
