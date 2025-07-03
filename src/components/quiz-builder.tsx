"use client"

import { useState } from "react"
import { Plus, Trash2, GripVertical, Save, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MediaSelector } from "@/components/media-selector"
import type { Quiz, QuizQuestion, QuizSettings } from "@/lib/types"
import Image from "next/image"

interface QuizBuilderProps {
  quiz: Quiz
  onQuizChange: (quiz: Quiz) => void
  onSave: () => void
}

export function QuizBuilder({ quiz, onQuizChange, onSave }: QuizBuilderProps) {
  const [activeTab, setActiveTab] = useState("questions")
  const [selectedQuestion, setSelectedQuestion] = useState<QuizQuestion | null>(null)

  const updateQuiz = (updates: Partial<Quiz>) => {
    onQuizChange({ ...quiz, ...updates })
  }

  const updateSettings = (updates: Partial<QuizSettings>) => {
    onQuizChange({
      ...quiz,
      settings: { ...quiz.settings, ...updates },
    })
  }

  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: Date.now().toString(),
      type: "multiple-choice",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      explanation: "",
      points: 1,
      order: quiz.questions.length + 1,
    }

    onQuizChange({
      ...quiz,
      questions: [...quiz.questions, newQuestion],
    })
    setSelectedQuestion(newQuestion)
  }

  const updateQuestion = (questionId: string, updates: Partial<QuizQuestion>) => {
    const updatedQuestions = quiz.questions.map((q) => (q.id === questionId ? { ...q, ...updates } : q))

    onQuizChange({
      ...quiz,
      questions: updatedQuestions,
    })

    if (selectedQuestion?.id === questionId) {
      setSelectedQuestion({ ...selectedQuestion, ...updates })
    }
  }

  const removeQuestion = (questionId: string) => {
    const updatedQuestions = quiz.questions.filter((q) => q.id !== questionId)
    onQuizChange({
      ...quiz,
      questions: updatedQuestions,
    })

    if (selectedQuestion?.id === questionId) {
      setSelectedQuestion(null)
    }
  }

  const addOption = (questionId: string) => {
    const question = quiz.questions.find((q) => q.id === questionId)
    if (question && question.options) {
      updateQuestion(questionId, {
        options: [...question.options, ""],
      })
    }
  }

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    const question = quiz.questions.find((q) => q.id === questionId)
    if (question && question.options) {
      const newOptions = [...question.options]
      newOptions[optionIndex] = value
      updateQuestion(questionId, { options: newOptions })
    }
  }

  const removeOption = (questionId: string, optionIndex: number) => {
    const question = quiz.questions.find((q) => q.id === questionId)
    if (question && question.options && question.options.length > 2) {
      const newOptions = question.options.filter((_, index) => index !== optionIndex)
      updateQuestion(questionId, { options: newOptions })
    }
  }

  const renderQuestionEditor = (question: QuizQuestion) => {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Edit Question</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setSelectedQuestion(null)}>
              Close
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Question Type</Label>
              <Select
                value={question.type}
                onValueChange={(value: QuizQuestion["type"]) => updateQuestion(question.id, { type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                  <SelectItem value="true-false">True/False</SelectItem>
                  <SelectItem value="short-answer">Short Answer</SelectItem>
                  <SelectItem value="essay">Essay</SelectItem>
                  <SelectItem value="fill-blank">Fill in the Blank</SelectItem>
                  <SelectItem value="matching">Matching</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Points</Label>
              <Input
                type="number"
                min="1"
                value={question.points}
                onChange={(e) => updateQuestion(question.id, { points: Number.parseInt(e.target.value) || 1 })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Question</Label>
            <Textarea
              value={question.question}
              onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
              placeholder="Enter your question..."
              rows={3}
            />
          </div>

          {question.imageUrl && (
            <div className="space-y-2">
              <Image
                src={question.imageUrl || "/placeholder.svg"}
                alt="Question image"
                width={100}
                height={100}
                className="max-w-full h-48 object-cover rounded-md"
              />
              <Button variant="outline" size="sm" onClick={() => updateQuestion(question.id, { imageUrl: undefined })}>
                Remove Image
              </Button>
            </div>
          )}

          <MediaSelector
            onSelect={(media) => updateQuestion(question.id, { imageUrl: media.url })}
            trigger={
              <Button variant="outline" size="sm">
                Add Image
              </Button>
            }
          />

          {/* Question Type Specific Fields */}
          {(question.type === "multiple-choice" || question.type === "true-false") && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Answer Options</Label>
                {question.type === "multiple-choice" && (
                  <Button variant="outline" size="sm" onClick={() => addOption(question.id)}>
                    <Plus className="mr-2 h-3 w-3" />
                    Add Option
                  </Button>
                )}
              </div>

              {question.type === "true-false" ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="true"
                      name={`correct-${question.id}`}
                      checked={question.correctAnswer === "true"}
                      onChange={() => updateQuestion(question.id, { correctAnswer: "true" })}
                    />
                    <Label htmlFor="true">True</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="false"
                      name={`correct-${question.id}`}
                      checked={question.correctAnswer === "false"}
                      onChange={() => updateQuestion(question.id, { correctAnswer: "false" })}
                    />
                    <Label htmlFor="false">False</Label>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {question.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={`option-${index}`}
                        name={`correct-${question.id}`}
                        checked={question.correctAnswer === option}
                        onChange={() => updateQuestion(question.id, { correctAnswer: option })}
                      />
                      <Input
                        value={option}
                        onChange={(e) => updateOption(question.id, index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="flex-1"
                      />
                      {question.options && question.options.length > 2 && (
                        <Button variant="ghost" size="sm" onClick={() => removeOption(question.id, index)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {(question.type === "short-answer" || question.type === "fill-blank") && (
            <div className="space-y-2">
              <Label>Correct Answer</Label>
              <Input
                value={question.correctAnswer as string}
                onChange={(e) => updateQuestion(question.id, { correctAnswer: e.target.value })}
                placeholder="Enter the correct answer..."
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Explanation (Optional)</Label>
            <Textarea
              value={question.explanation || ""}
              onChange={(e) => updateQuestion(question.id, { explanation: e.target.value })}
              placeholder="Explain why this is the correct answer..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Quiz Builder</h3>
          <p className="text-sm text-muted-foreground">Create and configure your quiz questions and settings</p>
        </div>
        <Button onClick={onSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Quiz
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Questions ({quiz.questions.length})</h4>
                <Button onClick={addQuestion}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Question
                </Button>
              </div>

              <div className="space-y-2">
                {quiz.questions.map((question, index) => (
                  <Card
                    key={question.id}
                    className={`cursor-pointer transition-colors ${
                      selectedQuestion?.id === question.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedQuestion(question)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <GripVertical className="h-4 w-4 text-muted-foreground" />
                          <Badge variant="outline">Q{index + 1}</Badge>
                          <Badge variant="secondary">{question.type}</Badge>
                          <Badge variant="outline">{question.points} pts</Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeQuestion(question.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="mt-2 text-sm truncate">{question.question || "Untitled question"}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              {selectedQuestion ? (
                renderQuestionEditor(selectedQuestion)
              ) : (
                <Card>
                  <CardContent className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Select a question to edit</h3>
                      <p className="text-muted-foreground">Click on a question from the list to start editing</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Basic Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Quiz Title</Label>
                  <Input
                    value={quiz.title}
                    onChange={(e) => updateQuiz({ title: e.target.value })}
                    placeholder="Enter quiz title..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={quiz.description}
                    onChange={(e) => updateQuiz({ description: e.target.value })}
                    placeholder="Describe what this quiz covers..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Instructions</Label>
                  <Textarea
                    value={quiz.instructions}
                    onChange={(e) => updateQuiz({ instructions: e.target.value })}
                    placeholder="Instructions for students taking the quiz..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grading & Attempts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Passing Score (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={quiz.settings.passingScore}
                    onChange={(e) => updateSettings({ passingScore: Number.parseInt(e.target.value) || 70 })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Maximum Attempts</Label>
                  <Input
                    type="number"
                    min="1"
                    value={quiz.settings.maxAttempts}
                    onChange={(e) => updateSettings({ maxAttempts: Number.parseInt(e.target.value) || 1 })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Time Limit (minutes)</Label>
                  <Input
                    type="number"
                    min="0"
                    value={quiz.settings.timeLimit || ""}
                    onChange={(e) =>
                      updateSettings({
                        timeLimit: e.target.value ? Number.parseInt(e.target.value) : undefined,
                      })
                    }
                    placeholder="No time limit"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Display Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="shuffle-questions">Shuffle Questions</Label>
                  <Switch
                    id="shuffle-questions"
                    checked={quiz.settings.shuffleQuestions}
                    onCheckedChange={(checked) => updateSettings({ shuffleQuestions: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="shuffle-answers">Shuffle Answer Options</Label>
                  <Switch
                    id="shuffle-answers"
                    checked={quiz.settings.shuffleAnswers}
                    onCheckedChange={(checked) => updateSettings({ shuffleAnswers: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="one-question">Show One Question at a Time</Label>
                  <Switch
                    id="one-question"
                    checked={quiz.settings.showOneQuestionAtTime}
                    onCheckedChange={(checked) => updateSettings({ showOneQuestionAtTime: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="prevent-backtrack">Prevent Backtracking</Label>
                  <Switch
                    id="prevent-backtrack"
                    checked={quiz.settings.preventBacktracking}
                    onCheckedChange={(checked) => updateSettings({ preventBacktracking: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feedback Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-correct">Show Correct Answers</Label>
                  <Switch
                    id="show-correct"
                    checked={quiz.settings.showCorrectAnswers}
                    onCheckedChange={(checked) => updateSettings({ showCorrectAnswers: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="show-score">Show Score Immediately</Label>
                  <Switch
                    id="show-score"
                    checked={quiz.settings.showScoreImmediately}
                    onCheckedChange={(checked) => updateSettings({ showScoreImmediately: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="allow-review">Allow Review</Label>
                  <Switch
                    id="allow-review"
                    checked={quiz.settings.allowReview}
                    onCheckedChange={(checked) => updateSettings({ allowReview: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{quiz.title || "Untitled Quiz"}</CardTitle>
              <CardDescription>{quiz.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {quiz.instructions && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Instructions</h4>
                  <p className="text-sm">{quiz.instructions}</p>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Questions ({quiz.questions.length})</h4>
                  <Badge variant="outline">Total Points: {quiz.questions.reduce((sum, q) => sum + q.points, 0)}</Badge>
                </div>

                {quiz.questions.map((question, index) => (
                  <Card key={question.id}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">Question {index + 1}</Badge>
                          <Badge variant="secondary">{question.points} pts</Badge>
                        </div>

                        <p className="font-medium">{question.question}</p>

                        {question.imageUrl && (
                          <Image
                            src={question.imageUrl || "/placeholder.svg"}
                            alt="Question"
                            width={100}
                            height={100}
                            className="max-w-full h-32 object-cover rounded-md"
                          />
                        )}

                        {question.type === "multiple-choice" && question.options && (
                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center space-x-2">
                                <input type="radio" disabled />
                                <span className="text-sm">{option}</span>
                                {option === question.correctAnswer && (
                                  <Badge variant="default" className="text-xs">
                                    Correct
                                  </Badge>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {question.type === "true-false" && (
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <input type="radio" disabled />
                              <span className="text-sm">True</span>
                              {question.correctAnswer === "true" && (
                                <Badge variant="default" className="text-xs">
                                  Correct
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="radio" disabled />
                              <span className="text-sm">False</span>
                              {question.correctAnswer === "false" && (
                                <Badge variant="default" className="text-xs">
                                  Correct
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}

                        {(question.type === "short-answer" || question.type === "fill-blank") && (
                          <div className="space-y-2">
                            <Input disabled placeholder="Student answer..." />
                            <div className="text-sm text-muted-foreground">
                              Correct answer: {question.correctAnswer}
                            </div>
                          </div>
                        )}

                        {question.explanation && (
                          <div className="bg-muted/50 p-3 rounded-md">
                            <p className="text-sm">
                              <strong>Explanation:</strong> {question.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 