"use client"

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { type QuizFormData } from '../QuizEditClient'

interface BasicInformationStepProps {
  data: QuizFormData
  onUpdate: (data: Partial<QuizFormData>) => void
  onNext: () => void
}

// Available categories and difficulties - can be fetched from backend
const availableCategories = [
  "Personal Development", "Mental Health", "Life Purpose", "Wellness", "Career",
  "Relationships", "Productivity", "Mindfulness", "Finance", "Family", "Social",
  "Spirituality", "Personal Growth", "Self-Improvement", "Leadership", "Entrepreneurship",
  "Marketing", "Sales", "Technology", "Design", "Writing", "Reading", "Listening",
  "Speaking", "Travel", "Food", "Fashion", "Art", "Music", "Movies", "TV", "Books",
  "Podcasts", "Gaming", "Health", "Fitness", "Sleep", "Meditation", "Yoga",
  "Onboarding", "Time Management", "Goal Setting", "Habit Building"
]

const availableDifficulties = [
  { value: 'BEGINNER', label: 'Beginner' },
  { value: 'INTERMEDIATE', label: 'Intermediate' },
  { value: 'ADVANCED', label: 'Advanced' }
]

export function BasicInformationStep({ data, onUpdate, onNext }: BasicInformationStepProps) {
  const [newTag, setNewTag] = useState('')

  const handleInputChange = (field: keyof QuizFormData, value: string | boolean) => {
    onUpdate({ [field]: value })
  }

  const addTag = () => {
    if (newTag.trim() && !data.tags.includes(newTag.trim())) {
      onUpdate({ tags: [...data.tags, newTag.trim()] })
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    onUpdate({ tags: data.tags.filter(tag => tag !== tagToRemove) })
  }

  const canProceed = () => {
    return !!(data.title && data.description && data.category)
  }

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Quiz Title *</Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Enter quiz title"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={data.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty *</Label>
            <Select value={data.difficulty} onValueChange={(value) => handleInputChange('difficulty', value as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED')}>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                {availableDifficulties.map((difficulty) => (
                  <SelectItem key={difficulty.value} value={difficulty.value}>
                    {difficulty.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quizType">Quiz Type</Label>
            <Select value={data.quizType} onValueChange={(value) => handleInputChange('quizType', value as 'DEFAULT' | 'COMPLEX' | 'ONBOARDING')}>
              <SelectTrigger>
                <SelectValue placeholder="Select quiz type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DEFAULT">Default</SelectItem>
                <SelectItem value="COMPLEX">Complex (MBTI, Enneagram, etc.)</SelectItem>
                <SelectItem value="ONBOARDING">Onboarding</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="redirectAfterAnswer">Redirect After Answer</Label>
            <Select value={data.redirectAfterAnswer} onValueChange={(value) => handleInputChange('redirectAfterAnswer', value as 'HOME' | 'RESULTS')}>
              <SelectTrigger>
                <SelectValue placeholder="Select redirect after answer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HOME">Home</SelectItem>
                <SelectItem value="RESULTS">Results</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            id="subtitle"
            value={data.subtitle}
            onChange={(e) => handleInputChange('subtitle', e.target.value)}
            placeholder="Enter a brief subtitle for the quiz"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={data.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Enter detailed quiz description"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="estimatedTime">Estimated Time</Label>
            <Input
              id="estimatedTime"
              type="text"
              value={data.estimatedTime}
              onChange={(e) => handleInputChange('estimatedTime', e.target.value)}
              placeholder="e.g., 10-15 minutes"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={data.status} onValueChange={(value) => handleInputChange('status', value as 'DRAFT' | 'ACTIVE' | 'ARCHIVED')}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="isPublic">Visibility</Label>
            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="isPublic"
                checked={data.isPublic}
                onCheckedChange={(checked) => handleInputChange('isPublic', checked)}
              />
              <Label htmlFor="isPublic">Make quiz public</Label>
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Tags</Label>
          <div className="flex space-x-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Enter a tag"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            />
            <Button type="button" onClick={addTag} variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {data.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 hover:text-destructive"
                title="Remove tag"
                aria-label="Remove tag"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-end">
        <Button 
          onClick={onNext} 
          disabled={!canProceed()}
          className="min-w-[120px]"
        >
          Next: Dimensions
        </Button>
      </div>
    </div>
  )
}
