"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { courseSchema } from "@/lib/schemas"
import { storage } from "@/lib/storage"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import type { Quiz } from "@/lib/types"
import { generateSlug } from "../utils"
import type { CourseFormData, Module, Note, Task } from "../types"
import { GeneralInfoTab } from "./GeneralInfoTab"
import { ModulesTab } from "./ModulesTab"
import { QuizzesTab } from "./QuizzesTab"
import { NotesTab } from "./NotesTab"
import { TasksTab } from "./TasksTab"
import { SEOTab } from "./SEOTab"
import { QuizBuilderModal } from "./QuizBuilderModal"

export function CourseFormClient() {
  const [thumbnail, setThumbnail] = useState<string>("")
  const [modules, setModules] = useState<Module[]>([])
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [activeTab, setActiveTab] = useState("general")
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)
  const [isQuizBuilderOpen, setIsQuizBuilderOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      thumbnail: "",
      price: 0,
      status: "draft",
      category: "",
      duration: 0,
      seo: {
        metaTitle: "",
        metaDescription: "",
        altText: "",
        caption: "",
      },
    },
  })

  const handleTitleChange = (title: string) => {
    form.setValue("title", title)
    if (!form.getValues("slug")) {
      form.setValue("slug", generateSlug(title))
    }
  }

  const handleQuizSave = () => {
    if (selectedQuiz) {
      setQuizzes(
        quizzes.map((quiz) => (quiz.id === selectedQuiz.id ? selectedQuiz : quiz))
      )
      setIsQuizBuilderOpen(false)
      toast({
        title: "Success",
        description: "Quiz saved successfully",
      })
    }
  }

  const onSubmit = async (data: CourseFormData) => {
    setIsLoading(true)
    try {
      const courseData = {
        ...data,
        slug: generateSlug(data.title),
        thumbnail,
        instructor: {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          role: "admin" as const,
          createdAt: new Date(),
          isActive: true,
        },
        modules: modules.map((module, index) => ({
          ...module,
          order: index + 1,
          courseId: "",
          lessons: module.lessons.map((lesson, lessonIndex) => ({
            ...lesson,
            order: lessonIndex + 1,
            moduleId: module.id,
          })),
        })),
        quizzes: quizzes.map((quiz) => ({
          ...quiz,
          courseId: "",
        })),
        notes: notes.map((note) => ({
          ...note,
          courseId: "",
        })),
        tasks: tasks.map((task) => ({
          ...task,
          courseId: "",
        })),
        students: [],
        seo: {
          metaTitle: data.seo?.metaTitle || "",
          metaDescription: data.seo?.metaDescription || "",
          altText: data.seo?.altText || "",
          caption: data.seo?.caption || "",
        },
      }

      const savedCourse = storage.createCourse(courseData)

      toast({
        title: "Success",
        description: "Course created successfully",
      })

      router.push(`/management/courses/${savedCourse.id}`)
    } catch (error) {
      console.error("Failed to create course:", error)
      toast({
        title: "Error",
        description: "Failed to create course",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Create Course</h2>
          <p className="text-muted-foreground">Build a comprehensive online course</p>
        </div>
        <Button type="submit" form="course-form" disabled={isLoading}>
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? "Saving..." : "Save Course"}
        </Button>
      </div>

      <QuizBuilderModal
        isOpen={isQuizBuilderOpen}
        selectedQuiz={selectedQuiz}
        onClose={() => setIsQuizBuilderOpen(false)}
        onQuizChange={setSelectedQuiz}
        onSave={handleQuizSave}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form id="course-form" onSubmit={form.handleSubmit(onSubmit)}>
            <TabsContent value="general" className="space-y-6">
              <GeneralInfoTab
                form={form}
                thumbnail={thumbnail}
                onThumbnailChange={setThumbnail}
                onTitleChange={handleTitleChange}
              />
            </TabsContent>

            <TabsContent value="modules" className="space-y-6">
              <ModulesTab modules={modules} onModulesChange={setModules} />
            </TabsContent>

            <TabsContent value="quizzes" className="space-y-6">
              <QuizzesTab
                quizzes={quizzes}
                onQuizzesChange={setQuizzes}
                onQuizSelect={setSelectedQuiz}
                onQuizBuilderOpen={() => setIsQuizBuilderOpen(true)}
              />
            </TabsContent>

            <TabsContent value="notes" className="space-y-6">
              <NotesTab notes={notes} onNotesChange={setNotes} />
            </TabsContent>

            <TabsContent value="tasks" className="space-y-6">
              <TasksTab tasks={tasks} onTasksChange={setTasks} />
            </TabsContent>

            <TabsContent value="seo" className="space-y-6">
              <SEOTab form={form} />
            </TabsContent>
          </form>
        </Form>
      </Tabs>
    </div>
  )
} 