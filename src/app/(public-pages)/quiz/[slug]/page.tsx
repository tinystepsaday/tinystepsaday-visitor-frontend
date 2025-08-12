import { Metadata } from "next";
import { notFound } from "next/navigation";
import QuizDetailsClient from "@/components/quiz/QuizDetailsClient";
import { getAllQuizzes, getQuizById } from "@/data/quizzes";
import { sharedMetadata } from "../../../shared-metadata";

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
      title: "Quiz Not Found",
      description: "The requested quiz could not be found.",
    };
  }

  return {
    title: `${quiz.title}`,
    description: quiz.description,
    keywords: ["quiz", "assessment", "self-improvement", quiz.category.toLowerCase(), "tiny steps a day"],
    openGraph: {
      title: `${quiz.title} | Tiny Steps A Day`,
      description: quiz.description,
      type: "website",
      url: `${sharedMetadata.metadataBase}/quiz/${quiz.id}`,
      images: [sharedMetadata.openGraph.images[0]],
      siteName: sharedMetadata.openGraph.siteName,
      locale: sharedMetadata.openGraph.locale,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${quiz.title} | Tiny Steps A Day`,
      description: quiz.description,
      images: [sharedMetadata.twitter.images[0]],
    },
    alternates: {
      canonical: `${sharedMetadata.metadataBase}/quiz/${quiz.id}`,
    },
    robots: sharedMetadata.robots,
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
