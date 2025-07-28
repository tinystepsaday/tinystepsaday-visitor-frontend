import QuizRecommendations from "@/components/dashboard/QuizRecommendations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recommendations | Tiny Steps A Day",
  description: "Discover personalized learning recommendations based on your interests and progress.",
  keywords: "recommendations, personalized learning, course suggestions, learning path",
  robots: "noindex, nofollow", // Dashboard pages should not be indexed
};

export default function RecommendationsPage() {
  return <QuizRecommendations />;
}
