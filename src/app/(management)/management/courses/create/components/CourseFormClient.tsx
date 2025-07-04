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
import { generateSlug, createDefaultInstructor, calculateTotalDuration } from "../utils"
import type { CourseFormData, Module, Note, Task, FAQ, Instructor } from "../types"
import { GeneralInfoTab } from "./GeneralInfoTab"
import { ModulesTab } from "./ModulesTab"
import { QuizzesTab } from "./QuizzesTab"
import { NotesTab } from "./NotesTab"
import { TasksTab } from "./TasksTab"
import { SEOTab } from "./SEOTab"
import { QuizBuilderModal } from "./QuizBuilderModal"
import { FAQsTab } from "./FAQsTab"
import { RequirementsTab } from "./RequirementsTab"
import { InstructorTab } from "./InstructorTab"

export function CourseFormClient() {
  const [thumbnail, setThumbnail] = useState<string>("")
  const [modules, setModules] = useState<Module[]>([])
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [requirements, setRequirements] = useState<string[]>([])
  const [instructor, setInstructor] = useState<Instructor>(createDefaultInstructor())
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
      fullDescription: "",
      level: "Beginner",
      duration: "",
      thumbnail: "",
      price: 0,
      sale: false,
      salePrice: 0,
      status: "draft",
      category: "",
      featured: false,
      popular: false,
      certification: false,
      requirements: [],
      instructor: createDefaultInstructor(),
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
      // Calculate derived values
      const totalDuration = calculateTotalDuration(modules)
      
      const courseData = {
        title: data.title,
        slug: generateSlug(data.title),
        description: data.description,
        thumbnail: thumbnail || data.thumbnail,
        price: data.price,
        status: data.status,
        category: data.category,
        instructor: {
          id: instructor.id.toString(),
          name: instructor.name,
          email: "instructor@example.com", // Default email
          avatar: instructor.avatar,
          role: "admin" as const,
          isActive: true,
          createdAt: new Date(),
        },
        duration: parseInt(totalDuration) || 0,
        modules: modules.map((module, index) => ({
          id: module.id.toString(),
          title: module.title,
          description: "",
          order: index + 1,
          courseId: "",
          lessons: module.lessons.map((lesson, lessonIndex) => ({
            id: lesson.id.toString(),
            title: lesson.title,
            content: lesson.content || "",
            videoUrl: lesson.videoUrl,
            duration: parseInt(lesson.duration) || 0,
            order: lessonIndex + 1,
            moduleId: module.id.toString(),
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
        <TabsList className="grid w-full grid-cols-9">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="instructor">Instructor</TabsTrigger>
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
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

            <TabsContent value="instructor" className="space-y-6">
              <InstructorTab
                instructor={instructor}
                onInstructorChange={setInstructor}
              />
            </TabsContent>

            <TabsContent value="modules" className="space-y-6">
              <ModulesTab 
                modules={modules} 
                onModulesChange={setModules}
                quizzes={quizzes}
                notes={notes}
              />
            </TabsContent>

            <TabsContent value="quizzes" className="space-y-6">
              <QuizzesTab
                quizzes={quizzes}
                onQuizzesChange={setQuizzes}
                onQuizSelect={setSelectedQuiz}
                onQuizBuilderOpen={() => setIsQuizBuilderOpen(true)}
              />
            </TabsContent>

            <TabsContent value="requirements" className="space-y-6">
              <RequirementsTab
                requirements={requirements}
                onRequirementsChange={setRequirements}
              />
            </TabsContent>

            <TabsContent value="faqs" className="space-y-6">
              <FAQsTab faqs={faqs} onFAQsChange={setFaqs} />
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