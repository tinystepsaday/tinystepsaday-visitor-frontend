"use client"

import { useState } from 'react'
import { Plus, Trash2, Edit3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export interface QuizDimension {
  id: string
  name: string
  shortName: string
  order: number
  minScore: number
  maxScore: number
  threshold?: number
  lowLabel?: string
  highLabel?: string
}

interface QuizDimensionEditorProps {
  dimensions: QuizDimension[]
  onChange: (dimensions: QuizDimension[]) => void
}

export function QuizDimensionEditor({ dimensions, onChange }: QuizDimensionEditorProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingDimension, setEditingDimension] = useState<Partial<QuizDimension>>({})

  const addDimension = () => {
    const newDimension: QuizDimension = {
      id: `dim_${Date.now()}`,
      name: '',
      shortName: '',
      order: dimensions.length,
      minScore: 0,
      maxScore: 10,
      threshold: 5,
      lowLabel: '',
      highLabel: ''
    }
    onChange([...dimensions, newDimension])
  }

  const removeDimension = (id: string) => {
    onChange(dimensions.filter(dim => dim.id !== id))
  }

  const startEditing = (dimension: QuizDimension) => {
    setEditingId(dimension.id)
    setEditingDimension(dimension)
  }

  const saveEditing = () => {
    if (editingId && editingDimension.name && editingDimension.shortName) {
      onChange(dimensions.map(dim =>
        dim.id === editingId ? { ...dim, ...editingDimension } : dim
      ))
      setEditingId(null)
      setEditingDimension({})
    }
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditingDimension({})
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Quiz Dimensions</CardTitle>
            <CardDescription>Define the dimensions for complex quizzes (e.g., MBTI, Enneagram)</CardDescription>
          </div>
          <Button type="button" onClick={addDimension} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Dimension
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {dimensions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No dimensions added yet. Click &quot;Add Dimension&quot; to get started.
          </div>
        ) : (
          dimensions.map((dimension, index) => (
            <div key={dimension.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Dimension {index + 1}</h4>
                <div className="flex space-x-2">
                  {editingId === dimension.id ? (
                    <>
                      <Button type="button" onClick={saveEditing} size="sm">Save</Button>
                      <Button type="button" onClick={cancelEditing} variant="ghost" size="sm">Cancel</Button>
                    </>
                  ) : (
                    <>
                      <Button type="button" onClick={() => startEditing(dimension)} variant="ghost" size="sm">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button type="button" onClick={() => removeDimension(dimension.id)} variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {editingId === dimension.id ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Dimension Name</Label>
                    <Input
                      value={editingDimension.name || ''}
                      onChange={(e) => setEditingDimension(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Extraversion/Introversion"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Short Name</Label>
                    <Input
                      value={editingDimension.shortName || ''}
                      onChange={(e) => setEditingDimension(prev => ({ ...prev, shortName: e.target.value }))}
                      placeholder="e.g., E/I"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Min Score</Label>
                    <Input
                      type="number"
                      value={editingDimension.minScore || 0}
                      onChange={(e) => setEditingDimension(prev => ({ ...prev, minScore: parseInt(e.target.value) }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Score</Label>
                    <Input
                      type="number"
                      value={editingDimension.maxScore || 10}
                      onChange={(e) => setEditingDimension(prev => ({ ...prev, maxScore: parseInt(e.target.value) }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Threshold</Label>
                    <Input
                      type="number"
                      value={editingDimension.threshold || 5}
                      onChange={(e) => setEditingDimension(prev => ({ ...prev, threshold: parseInt(e.target.value) }))}
                      placeholder="Score threshold for binary outcome"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Low Label</Label>
                    <Input
                      value={editingDimension.lowLabel || ''}
                      onChange={(e) => setEditingDimension(prev => ({ ...prev, lowLabel: e.target.value }))}
                      placeholder="e.g., Introversion"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>High Label</Label>
                    <Input
                      value={editingDimension.highLabel || ''}
                      onChange={(e) => setEditingDimension(prev => ({ ...prev, highLabel: e.target.value }))}
                      placeholder="e.g., Extraversion"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Name</Label>
                    <p className="text-sm text-muted-foreground">{dimension.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Short Name</Label>
                    <p className="text-sm text-muted-foreground">{dimension.shortName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Score Range</Label>
                    <p className="text-sm text-muted-foreground">{dimension.minScore} - {dimension.maxScore}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Threshold</Label>
                    <p className="text-sm text-muted-foreground">{dimension.threshold}</p>
                  </div>
                  {dimension.lowLabel && dimension.highLabel && (
                    <div className="col-span-2">
                      <Label className="text-sm font-medium">Labels</Label>
                      <div className="flex space-x-2 mt-1">
                        <Badge variant="outline">{dimension.lowLabel}</Badge>
                        <Badge variant="outline">{dimension.highLabel}</Badge>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
