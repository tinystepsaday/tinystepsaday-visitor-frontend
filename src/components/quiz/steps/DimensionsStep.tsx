"use client"

import { Plus, Trash2, ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { type QuizFormData } from '../QuizEditClient'

interface DimensionsStepProps {
  data: QuizFormData
  onUpdate: (data: Partial<QuizFormData>) => void
  onNext: () => void
  onPrev: () => void
}

export function DimensionsStep({ data, onUpdate, onNext, onPrev }: DimensionsStepProps) {
  // If not a complex quiz, skip this step
  if (data.quizType !== 'COMPLEX') {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            This step is only required for complex quizzes (MBTI, Enneagram, etc.).
          </p>
          <p className="text-sm text-muted-foreground">
            Your quiz type is set to &quot;{data.quizType.toLowerCase()}&quot;, so you can skip this step.
          </p>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={onPrev}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button onClick={onNext}>
            Next: Questions
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    )
  }

  const addDimension = () => {
    const newDimension = {
      id: `dim_${Date.now()}`,
      name: '',
      shortName: '',
      order: data.dimensions.length,
      minScore: 0,
      maxScore: 10,
      threshold: 5,
      lowLabel: '',
      highLabel: ''
    }
    onUpdate({ dimensions: [...data.dimensions, newDimension] })
  }

  const updateDimension = (id: string, field: string, value: string | number) => {
    const updatedDimensions = data.dimensions.map(dim =>
      dim.id === id ? { ...dim, [field]: value } : dim
    )
    onUpdate({ dimensions: updatedDimensions })
  }

  const removeDimension = (id: string) => {
    const updatedDimensions = data.dimensions.filter(dim => dim.id !== id)
    // Reorder remaining dimensions
    const reorderedDimensions = updatedDimensions.map((dim, index) => ({
      ...dim,
      order: index
    }))
    onUpdate({ dimensions: reorderedDimensions })
  }

  const canProceed = () => {
    return data.dimensions.length > 0 && 
           data.dimensions.every(dim => 
             dim.name && dim.shortName && dim.minScore >= 0 && dim.maxScore > dim.minScore
           )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="text-center py-4">
          <h3 className="text-lg font-medium mb-2">Define Quiz Dimensions</h3>
          <p className="text-muted-foreground">
            Configure the dimensions for your complex quiz. Each dimension will have its own scoring logic.
          </p>
        </div>

        {data.dimensions.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-muted-foreground mb-4">No dimensions defined yet</p>
            <Button onClick={addDimension} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add First Dimension
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {data.dimensions.map((dimension, index) => (
              <div key={dimension.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Dimension {index + 1}</h4>
                  <Button
                    type="button"
                    onClick={() => removeDimension(dimension.id)}
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name *</Label>
                    <Input
                      value={dimension.name}
                      onChange={(e) => updateDimension(dimension.id, 'name', e.target.value)}
                      placeholder="e.g., Extraversion/Introversion"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Short Name *</Label>
                    <Input
                      value={dimension.shortName}
                      onChange={(e) => updateDimension(dimension.id, 'shortName', e.target.value)}
                      placeholder="e.g., E/I"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Min Score</Label>
                    <Input
                      type="number"
                      value={dimension.minScore}
                      onChange={(e) => updateDimension(dimension.id, 'minScore', parseInt(e.target.value) || 0)}
                      min="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Max Score</Label>
                    <Input
                      type="number"
                      value={dimension.maxScore}
                      onChange={(e) => updateDimension(dimension.id, 'maxScore', parseInt(e.target.value) || 0)}
                      min={dimension.minScore + 1}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Threshold</Label>
                    <Input
                      type="number"
                      value={dimension.threshold || 0}
                      onChange={(e) => updateDimension(dimension.id, 'threshold', parseInt(e.target.value) || 0)}
                      min={dimension.minScore}
                      max={dimension.maxScore}
                      placeholder="Score threshold for binary outcome"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Low Label</Label>
                    <Input
                      value={dimension.lowLabel || ''}
                      onChange={(e) => updateDimension(dimension.id, 'lowLabel', e.target.value)}
                      placeholder="e.g., Introversion"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>High Label</Label>
                    <Input
                      value={dimension.highLabel || ''}
                      onChange={(e) => updateDimension(dimension.id, 'highLabel', e.target.value)}
                      placeholder="e.g., Extraversion"
                    />
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>Score Range: {dimension.minScore} - {dimension.maxScore}</p>
                  {dimension.threshold && (
                    <p>Threshold: {dimension.threshold} (≤{dimension.threshold} = {dimension.lowLabel}, &gt;{dimension.threshold} = {dimension.highLabel})</p>
                  )}
                </div>
              </div>
            ))}

            <Button type="button" onClick={addDimension} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Dimension
            </Button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between cursor-pointer">
        <Button variant="outline" onClick={onPrev}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button onClick={onNext} disabled={!canProceed()} className="cursor-pointer">
          Next: Questions
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
