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
          // Editing existing quiz - populate all data
          setFormData({
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

  // Validate only the current step's data
  const validateStepData = (data: QuizFormData, stepNumber: number): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    switch (stepNumber) {
      case 1: // Basic Information
        if (!data.title?.trim()) errors.push('Quiz title is required')
        if (!data.description?.trim()) errors.push('Quiz description is required')
        if (!data.category?.trim()) errors.push('Quiz category is required')
        break
        
      case 2: // Dimensions
        if (data.quizType === 'COMPLEX') {
          if (!data.dimensions || data.dimensions.length === 0) {
            errors.push('At least one dimension is required for complex quizzes')
          } else {
            data.dimensions.forEach((dim, index) => {
              if (!dim.name?.trim()) errors.push(`Dimension ${index + 1} name is required`)
              if (!dim.shortName?.trim()) errors.push(`Dimension ${index + 1} short name is required`)
              if (dim.minScore === undefined || dim.maxScore === undefined) {
                errors.push(`Dimension ${index + 1} must have score range defined`)
              }
              if (dim.threshold === undefined) {
                errors.push(`Dimension ${index + 1} must have threshold defined`)
              }
            })
          }
        }
        break
        
      case 3: // Questions
        if (!data.questions || data.questions.length === 0) {
          errors.push('At least one question is required')
        } else {
          data.questions.forEach((q, index) => {
            if (!q.text?.trim()) errors.push(`Question ${index + 1} text is required`)
            if (!q.options || q.options.length < 2) {
              errors.push(`Question ${index + 1} must have at least 2 options`)
            }
            
            // For complex quizzes, validate dimension assignment
            if (data.quizType === 'COMPLEX') {
              if (!q.dimensionId) {
                errors.push(`Question ${index + 1} must be assigned to a dimension`)
              } else {
                const dimensionExists = data.dimensions.some(d => d.id === q.dimensionId)
                if (!dimensionExists) {
                  errors.push(`Question ${index + 1} references invalid dimension ID`)
                }
              }
            }
          })
        }
        break
        
      case 4: // Grading Criteria
        if (data.quizType === 'COMPLEX') {
          if (!data.complexGradingCriteria || data.complexGradingCriteria.length === 0) {
            errors.push('At least one grading criteria is required for complex quizzes')
          } else {
            data.complexGradingCriteria.forEach((criteria, index) => {
              if (!criteria.name?.trim()) errors.push(`Criteria ${index + 1} name is required`)
              if (!criteria.label?.trim()) errors.push(`Criteria ${index + 1} label is required`)
              if (!criteria.scoringLogic) {
                errors.push(`Criteria ${index + 1} must have scoring logic defined`)
              }
            })
          }
        } else {
          if (!data.gradingCriteria || data.gradingCriteria.length === 0) {
            errors.push('At least one grading criteria is required')
          } else {
            data.gradingCriteria.forEach((criteria, index) => {
              if (!criteria.name?.trim()) errors.push(`Criteria ${index + 1} name is required`)
              if (criteria.minScore === undefined || criteria.maxScore === undefined) {
                errors.push(`Criteria ${index + 1} must have score range defined`)
              }
            })
          }
        }
        break
        
      case 5: // Review
        // No validation needed for review step
        break
    }
    
    return {
      isValid: errors.length === 0,
      errors
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

  // Enhanced save progress with progressive saving
  const saveProgress = async (stepData?: Partial<QuizFormData>) => {
    const dataToSave = stepData ? { ...formData, ...stepData } : formData
    
    // Save current step progress
    const success = await saveStepProgress(currentStep, dataToSave)
    if (success) {
      setHasUnsavedChanges(false)
    }
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
      // Validate data before final save
      const validation = validateStepData(formData, currentStep) // Changed to validateStepData
      if (!validation.isValid) {
        toast({
          title: "Validation Error",
          description: `Please fix the following issues:\n${validation.errors.join('\n')}`,
          variant: "destructive"
        })
        return
      }
      
      setIsLoading(true)
      
      // Prepare final data for backend
      const finalData = {
        ...formData,
        questions: formData.questions.map((q, index) => {
          // Ensure each question has both dimensionId and dimension object
          const questionData = {
            text: q.text,
            order: q.order || index,
            dimensionId: q.dimensionId,
            options: q.options.map((opt, optIndex) => ({
              text: opt.text,
              value: opt.value,
              order: opt.order || optIndex
            })),
            ...(q.dimension && { dimension: q.dimension })
          };
          
          return questionData;
        }),
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
      console.error('Error in final save:', err)
      console.log('Error type:', typeof err)
      console.log('Error structure:', JSON.stringify(err, null, 2))
      
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
              onFinalSave={handleFinalSave}
              isLoading={isLoading}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
} 