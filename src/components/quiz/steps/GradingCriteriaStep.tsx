"use client"

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { type QuizFormData } from '../QuizEditClient'
import { GradingCriteriaEditor } from '../GradingCriteriaEditor'
import { ComplexGradingCriteriaEditor } from '../ComplexGradingCriteriaEditor'
import { usePublicBlogPosts } from '@/integration/blog'

interface GradingCriteriaStepProps {
  data: QuizFormData
  onUpdate: (data: Partial<QuizFormData>) => void
  onNext: () => void
  onPrev: () => void
}

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

export function GradingCriteriaStep({ data, onUpdate, onNext, onPrev }: GradingCriteriaStepProps) {
  // Fetch real blog posts from the API
  const { data: blogPostsData, isLoading: isLoadingBlogPosts } = usePublicBlogPosts({
    limit: 100,
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



  const canProceed = () => {
    if (data.quizType === 'COMPLEX') {
      return data.complexGradingCriteria.length > 0 && 
             data.complexGradingCriteria.every(c => 
               c.name && c.label && c.scoringLogic.type
             )
    } else {
      return data.gradingCriteria.length > 0
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="text-center py-4">
          <h3 className="text-lg font-medium mb-2">Configure Grading Criteria</h3>
          <p className="text-muted-foreground">
            Set up how your quiz will be scored and what outcomes users will receive.
            {data.quizType === 'COMPLEX' && ' For complex quizzes, define scoring logic for each outcome type.'}
          </p>
        </div>

        {data.quizType === 'COMPLEX' ? (
          // Complex Quiz Grading Criteria - Use dedicated component
          <ComplexGradingCriteriaEditor
            criteria={data.complexGradingCriteria}
            onChange={(updatedCriteria) => onUpdate({ complexGradingCriteria: updatedCriteria })}
            dimensions={data.dimensions}
            availableCourses={availableCourses}
            availableProducts={availableProducts}
            availableStreaks={availableStreaks}
            availableBlogPosts={availableBlogPosts}
          />
        ) : (
          // Simple Quiz Grading Criteria
          <div>
            <GradingCriteriaEditor
              criteria={data.gradingCriteria}
              onChange={(updatedCriteria) => onUpdate({ gradingCriteria: updatedCriteria })}
              availableCourses={availableCourses}
              availableProducts={availableProducts}
              availableStreaks={availableStreaks}
              availableBlogPosts={availableBlogPosts}
              isLoadingBlogPosts={isLoadingBlogPosts}
            />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between cursor-pointer">
        <Button variant="outline" onClick={onPrev}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button onClick={onNext} disabled={!canProceed()} className="cursor-pointer">
          Next: Review
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
