"use client"

import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { type QuizFormData } from '../QuizEditClient'

interface ReviewStepProps {
  data: QuizFormData
  onUpdate: (data: Partial<QuizFormData>) => void
  onPrev: () => void
}

export function ReviewStep({ data, onPrev }: ReviewStepProps) {
  const getValidationStatus = () => {
    const errors: string[] = []
    const warnings: string[] = []

    if (!data.title) errors.push('Quiz title is required')
    if (!data.description) errors.push('Quiz description is required')
    if (!data.category) errors.push('Quiz category is required')
    if (data.questions.length === 0) errors.push('At least one question is required')

    data.questions.forEach((q, index) => {
      if (!q.text.trim()) errors.push(`Question ${index + 1} has no text`)
      if (q.options.length < 2) errors.push(`Question ${index + 1} needs at least 2 options`)
    })

    if (data.quizType === 'COMPLEX') {
      if (data.dimensions.length === 0) errors.push('Complex quizzes must have at least one dimension')
      if (data.complexGradingCriteria.length === 0) errors.push('Complex quizzes must have at least one grading criteria')
    } else {
      if (data.gradingCriteria.length === 0) errors.push('Quiz must have at least one grading criteria')
    }

    return { errors, warnings, isValid: errors.length === 0 }
  }

  const { errors, warnings, isValid } = getValidationStatus()

  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h3 className="text-lg font-medium mb-2">Review Quiz Configuration</h3>
        <p className="text-muted-foreground">
          Review all the details before publishing your quiz.
        </p>
      </div>

      {/* Validation Status */}
      <Card className={!isValid ? 'border-red-200 bg-red-50' : 'hidden'}>
        <CardContent>
          {errors.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-red-800">Errors (must be fixed):</h4>
              <ul className="list-disc list-inside space-y-1 text-red-700">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
      <Card className={!isValid ? 'border-amber-200 bg-amber-50' : 'hidden'}>
        <CardContent>
          {warnings.length > 0 && (
            <div className="space-y-2 mt-4">
              <h4 className="font-medium text-amber-800">Warnings:</h4>
              <ul className="list-disc list-inside space-y-1 text-amber-700">
                {warnings.map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quiz Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="font-medium">Title:</span>
              <p className="text-muted-foreground">{data.title || 'Not set'}</p>
            </div>
            <div>
              <span className="font-medium">Category:</span>
              <p className="text-muted-foreground">{data.category || 'Not set'}</p>
            </div>
            <div>
              <span className="font-medium">Quiz Type:</span>
              <Badge variant="outline">{data.quizType}</Badge>
            </div>
            <div>
              <span className="font-medium">Questions:</span>
              <p className="text-muted-foreground">{data.questions.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configuration Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="font-medium">Dimensions:</span>
              <p className="text-muted-foreground">
                {data.quizType === 'COMPLEX' ? data.dimensions.length : 'N/A'}
              </p>
            </div>
            <div>
              <span className="font-medium">Grading Criteria:</span>
              <p className="text-muted-foreground">
                {data.quizType === 'COMPLEX'
                  ? data.complexGradingCriteria.length
                  : data.gradingCriteria.length
                }
              </p>
            </div>
            <div>
              <span className="font-medium">Tags:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {data.tags.length > 0 ? (
                  data.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))
                ) : (
                  <span className="text-muted-foreground text-sm">No tags</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex justify-between cursor-pointer">
        <Button variant="outline" onClick={onPrev}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            ✓ Quiz configuration is complete and saved!
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            All steps have been saved progressively.
          </p>
        </div>
      </div>
    </div>
  )
}
