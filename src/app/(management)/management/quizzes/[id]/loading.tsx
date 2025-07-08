import { DetailPageLoader } from '@/components/ui/loaders'

export default function QuizDetailsLoading() {
  return (
    <DetailPageLoader 
      backHref="/management/quizzes"
      backText="Back to Quizzes"
      actionButtons={
        <>
          <div className="h-9 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-9 w-20 bg-gray-200 rounded animate-pulse"></div>
        </>
      }
    />
  )
} 