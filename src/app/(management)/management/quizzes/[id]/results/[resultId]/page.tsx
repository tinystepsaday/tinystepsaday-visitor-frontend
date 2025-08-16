"use client"

import React from 'react'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Clock, Target, CheckCircle, AlertCircle, FileText } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { quizAPI, transformBackendQuiz } from '@/integration/quiz'
import { downloadQuizResultPDF } from '@/utils/pdfGenerator'
import type { Quiz, QuizResult } from '@/data/quizzes'
import { DetailPageLoader } from '@/components/ui/loaders'

interface QuizResultDetailsPageProps {
  params: Promise<{
    id: string
    resultId: string
  }>
}

export default function QuizResultDetailsPage({ params }: QuizResultDetailsPageProps) {
  const [quiz, setQuiz] = React.useState<Quiz | null>(null)
  const [result, setResult] = React.useState<QuizResult | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [paramsData, setParamsData] = React.useState<{ id: string; resultId: string } | null>(null)

  React.useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setParamsData(resolvedParams)
    }
    getParams()
  }, [params])

  React.useEffect(() => {
    if (!paramsData) return

    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [quizData, resultData] = await Promise.all([
          quizAPI.getQuizById(paramsData.id),
          quizAPI.getQuizResultById(paramsData.resultId)
        ])

        const transformedQuiz = transformBackendQuiz(quizData)
        // resultData is already transformed, so we don't need to transform it again
        setQuiz(transformedQuiz)
        setResult(resultData)
      } catch (err) {
        setError('Failed to load quiz result')
        console.error('Error fetching quiz result:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [paramsData])

  if (error) {
    notFound()
  }

  if (isLoading || !quiz || !result || !paramsData) {
    return (
      <DetailPageLoader
        backHref={`/management/quizzes/${paramsData?.id || ''}/results`}
        backText="Back to Results"
      />
    )
  }

  const getUserAnswer = (questionId: string) => {
    // Handle both array and Record formats for backward compatibility
    if (Array.isArray(result.answers)) {
      // New format: array of { questionId, optionId }
      const userAnswer = result.answers.find((answer: { questionId: string; optionId: string }) => answer.questionId === questionId)
      return userAnswer ? userAnswer.optionId : null
    } else if (typeof result.answers === 'object' && result.answers !== null) {
      // Old format: Record<string, string>
      return (result.answers as Record<string, string>)[questionId] || null
    }
    return null
  }

  const getCriteriaForScore = (percentage: number) => {
    return quiz.gradingCriteria.find(c =>
      percentage >= c.minScore && percentage <= c.maxScore
    )
  }

  const matchingCriteria = getCriteriaForScore(result.percentage)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <Link href={`/management/quizzes/${quiz.id}/analytics`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Results
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => downloadQuizResultPDF(quiz, result)}
            >
              <FileText className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Quiz Result Details</h1>
            <p className="text-muted-foreground">
              {result.user?.firstName} {result.user?.lastName} - {quiz.title}
            </p>
          </div>
        </div>
      </div>

      {/* Result Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{result.percentage}%</div>
            <p className="text-xs text-muted-foreground">
              {result.score}/{result.maxScore} points
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classification</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Badge className={
              result.level === 'excellent' ? 'bg-green-100 text-green-800' :
                result.level === 'good' ? 'bg-blue-100 text-blue-800' :
                  result.level === 'fair' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
            }>
              {matchingCriteria?.name || result.classification}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{result.timeSpent} min</div>
            <p className="text-xs text-muted-foreground">
              Estimated: {quiz.estimatedTime}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">
              {new Date(result.completedAt).toLocaleDateString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {new Date(result.completedAt).toLocaleTimeString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* User Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
              <CardDescription>
                Overall assessment and feedback
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Performance Level</span>
                  <Badge className={
                    result.level === 'excellent' ? 'bg-green-100 text-green-800' :
                      result.level === 'good' ? 'bg-blue-100 text-blue-800' :
                        result.level === 'fair' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                  }>
                    {matchingCriteria?.name || result.level}
                  </Badge>
                </div>
                <Progress value={result.percentage} className="h-2" />
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Feedback</h4>
                <p className="text-sm">{matchingCriteria?.description || result.feedback}</p>
              </div>
            </CardContent>
          </Card>

          {/* Question Responses */}
          <Card>
            <CardHeader>
              <CardTitle>Question Responses</CardTitle>
              <CardDescription>
                Detailed breakdown of each question and answer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {quiz.questions.map((question, index) => {
                  const userAnswer = getUserAnswer(question.id)

                  return (
                    <div key={question.id} className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="font-medium">{question.text}</p>
                            
                          </div>

                          <div className="space-y-2">
                            {question.options.map((option) => (
                              <div
                                key={option.id}
                                className={`flex items-center gap-3 p-2 border rounded ${
                                  option.id === userAnswer ? 'bg-blue-50 border-blue-200 dark:bg-blue-900 dark:border-blue-800' : ''
                                }`}
                              >
                                <div className="w-4 h-4 border rounded flex items-center justify-center text-xs">
                                  {String.fromCharCode(65 + question.options.indexOf(option))}
                                </div>
                                <span className="text-sm flex-1">{option.text}</span>
                                <Badge variant="outline" className="ml-auto">
                                  {option.value} pts
                                </Badge>
                                {option.id === userAnswer && (
                                  <Badge className="bg-blue-100 text-blue-800">
                                    Selected
                                  </Badge>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {index < quiz.questions.length - 1 && <Separator />}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* User Information */}
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <p className="text-sm">{result.user?.firstName} {result.user?.lastName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-sm">{result.user?.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Quiz</label>
                <p className="text-sm">{quiz.title}</p>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>
                Personalized suggestions for improvement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(matchingCriteria?.recommendations || result.recommendations).map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Proposed Courses */}
          {matchingCriteria?.proposedCourses && matchingCriteria.proposedCourses.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Proposed Courses</CardTitle>
                <CardDescription>
                  Recommended courses based on performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {matchingCriteria.proposedCourses.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm font-medium">{course.name}</span>
                      <Badge variant="outline">{course.slug}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Proposed Products */}
          {matchingCriteria?.proposedProducts && matchingCriteria.proposedProducts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Proposed Products</CardTitle>
                <CardDescription>
                  Recommended resources based on performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {matchingCriteria.proposedProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm font-medium">{product.name}</span>
                      <Badge variant="outline">{product.slug}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Proposed Streaks */}
          {matchingCriteria?.proposedStreaks && matchingCriteria.proposedStreaks.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Proposed Streaks</CardTitle>
                <CardDescription>
                  Recommended streaks based on performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {matchingCriteria.proposedStreaks.map((streak, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm font-medium">{streak.name}</span>
                      <Badge variant="outline">{streak.slug}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Areas of Improvement */}
          {result.areasOfImprovement.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Areas of Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {result.areasOfImprovement.map((area, index) => (
                    <Badge key={index} variant="secondary" className="mr-1 mb-1">
                      {area}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Support Needed */}
          {result.supportNeeded.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Support Needed</CardTitle>
                <CardDescription>
                  Resources and assistance recommended
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {result.supportNeeded.map((support, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-sm">{support}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
} 