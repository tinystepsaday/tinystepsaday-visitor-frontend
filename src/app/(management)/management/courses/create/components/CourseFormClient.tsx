"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { courseSchema } from "@/lib/schemas"
import { storage } from "@/lib/storage"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import type { Quiz, Course } from "@/lib/types"
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

interface CourseFormClientProps {
  mode?: "create" | "edit"
  initialCourse?: Course
  onSave?: (course: Course) => void
}

export function CourseFormClient({ mode = "create", initialCourse, onSave }: CourseFormClientProps) {
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

  // Initialize form with existing course data if in edit mode
  useEffect(() => {
    if (mode === "edit" && initialCourse) {
      setThumbnail(initialCourse.thumbnail || "")
      setModules(initialCourse.modules.map(module => ({
        id: parseInt(module.id),
        title: module.title,
        lessons: module.lessons.map(lesson => ({
          id: parseInt(lesson.id),
          title: lesson.title,
          type: "video" as const, // Default to video since type is not in lib/types
          duration: lesson.duration.toString(),
          content: lesson.content,
          videoUrl: lesson.videoUrl,
        }))
      })))
      setQuizzes(initialCourse.quizzes)
      setNotes(initialCourse.notes.map(note => ({
        id: note.id,
        title: note.title,
        content: note.content,
        moduleId: note.moduleId,
        lessonId: note.lessonId,
      })))
      setTasks(initialCourse.tasks.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        instructions: task.instructions,
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        moduleId: task.moduleId,
      })))
      setFaqs([]) // FAQs not in lib/types Course interface
      setRequirements([]) // Requirements not in lib/types Course interface
      setInstructor({
        id: parseInt(initialCourse.instructor.id),
        name: initialCourse.instructor.name,
        title: "Instructor", // Default title since not in User interface
        bio: "", // Default bio since not in User interface
        avatar: initialCourse.instructor.avatar || "",
        rating: 0, // Default rating since not in User interface
        students: 0, // Default students since not in User interface
        courses: 0, // Default courses since not in User interface
      })

      form.reset({
        title: initialCourse.title,
        slug: initialCourse.slug,
        description: initialCourse.description,
        fullDescription: "", // Not in lib/types Course interface
        level: "Beginner" as const, // Default level since not in lib/types Course interface
        duration: initialCourse.duration.toString(),
        thumbnail: initialCourse.thumbnail || "",
        price: initialCourse.price,
        sale: false, // Default sale since not in lib/types Course interface
        salePrice: 0, // Default salePrice since not in lib/types Course interface
        status: initialCourse.status,
        category: initialCourse.category,
        featured: false, // Default featured since not in lib/types Course interface
        popular: false, // Default popular since not in lib/types Course interface
        certification: false, // Default certification since not in lib/types Course interface
        requirements: [], // Default requirements since not in lib/types Course interface
        instructor: {
          id: parseInt(initialCourse.instructor.id),
          name: initialCourse.instructor.name,
          title: "Instructor", // Default title since not in User interface
          bio: "", // Default bio since not in User interface
          avatar: initialCourse.instructor.avatar || "",
          rating: 0, // Default rating since not in User interface
          students: 0, // Default students since not in User interface
          courses: 0, // Default courses since not in User interface
        },
        seo: {
          metaTitle: initialCourse.seo?.metaTitle || "",
          metaDescription: initialCourse.seo?.metaDescription || "",
          altText: initialCourse.seo?.altText || "",
          caption: initialCourse.seo?.caption || "",
        },
      })
    }
  }, [mode, initialCourse, form])

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
      toast("Quiz saved successfully")
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
          totalLogins: 0, // Add missing required field
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
        students: mode === "edit" && initialCourse ? initialCourse.students : [],
        seo: {
          metaTitle: data.seo?.metaTitle || "",
          metaDescription: data.seo?.metaDescription || "",
          altText: data.seo?.altText || "",
          caption: data.seo?.caption || "",
        },
      }

      if (mode === "edit" && onSave) {
        // Update existing course
        const updatedCourse = {
          ...initialCourse,
          ...courseData,
          id: initialCourse?.id || "", // Preserve the original id
          updatedAt: new Date() // Update the timestamp
        }
        onSave(updatedCourse as unknown as Course)
      } else {
        // Create new course
        const savedCourse = storage.createCourse(courseData)
        toast("Course created successfully")
        router.push(`/management/courses/${savedCourse.id}`)
      }
    } catch (error) {
      console.error(`Failed to ${mode} course:`, error)
      toast(`Failed to ${mode} course`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 w-full">
      <div className="flex items-start flex-col w-full">
        <div className="flex items-center justify-between w-full">
          <Link href={`/management/courses`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Button>
          </Link>
          <Button type="submit" form="course-form" disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Saving..." : mode === "edit" ? "Update Course" : "Save Course"}
          </Button>
        </div>
        <div className="w-full mt-4">
          <h2 className="text-3xl font-bold tracking-tight">
            {mode === "edit" ? "Edit Course" : "Create Course"}
          </h2>
          <p className="text-muted-foreground">
            {mode === "edit" ? "Modify course details and content" : "Build a comprehensive online course"}
          </p>
        </div>
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