import { useQuery } from '@tanstack/react-query'
import { getQuizById } from '@/data/quizzes'

export function useQuizDetails(quizId: string) {
  return useQuery({
    queryKey: ['quiz', quizId],
    queryFn: () => getQuizById(quizId),
    enabled: !!quizId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
} 