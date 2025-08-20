import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import QuizDetailsClient from "@/components/quiz/QuizDetailsClient";
import QuizDetailsSkeleton from "@/components/quiz/QuizDetailsSkeleton";
import { quizAPI, transformBackendQuiz } from "@/integration/quiz";
import { sharedMetadata } from "../../../shared-metadata";

interface QuizPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const response = await quizAPI.getPublicQuizzes({
      page: 1,
      limit: 100,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
    
    return response.quizzes.map((quiz) => ({
      slug: quiz.id,
    }));
  } catch (error) {
    console.error('Error generating static params for quizzes:', error);
    return [];
  }
}

export async function generateMetadata({ params }: QuizPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const quiz = await quizAPI.getPublicQuizById(slug);
    const transformedQuiz = transformBackendQuiz(quiz);
    const seoOptimizedDescription = transformedQuiz.description.length > 150 ? transformedQuiz.description.substring(0, 150) + "..." : transformedQuiz.description;
    
    return {
      title: `${transformedQuiz.title}`,
      description: seoOptimizedDescription,
      keywords: ["quiz", "online quiz", transformedQuiz.title, "self-assessment", "self-improvement", transformedQuiz.category.toLowerCase(), transformedQuiz.tags.map((tag) => tag).join(", "), "tiny steps a day"],
      openGraph: {
        title: `${transformedQuiz.title} | Tiny Steps A Day`,
        description: seoOptimizedDescription,
        type: "website",
        url: `${sharedMetadata.metadataBase}/quiz/${transformedQuiz.id}`,
        images: [sharedMetadata.openGraph.images[0]],
        siteName: sharedMetadata.openGraph.siteName,
        locale: sharedMetadata.openGraph.locale,
      },
      twitter: {
        card: "summary_large_image" as const,
        title: `${transformedQuiz.title} | Tiny Steps A Day`,
        description: seoOptimizedDescription,
        images: [sharedMetadata.twitter.images[0]],
      },
      alternates: {
        canonical: `${sharedMetadata.metadataBase}/quiz/${transformedQuiz.id}`,
      },
      robots: sharedMetadata.robots,
    };
  } catch (error) {
    console.error('Error generating metadata for quiz:', error);
    return {
      title: "Quiz Not Found",
      description: "The requested quiz could not be found.",
    };
  }
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { slug } = await params;
  
  try {
    const quiz = await quizAPI.getPublicQuizById(slug);
    const transformedQuiz = transformBackendQuiz(quiz);
    
    return (
      <Suspense fallback={<QuizDetailsSkeleton />}>
        <QuizDetailsClient quiz={transformedQuiz} />
      </Suspense>
    );
  } catch (error) {
    console.error('Error fetching quiz:', error);
    notFound();
  }
}
