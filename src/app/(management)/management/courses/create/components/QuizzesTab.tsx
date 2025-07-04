"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, HelpCircle } from "lucide-react"
import type { Quiz } from "@/lib/types"
import { createDefaultQuiz } from "../utils"

interface QuizzesTabProps {
  quizzes: Quiz[]
  onQuizzesChange: (quizzes: Quiz[]) => void
  onQuizSelect: (quiz: Quiz) => void
  onQuizBuilderOpen: () => void
}

export function QuizzesTab({
  quizzes,
  onQuizzesChange,
  onQuizSelect,
  onQuizBuilderOpen,
}: QuizzesTabProps) {
  const addQuiz = () => {
    const newQuiz = createDefaultQuiz()
    onQuizzesChange([...quizzes, newQuiz])
    onQuizSelect(newQuiz)
    onQuizBuilderOpen()
  }

  const updateQuiz = (quizId: string, updates: Partial<Quiz>) => {
    onQuizzesChange(
      quizzes.map((quiz) => (quiz.id === quizId ? { ...quiz, ...updates } : quiz))
    )
  }

  const removeQuiz = (quizId: string) => {
    onQuizzesChange(quizzes.filter((quiz) => quiz.id !== quizId))
  }

  const editQuiz = (quiz: Quiz) => {
    onQuizSelect(quiz)
    onQuizBuilderOpen()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Course Quizzes</h3>
          <p className="text-sm text-muted-foreground">Add quizzes to test student knowledge</p>
        </div>
        <Button type="button" onClick={addQuiz}>
          <Plus className="mr-2 h-4 w-4" />
          Add Quiz
        </Button>
      </div>

      <div className="space-y-4">
        {quizzes.map((quiz, quizIndex) => (
          <Card key={quiz.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <HelpCircle className="h-4 w-4" />
                  <Badge variant="outline">Quiz {quizIndex + 1}</Badge>
                  <Badge variant="secondary">{quiz.questions?.length || 0} questions</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editQuiz(quiz)}
                  >
                    Edit Quiz
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeQuiz(quiz.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Quiz title..."
                  value={quiz.title}
                  onChange={(e) => updateQuiz(quiz.id, { title: e.target.value })}
                />
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Passing Score:</span>
                  <Badge variant="outline">{quiz.settings?.passingScore || 70}%</Badge>
                </div>
              </div>
              <Textarea
                placeholder="Quiz description..."
                value={quiz.description}
                onChange={(e) => updateQuiz(quiz.id, { description: e.target.value })}
              />
              {quiz.questions && quiz.questions.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  Questions: {quiz.questions.length} | Total Points:{" "}
                  {quiz.questions.reduce((sum, q) => sum + q.points, 0)}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 