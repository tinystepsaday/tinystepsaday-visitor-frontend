import QuizEditClient from '@/components/quiz/QuizEditClient'
import { getAllQuizzes, getQuizById } from '@/data/quizzes'
import { notFound } from 'next/navigation'

interface QuizEditPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const quizzes = await getAllQuizzes()
  return quizzes.map((quiz) => ({ id: quiz.id }))
}

export default async function QuizEditPage({ params }: QuizEditPageProps) {
  const { id } = await params
  const quiz = await getQuizById(id)
  if (!quiz) notFound()
  return <QuizEditClient quiz={quiz} />
} 