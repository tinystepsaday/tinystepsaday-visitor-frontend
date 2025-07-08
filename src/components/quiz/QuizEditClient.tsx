"use client"

import { useState, useEffect } from 'react'
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
import { type Quiz, type GradingCriteria } from '@/data/quizzes'
import { GradingCriteriaEditor } from './GradingCriteriaEditor'
import { DetailPageLoader } from '../ui/loaders'

interface QuizEditClientProps {
  quiz: Quiz
}

interface Question {
  id: string
  text: string
  options: Array<{
    id: string
    text: string
    value: number
  }>
}

export default function QuizEditClient({ quiz }: QuizEditClientProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [gradingCriteria, setGradingCriteria] = useState<GradingCriteria[]>([])
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

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        if (quiz) {
          setFormData({
            title: quiz.title,
            subtitle: quiz.subtitle,
            description: quiz.description,
            category: quiz.category,
            estimatedTime: quiz.estimatedTime,
            difficulty: quiz.difficulty,
            status: quiz.status,
            isPublic: quiz.isPublic
          })
          setTags(quiz.tags)
          setQuestions(quiz.questions)
          setGradingCriteria(quiz.gradingCriteria)
          setIsInitialized(true)
        }
      } catch (err) {
        console.error('Error fetching quiz:', err)
      }
    }
    if (!isInitialized) {
      fetchQuiz()
    }
  }, [quiz, isInitialized])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove))
  }

  const addQuestion = () => {
    const newQuestion: Question = {
      id: `q${questions.length + 1}`,
      text: '',
      options: [
        { id: '1', text: '', value: 1 },
        { id: '2', text: '', value: 2 },
        { id: '3', text: '', value: 3 },
        { id: '4', text: '', value: 4 }
      ]
    }
    setQuestions(prev => [...prev, newQuestion])
  }

  const updateQuestion = (questionId: string, field: string, value: string) => {
    setQuestions(prev => prev.map(q =>
      q.id === questionId ? { ...q, [field]: value } : q
    ))
  }

  const updateOption = (questionId: string, optionId: string, field: string, value: string | number) => {
    setQuestions(prev => prev.map(q =>
      q.id === questionId ? {
        ...q,
        options: q.options.map(opt =>
          opt.id === optionId ? { ...opt, [field]: value } : opt
        )
      } : q
    ))
  }

  const removeQuestion = (questionId: string) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      toast({
        title: "Quiz updated successfully",
        description: "Your quiz has been updated and saved.",
      })
    } catch {
      toast({
        title: "Error updating quiz",
        description: "There was an error updating your quiz. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!isInitialized) {
    return <DetailPageLoader />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start gap-4 w-full justify-between">
          <div className="flex items-center justify-between w-full">
            <Link href={`/management/quizzes/${quiz.id}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Quiz
              </Button>
            </Link>
            <Button onClick={handleSubmit} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
          <div className="flex flex-col items-start w-full">
            <h1 className="text-2xl font-bold">Edit Quiz</h1>
            <p className="text-muted-foreground">Update quiz details and questions</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Update the basic details of your quiz</CardDescription>
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
            <div className="flex flex-col items-start w-full gap-2">
              <CardTitle>Questions</CardTitle>
              <CardDescription>Add and edit quiz questions</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {questions.map((question, index) => (
              <div key={question.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Question {index + 1}</h4>
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
                  <Label>Question Text</Label>
                  <Textarea
                    value={question.text}
                    onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                    placeholder="Enter your question here"
                    rows={2}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Options</Label>
                  {question.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Input
                        value={option.text}
                        onChange={(e) => updateOption(question.id, option.id, 'text', e.target.value)}
                        placeholder={`Option ${option.value}`}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        value={option.value}
                        onChange={(e) => updateOption(question.id, option.id, 'value', parseInt(e.target.value))}
                        placeholder="Value"
                        className="w-20"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <Button type="button" onClick={addQuestion} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
            {questions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No questions added yet. Click &quot;Add Question&quot; to get started.
              </div>
            )}
          </CardContent>
        </Card>
      </form>
    </div>
  )
} 