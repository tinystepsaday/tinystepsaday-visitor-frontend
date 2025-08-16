"use client"

import { useState } from 'react'
import { Plus, Trash2, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ColorPicker } from '@/components/ui/color-picker'
import { Badge } from '@/components/ui/badge'
import { type GradingCriteria } from '@/data/quizzes'

interface GradingCriteriaEditorProps {
  criteria: GradingCriteria[]
  onChange: (criteria: GradingCriteria[]) => void
  availableCourses?: Array<{ id: string; name: string; slug: string }>
  availableProducts?: Array<{ id: string; name: string; slug: string }>
  availableStreaks?: Array<{ id: string; name: string; slug: string }>
  availableBlogPosts?: Array<{ id: string; title: string; slug: string }>
  isLoadingBlogPosts?: boolean
}

export function GradingCriteriaEditor({
  criteria,
  onChange,
  availableCourses = [],
  availableProducts = [],
  availableStreaks = [],
  availableBlogPosts = [],
  isLoadingBlogPosts = false
}: GradingCriteriaEditorProps) {
  const [newRecommendation, setNewRecommendation] = useState('')

  const addCriteria = () => {
    const newCriteria: GradingCriteria = {
      id: `gc-${Date.now()}`,
      name: '',
      minScore: 0,
      maxScore: 100,
      label: '',
      color: '#3b82f6',
      recommendations: [],
      proposedCourses: [],
      proposedProducts: [],
      proposedStreaks: [],
      proposedBlogPosts: [],
      description: ''
    }
    onChange([...criteria, newCriteria])
  }

  const updateCriteria = (id: string, field: keyof GradingCriteria, value: string | number | string[] | Array<{ id: string; name: string; slug: string }> | Array<{ id: string; title: string; slug: string }>) => {
    onChange(criteria.map(c =>
      c.id === id ? { ...c, [field]: value } : c
    ))
  }

  const removeCriteria = (id: string) => {
    onChange(criteria.filter(c => c.id !== id))
  }

  const addRecommendation = (criteriaId: string) => {
    if (newRecommendation.trim()) {
      const targetCriteria = criteria.find(c => c.id === criteriaId)
      if (targetCriteria) {
        updateCriteria(criteriaId, 'recommendations', [...targetCriteria.recommendations, newRecommendation.trim()])
        setNewRecommendation('')
      }
    }
  }

  const removeRecommendation = (criteriaId: string, index: number) => {
    const targetCriteria = criteria.find(c => c.id === criteriaId)
    if (targetCriteria) {
      const updatedRecommendations = targetCriteria.recommendations.filter((_, i) => i !== index)
      updateCriteria(criteriaId, 'recommendations', updatedRecommendations)
    }
  }

  const addCourse = (criteriaId: string, courseId: string) => {
    const targetCriteria = criteria.find(c => c.id === criteriaId)
    const course = availableCourses.find(c => c.id === courseId)
    if (targetCriteria && course && !targetCriteria.proposedCourses.some(c => c.id === courseId)) {
      updateCriteria(criteriaId, 'proposedCourses', [...targetCriteria.proposedCourses, course])
    }
  }

  const removeCourse = (criteriaId: string, courseId: string) => {
    const targetCriteria = criteria.find(c => c.id === criteriaId)
    if (targetCriteria) {
      updateCriteria(criteriaId, 'proposedCourses', targetCriteria.proposedCourses.filter(c => c.id !== courseId))
    }
  }

  const addProduct = (criteriaId: string, productId: string) => {
    const targetCriteria = criteria.find(c => c.id === criteriaId)
    const product = availableProducts.find(p => p.id === productId)
    if (targetCriteria && product && !targetCriteria.proposedProducts.some(p => p.id === productId)) {
      updateCriteria(criteriaId, 'proposedProducts', [...targetCriteria.proposedProducts, product])
    }
  }

  const removeProduct = (criteriaId: string, productId: string) => {
    const targetCriteria = criteria.find(c => c.id === criteriaId)
    if (targetCriteria) {
      updateCriteria(criteriaId, 'proposedProducts', targetCriteria.proposedProducts.filter(p => p.id !== productId))
    }
  }

  const addStreak = (criteriaId: string, streakId: string) => {
    const targetCriteria = criteria.find(c => c.id === criteriaId)
    const streak = availableStreaks.find(s => s.id === streakId)
    if (targetCriteria && streak && !targetCriteria.proposedStreaks.some(s => s.id === streakId)) {
      updateCriteria(criteriaId, 'proposedStreaks', [...targetCriteria.proposedStreaks, streak])
    }
  }

  const removeStreak = (criteriaId: string, streakId: string) => {
    const targetCriteria = criteria.find(c => c.id === criteriaId)
    if (targetCriteria) {
      updateCriteria(criteriaId, 'proposedStreaks', targetCriteria.proposedStreaks.filter(s => s.id !== streakId))
    }
  }

  const addBlogPost = (criteriaId: string, blogPostId: string) => {
    const targetCriteria = criteria.find(c => c.id === criteriaId)
    const blogPost = availableBlogPosts.find(b => b.id === blogPostId)
    if (targetCriteria && blogPost && !targetCriteria.proposedBlogPosts.some(b => b.id === blogPostId)) {
      updateCriteria(criteriaId, 'proposedBlogPosts', [...targetCriteria.proposedBlogPosts, blogPost])
    }
  }

  const removeBlogPost = (criteriaId: string, blogPostId: string) => {
    const targetCriteria = criteria.find(c => c.id === criteriaId)
    if (targetCriteria) {
      updateCriteria(criteriaId, 'proposedBlogPosts', targetCriteria.proposedBlogPosts.filter(b => b.id !== blogPostId))
    }
  }

  return (
    <div className="space-y-4">
      {criteria.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground mb-4">No grading criteria defined yet.</p>
            <Button type="button" onClick={addCriteria} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add First Criteria
            </Button>
          </CardContent>
        </Card>
      )}

      {criteria.map((criterion, index) => (
        <Card key={criterion.id} className="relative">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <GripVertical className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-base">Criteria {index + 1}</CardTitle>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeCriteria(criterion.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={criterion.name}
                  onChange={(e) => updateCriteria(criterion.id, 'name', e.target.value)}
                  placeholder="e.g., Excellent, Good, Fair"
                />
              </div>
              <div className="space-y-2">
                <Label>Label</Label>
                <Input
                  value={criterion.label}
                  onChange={(e) => updateCriteria(criterion.id, 'label', e.target.value)}
                  placeholder="e.g., Habit Master, Habit Builder"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Min Score</Label>
                <Input
                  type="number"
                  value={criterion.minScore}
                  onChange={(e) => updateCriteria(criterion.id, 'minScore', parseInt(e.target.value))}
                  min="0"
                  max="100"
                />
              </div>
              <div className="space-y-2">
                <Label>Max Score</Label>
                <Input
                  type="number"
                  value={criterion.maxScore}
                  onChange={(e) => updateCriteria(criterion.id, 'maxScore', parseInt(e.target.value))}
                  min="0"
                  max="100"
                />
              </div>
              <div className="space-y-2">
                <ColorPicker
                  value={criterion.color}
                  onChange={(color) => updateCriteria(criterion.id, 'color', color)}
                  label="Color"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={criterion.description || ''}
                onChange={(e) => updateCriteria(criterion.id, 'description', e.target.value)}
                placeholder="Brief description of this criteria level..."
                rows={2}
              />
            </div>

            {/* Recommendations */}
            <div className="space-y-3">
              <Label>Recommendations</Label>
              <div className="flex space-x-2">
                <Input
                  value={newRecommendation}
                  onChange={(e) => setNewRecommendation(e.target.value)}
                  placeholder="Add a recommendation..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRecommendation(criterion.id))}
                />
                <Button
                  type="button"
                  onClick={() => addRecommendation(criterion.id)}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {criterion.recommendations.map((rec, idx) => (
                  <Badge key={idx} variant="secondary" className="flex items-center space-x-1">
                    <span>{rec}</span>
                    <button
                      type="button"
                      onClick={() => removeRecommendation(criterion.id, idx)}
                      className="ml-1 hover:text-destructive"
                      title="Remove recommendation"
                      aria-label="Remove recommendation"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Proposed Courses */}
            <div className="space-y-3">
              <Label>Proposed Courses</Label>
              <Select onValueChange={(value) => addCourse(criterion.id, value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course to add..." />
                </SelectTrigger>
                <SelectContent>
                  {availableCourses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2">
                {criterion.proposedCourses.map((course) => (
                  <Badge key={course.id} variant="outline" className="flex items-center space-x-1">
                    <span>{course.name}</span>
                    <button
                      type="button"
                      onClick={() => removeCourse(criterion.id, course.id)}
                      className="ml-1 hover:text-destructive"
                      title="Remove course"
                      aria-label="Remove course"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Proposed Products */}
            <div className="space-y-3">
              <Label>Proposed Products</Label>
              <Select onValueChange={(value) => addProduct(criterion.id, value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a product to add..." />
                </SelectTrigger>
                <SelectContent>
                  {availableProducts.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2">
                {criterion.proposedProducts.map((product) => (
                  <Badge key={product.id} variant="outline" className="flex items-center space-x-1">
                    <span>{product.name}</span>
                    <button
                      type="button"
                      onClick={() => removeProduct(criterion.id, product.id)}
                      className="ml-1 hover:text-destructive"
                      title="Remove product"
                      aria-label="Remove product"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Proposed Streaks */}
            <div className="space-y-3">
              <Label>Proposed Streaks</Label>
              <Select onValueChange={(value) => addStreak(criterion.id, value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a streak to add..." />
                </SelectTrigger>
                <SelectContent>
                  {availableStreaks.map((streak) => (
                    <SelectItem key={streak.id} value={streak.id}>
                      {streak.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2">
                {criterion.proposedStreaks.map((streak) => (
                  <Badge key={streak.id} variant="outline" className="flex items-center space-x-1">
                    <span>{streak.name}</span>
                    <button
                      type="button"
                      onClick={() => removeStreak(criterion.id, streak.id)}
                      className="ml-1 hover:text-destructive"
                      title="Remove streak"
                      aria-label="Remove streak"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Proposed Blog Posts */}
            <div className="space-y-3">
              <Label>Proposed Blog Posts</Label>
              {isLoadingBlogPosts ? (
                <div className="text-sm text-muted-foreground">
                  Loading available blog posts...
                </div>
              ) : (
                <>
                  <Select onValueChange={(value) => addBlogPost(criterion.id, value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a blog post to add..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableBlogPosts.map((blogPost) => (
                        <SelectItem key={blogPost.id} value={blogPost.id}>
                          {blogPost.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-wrap gap-2">
                    {criterion.proposedBlogPosts.map((blogPost) => (
                      <Badge key={blogPost.id} variant="outline" className="flex items-center space-x-1">
                        <span>{blogPost.title}</span>
                        <button
                          type="button"
                          onClick={() => removeBlogPost(criterion.id, blogPost.id)}
                          className="ml-1 hover:text-destructive"
                          title="Remove blog post"
                          aria-label="Remove blog post"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
      <Button type="button" onClick={addCriteria} variant="outline" size="sm" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Criteria
      </Button>
    </div>
  )
} 