"use client"

import { useState, useEffect } from 'react'
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'

import { useToast } from '@/hooks/use-toast'
import { CreateQuizData, quizAPI } from '@/integration/quiz'
import { type Quiz, type GradingCriteria, type QuizDimension, type ComplexGradingCriteria } from '@/data/quizzes'
import { GradingCriteriaEditor } from './GradingCriteriaEditor'

import { DetailPageLoader } from '../ui/loaders'
import { usePublicBlogPosts } from '@/integration/blog'

interface QuizEditClientProps {
  quiz?: Quiz // Optional for creating new quizzes
  isEditing?: boolean
}

interface Question {
  id: string
  text: string
  dimensionId?: string
  options: Array<{
    id: string
    text: string
    value: number
  }>
}



export default function QuizEditClient({ quiz, isEditing = false }: QuizEditClientProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [gradingCriteria, setGradingCriteria] = useState<GradingCriteria[]>([])
  const [complexGradingCriteria, setComplexGradingCriteria] = useState<ComplexGradingCriteria[]>([])
  const [dimensions, setDimensions] = useState<QuizDimension[]>([])
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: '',
    estimatedTime: '',
    difficulty: 'INTERMEDIATE' as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED',
    status: 'DRAFT' as 'DRAFT' | 'ACTIVE' | 'ARCHIVED',
    isPublic: false,
    quizType: 'DEFAULT' as 'DEFAULT' | 'COMPLEX' | 'ONBOARDING',
    redirectAfterAnswer: 'HOME' as 'HOME' | 'RESULTS'
  })

  // Available categories and difficulties from backend
  const availableCategories = [
    "Personal Development",
    "Mental Health",
    "Life Purpose",
    "Wellness",
    "Career",
    "Relationships",
    "Productivity",
    "Mindfulness",
    "Finance",
    "Family",
    "Social",
    "Spirituality",
    "Personal Growth",
    "Self-Improvement",
    "Leadership",
    "Entrepreneurship",
    "Marketing",
    "Sales",
    "Technology",
    "Design",
    "Writing",
    "Reading",
    "Listening",
    "Speaking",
    "Travel",
    "Food",
    "Fashion",
    "Art",
    "Music",
    "Movies",
    "TV",
    "Books",
    "Podcasts",
    "Gaming",
    "Health",
    "Fitness",
    "Sleep",
    "Meditation",
    "Yoga",
    "Onboarding",
    "Time Management",
    "Goal Setting",
    "Habit Building"
  ];
  const [availableDifficulties] = useState([
    { value: 'BEGINNER', label: 'Beginner' },
    { value: 'INTERMEDIATE', label: 'Intermediate' },
    { value: 'ADVANCED', label: 'Advanced' }
  ])

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

  // Fetch real blog posts from the API
  const { data: blogPostsData, isLoading: isLoadingBlogPosts } = usePublicBlogPosts({
    limit: 100, // Get as many blog posts as possible
    page: 1,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  })

  // Transform blog posts data for the component
  const availableBlogPosts = blogPostsData?.posts?.map(post => ({
    id: post.id,
    title: post.title,
    slug: post.slug
  })) || []

  useEffect(() => {
    const initializeData = async () => {
      try {
        if (quiz && !isInitialized) {
          // Editing existing quiz
          setFormData({
            title: quiz.title,
            subtitle: quiz.subtitle,
            description: quiz.description,
            category: quiz.category,
            estimatedTime: quiz.estimatedTime,
            difficulty: quiz.difficulty.toUpperCase() as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED',
            status: quiz.status.toUpperCase() as 'DRAFT' | 'ACTIVE' | 'ARCHIVED',
            isPublic: quiz.isPublic,
            quizType: quiz.quizType.toUpperCase() as 'DEFAULT' | 'COMPLEX' | 'ONBOARDING',
            redirectAfterAnswer: quiz.redirectAfterAnswer.toUpperCase() as 'HOME' | 'RESULTS'
          })
          setTags(quiz.tags)
          setQuestions(quiz.questions)
          setGradingCriteria(quiz.gradingCriteria)
          setComplexGradingCriteria(quiz.complexGradingCriteria || [])
          setDimensions(quiz.dimensions || [])
        } else if (!quiz && !isInitialized) {
          // Creating new quiz - set default values
          setFormData({
            title: '',
            subtitle: '',
            description: '',
            category: '',
            estimatedTime: '',
            difficulty: 'INTERMEDIATE' as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED',
            status: 'DRAFT' as 'DRAFT' | 'ACTIVE' | 'ARCHIVED',
            isPublic: false,
            quizType: 'DEFAULT' as 'DEFAULT' | 'COMPLEX' | 'ONBOARDING',
            redirectAfterAnswer: 'HOME' as 'HOME' | 'RESULTS'
          })
          setTags([])
          setQuestions([])
          setGradingCriteria([])
          setComplexGradingCriteria([])
          setDimensions([])
        }
        setIsInitialized(true)
      } catch (err) {
        console.error('Error initializing quiz data:', err)
        toast({
          title: "Error",
          description: "Failed to load quiz data. Please try again.",
          variant: "destructive"
        })
      }
    }

    if (!isInitialized) {
      initializeData()
    }
  }, [quiz, isInitialized, toast])

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
      dimensionId: formData.quizType === 'COMPLEX' ? undefined : undefined,
      options: [
        { id: '1', text: '', value: 1 },
        { id: '2', text: '', value: 2 }
      ]
    }
    setQuestions(prev => [...prev, newQuestion])
  }

  const addOptionToQuestion = (questionId: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        const newOptionId = `${questionId}-opt-${q.options.length + 1}`
        const newValue = q.options.length + 1
        return {
          ...q,
          options: [...q.options, { id: newOptionId, text: '', value: newValue }]
        }
      }
      return q
    }))
  }

  const removeOptionFromQuestion = (questionId: string, optionId: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        const filteredOptions = q.options.filter(opt => opt.id !== optionId)
        // Reorder values to maintain sequential numbering
        const reorderedOptions = filteredOptions.map((opt, index) => ({
          ...opt,
          value: index + 1
        }))
        return { ...q, options: reorderedOptions }
      }
      return q
    }))
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

  const handleQuizTypeChange = (newQuizType: string) => {
    handleInputChange('quizType', newQuizType)
    
    // Reset related data when switching quiz types
    if (newQuizType === 'COMPLEX') {
      setGradingCriteria([])
      if (dimensions.length === 0) {
        // Add a default dimension for complex quizzes
        setDimensions([{
          id: 'dim-1',
          name: 'Personality Dimension',
          shortName: 'PD',
          order: 1,
          minScore: 0,
          maxScore: 20,
          threshold: 10,
          lowLabel: 'Type A',
          highLabel: 'Type B'
        }])
      }
      if (complexGradingCriteria.length === 0) {
        // Add a default complex grading criteria
        setComplexGradingCriteria([{
          id: 'cgc-1',
          name: 'Type A',
          label: 'Type A Personality',
          color: '#3B82F6',
          recommendations: ['Focus on patience and mindfulness'],
          areasOfImprovement: ['Stress management'],
          supportNeeded: ['Meditation practices'],
          proposedCourses: [],
          proposedProducts: [],
          proposedStreaks: [],
          proposedBlogPosts: [],
          scoringLogic: {
            type: 'threshold',
            dimensions: [{ name: 'PD', threshold: 10 }]
          }
        }])
      }
    } else {
      setDimensions([])
      setComplexGradingCriteria([])
      if (gradingCriteria.length === 0) {
        // Add default grading criteria for DEFAULT/ONBOARDING quizzes
        setGradingCriteria([{
          id: 'gc-1',
          name: 'Beginner',
          minScore: 0,
          maxScore: 33,
          label: 'Beginner',
          color: '#EF4444',
          recommendations: ['Start with basic concepts'],
          areasOfImprovement: ['Fundamental understanding'],
          supportNeeded: ['Basic resources'],
          proposedCourses: [],
          proposedProducts: [],
          proposedStreaks: [],
          proposedBlogPosts: []
        }])
      }
    }
  }

  const handleSave = async () => {
    if (!formData.title || !formData.description || questions.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields and add at least one question.",
        variant: "destructive"
      })
      return
    }

    // Validate questions have at least 2 options
    const invalidQuestions = questions.filter(q => q.options.length < 2)
    if (invalidQuestions.length > 0) {
      toast({
        title: "Validation Error",
        description: "All questions must have at least 2 options.",
        variant: "destructive"
      })
      return
    }

    // Validate complex quiz requirements
    if (formData.quizType === 'COMPLEX') {
      if (dimensions.length === 0) {
        toast({
          title: "Validation Error",
          description: "Complex quizzes must have at least one dimension.",
          variant: "destructive"
        })
        return
      }
      if (complexGradingCriteria.length === 0) {
        toast({
          title: "Validation Error",
          description: "Complex quizzes must have at least one complex grading criteria.",
          variant: "destructive"
        })
        return
      }
    } else {
      if (gradingCriteria.length === 0) {
        toast({
          title: "Validation Error",
          description: "Default and onboarding quizzes must have at least one grading criteria.",
          variant: "destructive"
        })
        return
      }
    }

    setIsLoading(true)

    try {
      const quizData: CreateQuizData = {
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        category: formData.category,
        estimatedTime: formData.estimatedTime,
        difficulty: formData.difficulty.toUpperCase() as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED',
        status: formData.status,
        isPublic: formData.isPublic,
        quizType: formData.quizType.toUpperCase() as 'DEFAULT' | 'COMPLEX' | 'ONBOARDING',
        redirectAfterAnswer: formData.redirectAfterAnswer.toUpperCase() as 'HOME' | 'RESULTS',
        tags,
        questions: questions.map((q, index) => ({
          text: q.text,
          order: index + 1,
          dimensionId: formData.quizType === 'COMPLEX' ? q.dimensionId : undefined,
          options: q.options.map((opt, optIndex) => ({
            text: opt.text,
            value: opt.value,
            order: optIndex + 1
          }))
        }))
      }

      // Add quiz type specific data
      if (formData.quizType === 'COMPLEX') {
        quizData.dimensions = dimensions.map((dim, index) => ({
          name: dim.name,
          shortName: dim.shortName,
          order: index + 1,
          minScore: dim.minScore,
          maxScore: dim.maxScore,
          threshold: dim.threshold,
          lowLabel: dim.lowLabel,
          highLabel: dim.highLabel
        }))
        quizData.complexGradingCriteria = complexGradingCriteria.map((cgc) => ({
          name: cgc.name,
          label: cgc.label,
          color: cgc.color,
          recommendations: cgc.recommendations,
          areasOfImprovement: cgc.areasOfImprovement,
          supportNeeded: cgc.supportNeeded,
          proposedCourses: cgc.proposedCourses,
          proposedProducts: cgc.proposedProducts,
          proposedStreaks: cgc.proposedStreaks,
          proposedBlogPosts: cgc.proposedBlogPosts,
          description: cgc.description,
          scoringLogic: cgc.scoringLogic
        }))
      } else {
        quizData.gradingCriteria = gradingCriteria.map((gc) => ({
          name: gc.name,
          minScore: gc.minScore,
          maxScore: gc.maxScore,
          label: gc.label,
          color: gc.color,
          recommendations: gc.recommendations,
          areasOfImprovement: gc.areasOfImprovement,
          supportNeeded: gc.supportNeeded,
          proposedCourses: gc.proposedCourses,
          proposedProducts: gc.proposedProducts,
          proposedStreaks: gc.proposedStreaks,
          proposedBlogPosts: gc.proposedBlogPosts,
          description: gc.description
        }))
      }

      if (isEditing && quiz) {
        const result = await quizAPI.updateQuiz(quiz.id, quizData)
        console.log('Updated quiz:', result)
        toast({
          title: "Success",
          description: "Quiz updated successfully!",
        })
      } else {
        const result = await quizAPI.createQuiz(quizData)
        console.log('Created quiz:', result)
        toast({
          title: "Success",
          description: "Quiz created successfully!",
        })
      }

      // Redirect to quiz management page
      router.push('/management/quizzes')
    } catch (err: unknown) {
      const errorData = err as { message?: string; error?: { message?: string } }
      const errorMessage = errorData?.message || errorData?.error?.message || (err instanceof Error ? err.message : 'Failed to save quiz. Please try again.')
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
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
            <Link href="/management/quizzes">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Quizzes
              </Button>
            </Link>
            <Button type="button" onClick={handleSave} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Saving...' : (isEditing ? 'Update Quiz' : 'Create Quiz')}
            </Button>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {isEditing ? 'Edit Quiz' : 'Create New Quiz'}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? 'Update your quiz details and questions' : 'Build a new assessment quiz for your audience'}
            </p>
          </div>
        </div>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* Basic Information */}
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
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter quiz title"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category.toUpperCase()} onValueChange={(value) => handleInputChange('category', value)}>
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
                <Select value={formData.difficulty.toUpperCase()} onValueChange={(value) => handleInputChange('difficulty', value as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED')}>
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
                <Select value={formData.quizType.toUpperCase()} onValueChange={(value) => handleQuizTypeChange(value)}>
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
                <Select value={formData.redirectAfterAnswer.toUpperCase()} onValueChange={(value) => handleInputChange('redirectAfterAnswer', value)}>
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
                <Label htmlFor="estimatedTime">Estimated Time (minutes)</Label>
                <Input
                  id="estimatedTime"
                  type="text"
                  value={formData.estimatedTime}
                  onChange={(e) => handleInputChange('estimatedTime', e.target.value)}
                  placeholder="4 - 5 minutes"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status.toUpperCase()} onValueChange={(value) => handleInputChange('status', value)}>
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

        {/* Grading Criteria - Conditional based on quiz type */}
        {formData.quizType === 'COMPLEX' ? (
          <>
            {/* Dimensions for Complex Quizzes */}
            <Card>
              <CardHeader>
                <CardTitle>Quiz Dimensions</CardTitle>
                <CardDescription>Define the dimensions for complex quizzes (e.g., MBTI, Enneagram)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dimensions.map((dimension, index) => (
                    <div key={dimension.id} className="p-4 border rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Dimension {index + 1}</h4>
                        <Button
                          type="button"
                          onClick={() => setDimensions(prev => prev.filter(d => d.id !== dimension.id))}
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Name</Label>
                          <Input
                            value={dimension.name}
                            onChange={(e) => setDimensions(prev => prev.map(d => 
                              d.id === dimension.id ? { ...d, name: e.target.value } : d
                            ))}
                            placeholder="e.g., Extraversion/Introversion"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Short Name</Label>
                          <Input
                            value={dimension.shortName}
                            onChange={(e) => setDimensions(prev => prev.map(d => 
                              d.id === dimension.id ? { ...d, shortName: e.target.value } : d
                            ))}
                            placeholder="e.g., E/I"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Min Score</Label>
                          <Input
                            type="number"
                            value={dimension.minScore}
                            onChange={(e) => setDimensions(prev => prev.map(d => 
                              d.id === dimension.id ? { ...d, minScore: parseInt(e.target.value) } : d
                            ))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Max Score</Label>
                          <Input
                            type="number"
                            value={dimension.maxScore}
                            onChange={(e) => setDimensions(prev => prev.map(d => 
                              d.id === dimension.id ? { ...d, maxScore: parseInt(e.target.value) } : d
                            ))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Threshold</Label>
                          <Input
                            type="number"
                            value={dimension.threshold || 0}
                            onChange={(e) => setDimensions(prev => prev.map(d => 
                              d.id === dimension.id ? { ...d, threshold: parseInt(e.target.value) } : d
                            ))}
                            placeholder="Score threshold for binary outcome"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Low Label</Label>
                          <Input
                            value={dimension.lowLabel || ''}
                            onChange={(e) => setDimensions(prev => prev.map(d => 
                              d.id === dimension.id ? { ...d, lowLabel: e.target.value } : d
                            ))}
                            placeholder="e.g., Introversion"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>High Label</Label>
                          <Input
                            value={dimension.highLabel || ''}
                            onChange={(e) => setDimensions(prev => prev.map(d => 
                              d.id === dimension.id ? { ...d, highLabel: e.target.value } : d
                            ))}
                            placeholder="e.g., Extraversion"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button type="button" onClick={() => setDimensions(prev => [...prev, {
                    id: `dim_${Date.now()}`,
                    name: '',
                    shortName: '',
                    order: prev.length,
                    minScore: 0,
                    maxScore: 10,
                    threshold: 5,
                    lowLabel: '',
                    highLabel: ''
                  }])} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Dimension
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Complex Grading Criteria */}
            <Card>
              <CardHeader>
                <CardTitle>Complex Grading Criteria</CardTitle>
                <CardDescription>Define the scoring logic and outcomes for complex quizzes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complexGradingCriteria.map((criterion, index) => (
                    <div key={criterion.id} className="p-4 border rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{criterion.name || `Criteria ${index + 1}`}</h4>
                        <Button
                          type="button"
                          onClick={() => setComplexGradingCriteria(prev => prev.filter(c => c.id !== criterion.id))}
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Name</Label>
                          <Input
                            value={criterion.name}
                            onChange={(e) => setComplexGradingCriteria(prev => prev.map(c => 
                              c.id === criterion.id ? { ...c, name: e.target.value } : c
                            ))}
                            placeholder="e.g., INTJ, Type 4"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Label</Label>
                          <Input
                            value={criterion.label}
                            onChange={(e) => setComplexGradingCriteria(prev => prev.map(c => 
                              c.id === criterion.id ? { ...c, label: e.target.value } : c
                            ))}
                            placeholder="e.g., The Architect"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Color</Label>
                          <Input
                            type="color"
                            value={criterion.color}
                            onChange={(e) => setComplexGradingCriteria(prev => prev.map(c => 
                              c.id === criterion.id ? { ...c, color: e.target.value } : c
                            ))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Scoring Logic Type</Label>
                          <Select 
                            value={criterion.scoringLogic.type} 
                            onValueChange={(value) => setComplexGradingCriteria(prev => prev.map(c => 
                              c.id === criterion.id ? { 
                                ...c, 
                                scoringLogic: { ...c.scoringLogic, type: value as 'threshold' | 'highest' | 'topN' } 
                              } : c
                            ))}
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
                      </div>
                      
                      {/* Use existing GradingCriteriaEditor for recommendations and other fields */}
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
                            setComplexGradingCriteria(prev => prev.map(c => 
                              c.id === criterion.id ? {
                                ...c,
                                recommendations: updated.recommendations,
                                areasOfImprovement: updated.areasOfImprovement || [],
                                supportNeeded: updated.supportNeeded || [],
                                proposedCourses: updated.proposedCourses,
                                proposedProducts: updated.proposedProducts,
                                proposedStreaks: updated.proposedStreaks,
                                proposedBlogPosts: updated.proposedBlogPosts,
                                description: updated.description
                              } : c
                            ))
                          }
                        }}
                        availableCourses={availableCourses}
                        availableProducts={availableProducts}
                        availableStreaks={availableStreaks}
                        availableBlogPosts={availableBlogPosts}
                        isLoadingBlogPosts={isLoadingBlogPosts}

                      />
                    </div>
                  ))}
                  <Button type="button" onClick={() => setComplexGradingCriteria(prev => [...prev, {
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
                  }])} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Complex Criteria
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
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
                availableBlogPosts={availableBlogPosts}
                isLoadingBlogPosts={isLoadingBlogPosts}
              />
            </CardContent>
          </Card>
        )}

        {/* Questions */}
        <Card>
          <CardHeader>
            <div className="flex flex-col items-start w-full gap-2">
              <CardTitle>Questions</CardTitle>
              <CardDescription>Add and edit quiz questions with dynamic options</CardDescription>
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

                {formData.quizType === 'COMPLEX' && (
                  <div className="space-y-2">
                    <Label>Dimension</Label>
                    <Select 
                      value={question.dimensionId || ''} 
                      onValueChange={(value) => updateQuestion(question.id, 'dimensionId', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select dimension (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No dimension</SelectItem>
                        {dimensions.map((dim) => (
                          <SelectItem key={dim.id} value={dim.id}>
                            {dim.name} ({dim.shortName})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Options ({question.options.length})</Label>
                    <Button type="button" onClick={() => addOptionToQuestion(question.id)} variant="outline" size="sm">
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
                        onChange={(e) => updateOption(question.id, option.id, 'value', parseInt(e.target.value))}
                        placeholder="Value"
                        className="w-20"
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