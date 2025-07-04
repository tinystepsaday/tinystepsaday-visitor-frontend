import type { Quiz, QuizSettings } from "@/lib/types"
import type { Instructor, FAQ, Module, Lesson } from "./types"

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

export const createDefaultInstructor = (): Instructor => {
  return {
    id: Date.now(),
    name: "",
    title: "",
    bio: "",
    avatar: "",
    rating: 0,
    students: 0,
    courses: 0,
  }
}

export const createDefaultModule = (): Module => {
  return {
    id: Date.now(),
    title: "",
    lessons: [],
  }
}

export const createDefaultLesson = (): Lesson => {
  return {
    id: Date.now(),
    title: "",
    type: "video",
    duration: "00:00",
    content: "",
  }
}

export const createDefaultFAQ = (): FAQ => {
  return {
    id: Date.now(),
    question: "",
    answer: "",
  }
}

export const calculateTotalDuration = (modules: Module[]): string => {
  const totalMinutes = modules.reduce((total, module) => {
    return total + module.lessons.reduce((moduleTotal, lesson) => {
      const duration = lesson.duration
      if (duration === "N/A") return moduleTotal
      
      // Parse duration in format "MM:SS" or "HH:MM:SS"
      const parts = duration.split(":")
      if (parts.length === 2) {
        return moduleTotal + parseInt(parts[0]) + (parseInt(parts[1]) / 60)
      } else if (parts.length === 3) {
        return moduleTotal + (parseInt(parts[0]) * 60) + parseInt(parts[1]) + (parseInt(parts[2]) / 60)
      }
      return moduleTotal
    }, 0)
  }, 0)

  const hours = Math.floor(totalMinutes / 60)
  const minutes = Math.round(totalMinutes % 60)
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m`
}

export const calculateTotalLessons = (modules: Module[]): number => {
  return modules.reduce((total, module) => total + module.lessons.length, 0)
} 