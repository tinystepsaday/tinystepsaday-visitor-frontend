import { Metadata } from "next"
import { CourseFormClient } from "./components"

export const metadata: Metadata = {
  title: "Create Course | TinyStepsADay",
  description: "Create a comprehensive online course with modules, lessons, quizzes, and more.",
  openGraph: {
    title: "Create Course | TinyStepsADay",
    description: "Create a comprehensive online course with modules, lessons, quizzes, and more.",
    type: "website",
  },
}

export default function CreateCoursePage() {
  return <CourseFormClient />
}
