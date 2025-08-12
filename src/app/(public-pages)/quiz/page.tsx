// import { useEffect } from "react";
import { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Timer,
  Book,
  User,
  Search,
  Activity,
  Target,
} from "lucide-react";
import Link from "next/link";
import { getAllQuizzes } from "@/data/quizzes";
import { sharedMetadata } from "../../shared-metadata";

export const metadata: Metadata = {
  title: "Self-Improvement Quiz",
  description: "Take our self-improvement quiz to discover your personal development path and find the right resources for your journey.",
  keywords: [
    "self-improvement quiz",
    "personal development",
    "quiz",
    "self-improvement",
    "personal development path",
    "tiny steps a day",
    "tiny steps",
    "a day",
    "actionable steps",
    "daily habits",
    "tips",
  ],
  openGraph: {
    title: "Self-Improvement Quiz | Tiny Steps A Day",
    description: "Take our self-improvement quiz to discover your personal development path and find the right resources for your journey.",
    url: `${sharedMetadata.metadataBase}/quiz`,
    images: [sharedMetadata.openGraph.images[0]],
    siteName: sharedMetadata.openGraph.siteName,
    locale: sharedMetadata.openGraph.locale,
    type: "website",
  },
  twitter: {
    title: "Self-Improvement Quiz | Tiny Steps A Day",
    description: "Take our self-improvement quiz to discover your personal development path and find the right resources for your journey.",
    images: [sharedMetadata.twitter.images[0]],
    card: "summary_large_image" as const,
  },
  alternates: {
    canonical: `${sharedMetadata.metadataBase}/quiz`,
  },
  robots: sharedMetadata.robots,
};

// Helper function to get icon based on category
const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'personal development':
      return <User className="h-6 w-6" />;
    case 'addiction recovery':
      return <Timer className="h-6 w-6" />;
    case 'purpose discovery':
      return <Search className="h-6 w-6" />;
    case 'trauma healing':
      return <Book className="h-6 w-6" />;
    case 'mindfulness':
      return <Calendar className="h-6 w-6" />;
    default:
      return <Target className="h-6 w-6" />;
  }
};

// Helper function to get color based on category
const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'personal development':
      return {
        bg: "bg-blue-100 dark:bg-blue-900",
        text: "text-blue-600 dark:text-blue-300"
      };
    case 'addiction recovery':
      return {
        bg: "bg-red-100 dark:bg-red-900",
        text: "text-red-600 dark:text-red-300"
      };
    case 'purpose discovery':
      return {
        bg: "bg-purple-100 dark:bg-purple-900",
        text: "text-purple-600 dark:text-purple-300"
      };
    case 'trauma healing':
      return {
        bg: "bg-green-100 dark:bg-green-900",
        text: "text-green-600 dark:text-green-300"
      };
    case 'mindfulness':
      return {
        bg: "bg-amber-100 dark:bg-amber-900",
        text: "text-amber-600 dark:text-amber-300"
      };
    default:
      return {
        bg: "bg-gray-100 dark:bg-gray-900",
        text: "text-gray-600 dark:text-gray-300"
      };
  }
};

const Quiz = async () => {
  const quizzes = await getAllQuizzes();
  const publicQuizzes = quizzes.filter(quiz => quiz.isPublic && quiz.status === 'active');

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 md:py-16 w-full">
      <SectionHeader
        title="Self-Discovery Quizzes"
        subtitle="Take a quick assessment to receive personalized recommendations tailored to your unique journey"
        centered={true}
        isPageHeader={true}
      />

      <div className="mb-10 max-w-3xl mx-auto text-center">
        <p className="text-muted-foreground">
          Our scientifically designed quizzes take just 3-5 minutes to complete and will help you identify the most effective resources for your personal growth journey. No login required to get started!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {publicQuizzes.map((quiz) => {
          const colors = getCategoryColor(quiz.category);
          const icon = getCategoryIcon(quiz.category);
          
          return (
            <Card key={quiz.id} className="overflow-hidden transition-all hover:shadow-lg">
              <CardHeader className={`${colors.bg} py-5 ${colors.text}`}>
                <div className="flex items-center justify-between">
                  {icon}
                  <div className="flex items-center gap-2 text-sm">
                    <Timer className="h-4 w-4" />
                    <span>{quiz.estimatedTime}</span>
                    <span className="mx-1">•</span>
                    <span>{quiz.questions.length} questions</span>
                  </div>
                </div>
                <CardTitle className="mt-2 text-foreground">{quiz.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {quiz.subtitle}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/quiz/${quiz.id}`}>
                    <Activity className="mr-2 h-4 w-4" />
                    Learn More
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold mb-4">Why Take Our Quizzes?</h3>
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          <div className="p-4 rounded-lg bg-card border">
            <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
              <User className="h-6 w-6" />
            </div>
            <h4 className="font-semibold mb-2">Personalized Guidance</h4>
            <p className="text-sm text-muted-foreground">Get recommendations tailored specifically to your unique needs and goals.</p>
          </div>
          <div className="p-4 rounded-lg bg-card border">
            <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
              <Timer className="h-6 w-6" />
            </div>
            <h4 className="font-semibold mb-2">Quick & Effective</h4>
            <p className="text-sm text-muted-foreground">Just 3-5 minutes to complete, delivering immediate actionable insights.</p>
          </div>
          <div className="p-4 rounded-lg bg-card border">
            <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
              <Book className="h-6 w-6" />
            </div>
            <h4 className="font-semibold mb-2">Science-Based</h4>
            <p className="text-sm text-muted-foreground">Our assessments are grounded in proven psychological frameworks and research.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
