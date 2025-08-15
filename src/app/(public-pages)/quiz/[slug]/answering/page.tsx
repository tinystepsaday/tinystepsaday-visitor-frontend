"use client"

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import QuizTakingClient from "@/components/quiz/QuizTakingClient"
import { quizAPI, transformBackendQuiz } from '@/integration/quiz'
import type { Quiz } from '@/data/quizzes'
import { QuizAnsweringPageLoader } from '@/components/quiz/QuizAnsweringPageLoader'

export default function QuizAnsweringPage() {
  const params = useParams()
  const quizId = params.slug as string
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setIsLoading(true)
        const fetchedQuiz = await quizAPI.getPublicQuizById(quizId)
        const transformedQuiz = transformBackendQuiz(fetchedQuiz)
        setQuiz(transformedQuiz)
      } catch (err: unknown) {
        console.error('Error fetching quiz:', err)
        const errorMessage = err instanceof Error ? err.message : 'Failed to load quiz'
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    if (quizId) {
      fetchQuiz()
    }
  }, [quizId])

  if (isLoading) {
    return <QuizAnsweringPageLoader />
  }

  if (error || !quiz) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-destructive mb-4">Error Loading Quiz</h2>
          <p className="text-muted-foreground">
            {error || 'Unable to load the quiz'}
          </p>
        </div>
      </div>
    )
  }

  return <QuizTakingClient quiz={quiz} />
}