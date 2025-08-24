"use client"

import { useState, useEffect } from 'react'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { quizAPI } from '@/integration/quiz'
import { type Quiz } from '@/data/quizzes'
import { DetailPageLoader } from '../ui/loaders'
import { extractBackendErrorMessage } from '@/utils/backendErrorHandler'

// Import step components
import { BasicInformationStep } from './steps/BasicInformationStep'
import { DimensionsStep } from './steps/DimensionsStep'
import { QuestionsStep } from './steps/QuestionsStep'
import { GradingCriteriaStep } from './steps/GradingCriteriaStep'
import { ReviewStep } from './steps/ReviewStep'

// Types
export interface QuizFormData {
  // Step 1: Basic Information
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
  tags: string[]

  // Step 2: Dimensions (for complex quizzes)
  dimensions: Array<{
    id: string
    name: string
    shortName: string
    order: number
    minScore: number
    maxScore: number
    threshold?: number
    lowLabel?: string
    highLabel?: string
  }>

  // Step 3: Questions
  questions: Array<{
    id: string
    text: string
    dimensionId?: string
    order: number
    options: Array<{
      id: string
      text: string
      value: number
      order: number
    }>
  }>

  // Step 4: Grading Criteria
  gradingCriteria: Array<{
    id: string
    name: string
    minScore: number
    maxScore: number
    label: string
    color: string
    recommendations: string[]
    areasOfImprovement?: string[]
    supportNeeded?: string[]
    proposedCourses: Array<{ id: string; name: string; slug: string }>
    proposedProducts: Array<{ id: string; name: string; slug: string }>
    proposedStreaks: Array<{ id: string; name: string; slug: string }>
    proposedBlogPosts: Array<{ id: string; title: string; slug: string }>
    description?: string
  }>

  // Step 4: Complex Grading Criteria (for complex quizzes)
  complexGradingCriteria: Array<{
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
  }>
}

interface QuizEditClientProps {
  quiz?: Quiz
  isEditing?: boolean
}

const STEPS = [
  { id: 1, title: 'Basic Information', description: 'Quiz details and settings' },
  { id: 2, title: 'Dimensions', description: 'Define quiz dimensions (if complex)' },
  { id: 3, title: 'Questions', description: 'Add questions and options' },
  { id: 4, title: 'Grading Criteria', description: 'Set up scoring and outcomes' },
  { id: 5, title: 'Review', description: 'Review and publish' }
]

