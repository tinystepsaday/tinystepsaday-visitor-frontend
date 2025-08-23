"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

interface QuizBasicInfoFormProps {
  formData: {
    title: string
    subtitle: string
    description: string
    category: string
    estimatedTime: string
    difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
    status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED'
    isPublic: boolean
    quizType: 'DEFAULT' | 'COMPLEX' | 'ONBOARDING'
    redirectAfterAnswer: 'HOME' | 'RESULTS'
  }
  onInputChange: (field: string, value: string | boolean) => void
  availableCategories: string[]
  availableDifficulties: Array<{ value: string; label: string }>
}

export function QuizBasicInfoForm({ 
  formData, 
  onInputChange, 
  availableCategories, 
  availableDifficulties 
}: QuizBasicInfoFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>Update the basic details of your quiz</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Quiz Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => onInputChange('title', e.target.value)}
            placeholder="Enter quiz title"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category.toUpperCase()} onValueChange={(value) => onInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.map((category) => (
                  <SelectItem key={category} value={category.toUpperCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty *</Label>
            <Select value={formData.difficulty.toUpperCase()} onValueChange={(value) => onInputChange('difficulty', value as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED')}>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                {availableDifficulties.map((difficulty) => (
                  <SelectItem key={difficulty.value} value={difficulty.value.toUpperCase()}>
                    {difficulty.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quizType">Quiz Type</Label>
            <Select value={formData.quizType.toUpperCase()} onValueChange={(value) => onInputChange('quizType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select quiz type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DEFAULT">Default</SelectItem>
                <SelectItem value="COMPLEX">Complex</SelectItem>
                <SelectItem value="ONBOARDING">Onboarding</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="redirectAfterAnswer">Redirect After Answer</Label>
            <Select value={formData.redirectAfterAnswer.toUpperCase()} onValueChange={(value) => onInputChange('redirectAfterAnswer', value)}>
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
            value={formData.subtitle}
            onChange={(e) => onInputChange('subtitle', e.target.value)}
            placeholder="Enter a brief subtitle for the quiz"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => onInputChange('description', e.target.value)}
            placeholder="Enter detailed quiz description"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="estimatedTime">Estimated Time (minutes)</Label>
            <Input
              id="estimatedTime"
              type="text"
              value={formData.estimatedTime}
              onChange={(e) => onInputChange('estimatedTime', e.target.value)}
              placeholder="4 - 5 minutes"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status.toUpperCase()} onValueChange={(value) => onInputChange('status', value)}>
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
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="isPublic"
            checked={formData.isPublic}
            onCheckedChange={(checked) => onInputChange('isPublic', checked)}
          />
          <Label htmlFor="isPublic">Make quiz public</Label>
        </div>
      </CardContent>
    </Card>
  )
}
