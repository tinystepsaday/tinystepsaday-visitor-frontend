"use client"

import { Button } from "@/components/ui/button";
import { Calendar, Timer, Book, User, Search } from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "../ui/section-header";

const quizCards = [
  {
    id: "self-mastery",
    title: "Master Your Habits",
    icon: <Calendar className="h-8 w-8" />,
    color: "bg-blue-100 dark:bg-blue-900",
    iconColor: "text-blue-600 dark:text-blue-300"
  },
  {
    id: "addictions",
    title: "Break Free From Addictions",
    icon: <Timer className="h-8 w-8" />,
    color: "bg-red-100 dark:bg-red-900",
    iconColor: "text-red-600 dark:text-red-300"
  },
  {
    id: "purpose",
    title: "Find Your Purpose",
    icon: <Search className="h-8 w-8" />,
    color: "bg-purple-100 dark:bg-purple-900",
    iconColor: "text-purple-600 dark:text-purple-300"
  },
  {
    id: "trauma",
    title: "Heal Your Past",
    icon: <Book className="h-8 w-8" />,
    color: "bg-green-100 dark:bg-green-900",
    iconColor: "text-green-600 dark:text-green-300"
  },
  {
    id: "general",
    title: "General Assessment",
    icon: <User className="h-8 w-8" />,
    color: "bg-amber-100 dark:bg-amber-900",
    iconColor: "text-amber-600 dark:text-amber-300"
  }
];

export function QuizSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Discover Your Path"
          subtitle="Take our quick quiz to find personalized courses and routines for your journey"
          centered={true}
        />
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto mt-10">
          {quizCards.map((quiz) => (
            <Link 
              key={quiz.id} 
              href={`/quiz/${quiz.id}`}
              className="group flex flex-col items-center text-center hover:scale-105 transition-transform"
            >
              <div className={`${quiz.color} ${quiz.iconColor} p-5 rounded-full mb-3 group-hover:shadow-lg transition-shadow`}>
                {quiz.icon}
              </div>
              <h3 className="text-base font-medium">{quiz.title}</h3>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button asChild size="lg">
            <Link href="/quiz">Explore All Quizzes</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
