"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import Link from "next/link";

// Mock quiz result data - in a real app, you'd fetch this from localStorage or backend
const quizResultsData = [
  {
    id: "self-mastery",
    title: "Self-Mastery Assessment",
    date: new Date(2025, 3, 15),
    score: 78,
    strengths: ["Time management", "Goal setting"],
    areas_for_improvement: ["Routine consistency", "Avoiding distractions"],
  },
  {
    id: "purpose",
    title: "Finding Your Purpose",
    date: new Date(2025, 3, 10),
    score: 65,
    strengths: ["Clarity of values", "Meaning in work"],
    areas_for_improvement: ["Long-term vision", "Aligning daily actions with purpose"],
  },
];

const QuizResults = () => {
  return (
    <div>
      <SectionHeader
        title="Your Quiz Results"
        subtitle="Review your assessment results and track your progress"
      />
      
      {quizResultsData.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {quizResultsData.map((result) => (
            <Card key={result.id} className="overflow-hidden">
              <div className={`h-2 ${result.score > 70 ? "bg-green-500" : result.score > 50 ? "bg-yellow-500" : "bg-red-500"}`} />
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{result.title}</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {format(result.date, "MMM d, yyyy")}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Score</span>
                    <span className="text-sm font-medium">{result.score}%</span>
                  </div>
                  <Progress value={result.score} className="h-2" />
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Strengths:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {result.strengths.map((strength, index) => (
                      <li key={index} className="text-sm text-muted-foreground">{strength}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Areas for Improvement:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {result.areas_for_improvement.map((area, index) => (
                      <li key={index} className="text-sm text-muted-foreground">{area}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between pt-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/quiz/${result.id}/results`}>
                      View Full Results
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href={`/quiz/${result.id}`}>
                      Retake Quiz
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg">
          <h3 className="text-lg font-medium mb-2">No Quiz Results Yet</h3>
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

export default QuizResults;
