"use client"

import { useState, useEffect } from 'react'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { quizAPI } from '@/integration/quiz'
import { type Quiz } from '@/data/quizzes'
import { type CreateQuizBasicData } from '@/integration/quiz'
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
  coverImage?: string
  category: string
  estimatedTime: string
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
  status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED'
  isPublic: boolean
  quizType: 'DEFAULT' | 'COMPLEX' | 'ONBOARDING'
  redirectAfterAnswer: 'HOME' | 'RESULTS'
  tags: string[]
  id?: string // Added for progressive saving

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
    dimension?: {
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
    image?: string
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
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Form data state
  const [formData, setFormData] = useState<QuizFormData>({
    title: '',
    subtitle: '',
    description: '',
    coverImage: '',
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
          // Editing existing quiz - populate all data and set the quiz ID
          setFormData({
            id: quiz.id, // Set the quiz ID for editing mode
            title: quiz.title,
            subtitle: quiz.subtitle,
            description: quiz.description,
            coverImage: quiz.coverImage,
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
          // Creating new quiz - set minimal defaults and ensure no ID
          setFormData(prev => ({
            ...prev,
            id: undefined, // Ensure no ID for new quiz
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

  // Progressive save - save each step as we go
  const saveStepProgress = async (stepNumber: number, updatedData: Partial<QuizFormData>): Promise<boolean> => {
    setIsSaving(true)

    try {
      if (stepNumber === 1 && !formData.id) {
        // Create new quiz with basic information
        await createNewQuiz(updatedData);
      } else if (formData.id) {
        // Progressive step updates for existing quiz
        await updateExistingQuiz(stepNumber, updatedData);
      } else {
        throw new Error('Cannot save progress: Quiz not created yet');
      }

      setHasUnsavedChanges(false)
      return true

    } catch (err) {
      console.error('Error saving step progress:', err)
      const errorMessage = extractBackendErrorMessage(err, 'Failed to save progress. Please try again.')

      toast({
        title: "Save Error",
        description: errorMessage,
        variant: "destructive"
      })
      return false
    } finally {
      setIsSaving(false)
    }
  }

  // Separate function for creating new quiz
  const createNewQuiz = async (updatedData: Partial<QuizFormData>): Promise<void> => {
    if (!updatedData.title || !updatedData.description || !updatedData.category || !updatedData.quizType) {
      throw new Error('Missing required fields: title, description, category, and quizType are required');
    }

    const basicData: CreateQuizBasicData = {
      title: updatedData.title,
      subtitle: updatedData.subtitle || '',
      description: updatedData.description,
      coverImage: updatedData.coverImage || '',
      quizType: updatedData.quizType,
      redirectAfterAnswer: updatedData.redirectAfterAnswer || 'HOME',
      category: updatedData.category,
      estimatedTime: updatedData.estimatedTime || '0',
      difficulty: updatedData.difficulty || 'BEGINNER',
      status: 'DRAFT',
      isPublic: updatedData.isPublic || false,
      tags: updatedData.tags || []
    }

    const result = await quizAPI.createQuizBasic(basicData);

    // Update form data with the new quiz ID
    if (result && result.id) {
      setFormData(prev => ({ ...prev, id: result.id }));
    } else {
      throw new Error('Failed to create quiz: No ID returned');
    }

    toast({
      title: "Quiz Created",
      description: "Basic quiz information saved. Continue to next step.",
    })
  }

  // Separate function for updating existing quiz
  const updateExistingQuiz = async (stepNumber: number, updatedData: Partial<QuizFormData>): Promise<void> => {
    if (!formData.id) {
      throw new Error('Quiz ID is required for progressive updates');
    }

    switch (stepNumber) {
      case 1: // Basic Information
        if (updatedData.title || updatedData.description || updatedData.category || updatedData.quizType) {
          const basicData: CreateQuizBasicData = {
            title: updatedData.title || formData.title,
            subtitle: updatedData.subtitle || formData.subtitle,
            description: updatedData.description || formData.description,
            coverImage: updatedData.coverImage || formData.coverImage,
            quizType: updatedData.quizType || formData.quizType,
            redirectAfterAnswer: updatedData.redirectAfterAnswer || formData.redirectAfterAnswer,
            category: updatedData.category || formData.category,
            estimatedTime: updatedData.estimatedTime || formData.estimatedTime,
            difficulty: updatedData.difficulty || formData.difficulty,
            status: updatedData.status || formData.status,
            isPublic: updatedData.isPublic !== undefined ? updatedData.isPublic : formData.isPublic,
            tags: updatedData.tags || formData.tags
          }

          await quizAPI.updateQuizBasic(basicData, formData.id);
          toast({
            title: "Progress Saved",
            description: "Basic quiz information updated successfully.",
          })
        }
        break

      case 2: // Dimensions
        if (updatedData.quizType === 'COMPLEX' && updatedData.dimensions) {
          await quizAPI.addQuizDimensions(formData.id, updatedData.dimensions)
          toast({
            title: "Progress Saved",
            description: "Dimensions added successfully.",
          })
        }
        break

      case 3: // Questions
        if (updatedData.questions) {
          // Ensure questions have proper dimension assignment with both dimensionId and dimension object
          const questionsWithDimensions = updatedData.questions.map(question => {
            const dimension = formData.dimensions.find(d => d.id === question.dimensionId);
            return {
              ...question,
              dimension: dimension ? {
                id: dimension.id,
                name: dimension.name,
                shortName: dimension.shortName,
                order: dimension.order,
                minScore: dimension.minScore,
                maxScore: dimension.maxScore,
                threshold: dimension.threshold,
                lowLabel: dimension.lowLabel,
                highLabel: dimension.highLabel
              } : undefined
            };
          });

          await quizAPI.addQuizQuestions(formData.id, questionsWithDimensions)
          toast({
            title: "Progress Saved",
            description: "Questions added successfully.",
          })
        }
        break

      case 4: // Grading Criteria
        if (updatedData.quizType === 'COMPLEX' && updatedData.complexGradingCriteria) {
          await quizAPI.addQuizGradingCriteria(formData.id, {
            complexGradingCriteria: updatedData.complexGradingCriteria
          })
        } else if (updatedData.gradingCriteria) {
          await quizAPI.addQuizGradingCriteria(formData.id, {
            gradingCriteria: updatedData.gradingCriteria
          })
        }
        toast({
          title: "Progress Saved",
          description: "Grading criteria added successfully.",
        })
        break

      default:
        // Fallback to regular update
        await quizAPI.updateQuiz(formData.id, updatedData)
        toast({
          title: "Progress Saved",
          description: "Step completed and saved successfully.",
        })
    }
  }

  // Handle step data updates with progressive saving
  const updateStepData = async (stepData: Partial<QuizFormData>, stepNumber: number) => {
    // Update local form data
    const newFormData = { ...formData, ...stepData }
    setFormData(newFormData)
    setHasUnsavedChanges(true)

    // For complex quizzes, handle dimension assignment in questions step
    if (stepNumber === 3 && newFormData.quizType === 'COMPLEX' && stepData.questions) {
      const updatedQuestions = stepData.questions.map((question, index) => {
        // If no dimensionId is set, assign based on question order and available dimensions
        if (!question.dimensionId && newFormData.dimensions.length > 0) {
          const dimensionIndex = Math.floor(index / Math.ceil((stepData.questions?.length || 0) / newFormData.dimensions.length))
          const assignedDimension = newFormData.dimensions[dimensionIndex]
          if (assignedDimension) {
            return {
              ...question,
              dimensionId: assignedDimension.id,
              dimension: {
                id: assignedDimension.id,
                name: assignedDimension.name,
                shortName: assignedDimension.shortName,
                order: assignedDimension.order,
                minScore: assignedDimension.minScore,
                maxScore: assignedDimension.maxScore,
                threshold: assignedDimension.threshold,
                lowLabel: assignedDimension.lowLabel,
                highLabel: assignedDimension.highLabel
              },
              order: question.order || index
            }
          }
        }

        // If dimensionId exists, ensure dimension object is also set
        if (question.dimensionId) {
          const dimension = newFormData.dimensions.find(d => d.id === question.dimensionId);
          if (dimension) {
            return {
              ...question,
              dimension: {
                id: dimension.id,
                name: dimension.name,
                shortName: dimension.shortName,
                order: dimension.order,
                minScore: dimension.minScore,
                maxScore: dimension.maxScore,
                threshold: dimension.threshold,
                lowLabel: dimension.lowLabel,
                highLabel: dimension.highLabel
              },
              order: question.order || index
            }
          }
        }

        return {
          ...question,
          order: question.order || index
        }
      })

      // Update form data with properly assigned dimensions
      setFormData(prev => ({
        ...prev,
        questions: updatedQuestions
      }))
    }
  }

  // Wrapper functions for step components that expect the old interface
  const updateStepDataWrapper = (stepData: Partial<QuizFormData>) => {
    updateStepData(stepData, currentStep)
  }

  // Enhanced save progress with progressive saving - only save current step
  const saveProgress = async (stepData?: Partial<QuizFormData>) => {
    const dataToSave = stepData ? { ...formData, ...stepData } : formData

    // Save current step progress only
    const success = await saveStepProgress(currentStep, dataToSave)
    if (success) {
      setHasUnsavedChanges(false)
      toast({
        title: "Progress Saved",
        description: `Step ${currentStep} (${STEPS[currentStep - 1].title}) saved successfully.`,
      })
    }
  }

  // Navigation functions
  const nextStep = async () => {
    if (currentStep < STEPS.length) {
      // Validate and save progress before moving to next step
      const canProceed = await validateAndSaveStep(currentStep);
      if (canProceed) {
        setCurrentStep(currentStep + 1);
      }
    }
  }

  // Validate and save current step before proceeding
  const validateAndSaveStep = async (stepNumber: number): Promise<boolean> => {
    try {
      // For step 1, ensure basic information is saved
      if (stepNumber === 1) {
        if (!formData.title || !formData.description || !formData.category || !formData.quizType) {
          toast({
            title: "Missing Required Information",
            description: "Please fill in all required fields (title, description, category, and quiz type) before proceeding.",
            variant: "destructive"
          });
          return false;
        }

        // Save basic information if not already saved
        if (!formData.id) {
          await saveStepProgress(1, formData);
        } else {
          // Update existing quiz basic info
          await saveStepProgress(1, formData);
        }
      }

      // For other steps, ensure quiz ID exists
      if (stepNumber > 1 && !formData.id) {
        toast({
          title: "Quiz Not Created",
          description: "Please complete and save the basic information first before proceeding to the next step.",
          variant: "destructive"
        });
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error validating step:', error);
      toast({
        title: "Validation Error",
        description: "Failed to validate step. Please try again.",
        variant: "destructive"
      });
      return false;
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

  // Final save and publish - no longer needed with progressive saving
  // const handleFinalSave = async () => { ... }

  // Check if step is completed
  const isStepCompleted = (step: number): boolean => {
    switch (step) {
      case 1: // Basic Information
        return !!(formData.title && formData.description && formData.category)
      case 2: // Dimensions
        if (formData.quizType !== 'COMPLEX') return true
        return formData.dimensions.length > 0 &&
          formData.dimensions.every(d =>
            d.name && d.shortName &&
            d.minScore !== undefined && d.maxScore !== undefined &&
            d.threshold !== undefined
          )
      case 3: // Questions
        if (formData.questions.length === 0) return false
        if (!formData.questions.every(q => q.text && q.options.length >= 2)) return false

        // For complex quizzes, ensure all questions are assigned to valid dimensions
        if (formData.quizType === 'COMPLEX') {
          const validDimensionIds = formData.dimensions.map(d => d.id)
          return formData.questions.every(q =>
            q.dimensionId && validDimensionIds.includes(q.dimensionId)
          )
        }
        return true
      case 4: // Grading Criteria
        if (formData.quizType === 'COMPLEX') {
          return formData.complexGradingCriteria.length > 0 &&
            formData.complexGradingCriteria.every(c =>
              c.name && c.label && c.scoringLogic
            )
        } else {
          return formData.gradingCriteria.length > 0 &&
            formData.gradingCriteria.every(c =>
              c.name && c.minScore !== undefined && c.maxScore !== undefined
            )
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

    // For progressive creation, allow access to next step if current step is completed
    if (step === currentStep + 1) {
      return isStepCompleted(currentStep)
    }

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
            <Link href={`/management/quizzes/${formData.id}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Quiz
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                onClick={() => saveProgress()}
                disabled={isSaving || !hasUnsavedChanges}
                variant="outline"
                className="cursor-pointer"
              >
                {isSaving ? 'Saving...' : `Save Progress - Step ${currentStep}`}
              </Button>
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between w-full">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  {isEditing ? 'Edit Quiz' : 'Create New Quiz'}
                </h1>
                <p className="text-muted-foreground">
                  {isEditing ? 'Update your quiz configuration' : 'Build a new assessment quiz step by step'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {formData.id ? (
                  <div className="flex items-center gap-2 text-sm flex-wrap text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <CheckCircle className="h-4 w-4" />
                    <div className='flex flex-col md:flex-row gap-1'>
                      <span className="font-medium">Quiz Created/Updated</span>
                      <span className="text-xs text-green-500">ID: {formData.id}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm flex-wrap text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                    <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                    <span className="font-medium">Draft Mode</span>
                  </div>
                )}
              </div>
            </div>
            {hasUnsavedChanges && (
              <p className="text-sm text-amber-600 mt-2">
                ⚠ You have unsaved changes in Step {currentStep} ({STEPS[currentStep - 1].title}). Click &quot;Save Progress&quot; to save your work.
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
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${isCompleted
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
                      <p className={`text-xs font-medium ${isCurrent ? 'text-primary' : 'text-muted-foreground'
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
              onUpdate={updateStepDataWrapper}
              onNext={nextStep}
            />
          )}

          {currentStep === 2 && (
            <DimensionsStep
              data={formData}
              onUpdate={updateStepDataWrapper}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}

          {currentStep === 3 && (
            <QuestionsStep
              data={formData}
              onUpdate={updateStepDataWrapper}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}

          {currentStep === 4 && (
            <GradingCriteriaStep
              data={formData}
              onUpdate={updateStepDataWrapper}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}

          {currentStep === 5 && (
            <ReviewStep
              data={formData}
              onUpdate={updateStepDataWrapper}
              onPrev={prevStep}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
} 