export default function QuizEditClient({ quiz, isEditing = false }: QuizEditClientProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Form data state
  const [formData, setFormData] = useState<QuizFormData>({
    title: '',
    subtitle: '',
    description: '',
    category: '',
    estimatedTime: '',
    difficulty: 'INTERMEDIATE',
    status: 'DRAFT',
    isPublic: false,
    quizType: 'DEFAULT',
    redirectAfterAnswer: 'HOME',
    tags: [],
    dimensions: [],
    questions: [],
    gradingCriteria: [],
    complexGradingCriteria: []
  })

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      try {
        if (quiz && !isInitialized) {
          // Editing existing quiz - populate all data
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
            redirectAfterAnswer: quiz.redirectAfterAnswer.toUpperCase() as 'HOME' | 'RESULTS',
            tags: quiz.tags,
            dimensions: quiz.dimensions || [],
            questions: quiz.questions.map(q => ({
              id: q.id,
              text: q.text,
              dimensionId: q.dimensionId || undefined,
              order: q.order || 0,
              options: q.options.map(opt => ({
                id: opt.id,
                text: opt.text,
                value: opt.value,
                order: opt.order || 0
              }))
            })),
            gradingCriteria: quiz.gradingCriteria || [],
            complexGradingCriteria: quiz.complexGradingCriteria || []
          })
        } else if (!quiz && !isInitialized) {
          // Creating new quiz - set minimal defaults
          setFormData(prev => ({
            ...prev,
            status: 'DRAFT',
            isPublic: false,
            quizType: 'DEFAULT',
            redirectAfterAnswer: 'HOME'
          }))
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

  // Save progress to backend (draft mode) - only when explicitly called
  const saveProgress = async (stepData?: Partial<QuizFormData>) => {
    try {
      setIsSaving(true)
      const dataToSave = stepData ? { ...formData, ...stepData } : formData
      
      // Prepare data for backend - ensure all required fields are present
      const backendData = {
        ...dataToSave,
        // Ensure questions have proper structure
        questions: dataToSave.questions.map((q, index) => ({
          text: q.text,
          order: q.order || index,
          dimensionId: q.dimensionId,
          options: q.options.map((opt, optIndex) => ({
            text: opt.text,
            value: opt.value,
            order: opt.order || optIndex
          }))
        })),
        // Ensure dimensions have proper structure for complex quizzes
        ...(dataToSave.quizType === 'COMPLEX' && {
          dimensions: dataToSave.dimensions.map((dim, index) => ({
            name: dim.name,
            shortName: dim.shortName,
            order: dim.order || index,
            minScore: dim.minScore,
            maxScore: dim.maxScore,
            threshold: dim.threshold,
            lowLabel: dim.lowLabel,
            highLabel: dim.highLabel
          }))
        }),
        // Ensure grading criteria have proper structure
        ...(dataToSave.quizType === 'COMPLEX' ? {
          complexGradingCriteria: dataToSave.complexGradingCriteria.map((criteria) => ({
            name: criteria.name,
            label: criteria.label,
            color: criteria.color,
            recommendations: criteria.recommendations,
            areasOfImprovement: criteria.areasOfImprovement,
            supportNeeded: criteria.supportNeeded,
            proposedCourses: criteria.proposedCourses,
            proposedProducts: criteria.proposedProducts,
            proposedStreaks: criteria.proposedStreaks,
            proposedBlogPosts: criteria.proposedBlogPosts,
            description: criteria.description,
            scoringLogic: criteria.scoringLogic
          }))
        } : {
          gradingCriteria: dataToSave.gradingCriteria.map((criteria) => ({
            name: criteria.name,
            minScore: criteria.minScore,
            maxScore: criteria.maxScore,
            label: criteria.label,
            color: criteria.color,
            recommendations: criteria.recommendations,
            areasOfImprovement: criteria.areasOfImprovement || [],
            supportNeeded: criteria.supportNeeded || [],
            proposedCourses: criteria.proposedCourses,
            proposedProducts: criteria.proposedProducts,
            proposedStreaks: criteria.proposedStreaks,
            proposedBlogPosts: criteria.proposedBlogPosts,
            description: criteria.description
          }))
        })
      }
      
      if (isEditing && quiz) {
        // Update existing quiz
        await quizAPI.updateQuiz(quiz.id, backendData)
      } else {
        // Create new quiz as draft
        const result = await quizAPI.createQuiz({
          ...backendData,
          status: 'DRAFT' // Always save as draft during configuration
        })
        
        // Redirect to edit mode with the new quiz ID
        if (result.id) {
          router.push(`/management/quizzes/${result.id}/edit`)
        }
      }
      
      setHasUnsavedChanges(false)
      toast({
        title: "Progress Saved",
        description: "Your quiz configuration has been saved.",
      })
    } catch (err) {
      console.error('Error saving progress:', err)
      
      // Extract error message from backend response
      const errorMessage = extractBackendErrorMessage(err, 'Failed to save progress. Please try again.')
      
      toast({
        title: "Save Error",
        description: errorMessage,
        variant: "destructive"
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Handle step data updates - NO automatic backend calls
  const updateStepData = (stepData: Partial<QuizFormData>) => {
    const newFormData = { ...formData, ...stepData }
    setFormData(newFormData)
    setHasUnsavedChanges(true)
    
    // NO auto-save - only mark as having unsaved changes
  }

  // Navigation functions
  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (step: number) => {
    if (step >= 1 && step <= STEPS.length) {
      setCurrentStep(step)
    }
  }

  // Final save and publish
  const handleFinalSave = async () => {
    try {
      setIsLoading(true)
      
      // Prepare final data for backend
      const finalData = {
        ...formData,
        questions: formData.questions.map((q, index) => ({
          text: q.text,
          order: q.order || index,
          dimensionId: q.dimensionId,
          options: q.options.map((opt, optIndex) => ({
            text: opt.text,
            value: opt.value,
            order: opt.order || optIndex
          }))
        })),
        ...(formData.quizType === 'COMPLEX' && {
          dimensions: formData.dimensions.map((dim, index) => ({
            name: dim.name,
            shortName: dim.shortName,
            order: dim.order || index,
            minScore: dim.minScore,
            maxScore: dim.maxScore,
            threshold: dim.threshold,
            lowLabel: dim.lowLabel,
            highLabel: dim.highLabel
          }))
        }),
        ...(formData.quizType === 'COMPLEX' ? {
          complexGradingCriteria: formData.complexGradingCriteria.map((criteria) => ({
            name: criteria.name,
            label: criteria.label,
            color: criteria.color,
            recommendations: criteria.recommendations,
            areasOfImprovement: criteria.areasOfImprovement,
            supportNeeded: criteria.supportNeeded,
            proposedCourses: criteria.proposedCourses,
            proposedProducts: criteria.proposedProducts,
            proposedStreaks: criteria.proposedStreaks,
            proposedBlogPosts: criteria.proposedBlogPosts,
            description: criteria.description,
            scoringLogic: criteria.scoringLogic
          }))
        } : {
          gradingCriteria: formData.gradingCriteria.map((criteria) => ({
            name: criteria.name,
            minScore: criteria.minScore,
            maxScore: criteria.maxScore,
            label: criteria.label,
            color: criteria.color,
            recommendations: criteria.recommendations,
            areasOfImprovement: criteria.areasOfImprovement,
            supportNeeded: criteria.supportNeeded,
            proposedCourses: criteria.proposedCourses,
            proposedProducts: criteria.proposedProducts,
            proposedStreaks: criteria.proposedStreaks,
            proposedBlogPosts: criteria.proposedBlogPosts,
            description: criteria.description
          }))
        })
      }
      
      if (isEditing && quiz) {
        await quizAPI.updateQuiz(quiz.id, finalData)
        toast({
          title: "Success",
          description: "Quiz updated successfully!",
        })
      } else {
        await quizAPI.createQuiz(finalData)
        toast({
          title: "Success",
          description: "Quiz created successfully!",
        })
      }

      // Redirect to quiz management page
      router.push('/management/quizzes')
    } catch (err: unknown) {
      // Extract error message from backend response
      const errorMessage = extractBackendErrorMessage(err, 'Failed to save quiz. Please try again.')
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Check if step is completed
  const isStepCompleted = (step: number): boolean => {
    switch (step) {
      case 1: // Basic Information
        return !!(formData.title && formData.description && formData.category)
      case 2: // Dimensions
        return formData.quizType !== 'COMPLEX' || formData.dimensions.length > 0
      case 3: // Questions
        return formData.questions.length > 0 && formData.questions.every(q => q.text && q.options.length >= 2)
      case 4: // Grading Criteria
        if (formData.quizType === 'COMPLEX') {
          return formData.complexGradingCriteria.length > 0
        } else {
          return formData.gradingCriteria.length > 0
        }
      case 5: // Review
        return true
      default:
        return false
    }
  }

  // Check if step is accessible
  const isStepAccessible = (step: number): boolean => {
    if (step === 1) return true
    
    // Check if previous steps are completed
    for (let i = 1; i < step; i++) {
      if (!isStepCompleted(i)) return false
    }
    return true
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
            <div className="flex items-center gap-2">
              <Button 
                type="button" 
                onClick={() => saveProgress()} 
                disabled={isSaving || !hasUnsavedChanges}
                variant="outline"
              >
                {isSaving ? 'Saving...' : 'Save Progress'}
              </Button>
              {currentStep === STEPS.length && (
                <Button 
                  type="button" 
                  onClick={handleFinalSave} 
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : (isEditing ? 'Update Quiz' : 'Create Quiz')}
                </Button>
              )}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {isEditing ? 'Edit Quiz' : 'Create New Quiz'}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? 'Update your quiz configuration' : 'Build a new assessment quiz step by step'}
            </p>
            {hasUnsavedChanges && (
              <p className="text-sm text-amber-600 mt-2">
                ⚠ You have unsaved changes. Click &quot;Save Progress&quot; to save your work.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Configuration Progress</h3>
              <span className="text-sm text-muted-foreground">
                Step {currentStep} of {STEPS.length}
              </span>
            </div>
            
            <Progress value={(currentStep / STEPS.length) * 100} className="w-full" />
            
            <div className="flex items-center justify-between">
              {STEPS.map((step) => {
                const isCompleted = isStepCompleted(step.id)
                const isAccessible = isStepAccessible(step.id)
                const isCurrent = currentStep === step.id
                
                return (
                  <div key={step.id} className="flex flex-col items-center space-y-2">
                    <button
                      onClick={() => isAccessible && goToStep(step.id)}
                      disabled={!isAccessible}
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                        isCompleted 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : isCurrent 
                            ? 'bg-primary border-primary text-white'
                            : isAccessible
                              ? 'border-gray-300 hover:border-primary cursor-pointer'
                              : 'border-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <span className="text-sm font-medium">{step.id}</span>
                      )}
                    </button>
                    <div className="text-center">
                      <p className={`text-xs font-medium ${
                        isCurrent ? 'text-primary' : 'text-muted-foreground'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-muted-foreground hidden md:block">
                        {step.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{STEPS[currentStep - 1].title}</CardTitle>
          <CardDescription>{STEPS[currentStep - 1].description}</CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && (
            <BasicInformationStep
              data={formData}
              onUpdate={updateStepData}
              onNext={nextStep}
            />
          )}
          
          {currentStep === 2 && (
            <DimensionsStep
              data={formData}
              onUpdate={updateStepData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          
          {currentStep === 3 && (
            <QuestionsStep
              data={formData}
              onUpdate={updateStepData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          
          {currentStep === 4 && (
            <GradingCriteriaStep
              data={formData}
              onUpdate={updateStepData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          
          {currentStep === 5 && (
            <ReviewStep
              data={formData}
              onUpdate={updateStepData}
              onPrev={prevStep}
              onFinalSave={handleFinalSave}
              isLoading={isLoading}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
} 