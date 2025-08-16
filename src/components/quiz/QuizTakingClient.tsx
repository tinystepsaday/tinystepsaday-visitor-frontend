"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { quizAPI } from '@/integration/quiz';
import type { Quiz } from '@/data/quizzes';
import { Clock, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import ModeToggle from '../mode-toggle';

interface QuizTakingClientProps {
  quiz: Quiz;
}

export default function QuizTakingClient({ quiz }: QuizTakingClientProps) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const { toast } = useToast();

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const hasAnsweredCurrentQuestion = answers[currentQuestion.id];

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!isLoggedIn) {
      setShowAuthPrompt(true);
      return;
    }

    if (Object.keys(answers).length !== quiz.questions.length) {
      setError('Please answer all questions before submitting.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Transform answers from Record format to array format expected by backend
      const answersArray = Object.entries(answers).map(([questionId, optionId]) => ({
        questionId,
        optionId
      }));

      const submission = {
        quizId: quiz.id,
        answers: answersArray,
        timeSpent: Math.floor(timeSpent / 60) // Convert seconds to minutes
      };

      const result = await quizAPI.submitQuiz(quiz.id, submission);
      // const transformedResult = transformBackendQuizResult(result); // This line was removed as per the new_code

      // Redirect to results page
      router.push(`/quiz/${quiz.id}/results?resultId=${result.id}`); // This line was changed as per the new_code
    } catch (err: unknown) {
      console.error('Error submitting quiz:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit quiz';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (showAuthPrompt) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardHeader className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
            <CardTitle>Authentication Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              You need to be logged in to submit this quiz and receive your personalized results.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => router.push('/login')}>
                Log In
              </Button>
              <Button variant="outline" onClick={() => router.push('/signup')}>
                Sign Up
              </Button>
            </div>
            <Button
              variant="ghost"
              onClick={() => setShowAuthPrompt(false)}
              className="text-sm"
            >
              Continue without saving
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start gap-8 md:gap-16 mb-8 md:mb-16 w-full">
      <div className="w-full bg-muted/50 border-b border-border sticky top-0 z-10">
        <div className="flex items-center justify-between w-full px-4 py-3 max-w-7xl mx-auto">
          <div className="flex flex-col">
            <h1 className="text-xl md:text-3xl text-wrap font-bold">{quiz.title}</h1>
            <p className="text-sm md:text-lg text-muted-foreground">{quiz.subtitle}</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <Button variant="outline" size="sm" onClick={() => router.push(`/quiz/${quiz.id}`)}>
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-6 space-y-6 w-full">
        {/* Quiz Header */}
        <div className="text-center space-y-4 w-full">
          {/* Progress and Timer */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-muted-foreground">
                {formatTime(timeSpent)}
              </span>
            </div>
          </div>

          <Progress value={progress} className="w-full" />
        </div>

        {/* Current Question */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">
              {currentQuestion.text}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[currentQuestion.id] || ''}
              onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
              className="space-y-3"
            >
              {currentQuestion.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-3">
                  <RadioGroupItem value={option.id} id={option.id} className="size-6" />
                  <Label htmlFor={option.id} className="text-sm md:text-base cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between w-full">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>

          {isLastQuestion ? (
            <Button
              onClick={handleSubmit}
              disabled={!hasAnsweredCurrentQuestion || isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!hasAnsweredCurrentQuestion}
            >
              Next
            </Button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="w-full">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-5 w-5" />
                  <span>{error}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
} 