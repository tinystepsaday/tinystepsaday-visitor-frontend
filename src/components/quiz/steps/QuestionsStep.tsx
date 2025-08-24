"use client"

import { Plus, Trash2, ArrowLeft, ArrowRight, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type QuizFormData } from '../QuizEditClient'

interface QuestionsStepProps {
  data: QuizFormData
  onUpdate: (data: Partial<QuizFormData>) => void
  onNext: () => void
  onPrev: () => void
}

export function QuestionsStep({ data, onUpdate, onNext, onPrev }: QuestionsStepProps) {
  const addQuestion = () => {
    const newQuestion = {
      id: `q_${Date.now()}`,
      text: '',
      dimensionId: undefined,
      order: data.questions.length,
      options: [
        { id: `opt_${Date.now()}_1`, text: '', value: 1, order: 0 },
        { id: `opt_${Date.now()}_2`, text: '', value: 2, order: 1 }
      ]
    }
    onUpdate({ questions: [...data.questions, newQuestion] })
  }

  const updateQuestion = (questionId: string, field: string, value: string | undefined) => {
    const updatedQuestions = data.questions.map(q =>
      q.id === questionId ? { ...q, [field]: value } : q
    )
    onUpdate({ questions: updatedQuestions })
  }

  const removeQuestion = (questionId: string) => {
    const updatedQuestions = data.questions.filter(q => q.id !== questionId)
    // Reorder remaining questions
    const reorderedQuestions = updatedQuestions.map((q, index) => ({
      ...q,
      order: index
    }))
    onUpdate({ questions: reorderedQuestions })
  }

  const addOptionToQuestion = (questionId: string) => {
    const updatedQuestions = data.questions.map(q => {
      if (q.id === questionId) {
        const newOptionId = `${questionId}_opt_${Date.now()}`
        const newValue = q.options.length + 1
        return {
          ...q,
          options: [...q.options, { 
            id: newOptionId, 
            text: '', 
            value: newValue, 
            order: q.options.length 
          }]
        }
      }
      return q
    })
    onUpdate({ questions: updatedQuestions })
  }

  const updateOption = (questionId: string, optionId: string, field: string, value: string | number) => {
    const updatedQuestions = data.questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          options: q.options.map(opt =>
            opt.id === optionId ? { ...opt, [field]: value } : opt
          )
        }
      }
      return q
    })
    onUpdate({ questions: updatedQuestions })
  }

  const removeOptionFromQuestion = (questionId: string, optionId: string) => {
    const updatedQuestions = data.questions.map(q => {
      if (q.id === questionId) {
        const filteredOptions = q.options.filter(opt => opt.id !== optionId)
        // Reorder values to maintain sequential numbering
        const reorderedOptions = filteredOptions.map((opt, index) => ({
          ...opt,
          value: index + 1,
          order: index
        }))
        return { ...q, options: reorderedOptions }
      }
      return q
    })
    onUpdate({ questions: updatedQuestions })
  }

  const canProceed = () => {
    return data.questions.length > 0 && 
           data.questions.every(q => 
             q.text.trim() && q.options.length >= 2 && 
             q.options.every(opt => opt.text.trim())
           )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="text-center py-4">
          <h3 className="text-lg font-medium mb-2">Add Quiz Questions</h3>
          <p className="text-muted-foreground">
            Create questions for your quiz. Each question should have at least 2 options.
            {data.quizType === 'COMPLEX' && ' You can optionally bind questions to specific dimensions.'}
          </p>
        </div>

        {data.questions.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-muted-foreground mb-4">No questions added yet</p>
            <Button onClick={addQuestion} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add First Question
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {data.questions.map((question, index) => (
              <div key={question.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                    <h4 className="font-medium">Question {index + 1}</h4>
                  </div>
                  <Button
                    type="button"
                    onClick={() => removeQuestion(question.id)}
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Question Text *</Label>
                  <Textarea
                    value={question.text}
                    onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                    placeholder="Enter your question here"
                    rows={2}
                  />
                </div>

                {/* Dimension binding for complex quizzes */}
                {data.quizType === 'COMPLEX' && data.dimensions.length > 0 && (
                  <div className="space-y-2">
                    <Label>Dimension (Optional)</Label>
                    <Select 
                      value={question.dimensionId || ''} 
                      onValueChange={(value) => updateQuestion(question.id, 'dimensionId', value === 'NONE' ? undefined : value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select dimension (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NONE">No dimension</SelectItem>
                        {data.dimensions.map((dim) => (
                          <SelectItem key={dim.id} value={dim.id}>
                            {dim.name} ({dim.shortName})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {question.dimensionId && (
                      <p className="text-sm text-muted-foreground">
                                                 This question will contribute to the &quot;{data.dimensions.find(d => d.id === question.dimensionId)?.name}&quot; dimension score.
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Options ({question.options.length})</Label>
                    <Button 
                      type="button" 
                      onClick={() => addOptionToQuestion(question.id)} 
                      variant="outline" 
                      size="sm"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add Option
                    </Button>
                  </div>
                  
                  {question.options.map((option, optIndex) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Input
                        value={option.text}
                        onChange={(e) => updateOption(question.id, option.id, 'text', e.target.value)}
                        placeholder={`Option ${optIndex + 1}`}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        value={option.value}
                        onChange={(e) => updateOption(question.id, option.id, 'value', parseInt(e.target.value) || 0)}
                        placeholder="Value"
                        className="w-20"
                        min="0"
                      />
                      {question.options.length > 2 && (
                        <Button
                          type="button"
                          onClick={() => removeOptionFromQuestion(question.id, option.id)}
                          variant="ghost"
                          size="sm"
                          className="text-destructive h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  {question.options.length < 2 && (
                    <p className="text-sm text-muted-foreground">
                      Questions must have at least 2 options
                    </p>
                  )}
                </div>

                {/* Question summary */}
                <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                  <p>Question {index + 1}: {question.text || 'No text yet'}</p>
                  <p>Options: {question.options.length} | Values: {question.options.map(opt => opt.value).join(', ')}</p>
                  {data.quizType === 'COMPLEX' && question.dimensionId && (
                    <p>Dimension: {data.dimensions.find(d => d.id === question.dimensionId)?.name}</p>
                  )}
                </div>
              </div>
            ))}

            <Button type="button" onClick={addQuestion} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Question
            </Button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button onClick={onNext} disabled={!canProceed()}>
          Next: Grading Criteria
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
