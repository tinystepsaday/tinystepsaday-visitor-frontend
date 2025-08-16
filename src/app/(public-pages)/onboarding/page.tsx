"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import OnboardingQuizClient from "@/components/quiz/OnboardingQuizClient"
import { quizAPI, transformBackendQuiz } from '@/integration/quiz'
import type { Quiz } from '@/data/quizzes'
import { QuizAnsweringPageLoader } from '@/components/quiz/QuizAnsweringPageLoader'

export default function OnboardingPage() {
  const router = useRouter()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchOnboardingQuiz = async () => {
      try {
        setIsLoading(true)
        const fetchedQuiz = await quizAPI.getOnboardingQuiz()
        const transformedQuiz = transformBackendQuiz(fetchedQuiz)
        setQuiz(transformedQuiz)
      } catch (err: unknown) {
        console.error('Error fetching onboarding quiz:', err)
        // If no onboarding quiz is found, redirect to home page
        router.push('/')
        return
      } finally {
        setIsLoading(false)
      }
    }

    fetchOnboardingQuiz()
  }, [router])

  if (isLoading) {
    return <QuizAnsweringPageLoader />
  }

  if (!quiz) {
    // This should not happen as we redirect on error, but just in case
    router.push('/')
    return null
  }

  return <OnboardingQuizClient quiz={quiz} />
}