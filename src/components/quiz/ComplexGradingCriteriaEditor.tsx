"use client"

import { useState } from 'react'
import { Plus, Trash2, Edit3, X, Check, ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MediaSelector } from '@/components/media-selector'
import Image from 'next/image'

export interface ComplexGradingCriteria {
  id: string
  name: string
  label: string
  color: string
  image?: string
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
  dimensions: Array<{ id: string; name: string; shortName: string; threshold?: number }>
  availableCourses: Array<{ id: string; name: string; slug: string }>
  availableProducts: Array<{ id: string; name: string; slug: string }>
  availableStreaks: Array<{ id: string; name: string; slug: string }>
  availableBlogPosts: Array<{ id: string; title: string; slug: string }>
}

export function ComplexGradingCriteriaEditor({
  criteria,
  onChange,
  dimensions,
  availableCourses,
  availableProducts,
  availableStreaks,
  availableBlogPosts
}: ComplexGradingCriteriaEditorProps) {
  const [editingCriteria, setEditingCriteria] = useState<Partial<ComplexGradingCriteria>>({})
  const [isEditing, setIsEditing] = useState(false)

  const addCriteria = () => {
    const newCriteria: ComplexGradingCriteria = {
      id: `cgc_${Date.now()}`,
      name: '',
      label: '',
      color: '#3B82F6',
      recommendations: [''],
      areasOfImprovement: [],
      supportNeeded: [],
      proposedCourses: [],
      proposedProducts: [],
      proposedStreaks: [],
      proposedBlogPosts: [],
      description: '',
      scoringLogic: {
        type: 'threshold',
        dimensions: [],
        minScore: 0,
        maxScore: 0,
        n: 1
      }
    }
    onChange([...criteria, newCriteria])
  }

  const updateCriteria = (id: string, field: keyof ComplexGradingCriteria, value: string | string[] | Array<{ id: string; name: string; slug: string }> | Array<{ id: string; title: string; slug: string }> | undefined) => {
    const updatedCriteria = criteria.map(c =>
      c.id === id ? { ...c, [field]: value } : c
    )
    onChange(updatedCriteria)
  }

  const updateScoringLogic = (id: string, field: string, value: string | number | Array<{ name: string; value?: string; threshold?: number }>) => {
    const updatedCriteria = criteria.map(c => {
      if (c.id === id) {
        return {
          ...c,
          scoringLogic: { ...c.scoringLogic, [field]: value }
        }
      }
      return c
    })
    onChange(updatedCriteria)
  }

  const removeCriteria = (id: string) => {
    onChange(criteria.filter(c => c.id !== id))
  }

  const startEditing = (criterion: ComplexGradingCriteria) => {
    setEditingCriteria(criterion)
    setIsEditing(true)
  }

  const saveEditing = () => {
    if (editingCriteria.id) {
      const updatedCriteria = criteria.map(c =>
        c.id === editingCriteria.id ? { ...c, ...editingCriteria } : c
      )
      onChange(updatedCriteria)
    }
    setIsEditing(false)
    setEditingCriteria({})
  }

  const cancelEditing = () => {
    setIsEditing(false)
    setEditingCriteria({})
  }

  const addRecommendation = (criteriaId: string) => {
    const updatedCriteria = criteria.map(c => {
      if (c.id === criteriaId) {
        return { ...c, recommendations: [...c.recommendations, ''] }
      }
      return c
    })
    onChange(updatedCriteria)
  }

  const updateRecommendation = (criteriaId: string, index: number, value: string) => {
    const updatedCriteria = criteria.map(c => {
      if (c.id === criteriaId) {
        const newRecommendations = [...c.recommendations]
        newRecommendations[index] = value
        return { ...c, recommendations: newRecommendations }
      }
      return c
    })
    onChange(updatedCriteria)
  }

  const removeRecommendation = (criteriaId: string, index: number) => {
    const updatedCriteria = criteria.map(c => {
      if (c.id === criteriaId) {
        const newRecommendations = c.recommendations.filter((_, i) => i !== index)
        return { ...c, recommendations: newRecommendations }
      }
      return c
    })
    onChange(updatedCriteria)
  }

  const addArrayItem = (criteriaId: string, field: keyof ComplexGradingCriteria, item: { id: string; name: string; slug: string } | { id: string; title: string; slug: string }) => {
    const updatedCriteria = criteria.map(c => {
      if (c.id === criteriaId) {
        const currentArray = c[field] as Array<{ id: string; name: string; slug: string }> | Array<{ id: string; title: string; slug: string }> || []
        return { ...c, [field]: [...currentArray, item] }
      }
      return c
    })
    onChange(updatedCriteria)
  }

  const removeArrayItem = (criteriaId: string, field: keyof ComplexGradingCriteria, itemId: string) => {
    const updatedCriteria = criteria.map(c => {
      if (c.id === criteriaId) {
        const currentArray = c[field] as Array<{ id: string; name: string; slug: string }> | Array<{ id: string; title: string; slug: string }> || []
        const filteredArray = currentArray.filter((item: { id: string; name: string; slug: string } | { id: string; title: string; slug: string }) => item.id !== itemId)
        return { ...c, [field]: filteredArray }
      }
      return c
    })
    onChange(updatedCriteria)
  }

  const addStringArrayItem = (criteriaId: string, field: keyof ComplexGradingCriteria) => {
    const updatedCriteria = criteria.map(c => {
      if (c.id === criteriaId) {
        const currentArray = c[field] as string[] || []
        return { ...c, [field]: [...currentArray, ''] }
      }
      return c
    })
    onChange(updatedCriteria)
  }

  const updateStringArrayItem = (criteriaId: string, field: keyof ComplexGradingCriteria, index: number, value: string) => {
    const updatedCriteria = criteria.map(c => {
      if (c.id === criteriaId) {
        const currentArray = [...(c[field] as string[] || [])]
        currentArray[index] = value
        return { ...c, [field]: currentArray }
      }
      return c
    })
    onChange(updatedCriteria)
  }

  const removeStringArrayItem = (criteriaId: string, field: keyof ComplexGradingCriteria, index: number) => {
    const updatedCriteria = criteria.map(c => {
      if (c.id === criteriaId) {
        const currentArray = c[field] as string[] || []
        const filteredArray = currentArray.filter((_, i) => i !== index)
        return { ...c, [field]: filteredArray }
      }
      return c
    })
    onChange(updatedCriteria)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Complex Grading Criteria</h3>
          <p className="text-sm text-muted-foreground">
            Define scoring logic and outcomes for complex quizzes
          </p>
        </div>
        <Button onClick={addCriteria} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Criteria
        </Button>
      </div>

      {criteria.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No grading criteria defined yet</p>
              <Button onClick={addCriteria} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add First Criteria
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {criteria.map((criterion) => (
            <Card key={criterion.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: criterion.color }}
                    />
                    <CardTitle className="text-lg">
                      {criterion.name || 'Unnamed Criteria'}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    {isEditing && editingCriteria.id === criterion.id ? (
                      <>
                        <Button onClick={saveEditing} size="sm" variant="outline">
                          <Check className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button onClick={cancelEditing} size="sm" variant="ghost">
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => startEditing(criterion)} size="sm" variant="outline">
                          <Edit3 className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button onClick={() => removeCriteria(criterion.id)} size="sm" variant="ghost" className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-1" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Name *</Label>
                      <Input
                        value={criterion.name}
                        onChange={(e) => updateCriteria(criterion.id, 'name', e.target.value)}
                        placeholder="e.g., INTJ, Type 4"
                        disabled={!isEditing || editingCriteria.id !== criterion.id}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Label *</Label>
                      <Input
                        value={criterion.label}
                        onChange={(e) => updateCriteria(criterion.id, 'label', e.target.value)}
                        placeholder="e.g., The Architect"
                        disabled={!isEditing || editingCriteria.id !== criterion.id}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Color</Label>
                      <Input
                        type="color"
                        value={criterion.color}
                        onChange={(e) => updateCriteria(criterion.id, 'color', e.target.value)}
                        disabled={!isEditing || editingCriteria.id !== criterion.id}
                      />
                    </div>
                  </div>

                  {/* Image Selection */}
                  <div className="space-y-2">
                    <Label>Image</Label>
                    <div className="space-y-3">
                      {criterion.image && (
                        <div className="space-y-3">
                          {/* Preview Section */}
                          <div className="relative">
                            <div className="absolute top-2 right-2">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => updateCriteria(criterion.id, 'image', '')}
                                className="h-8 w-8 p-0 rounded-full shadow-lg"
                                disabled={!isEditing || editingCriteria.id !== criterion.id}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Image Info */}
                          <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/50">
                            <Image
                              src={criterion.image}
                              alt="Criteria thumbnail"
                              className="w-12 h-12 object-cover rounded-md"
                              width={100}
                              height={100}
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium">Criteria image selected</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <MediaSelector
                        onSelect={(media) => updateCriteria(criterion.id, 'image', media.url)}
                        trigger={
                          <Button
                            variant="outline"
                            className="w-full"
                            disabled={!isEditing || editingCriteria.id !== criterion.id}
                          >
                            <ImageIcon className="mr-2 h-4 w-4" />
                            {criterion.image ? 'Change Image' : 'Select Image'}
                          </Button>
                        }
                        multiple={false}
                        maxFiles={1}
                        acceptedTypes={['image/*']}
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Select an image from your media library or upload a new one. This image will be displayed in quiz results.
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <ImageIcon className="h-3 w-3" />
                        <span>Recommended: 400x300 pixels or similar aspect ratio for best display</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={criterion.description}
                      onChange={(e) => updateCriteria(criterion.id, 'description', e.target.value)}
                      placeholder="e.g., The Architect is a type of personality that is characterized by their strong sense of logic and rationality."
                      disabled={!isEditing || editingCriteria.id !== criterion.id}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Scoring Logic Type *</Label>
                    <Select
                      value={criterion.scoringLogic.type}
                      onValueChange={(value) => updateScoringLogic(criterion.id, 'type', value)}
                      disabled={!isEditing || editingCriteria.id !== criterion.id}
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

                  <div className="space-y-2">
                    <Label>Min Score</Label>
                    <Input
                      type="number"
                      value={criterion.scoringLogic.minScore}
                      onChange={(e) => updateScoringLogic(criterion.id, 'minScore', parseInt(e.target.value) || 0)}
                      disabled={!isEditing || editingCriteria.id !== criterion.id}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Max Score</Label>
                    <Input
                      type="number"
                      value={criterion.scoringLogic.maxScore}
                      onChange={(e) => updateScoringLogic(criterion.id, 'maxScore', parseInt(e.target.value) || 0)}
                      disabled={!isEditing || editingCriteria.id !== criterion.id}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>N</Label>
                    <Input
                      type="number"
                      value={criterion.scoringLogic.n}
                      onChange={(e) => updateScoringLogic(criterion.id, 'n', parseInt(e.target.value) || 0)}
                      disabled={!isEditing || editingCriteria.id !== criterion.id}
                    />
                  </div>

                  {/* Scoring Logic Configuration */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Scoring Logic Configuration</h4>

                    {criterion.scoringLogic.type === 'threshold' && (
                      <div className="space-y-2">
                        <Label>Dimension Thresholds</Label>
                        <div className="space-y-2">
                          {dimensions.map((dim) => (
                            <div key={dim.id} className="flex items-center gap-2">
                              <span className="text-sm font-medium w-24">{dim.shortName}:</span>
                              <Select
                                value={criterion.scoringLogic.dimensions?.find(d => d.name === dim.shortName)?.value || ''}
                                onValueChange={(value) => {
                                  const currentDimensions = criterion.scoringLogic.dimensions || []
                                  const existingIndex = currentDimensions.findIndex(d => d.name === dim.shortName)

                                  if (existingIndex >= 0) {
                                    const updated = [...currentDimensions]
                                    updated[existingIndex] = { ...updated[existingIndex], value }
                                    updateScoringLogic(criterion.id, 'dimensions', updated)
                                  } else {
                                    updateScoringLogic(criterion.id, 'dimensions', [
                                      ...currentDimensions,
                                      { name: dim.shortName, value, threshold: dim.threshold }
                                    ])
                                  }
                                }}
                                disabled={!isEditing || editingCriteria.id !== criterion.id}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                              </Select>
                              <span className="text-sm text-muted-foreground">
                                (threshold: {dim.threshold})
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {criterion.scoringLogic.type === 'highest' && (
                      <div className="space-y-2">
                        <Label>Target Dimension</Label>
                        <Select
                          value={criterion.scoringLogic.dimension || ''}
                          onValueChange={(value) => updateScoringLogic(criterion.id, 'dimension', value)}
                          disabled={!isEditing || editingCriteria.id !== criterion.id}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select dimension" />
                          </SelectTrigger>
                          <SelectContent>
                            {dimensions.map((dim) => (
                              <SelectItem key={dim.id} value={dim.shortName}>
                                {dim.name} ({dim.shortName})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {criterion.scoringLogic.type === 'topN' && (
                      <div className="space-y-2">
                        <Label>Top N Value</Label>
                        <Input
                          type="number"
                          value={criterion.scoringLogic.n || 1}
                          onChange={(e) => updateScoringLogic(criterion.id, 'n', parseInt(e.target.value) || 1)}
                          min="1"
                          max="10"
                          disabled={!isEditing || editingCriteria.id !== criterion.id}
                        />
                      </div>
                    )}
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Recommendations *</Label>
                      <Button
                        type="button"
                        onClick={() => addRecommendation(criterion.id)}
                        size="sm"
                        variant="outline"
                        disabled={!isEditing || editingCriteria.id !== criterion.id}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {criterion.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={rec}
                            onChange={(e) => updateRecommendation(criterion.id, index, e.target.value)}
                            placeholder={`Recommendation ${index + 1}`}
                            disabled={!isEditing || editingCriteria.id !== criterion.id}
                          />
                          {criterion.recommendations.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeRecommendation(criterion.id, index)}
                              size="sm"
                              variant="ghost"
                              className="text-destructive"
                              disabled={!isEditing || editingCriteria.id !== criterion.id}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Areas of Improvement */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Areas of Improvement</Label>
                      <Button
                        type="button"
                        onClick={() => addStringArrayItem(criterion.id, 'areasOfImprovement')}
                        size="sm"
                        variant="outline"
                        disabled={!isEditing || editingCriteria.id !== criterion.id}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {criterion.areasOfImprovement.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={item}
                            onChange={(e) => updateStringArrayItem(criterion.id, 'areasOfImprovement', index, e.target.value)}
                            placeholder={`Area ${index + 1}`}
                            disabled={!isEditing || editingCriteria.id !== criterion.id}
                          />
                          {criterion.areasOfImprovement.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeStringArrayItem(criterion.id, 'areasOfImprovement', index)}
                              size="sm"
                              variant="ghost"
                              className="text-destructive"
                              disabled={!isEditing || editingCriteria.id !== criterion.id}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Support Needed */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Support Needed</Label>
                      <Button
                        type="button"
                        onClick={() => addStringArrayItem(criterion.id, 'supportNeeded')}
                        size="sm"
                        variant="outline"
                        disabled={!isEditing || editingCriteria.id !== criterion.id}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {criterion.supportNeeded.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={item}
                            onChange={(e) => updateStringArrayItem(criterion.id, 'supportNeeded', index, e.target.value)}
                            placeholder={`Support ${index + 1}`}
                            disabled={!isEditing || editingCriteria.id !== criterion.id}
                          />
                          {criterion.supportNeeded.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeStringArrayItem(criterion.id, 'supportNeeded', index)}
                              size="sm"
                              variant="ghost"
                              className="text-destructive"
                              disabled={!isEditing || editingCriteria.id !== criterion.id}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Proposed Courses */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Proposed Courses</Label>
                      <Button
                        type="button"
                        onClick={() => addArrayItem(criterion.id, 'proposedCourses', { id: '', name: '', slug: '' })}
                        size="sm"
                        variant="outline"
                        disabled={!isEditing || editingCriteria.id !== criterion.id}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {criterion.proposedCourses.map((course, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Select
                            value={course.id}
                            onValueChange={(value) => {
                              const selectedCourse = availableCourses.find(c => c.id === value)
                              if (selectedCourse) {
                                const updatedCourses = [...criterion.proposedCourses]
                                updatedCourses[index] = selectedCourse
                                updateCriteria(criterion.id, 'proposedCourses', updatedCourses)
                              }
                            }}
                            disabled={!isEditing || editingCriteria.id !== criterion.id}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select course" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableCourses.map((c) => (
                                <SelectItem key={c.id} value={c.id}>
                                  {c.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {criterion.proposedCourses.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeArrayItem(criterion.id, 'proposedCourses', course.id)}
                              size="sm"
                              variant="ghost"
                              className="text-destructive"
                              disabled={!isEditing || editingCriteria.id !== criterion.id}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Proposed Blog Posts */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Proposed Blog Posts</Label>
                      <Button
                        type="button"
                        onClick={() => addArrayItem(criterion.id, 'proposedBlogPosts', { id: '', title: '', slug: '' })}
                        size="sm"
                        variant="outline"
                        disabled={!isEditing || editingCriteria.id !== criterion.id}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {criterion.proposedBlogPosts.map((post, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Select
                            value={post.id}
                            onValueChange={(value) => {
                              const selectedPost = availableBlogPosts.find(bp => bp.id === value)
                              if (selectedPost) {
                                const updatedPosts = [...criterion.proposedBlogPosts]
                                updatedPosts[index] = selectedPost
                                updateCriteria(criterion.id, 'proposedBlogPosts', updatedPosts)
                              }
                            }}
                            disabled={!isEditing || editingCriteria.id !== criterion.id}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select blog post" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableBlogPosts.map((bp) => (
                                <SelectItem key={bp.id} value={bp.id}>
                                  {bp.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {criterion.proposedBlogPosts.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeArrayItem(criterion.id, 'proposedBlogPosts', post.slug)}
                              size="sm"
                              variant="ghost"
                              className="text-destructive"
                              disabled={!isEditing || editingCriteria.id !== criterion.id}
                            >
                              <Trash2 className='h-4 w-4' />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Proposed Products */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Proposed Products</Label>
                      <Button
                        type="button"
                        onClick={() => addArrayItem(criterion.id, 'proposedProducts', { id: '', name: '', slug: '' })}
                        size="sm"
                        variant="outline"
                        disabled={!isEditing || editingCriteria.id !== criterion.id}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {criterion.proposedProducts.map((product, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Select
                            value={product.id}
                            onValueChange={(value) => {
                              const selectedProduct = availableProducts.find(p => p.id === value)
                              if (selectedProduct) {
                                const updatedProducts = [...criterion.proposedProducts]
                                updatedProducts[index] = selectedProduct
                                updateCriteria(criterion.id, 'proposedProducts', updatedProducts)
                              }
                            }}
                            disabled={!isEditing || editingCriteria.id !== criterion.id}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select product" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableProducts.map((p) => (
                                <SelectItem key={p.id} value={p.id}>
                                  {p.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {criterion.proposedProducts.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeArrayItem(criterion.id, 'proposedProducts', product.id)}
                              size="sm"
                              variant="ghost"
                              className="text-destructive"
                              disabled={!isEditing || editingCriteria.id !== criterion.id}
                            >
                              <Trash2 className='h-4 w-4' />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Proposed Streaks */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Proposed Streaks</Label>
                      <Button
                        type="button"
                        onClick={() => addArrayItem(criterion.id, 'proposedStreaks', { id: '', name: '', slug: '' })}
                        size="sm"
                        variant="outline"
                        disabled={!isEditing || editingCriteria.id !== criterion.id}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {criterion.proposedStreaks.map((streak, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Select
                            value={streak.id}
                            onValueChange={(value) => {
                              const selectedStreak = availableStreaks.find(s => s.id === value)
                              if (selectedStreak) {
                                const updatedStreaks = [...criterion.proposedStreaks]
                                updatedStreaks[index] = selectedStreak
                                updateCriteria(criterion.id, 'proposedStreaks', updatedStreaks)
                              }
                            }}
                            disabled={!isEditing || editingCriteria.id !== criterion.id}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select streak" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableStreaks.map((s) => (
                                <SelectItem key={s.id} value={s.id}>
                                  {s.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {criterion.proposedStreaks.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeArrayItem(criterion.id, 'proposedStreaks', streak.id)}
                              size="sm"
                              variant="ghost"
                              className="text-destructive"
                              disabled={!isEditing || editingCriteria.id !== criterion.id}
                            >
                              <Trash2 className='h-4 w-4' />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}