"use client"

import React from 'react'
import { notFound } from 'next/navigation'
import { useQuizDetails } from '@/hooks/useQuizDetails'
import { DetailPageLoader } from '@/components/ui/loaders'
import QuizDetailsClient from '@/components/quiz/QuizDetailsClient'

interface QuizDetailsWithQueryProps {
  quizId: string
}

export default function QuizDetailsWithQuery({ quizId }: QuizDetailsWithQueryProps) {
  const { data: quiz, isLoading, error } = useQuizDetails(quizId)

  if (error) {
    console.error('Error fetching quiz:', error)
    notFound()
  }

  if (isLoading || !quiz) {
    return (
      <DetailPageLoader 
        backHref="/management/quizzes"
        backText="Back to Quizzes"
        actionButtons={
          <>
            <div className="h-9 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-9 w-20 bg-gray-200 rounded animate-pulse"></div>
          </>
        }
      />
    )
  }

  return <QuizDetailsClient quiz={quiz} />
} 