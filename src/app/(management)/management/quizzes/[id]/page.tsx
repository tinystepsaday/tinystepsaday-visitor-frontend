import { notFound } from 'next/navigation'
import { getAllQuizzes, getQuizById } from '@/data/quizzes'
import QuizDetailsClientManagement from '@/components/quiz/QuizDetailsClientManagement'

interface QuizDetailsPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const quizzes = await getAllQuizzes()
  return quizzes.map((quiz) => ({ id: quiz.id }))
}

export default async function QuizDetailsPage({ params }: QuizDetailsPageProps) {
  const { id } = await params
  
  try {
    const quiz = await getQuizById(id)
    
    if (!quiz) {
      notFound()
    }

    return <QuizDetailsClientManagement quiz={quiz} />
  } catch (error) {
    console.error('Error fetching quiz:', error)
    notFound()
  }
}
