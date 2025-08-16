"use client"

import { useEffect, useState } from "react";
import { ArrowLeft, Book, Target, Package } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { quizAPI, transformBackendQuiz } from "@/integration/quiz";
// import { downloadQuizResultPDF } from "@/utils/pdfGenerator";
import type { QuizResult, Quiz } from "@/data/quizzes";

interface QuizResultDetailsProps {
  resultId: string;
}

interface QuizResultWithQuiz extends QuizResult {
  quiz: Quiz;
  matchingCriteria?: {
    name: string;
    description: string;
    recommendations: string[];
    proposedCourses: Array<{ id: string; name: string; slug: string }>;
    proposedProducts: Array<{ id: string; name: string; slug: string }>;
    proposedStreaks: Array<{ id: string; name: string; slug: string }>;
    proposedBlogPosts: Array<{ id: string; title: string; slug: string }>;
  };
}

export default function QuizResultDetails({ resultId }: QuizResultDetailsProps) {
  const [result, setResult] = useState<QuizResultWithQuiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizResult = async () => {
      try {
        setIsLoading(true);
        const quizResult = await quizAPI.getQuizResultById(resultId);

        if (!quizResult) {
          setError('Quiz result not found');
          return;
        }

        const backendQuiz = await quizAPI.getQuizById(quizResult.quizId);
        if (!backendQuiz) {
          setError('Quiz not found');
          return;
        }

        // Transform backend quiz data to frontend format
        const quiz = transformBackendQuiz(backendQuiz);

        // Find matching grading criteria based on score
        const matchingCriteria = quiz.gradingCriteria.find(criteria =>
          quizResult.percentage >= criteria.minScore && quizResult.percentage <= criteria.maxScore
        );

        setResult({
          ...quizResult,
          quiz,
          matchingCriteria: matchingCriteria ? {
            name: matchingCriteria.name,
            description: matchingCriteria.description || "",
            recommendations: matchingCriteria.recommendations,
            proposedCourses: matchingCriteria.proposedCourses,
            proposedProducts: matchingCriteria.proposedProducts,
            proposedStreaks: matchingCriteria.proposedStreaks,
            proposedBlogPosts: matchingCriteria.proposedBlogPosts
          } : undefined
        });
      } catch (err) {
        setError('Failed to load quiz result');
        console.error('Error fetching quiz result:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizResult();
  }, [resultId]);

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

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/quiz-results">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Results
            </Button>
          </Link>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button asChild>
            <Link href="/dashboard/quiz-results">Back to Quiz Results</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/quiz-results">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Results
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading quiz result...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/quiz-results">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Results
            </Button>
          </Link>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Quiz result not found.</p>
          <Button asChild>
            <Link href="/dashboard/quiz-results">Back to Quiz Results</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-col md:flex-row gap-4 md:gap-0 w-full">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quiz Result Details</h1>
          <p className="text-muted-foreground">
            {result.quiz.title} - {format(new Date(result.completedAt), "MMM d, yyyy")}
          </p>
        </div>
        <div className="flex items-center gap-4 justify-end w-full">
          <Link href="/dashboard/quiz-results">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Results
            </Button>
          </Link>
          {/* <Button
            variant="outline"
            size="sm"
            onClick={() => downloadQuizResultPDF(result.quiz, result)}
          >
            <FileText className="mr-2 h-4 w-4" />
            Download PDF
          </Button> */}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
              <CardDescription>
                Overall assessment and feedback
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className={`${getLevelBadgeColor(result.level)} text-xl md:text-3xl font-bold text-center mb-4 p-4 rounded-lg`}>
                  {result.matchingCriteria?.name || result.classification}
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Feedback</h4>
                <p className="text-sm">{result.matchingCriteria?.description || result.feedback}</p>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>
                Personalized suggestions for improvement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(result.matchingCriteria?.recommendations || result.recommendations).map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Proposed Courses */}
          {result.matchingCriteria?.proposedCourses && result.matchingCriteria.proposedCourses.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  Recommended Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {result.matchingCriteria.proposedCourses.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm font-medium">{course.name}</span>
                      <Link href={`/courses/${course.slug}`}>
                        <Button variant="outline" size="sm">
                          View Course
                          <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Proposed Products */}
          {result.matchingCriteria?.proposedProducts && result.matchingCriteria.proposedProducts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Recommended Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {result.matchingCriteria.proposedProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm font-medium">{product.name}</span>
                      <Link href={`/shop/${product.slug}`}>
                        <Button variant="outline" size="sm">
                          View Product
                          <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Proposed Streaks */}
          {result.matchingCriteria?.proposedStreaks && result.matchingCriteria.proposedStreaks.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Recommended Streaks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {result.matchingCriteria.proposedStreaks.map((streak, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm font-medium">{streak.name}</span>
                      <Link href={`/streaks/${streak.slug}`}>
                        <Button variant="outline" size="sm">
                          Join Streak
                          <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Proposed Blog Posts */}
          {result.matchingCriteria?.proposedBlogPosts && result.matchingCriteria.proposedBlogPosts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  Recommended Blog Posts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {result.matchingCriteria.proposedBlogPosts.map((post, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm font-medium">{post.title}</span>
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="outline" size="sm">
                          Read Post
                          <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quiz Information */}
          <Card>
            <CardHeader>
              <CardTitle>Quiz Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Quiz</label>
                <p className="text-sm">{result.quiz.title}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Category</label>
                <p className="text-sm">{result.quiz.category}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <Button
          onClick={() => window.history.back()}
          variant="outline"
          className="flex-1"
        >
          Back to Results
        </Button>

        <Link href={`/quiz/${result.quizId}`} className="flex-1">
          <Button className="w-full">
            Retake Quiz
          </Button>
        </Link>

        <Link href="/quiz" className="flex-1">
          <Button variant="outline" className="w-full">
            Try Another Quiz
          </Button>
        </Link>
      </div>
    </div>
  );
} 