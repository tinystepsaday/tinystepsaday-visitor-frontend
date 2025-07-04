"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QuizBuilder } from "@/components/quiz-builder"
import type { Quiz } from "@/lib/types"

interface QuizBuilderModalProps {
  isOpen: boolean
  selectedQuiz: Quiz | null
  onClose: () => void
  onQuizChange: (quiz: Quiz) => void
  onSave: () => void
}

export function QuizBuilderModal({
  isOpen,
  selectedQuiz,
  onClose,
  onQuizChange,
  onSave,
}: QuizBuilderModalProps) {
  if (!isOpen || !selectedQuiz) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Quiz Builder</CardTitle>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <QuizBuilder
          quiz={selectedQuiz}
          onQuizChange={(updatedQuiz) => onQuizChange(updatedQuiz as Quiz)}
          onSave={onSave}
        />
      </CardContent>
    </Card>
  )
} 