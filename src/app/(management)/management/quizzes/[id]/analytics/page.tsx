import { notFound } from 'next/navigation'
import { getQuizById, getAllQuizzes } from '@/data/quizzes'
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

  return <QuizAnalyticsClient quizId={id} />
}
