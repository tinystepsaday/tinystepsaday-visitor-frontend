"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import DashboardPageHeader from "./DashboardPageHeader";

// Mock recommendations data - in a real app, you'd fetch this from localStorage or backend
const recommendationsData = [
  {
    id: 1,
    title: "Morning Routine Mastery",
    type: "Course",
    description: "Establish a consistent morning routine that sets you up for daily success.",
    match: 95,
    path: "/courses/morning-routine-mastery",
  },
  {
    id: 2,
    title: "Meditation Streak",
    type: "Streak",
    description: "Build a daily meditation practice to improve focus and mindfulness.",
    match: 90,
    path: "/streaks",
  },
  {
    id: 3,
    title: "Purpose Discovery Workshop",
    type: "Event",
    description: "A guided workshop to help you uncover your core values and life purpose.",
    match: 85,
    path: "/events/purpose-discovery",
  },
  {
    id: 4,
    title: "The Power of Habits",
    type: "Book",
    description: "Understand how habits form and how to reshape them for personal growth.",
    match: 80,
    path: "/shop/books/power-of-habits",
  },
];

const QuizRecommendations = () => {
  return (
    <div>
      <DashboardPageHeader title="Personalized Recommendations" subtitle="Based on your assessment results, we've curated these resources for your journey" />
      
      {recommendationsData.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {recommendationsData.map((recommendation) => (
            <Card key={recommendation.id}>
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <Badge>{recommendation.type}</Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {recommendation.match}% Match
                  </Badge>
                </div>
                <CardTitle className="text-lg">{recommendation.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{recommendation.description}</p>
                <Button asChild>
                  <Link href={recommendation.path}>
                    {recommendation.type === "Course" ? "Start Course" : 
                     recommendation.type === "Streak" ? "Join Streak" : 
                     recommendation.type === "Event" ? "Register" : "Learn More"}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg">
          <h3 className="text-lg font-medium mb-2">No Recommendations Yet</h3>
          <p className="text-muted-foreground mb-6">
            Take an assessment to get personalized recommendations for your journey.
          </p>
          <Button asChild>
            <Link href="/quiz">Take an Assessment</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizRecommendations;
