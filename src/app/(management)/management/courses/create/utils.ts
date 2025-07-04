import type { Quiz, QuizSettings } from "@/lib/types"

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export const getDefaultQuizSettings = (): QuizSettings => {
  return {
    passingScore: 70,
    maxAttempts: 3,
    shuffleQuestions: false,
    shuffleAnswers: false,
    showCorrectAnswers: true,
    showScoreImmediately: true,
    allowReview: true,
    requirePassword: false,
    showOneQuestionAtTime: false,
    preventBacktracking: false,
  }
}

export const createDefaultQuiz = (): Quiz => {
  return {
    id: Date.now().toString(),
    title: "",
    description: "",
    instructions: "",
    questions: [],
    settings: getDefaultQuizSettings(),
    courseId: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  }
} 