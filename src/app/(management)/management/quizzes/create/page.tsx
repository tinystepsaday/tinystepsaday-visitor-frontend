"use client"

import React, { useState } from 'react'
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { type GradingCriteria } from '@/data/quizzes'
import { GradingCriteriaEditor } from '@/components/quiz/GradingCriteriaEditor'

interface Question {
  id: string
  text: string
  options: Array<{
    id: string
    text: string
    value: number
  }>
}

export default function CreateQuizPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 'q1',
      text: '',
      options: [
        { id: 'q1-a', text: '', value: 1 },
        { id: 'q1-b', text: '', value: 2 },
        { id: 'q1-c', text: '', value: 3 },
        { id: 'q1-d', text: '', value: 4 }
      ]
    }
  ])
  const [gradingCriteria, setGradingCriteria] = useState<GradingCriteria[]>([
    {
      id: 'gc-1',
      name: 'Excellent',
      minScore: 80,
      maxScore: 100,
      label: 'Master',
      color: '#10b981',
      recommendations: [
        'Continue building on your strong foundation',
        'Share your knowledge with others'
      ],
      proposedCourses: [],
      proposedProducts: [],
      proposedStreaks: [],
      description: 'Exceptional performance in this area'
    },
    {
      id: 'gc-2',
      name: 'Good',
      minScore: 60,
      maxScore: 79,
      label: 'Builder',
      color: '#3b82f6',
      recommendations: [
        'Focus on consistency in your practice',
        'Identify areas for improvement'
      ],
      proposedCourses: [],
      proposedProducts: [],
      proposedStreaks: [],
      description: 'Solid foundation with room for growth'
    },
    {
      id: 'gc-3',
      name: 'Fair',
      minScore: 40,
      maxScore: 59,
      label: 'Learner',
      color: '#f59e0b',
      recommendations: [
        'Start with small, manageable changes',
        'Seek guidance and support'
      ],
      proposedCourses: [],
      proposedProducts: [],
      proposedStreaks: [],
      description: 'Potential but needs development'
    },
    {
      id: 'gc-4',
      name: 'Needs Improvement',
      minScore: 0,
      maxScore: 39,
      label: 'Starter',
      color: '#ef4444',
      recommendations: [
        'Begin with basic fundamentals',
        'Consider working with a mentor'
      ],
      proposedCourses: [],
      proposedProducts: [],
      proposedStreaks: [],
      description: 'Significant room for improvement'
    }
  ])

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: '',
    estimatedTime: '',
    difficulty: 'intermediate' as 'beginner' | 'intermediate' | 'advanced',
    status: 'draft' as 'draft' | 'active' | 'archived',
    isPublic: false
  })

  // Mock data for courses and products - in real app, these would come from API
  const availableCourses = [
    { id: 'course-1', name: 'Mindful Living Essentials', slug: 'mindful-living-essentials' },
    { id: 'course-2', name: 'Emotional Intelligence Mastery', slug: 'emotional-intelligence-mastery' },
    { id: 'course-3', name: 'Stress Management Techniques', slug: 'stress-management-techniques' },
    { id: 'course-4', name: 'Meditation for Modern Life', slug: 'meditation-for-modern-life' }
  ]

  const availableProducts = [
    { id: 'product-1', name: 'Mindfulness Journal', slug: 'mindfulness-journal' },
    { id: 'product-2', name: 'Meditation Cushion', slug: 'meditation-cushion' },
    { id: 'product-3', name: 'Essential Oil Set', slug: 'essential-oil-set' },
    { id: 'product-4', name: 'Self-Improvement Handbook', slug: 'self-improvement-handbook' }
  ]

  const availableStreaks = [
    { id: 'streak-1', name: 'Meditation Streak', slug: 'meditation-streak' },
    { id: 'streak-2', name: 'Reading Streak', slug: 'reading-streak' },
    { id: 'streak-3', name: 'Gratitude Streak', slug: 'gratitude-streak' }
  ]

  const addQuestion = () => {
    const newId = `q${questions.length + 1}`
    setQuestions([...questions, {
      id: newId,
      text: '',
      options: [
        { id: `${newId}-a`, text: '', value: 1 },
        { id: `${newId}-b`, text: '', value: 2 },
        { id: `${newId}-c`, text: '', value: 3 },
        { id: `${newId}-d`, text: '', value: 4 }
      ]
    }])
  }

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index))
    }
  }

  const updateQuestion = (index: number, field: 'text' | 'options', value: string | Question['options']) => {
    const updatedQuestions = [...questions]
    if (field === 'text') {
      updatedQuestions[index].text = value as string
    } else if (field === 'options') {
      updatedQuestions[index].options = value as Question['options']
    }
    setQuestions(updatedQuestions)
  }

  const updateOption = (questionIndex: number, optionIndex: number, field: 'text' | 'value', value: string | number) => {
    const updatedQuestions = [...questions]
    if (field === 'text') {
      updatedQuestions[questionIndex].options[optionIndex].text = value as string
    } else if (field === 'value') {
      updatedQuestions[questionIndex].options[optionIndex].value = parseInt(value as string)
    }
    setQuestions(updatedQuestions)
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validation
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Quiz title is required",
        variant: "destructive"
      })
      setIsLoading(false)
      return
    }

    if (questions.some(q => !q.text.trim())) {
      toast({
        title: "Error",
        description: "All questions must have text",
        variant: "destructive"
      })
      setIsLoading(false)
      return
    }

    if (questions.some(q => q.options.some(o => !o.text.trim()))) {
      toast({
        title: "Error",
        description: "All answer options must have text",
        variant: "destructive"
      })
      setIsLoading(false)
      return
    }

    if (gradingCriteria.length === 0) {
      toast({
        title: "Error",
        description: "At least one grading criteria is required",
        variant: "destructive"
      })
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Quiz created successfully",
      })
      setIsLoading(false)
      // Redirect to quizzes list
      if (typeof window !== 'undefined') {
        window.location.href = '/management/quizzes'
      }
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start gap-4 w-full justify-between">
          <div className="flex items-center justify-between w-full">
            <Link href="/management/quizzes">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Quizzes
              </Button>
            </Link>
            <Button onClick={handleSubmit} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Creating...' : 'Create Quiz'}
            </Button>
          </div>
          <div className="flex flex-col items-start w-full">
            <h1 className="text-2xl font-bold">Create New Quiz</h1>
            <p className="text-muted-foreground">Build a comprehensive assessment quiz</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Set up the basic details of your quiz</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Quiz Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter quiz title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  placeholder="Enter category"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => handleInputChange('subtitle', e.target.value)}
                placeholder="Enter a brief subtitle for the quiz"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter detailed quiz description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select value={formData.difficulty} onValueChange={(value) => handleInputChange('difficulty', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimatedTime">Estimated Time (minutes)</Label>
                <Input
                  id="estimatedTime"
                  type="number"
                  value={formData.estimatedTime}
                  onChange={(e) => handleInputChange('estimatedTime', e.target.value)}
                  placeholder="30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isPublic"
                checked={formData.isPublic}
                onCheckedChange={(checked) => handleInputChange('isPublic', checked)}
              />
              <Label htmlFor="isPublic">Make quiz public</Label>
            </div>
          </CardContent>
        </Card>

        {/* Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
            <CardDescription>Add tags to help categorize your quiz</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
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
          </CardContent>
        </Card>

        {/* Grading Criteria */}
        <Card>
          <CardHeader>
            <CardTitle>Grading Criteria</CardTitle>
            <CardDescription>Set up the scoring system and recommendations for your quiz</CardDescription>
          </CardHeader>
          <CardContent>
            <GradingCriteriaEditor
              criteria={gradingCriteria}
              onChange={setGradingCriteria}
              availableCourses={availableCourses}
              availableProducts={availableProducts}
              availableStreaks={availableStreaks}
            />
          </CardContent>
        </Card>

        {/* Questions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Questions</CardTitle>
                <CardDescription>Add and edit quiz questions</CardDescription>
              </div>
              <Button type="button" onClick={addQuestion} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {questions.map((question, index) => (
              <div key={question.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Question {index + 1}</h4>
                  <Button
                    type="button"
                    onClick={() => removeQuestion(index)}
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    disabled={questions.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Question Text</Label>
                  <Textarea
                    value={question.text}
                    onChange={(e) => updateQuestion(index, 'text', e.target.value)}
                    placeholder="Enter your question here"
                    rows={2}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Options</Label>
                  {question.options.map((option, optionIndex) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Input
                        value={option.text}
                        onChange={(e) => updateOption(index, optionIndex, 'text', e.target.value)}
                        placeholder={`Option ${option.value}`}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        value={option.value}
                        onChange={(e) => updateOption(index, optionIndex, 'value', parseInt(e.target.value))}
                        placeholder="Value"
                        className="w-20"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
