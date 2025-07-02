// import { useEffect } from "react";
import { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Timer,
  Book,
  User,
  Search,
  Activity
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Self-Improvement Quiz - Discover Your Path",
  description: "Take our self-improvement quiz to discover your personal development path and find the right resources for your journey.",
  openGraph: {
    title: "Self-Improvement Quiz - Discover Your Path",
    description: "Take our self-improvement quiz to discover your personal development path and find the right resources for your journey.",
    url: "/quiz",
  },
};

const quizCategories = [
  {
    id: "self-mastery",
    title: "Master Your Habits",
    description: "Build self-discipline, establish routines, and achieve your goals with consistency.",
    icon: <Calendar className="h-6 w-6" />,
    time: "3 min",
    questions: 10,
    color: "bg-blue-100 dark:bg-blue-900",
    textColor: "text-blue-600 dark:text-blue-300"
  },
  {
    id: "addictions",
    title: "Break Free From Addictions",
    description: "Overcome dependencies on social media, substances, or other habits holding you back.",
    icon: <Timer className="h-6 w-6" />,
    time: "4 min",
    questions: 12,
    color: "bg-red-100 dark:bg-red-900",
    textColor: "text-red-600 dark:text-red-300"
  },
  {
    id: "purpose",
    title: "Find Your Purpose",
    description: "Clarify your life direction, explore career paths, and discover your deeper meaning.",
    icon: <Search className="h-6 w-6" />,
    time: "5 min",
    questions: 15,
    color: "bg-purple-100 dark:bg-purple-900",
    textColor: "text-purple-600 dark:text-purple-300"
  },
  {
    id: "trauma",
    title: "Heal Your Past",
    description: "Process and integrate past traumas with mindfulness and proven therapeutic techniques.",
    icon: <Book className="h-6 w-6" />,
    time: "4 min",
    questions: 12,
    color: "bg-green-100 dark:bg-green-900",
    textColor: "text-green-600 dark:text-green-300"
  },
  {
    id: "general",
    title: "General Assessment",
    description: "Not sure where to start? This quiz will help identify your best focus area.",
    icon: <User className="h-6 w-6" />,
    time: "3 min",
    questions: 10,
    color: "bg-amber-100 dark:bg-amber-900",
    textColor: "text-amber-600 dark:text-amber-300"
  }
];

const Quiz = () => {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

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
        {quizCategories.map((category) => (
          <Card key={category.id} className="overflow-hidden transition-all hover:shadow-lg">
            <CardHeader className={`${category.color} py-5 ${category.textColor}`}>
              <div className="flex items-center justify-between">
                {category.icon}
                <div className="flex items-center gap-2 text-sm">
                  <Timer className="h-4 w-4" />
                  <span>{category.time}</span>
                  <span className="mx-1">•</span>
                  <span>{category.questions} questions</span>
                </div>
              </div>
              <CardTitle className="mt-2 text-foreground">{category.title}</CardTitle>
              <CardDescription className="text-muted-foreground">
                {category.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">
                Take this quiz to receive personalized recommendations for courses,
                streaks, and resources tailored to your specific needs.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/quiz/${category.id}`}>
                  <Activity className="mr-2 h-4 w-4" />
                  Start Quiz
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
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
