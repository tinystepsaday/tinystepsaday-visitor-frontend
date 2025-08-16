"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Target, Eye, Users, TrendingUp } from 'lucide-react';
import { quizAPI, transformBackendQuiz, transformBackendQuizResult } from '@/integration/quiz';
import type { Quiz, QuizResult } from '@/data/quizzes';
import { DetailPageLoader } from '@/components/ui/loaders';

export default function QuizResultsListPage() {
  const params = useParams();
  const quizId = params.id as string;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [quizData, resultsData] = await Promise.all([
          quizAPI.getQuizById(quizId),
          quizAPI.getQuizResults({ quizId, limit: 100 }) // Get up to 100 results
        ]);

        const transformedQuiz = transformBackendQuiz(quizData);
        const transformedResults = resultsData.results.map(transformBackendQuizResult);

        setQuiz(transformedQuiz);
        setResults(transformedResults);
      } catch (err: unknown) {
        console.error('Error fetching quiz results:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch quiz results';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    if (quizId) {
      fetchData();
    }
  }, [quizId]);

  if (isLoading) {
    return <DetailPageLoader />;
  }

  if (error || !quiz) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-destructive mb-4">Quiz Not Found</h1>
        <p className="text-muted-foreground mb-6">
          {error || 'The requested quiz could not be found.'}
        </p>
        <Link href="/management/quizzes">
          <Button>
            ← Back to Quizzes
          </Button>
        </Link>
      </div>
    );
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'excellent':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'good':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'fair':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'needs-improvement':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'excellent':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'good':
        return <TrendingUp className="h-4 w-4 text-blue-600" />;
      case 'fair':
        return <Target className="h-4 w-4 text-yellow-600" />;
      case 'needs-improvement':
        return <Target className="h-4 w-4 text-red-600" />;
      default:
        return <Target className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <Link href={`/management/quizzes/${quiz.id}/analytics`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Analytics
              </Button>
            </Link>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Quiz Results</h1>
            <p className="text-muted-foreground">
              {quiz.title} - {results.length} submissions
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{results.length}</div>
            <p className="text-xs text-muted-foreground">
              Quiz attempts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {results.length > 0
                ? Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / results.length)
                : 0
              }%
            </div>
            <p className="text-xs text-muted-foreground">
              Across all submissions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {results.length > 0
                ? Math.round(results.reduce((sum, r) => sum + r.timeSpent, 0) / results.length)
                : 0
              } min
            </div>
            <p className="text-xs text-muted-foreground">
              Estimated: {quiz.estimatedTime}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {quiz.totalAttempts > 0
                ? Math.round((quiz.completedAttempts / quiz.totalAttempts) * 100)
                : 0
              }%
            </div>
            <p className="text-xs text-muted-foreground">
              {quiz.completedAttempts}/{quiz.totalAttempts} completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Results List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          {results.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No quiz results yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((result) => (
                <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {getLevelIcon(result.level)}
                      <Badge className={getLevelColor(result.level)}>
                        {result.classification}
                      </Badge>
                    </div>
                    <div>
                      <p className="font-medium">{result.userName}</p>
                      <p className="text-sm text-muted-foreground">{result.userEmail}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-lg font-bold">{result.percentage}%</p>
                      <p className="text-xs text-muted-foreground">
                        {result.score}/{result.maxScore} pts
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm font-medium">{result.timeSpent} min</p>
                      <p className="text-xs text-muted-foreground">Time spent</p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm font-medium">
                        {new Date(result.completedAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>

                    <Link href={`/management/quizzes/${quiz.id}/results/${result.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
