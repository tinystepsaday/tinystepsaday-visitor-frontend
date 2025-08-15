"use client"

import React from 'react'
import QuizEditClient from '@/components/quiz/QuizEditClient'

export default function CreateQuizPage() {
  return (
    <div className="space-y-6">
      <QuizEditClient isEditing={false} />
    </div>
  )
}
