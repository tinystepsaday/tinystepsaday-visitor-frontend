/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from 'react'
import { Plus, Trash2, Edit3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { GradingCriteriaEditor } from './GradingCriteriaEditor'

export interface ComplexGradingCriteria {
  id: string
  name: string
  label: string
  color: string
  recommendations: string[]
  areasOfImprovement: string[]
  supportNeeded: string[]
  proposedCourses: Array<{ id: string; name: string; slug: string }>
  proposedProducts: Array<{ id: string; name: string; slug: string }>
  proposedStreaks: Array<{ id: string; name: string; slug: string }>
  proposedBlogPosts: Array<{ id: string; title: string; slug: string }>
  description?: string
  scoringLogic: {
    type: 'threshold' | 'highest' | 'topN'
    dimensions?: Array<{ name: string; value?: string; threshold?: number }>
    dimension?: string
    minScore?: number
    maxScore?: number
    n?: number
  }
}

interface ComplexGradingCriteriaEditorProps {
  criteria: ComplexGradingCriteria[]
  onChange: (criteria: ComplexGradingCriteria[]) => void
  availableCourses: Array<{ id: string; name: string; slug: string }>
  availableProducts: Array<{ id: string; name: string; slug: string }>
  availableStreaks: Array<{ id: string; name: string; slug: string }>
  availableBlogPosts: Array<{ id: string; title: string; slug: string }>
  isLoadingBlogPosts: boolean
}

export function ComplexGradingCriteriaEditor({ 
  criteria, 
  onChange, 
  availableCourses, 
  availableProducts, 
  availableStreaks, 
  availableBlogPosts, 
  isLoadingBlogPosts 
}: ComplexGradingCriteriaEditorProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingCriteria, setEditingCriteria] = useState<Partial<ComplexGradingCriteria>>({})

  const addCriteria = () => {
    const newCriteria: ComplexGradingCriteria = {
      id: `cgc_${Date.now()}`,
      name: '',
      label: '',
      color: '#3B82F6',
      recommendations: [],
      areasOfImprovement: [],
      supportNeeded: [],
      proposedCourses: [],
      proposedProducts: [],
      proposedStreaks: [],
      proposedBlogPosts: [],
      description: '',
      scoringLogic: {
        type: 'threshold',
        dimensions: []
      }
    }
    onChange([...criteria, newCriteria])
  }

  const updateCriteria = (id: string, field: keyof ComplexGradingCriteria, value: any) => {
    onChange(criteria.map(c =>
      c.id === id ? { ...c, [field]: value } : c
    ))
  }

  const removeCriteria = (id: string) => {
    onChange(criteria.filter(c => c.id !== id))
  }

  const startEditing = (criterion: ComplexGradingCriteria) => {
    setEditingId(criterion.id)
    setEditingCriteria(criterion)
  }

  const saveEditing = () => {
    if (editingId && editingCriteria.name && editingCriteria.label) {
      onChange(criteria.map(c =>
        c.id === editingId ? { ...c, ...editingCriteria } : c
      ))
      setEditingId(null)
      setEditingCriteria({})
    }
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditingCriteria({})
  }

  const addRecommendation = (id: string) => {
    const criterion = criteria.find(c => c.id === id)
    if (criterion) {
      const newRecommendation = prompt('Enter recommendation:')
      if (newRecommendation) {
        updateCriteria(id, 'recommendations', [...criterion.recommendations, newRecommendation])
      }
    }
  }

  const removeRecommendation = (id: string, index: number) => {
    const criterion = criteria.find(c => c.id === id)
    if (criterion) {
      const newRecommendations = criterion.recommendations.filter((_, i) => i !== index)
      updateCriteria(id, 'recommendations', newRecommendations)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Complex Grading Criteria</CardTitle>
            <CardDescription>Define the scoring logic and outcomes for complex quizzes</CardDescription>
          </div>
          <Button type="button" onClick={addCriteria} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Criteria
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {criteria.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No complex grading criteria added yet. Click &quot;Add Criteria&quot; to get started.
          </div>
        ) : (
          criteria.map((criterion, index) => (
            <div key={criterion.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{criterion.name || `Criteria ${index + 1}`}</h4>
                <div className="flex space-x-2">
                  {editingId === criterion.id ? (
                    <>
                      <Button type="button" onClick={saveEditing} size="sm">Save</Button>
                      <Button type="button" onClick={cancelEditing} variant="ghost" size="sm">Cancel</Button>
                    </>
                  ) : (
                    <>
                      <Button type="button" onClick={() => startEditing(criterion)} variant="ghost" size="sm">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button type="button" onClick={() => removeCriteria(criterion.id)} variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {editingId === criterion.id ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      value={editingCriteria.name || ''}
                      onChange={(e) => setEditingCriteria(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., INTJ, Type 4"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Label</Label>
                    <Input
                      value={editingCriteria.label || ''}
                      onChange={(e) => setEditingCriteria(prev => ({ ...prev, label: e.target.value }))}
                      placeholder="e.g., The Architect"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Color</Label>
                    <Input
                      type="color"
                      value={editingCriteria.color || '#3B82F6'}
                      onChange={(e) => setEditingCriteria(prev => ({ ...prev, color: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Scoring Logic Type</Label>
                    <Select 
                      value={editingCriteria.scoringLogic?.type || 'threshold'} 
                      onValueChange={(value) => setEditingCriteria(prev => ({ 
                        ...prev, 
                        scoringLogic: { 
                          ...prev.scoringLogic, 
                          type: value as 'threshold' | 'highest' | 'topN' 
                        } 
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="threshold">Threshold</SelectItem>
                        <SelectItem value="highest">Highest Score</SelectItem>
                        <SelectItem value="topN">Top N</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>Description</Label>
                    <Textarea
                      value={editingCriteria.description || ''}
                      onChange={(e) => setEditingCriteria(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe this personality type or outcome"
                      rows={3}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Name</Label>
                    <p className="text-sm text-muted-foreground">{criterion.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Label</Label>
                    <p className="text-sm text-muted-foreground">{criterion.label}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Color</Label>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 rounded border" 
                        style={{ backgroundColor: criterion.color }}
                      />
                      <span className="text-sm text-muted-foreground">{criterion.color}</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Logic Type</Label>
                    <p className="text-sm text-muted-foreground">{criterion.scoringLogic.type}</p>
                  </div>
                </div>
              )}

              {/* Recommendations Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Recommendations</Label>
                  <Button type="button" onClick={() => addRecommendation(criterion.id)} variant="outline" size="sm">
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {criterion.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{rec}</span>
                      <Button
                        type="button"
                        onClick={() => removeRecommendation(criterion.id, index)}
                        variant="ghost"
                        size="sm"
                        className="text-destructive h-6 w-6 p-0"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations and other fields using the existing GradingCriteriaEditor */}
              <GradingCriteriaEditor
                criteria={[{
                  id: criterion.id,
                  name: criterion.name,
                  minScore: 0,
                  maxScore: 100,
                  label: criterion.label,
                  color: criterion.color,
                  recommendations: criterion.recommendations,
                  areasOfImprovement: criterion.areasOfImprovement,
                  supportNeeded: criterion.supportNeeded,
                  proposedCourses: criterion.proposedCourses,
                  proposedProducts: criterion.proposedProducts,
                  proposedStreaks: criterion.proposedStreaks,
                  proposedBlogPosts: criterion.proposedBlogPosts,
                  description: criterion.description
                }]}
                onChange={(updatedCriteria) => {
                  if (updatedCriteria.length > 0) {
                    const updated = updatedCriteria[0]
                    updateCriteria(criterion.id, 'recommendations', updated.recommendations)
                    updateCriteria(criterion.id, 'areasOfImprovement', updated.areasOfImprovement)
                    updateCriteria(criterion.id, 'supportNeeded', updated.supportNeeded)
                    updateCriteria(criterion.id, 'proposedCourses', updated.proposedCourses)
                    updateCriteria(criterion.id, 'proposedProducts', updated.proposedProducts)
                    updateCriteria(criterion.id, 'proposedStreaks', updated.proposedStreaks)
                    updateCriteria(criterion.id, 'proposedBlogPosts', updated.proposedBlogPosts)
                    updateCriteria(criterion.id, 'description', updated.description)
                  }
                }}
                availableCourses={availableCourses}
                availableProducts={availableProducts}
                availableStreaks={availableStreaks}
                availableBlogPosts={availableBlogPosts}
                isLoadingBlogPosts={isLoadingBlogPosts}
              />
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
