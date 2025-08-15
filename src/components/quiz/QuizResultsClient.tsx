"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy,
  Target, 
  TrendingUp, 
  Clock, 
  Share2, 
  Download,
  Star,
  ArrowLeft,
  Calendar
} from 'lucide-react';
import { quizAPI, transformBackendQuizResult } from '@/integration/quiz';
import type { Quiz, QuizResult } from '@/data/quizzes';

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
            <CardTitle className="text-red-600">Error Loading Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600 mb-4">
              {error || 'Unable to load quiz results'}
            </p>
            <div className="flex gap-4">
              <Button onClick={() => router.push('/quiz')}>
                Back to Quizzes
              </Button>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <Button
          variant="ghost"
          onClick={() => router.push('/quiz')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Quizzes
        </Button>
        
        <h1 className="text-4xl font-bold">Quiz Results</h1>
        <p className="text-xl text-muted-foreground">
          {quiz.title} - {quiz.subtitle}
        </p>
      </div>

      {/* Score Summary */}
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Your Score</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            {getLevelIcon(result.level)}
            <div>
              <div className="text-4xl font-bold text-primary">
                {result.percentage}%
              </div>
              <div className="text-lg text-muted-foreground">
                {result.score} out of {result.maxScore} points
              </div>
            </div>
          </div>
          
          <Badge className={`text-lg px-4 py-2 ${getLevelColor(result.level)}`}>
            {result.classification}
          </Badge>
          
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
        <CardContent>
          <p className="text-lg mb-4">{result.feedback}</p>
          
          {/* Recommendations based on score level */}
          {result.recommendations && result.recommendations.length > 0 && (
            <div className="space-y-3">
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

          {/* Areas of Improvement */}
          {result.areasOfImprovement && result.areasOfImprovement.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-lg">Areas of Improvement</h4>
              <div className="space-y-2">
                {result.areasOfImprovement.map((area: string, index: number) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">{area}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Support Needed */}
          {result.supportNeeded && result.supportNeeded.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-lg">Support & Resources</h4>
              <div className="space-y-2">
                {result.supportNeeded.map((support: string, index: number) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">{support}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={() => router.push('/quiz')}>
          Take Another Quiz
        </Button>
        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          Share Results
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>

      {/* Support Needed */}
      {result.supportNeeded && result.supportNeeded.length > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-amber-800">Additional Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-amber-700 mb-3">
              Based on your results, you might benefit from:
            </p>
            <ul className="list-disc list-inside space-y-1 text-amber-700">
              {result.supportNeeded.map((support, index) => (
                <li key={index}>{support}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 