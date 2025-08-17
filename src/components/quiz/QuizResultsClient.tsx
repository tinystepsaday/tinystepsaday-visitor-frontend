"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Target, TrendingUp, Clock, Star, Calendar, Download, FileText, Share2 } from 'lucide-react';
import { quizAPI, transformBackendQuizResult } from '@/integration/quiz';
import { downloadQuizResultPDF, downloadQuizResultPDFWithOptions } from '@/utils/pdfGenerator';
import type { Quiz, QuizResult } from '@/data/quizzes';
import { SectionHeader } from '../ui/section-header';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface QuizResultsClientProps {
  quiz: Quiz;
}

export default function QuizResultsClient({ quiz }: QuizResultsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resultId = searchParams.get('resultId');

  const [result, setResult] = useState<QuizResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      if (!resultId) return;

      try {
        setIsLoading(true);
        const fetchedResult = await quizAPI.getQuizResultById(resultId);
        const transformedResult = transformBackendQuizResult(fetchedResult);
        setResult(transformedResult);
      } catch (err: unknown) {
        console.error('Error fetching quiz result:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load quiz result';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResult();
  }, [resultId]);

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'excellent':
        return <Trophy className="h-6 w-6 text-green-600" />;
      case 'good':
        return <TrendingUp className="h-6 w-6 text-blue-600" />;
      case 'fair':
        return <Target className="h-6 w-6 text-yellow-600" />;
      case 'needs-improvement':
        return <Target className="h-6 w-6 text-red-600" />;
      default:
        return <Star className="h-6 w-6 text-gray-600" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'excellent':
        return 'text-green-500';
      case 'good':
        return 'text-blue-500';
      case 'fair':
        return 'text-yellow-500';
      case 'needs-improvement':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-600">
              {!resultId ? 'No Results Found' : 'Error Loading Results'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600 mb-4">
              {!resultId
                ? 'No quiz result ID provided. Please complete a quiz first to view your results.'
                : (error || 'Unable to load quiz results')
              }
            </p>
            <div className="flex gap-4">
              <Button onClick={() => router.push('/quiz')}>
                Back to Quizzes
              </Button>
              {!resultId && (
                <Button variant="outline" onClick={() => router.push(`/quiz/${quiz.id}/answering`)}>
                  Take Quiz
                </Button>
              )}
              {resultId && (
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 w-full mb-16">
      {/* Header */}
      <SectionHeader title={`Your Quiz Results for ${quiz.title}`} subtitle={quiz.subtitle} />

      {/* Score Summary */}
      <Card className="text-center">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-center gap-4">
              {getLevelIcon(result.level)}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <h2 className={`text-3xl font-bold ${getLevelColor(result.level)}`}>You are a {result.classification}</h2>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Time: {result.timeSpent} min</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Completed: {new Date(result.completedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Personalized Feedback
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-base mb-4">{result.feedback}</p>

          {/* Recommendations based on score level */}
          {result.recommendations && result.recommendations.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-lg">Recommendations</h4>
              <div className="space-y-2">
                {result.recommendations.map((recommendation: string, index: number) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recommended Resources */}
      {(result.proposedCourses?.length || result.proposedProducts?.length || result.proposedStreaks?.length || result.proposedBlogPosts?.length) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Recommended Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {result.proposedCourses && result.proposedCourses.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-lg text-primary">Courses</h4>
                <div className="grid gap-3">
                  {result.proposedCourses.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div>
                        <h5 className="font-medium">{course.name}</h5>
                        <p className="text-sm text-muted-foreground">Course</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => router.push(`/courses/${course.slug}`)}>
                        View Course
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.proposedProducts && result.proposedProducts.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-lg text-primary">Products</h4>
                <div className="grid gap-3">
                  {result.proposedProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div>
                        <h5 className="font-medium">{product.name}</h5>
                        <p className="text-sm text-muted-foreground">Product</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => router.push(`/shop/${product.slug}`)}>
                        View Product
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.proposedStreaks && result.proposedStreaks.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-lg text-primary">Streaks</h4>
                <div className="grid gap-3">
                  {result.proposedStreaks.map((streak, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div>
                        <h5 className="font-medium">{streak.name}</h5>
                        <p className="text-sm text-muted-foreground">Streak</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => router.push(`/streaks/${streak.slug}`)}>
                        View Streak
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.proposedBlogPosts && result.proposedBlogPosts.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-lg text-primary">Blog Posts</h4>
                <div className="grid gap-3">
                  {result.proposedBlogPosts.map((blogPost, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div>
                        <h5 className="font-medium">{blogPost.title}</h5>
                        <p className="text-sm text-muted-foreground">Blog Post</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => router.push(`/blog/${blogPost.slug}`)}>
                        Read Post
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={() => router.push('/quiz')}>
          Take Another Quiz
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className='hidden'>
            <Button variant="outline">
              <Download className="h-4 w-4" />
              Download Results
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => downloadQuizResultPDF(quiz, result)}>
              <FileText className="mr-2 h-4 w-4" />
              PDF Report (Full)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => downloadQuizResultPDFWithOptions(quiz, result, { includeAnswers: false, includeRecommendations: true })}>
              <FileText className="mr-2 h-4 w-4" />
              PDF Summary
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert('CSV export coming soon!')}>
              <FileText className="mr-2 h-4 w-4" />
              CSV Export
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert('Share functionality not yet implemented')}>
              <Share2 className="mr-2 h-4 w-4" />
              Share Results
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
} 