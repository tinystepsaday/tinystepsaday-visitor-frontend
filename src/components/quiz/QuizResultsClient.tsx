"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { QuizLayout } from "@/components/quiz/QuizLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Calendar, ArrowRight, Trophy, Target, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
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
    const answersParam = searchParams.get('answers');
    if (answersParam) {
      try {
        const answers = JSON.parse(decodeURIComponent(answersParam));
        const calculatedResult = calculateQuizResult(answers);
        setResult(calculatedResult);
      } catch (error) {
        console.error('Error parsing answers:', error);
        router.push(`/quiz/${quiz.id}`);
      }
    } else {
      router.push(`/quiz/${quiz.id}`);
    }
    setIsLoading(false);
  }, [searchParams, quiz.id, router]);

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

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      case 'needs-improvement': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'excellent': return <Trophy className="h-5 w-5" />;
      case 'good': return <Target className="h-5 w-5" />;
      case 'fair': return <TrendingUp className="h-5 w-5" />;
      case 'needs-improvement': return <Book className="h-5 w-5" />;
      default: return <Book className="h-5 w-5" />;
    }
  };

  return (
    <QuizLayout
      title={quiz.title}
      subtitle="Your Results"
      showBackButton={true}
      onBackClick={() => router.push(`/quiz/${quiz.id}`)}
    >
      <div className="space-y-6">
        {/* Score Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {getLevelIcon(result.level)}
              <span>Your Score</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {result.percentage}%
              </div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(result.level)}`}>
                {result.level.replace('-', ' ').toUpperCase()}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{result.score} / {result.maxScore} points</span>
              </div>
              <Progress value={result.percentage} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Feedback Card */}
        <Card>
          <CardHeader>
            <CardTitle>Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {result.feedback}
            </p>
          </CardContent>
        </Card>

        {/* Recommendations Card */}
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {result.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-muted-foreground">{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Book className="h-5 w-5" />
                <span>Related Courses</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Explore courses to improve your skills in this area.
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