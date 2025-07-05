import QuizDetailsWithQuery from '@/components/quiz/QuizDetailsWithQuery'

interface QuizDetailsPageProps {
  params: Promise<{ id: string }>
}

export default async function QuizDetailsPageWithQuery({ params }: QuizDetailsPageProps) {
  const { id } = await params
  return <QuizDetailsWithQuery quizId={id} />
} 