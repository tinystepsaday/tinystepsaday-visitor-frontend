"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Book, Target, Package, ArrowRight, Clock } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import DashboardPageHeader from "./DashboardPageHeader";
import { getUserQuizResults, getQuizById, type QuizResult, type Quiz } from "@/data/quizzes";

interface QuizResultWithQuiz extends QuizResult {
  quiz: Quiz;
  matchingCriteria?: {
    name: string;
    description: string;
    recommendations: string[];
    proposedCourses: Array<{ id: string; name: string; slug: string }>;
    proposedProducts: Array<{ id: string; name: string; slug: string }>;
    proposedStreaks: Array<{ id: string; name: string; slug: string }>;
  };
}

const QuizResults = () => {
  const [quizResults, setQuizResults] = useState<QuizResultWithQuiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuizResults = async () => {
      try {
        const userResults = await getUserQuizResults();
        const resultsWithQuizData: QuizResultWithQuiz[] = [];

        for (const result of userResults) {
          const quiz = await getQuizById(result.quizId);
          if (quiz) {
            // Find matching grading criteria based on score
            const matchingCriteria = quiz.gradingCriteria.find(criteria => 
              result.percentage >= criteria.minScore && result.percentage <= criteria.maxScore
            );

            resultsWithQuizData.push({
              ...result,
              quiz,
              matchingCriteria: matchingCriteria ? {
                name: matchingCriteria.name,
                description: matchingCriteria.description || "",
                recommendations: matchingCriteria.recommendations,
                proposedCourses: matchingCriteria.proposedCourses,
                proposedProducts: matchingCriteria.proposedProducts,
                proposedStreaks: matchingCriteria.proposedStreaks
              } : undefined
            });
          }
        }

        // Sort by completion date (newest first)
        resultsWithQuizData.sort((a, b) => 
          new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
        );

        setQuizResults(resultsWithQuizData);
      } catch (error) {
        console.error('Error fetching quiz results:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizResults();
  }, []);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'excellent':
        return 'bg-green-500';
      case 'good':
        return 'bg-blue-500';
      case 'fair':
        return 'bg-yellow-500';
      case 'needs-improvement':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'excellent':
        return 'bg-green-100 text-green-800';
      case 'good':
        return 'bg-blue-100 text-blue-800';
      case 'fair':
        return 'bg-yellow-100 text-yellow-800';
      case 'needs-improvement':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div>
        <DashboardPageHeader title="Your Quiz Results" subtitle="Review your assessment results and track your progress" />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your quiz results...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <DashboardPageHeader title="Your Quiz Results" subtitle="Review your assessment results and track your progress" />
      
      {quizResults.length > 0 ? (
        <div className="space-y-6">
          {quizResults.map((result) => (
            <Card key={result.id} className="overflow-hidden">
              <div className={`h-2 ${getLevelColor(result.level)}`} />
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {result.quiz.title}
                      <Badge className={getLevelBadgeColor(result.level)}>
                        {result.matchingCriteria?.name || result.classification}
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {result.quiz.subtitle}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(result.completedAt), "MMM d, yyyy")}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      {result.timeSpent} min
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Score Section */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Score</span>
                    <span className="text-sm font-medium">{result.percentage}%</span>
                  </div>
                  <Progress value={result.percentage} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {result.score}/{result.maxScore} points
                  </p>
                </div>

                {/* Analysis */}
                {result.matchingCriteria?.description && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Analysis</h4>
                    <p className="text-sm text-muted-foreground">{result.matchingCriteria.description}</p>
                  </div>
                )}

                {/* Recommendations */}
                {result.matchingCriteria?.recommendations && result.matchingCriteria.recommendations.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Recommendations</h4>
                    <ul className="space-y-1">
                      {result.matchingCriteria.recommendations.slice(0, 3).map((recommendation, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {recommendation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Proposed Resources */}
                {(result.matchingCriteria?.proposedCourses.length || 
                  result.matchingCriteria?.proposedProducts.length || 
                  result.matchingCriteria?.proposedStreaks.length) && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Recommended Resources</h4>
                    <div className="space-y-2">
                      {/* Courses */}
                      {result.matchingCriteria?.proposedCourses.slice(0, 2).map((course, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Book className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{course.name}</span>
                        </div>
                      ))}
                      
                      {/* Products */}
                      {result.matchingCriteria?.proposedProducts.slice(0, 2).map((product, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{product.name}</span>
                        </div>
                      ))}
                      
                      {/* Streaks */}
                      {result.matchingCriteria?.proposedStreaks.slice(0, 2).map((streak, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Target className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{streak.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Areas for Improvement */}
                {result.areasOfImprovement.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Areas for Improvement</h4>
                    <div className="flex flex-wrap gap-1">
                      {result.areasOfImprovement.slice(0, 3).map((area, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between pt-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/dashboard/quiz-results/${result.id}`}>
                      View Full Results
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href={`/quiz/${result.quizId}`}>
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
