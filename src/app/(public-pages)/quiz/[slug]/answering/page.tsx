import { Metadata } from "next";
import { notFound } from "next/navigation";
import QuizTakingClient from "@/components/quiz/QuizTakingClient";
import { getAllQuizzes, getQuizById } from "@/data/quizzes";
import { sharedMetadata } from "@/app/shared-metadata";

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
      title: "Quiz Not Found",
      description: "The requested quiz could not be found.",
    };
  }

  return {
    title: `Taking ${quiz.title} | Tiny Steps A Day`,
    description: `Take the ${quiz.title} quiz to discover your personalized recommendations.`,
    keywords: ["quiz", "assessment", "self-improvement", quiz.category.toLowerCase(), "tiny steps a day"],
    openGraph: {
      title: `Taking ${quiz.title} | Tiny Steps A Day`,
      description: `Take the ${quiz.title} quiz to discover your personalized recommendations.`,
      url: `${sharedMetadata.metadataBase}/quiz/${quiz.id}/answering`,
      images: [sharedMetadata.openGraph.images[0]],
      siteName: sharedMetadata.openGraph.siteName,
      locale: sharedMetadata.openGraph.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Taking ${quiz.title} | Tiny Steps A Day`,
      description: `Take the ${quiz.title} quiz to discover your personalized recommendations.`,
      images: [sharedMetadata.twitter.images[0]],
    },
    alternates: {
      canonical: `${sharedMetadata.metadataBase}/quiz/${quiz.id}/answering`,
    },
    robots: sharedMetadata.robots,
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