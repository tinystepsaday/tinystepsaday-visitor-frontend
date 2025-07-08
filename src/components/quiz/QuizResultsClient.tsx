"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { QuizLayout } from "@/components/quiz/QuizLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Calendar, ArrowRight, Target } from "lucide-react";
import Link from "next/link";
import { Quiz, QuizResult, calculateQuizResult } from "@/data/quizzes";

interface QuizResultsClientProps {
  quiz: Quiz;
}

export default function QuizResultsClient({ quiz }: QuizResultsClientProps) {
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!quiz) return;
    
    const answersParam = searchParams.get('answers');
    if (answersParam) {
      try {
        const answers = JSON.parse(decodeURIComponent(answersParam));
        const calculatedResult = calculateQuizResult(answers, quiz.id);
        setResult(calculatedResult);
      } catch (error) {
        console.error('Error parsing answers:', error);
        router.push(`/quiz/${quiz.id}`);
      }
    } else {
      router.push(`/quiz/${quiz.id}`);
    }
    setIsLoading(false);
  }, [searchParams, quiz?.id, router, quiz]);

  // Safety check
  if (!quiz) {
    return (
      <QuizLayout title="Quiz Error" subtitle="Quiz not found">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">This quiz could not be found.</p>
          <Button onClick={() => router.push("/quiz")}>
            Back to Quizzes
          </Button>
        </div>
      </QuizLayout>
    );
  }

  if (isLoading) {
    return (
      <QuizLayout title={quiz.title} subtitle="Loading results...">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Calculating your results...</p>
          </div>
        </div>
      </QuizLayout>
    );
  }

  if (!result) {
    return (
      <QuizLayout title={quiz.title} subtitle="Error loading results">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Unable to load quiz results.</p>
          <Button onClick={() => router.push(`/quiz/${quiz.id}`)}>
            Retake Quiz
          </Button>
        </div>
      </QuizLayout>
    );
  }

  const getCriteriaForScore = (percentage: number) => {
    return quiz.gradingCriteria.find(c => 
      percentage >= c.minScore && percentage <= c.maxScore
    )
  }

  const matchingCriteria = getCriteriaForScore(result.percentage)

  return (
    <QuizLayout
      title={quiz.title}
      subtitle="Your Results"
      showBackButton={true}
      onBackClick={() => router.push(`/quiz/${quiz.id}`)}
    >
      <div className="space-y-6">
        {/* Criteria name based on score */}
        <Card>
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed font-bold text-4xl">
              {matchingCriteria?.name || 'Results'}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Score: {result.percentage}% ({result.score}/{result.maxScore} points)
            </p>
          </CardContent>
        </Card>

        {/* Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {matchingCriteria?.description || result.feedback}
            </p>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {(matchingCriteria?.recommendations || result.recommendations).map((recommendation, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-muted-foreground">{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Recommended Courses */}
        {matchingCriteria?.proposedCourses && matchingCriteria.proposedCourses.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Book className="h-5 w-5" />
                <span>Recommended Courses</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {matchingCriteria.proposedCourses.map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">{course.name}</span>
                    <Link href={`/courses/${course.slug}`}>
                      <Button variant="outline" size="sm">
                        View Course
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recommended Products */}
        {matchingCriteria?.proposedProducts && matchingCriteria.proposedProducts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Recommended Resources</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {matchingCriteria.proposedProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">{product.name}</span>
                    <Link href={`/shop/${product.slug}`}>
                      <Button variant="outline" size="sm">
                        View Product
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recommended Streaks */}
        {matchingCriteria?.proposedStreaks && matchingCriteria.proposedStreaks.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Recommended Streaks</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {matchingCriteria.proposedStreaks.map((streak, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">{streak.name}</span>
                    <Link href={`/streaks/${streak.slug}`}>
                      <Button variant="outline" size="sm">
                        Join Streak
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Additional Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Book className="h-5 w-5" />
                <span>Browse All Courses</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Explore our full course catalog to find the perfect learning path.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/courses" className="w-full">
                <Button variant="outline" className="w-full">
                  Browse Courses
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Schedule Consultation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Get personalized guidance from our experts.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/schedule" className="w-full">
                <Button variant="outline" className="w-full">
                  Book Session
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button
            onClick={() => router.push(`/quiz/${quiz.id}`)}
            className="flex-1"
          >
            Retake Quiz
          </Button>
          
          <Link href="/quiz" className="flex-1">
            <Button variant="outline" className="w-full">
              Try Another Quiz
            </Button>
          </Link>
          
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </QuizLayout>
  );
} 