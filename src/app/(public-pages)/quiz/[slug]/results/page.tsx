"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { quizAPI, transformBackendQuiz } from '@/integration/quiz';
import QuizResultsClient from '@/components/quiz/QuizResultsClient';
import type { Quiz } from '@/data/quizzes';

export default function QuizResultsPage() {
  const params = useParams();
  const quizId = params.slug as string;
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setIsLoading(true);
        const fetchedQuiz = await quizAPI.getPublicQuizById(quizId);
        const transformedQuiz = transformBackendQuiz(fetchedQuiz);
        setQuiz(transformedQuiz);
      } catch (err: unknown) {
        console.error('Error fetching quiz:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch quiz';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    if (quizId) {
      fetchQuiz();
    }
  }, [quizId]);

  if (isLoading) {
    return <QuizResultsPageLoader />;
  }

  if (error || !quiz) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-destructive mb-4">Quiz Not Found</h1>
        <p className="text-muted-foreground mb-6">
          {error || 'The requested quiz could not be found.'}
        </p>
        <Link 
          href="/quiz" 
          className="text-primary hover:underline"
        >
          ← Back to Quizzes
        </Link>
      </div>
    );
  }

  return (
    <QuizResultsClient quiz={quiz} />
  );
}

const QuizResultsPageLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-full h-10 rounded-full bg-muted animate-pulse" />
        <div className="w-full h-40 rounded-full bg-muted animate-pulse" />
        <div className="w-full h-40 rounded-full bg-muted animate-pulse" />
        <div className="w-full h-40 rounded-full bg-muted animate-pulse" />
      </div>
    </div>
  )
}
