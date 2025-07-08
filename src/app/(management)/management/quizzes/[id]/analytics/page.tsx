import { notFound } from 'next/navigation'
import { getQuizById, getQuizResultsByQuizId, getAllQuizzes, getQuizAnalytics } from '@/data/quizzes'
import QuizAnalyticsClient from '@/components/quiz/QuizAnalyticsClient'

interface QuizAnalyticsPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const quizzes = await getAllQuizzes()
  return quizzes.map((quiz) => ({ id: quiz.id }))
}

export default async function QuizAnalyticsPage({ params }: QuizAnalyticsPageProps) {
  const { id } = await params
  const quiz = await getQuizById(id)
  if (!quiz) notFound()
  const analytics = await getQuizAnalytics(id)
  const recentResults = (await getQuizResultsByQuizId(id)).slice(0, 10)

  return <QuizAnalyticsClient quiz={quiz} analytics={analytics} recentResults={recentResults} />
}
