import QuizResults from "@/components/dashboard/QuizResults";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz Results | Tiny Steps A Day",
  description: "View your quiz results, track your learning progress, and discover personalized recommendations for courses, products, streaks, and blog posts.",
  keywords: "quiz results, assessment scores, learning progress, test results, personalized recommendations, courses, products, streaks, blog posts",
  robots: "noindex, nofollow", // Dashboard pages should not be indexed
};

export default function QuizResultsPage() {
  return <QuizResults />;
}
