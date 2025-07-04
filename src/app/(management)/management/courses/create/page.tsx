"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { courseSchema } from "@/lib/schemas"
import type { z } from "zod"
import { storage } from "@/lib/storage"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Plus, Trash2, GripVertical, Play, FileText, HelpCircle, CheckSquare } from "lucide-react"
import { MediaSelector } from "@/components/media-selector"
import { QuizBuilder } from "@/components/quiz-builder"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import type { Quiz, QuizSettings } from "@/lib/types"
import Image from "next/image"

type CourseFormData = z.infer<typeof courseSchema>

interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
}

interface Lesson {
  id: string
  title: string
  content: string
  videoUrl?: string
  duration: number
}

interface Note {
  id: string
  title: string
  content: string
  moduleId?: string
  lessonId?: string
}

interface Task {
  id: string
  title: string
  description: string
  instructions: string
  dueDate?: Date
  moduleId?: string
}

export default function CreateCoursePage() {
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

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleTitleChange = (title: string) => {
    form.setValue("title", title)
    if (!form.getValues("slug")) {
      form.setValue("slug", generateSlug(title))
    }
  }

  const addModule = () => {
    const newModule: Module = {
      id: Date.now().toString(),
      title: "",
      description: "",
      lessons: [],
    }
    setModules([...modules, newModule])
  }

  const updateModule = (moduleId: string, updates: Partial<Module>) => {
    setModules(modules.map((module) => (module.id === moduleId ? { ...module, ...updates } : module)))
  }

  const removeModule = (moduleId: string) => {
    setModules(modules.filter((module) => module.id !== moduleId))
  }

  const addLesson = (moduleId: string) => {
    const newLesson: Lesson = {
      id: Date.now().toString(),
      title: "",
      content: "",
      duration: 0,
    }
    setModules(
      modules.map((module) =>
        module.id === moduleId ? { ...module, lessons: [...module.lessons, newLesson] } : module,
      ),
    )
  }

  const updateLesson = (moduleId: string, lessonId: string, updates: Partial<Lesson>) => {
    setModules(
      modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) => (lesson.id === lessonId ? { ...lesson, ...updates } : lesson)),
            }
          : module,
      ),
    )
  }

  const removeLesson = (moduleId: string, lessonId: string) => {
    setModules(
      modules.map((module) =>
        module.id === moduleId
          ? { ...module, lessons: module.lessons.filter((lesson) => lesson.id !== lessonId) }
          : module,
      ),
    )
  }

  const addQuiz = () => {
    const defaultSettings: QuizSettings = {
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

    const newQuiz: Quiz = {
      id: Date.now().toString(),
      title: "",
      description: "",
      instructions: "",
      questions: [],
      settings: defaultSettings,
      courseId: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setQuizzes([...quizzes, newQuiz])
    setSelectedQuiz(newQuiz)
    setIsQuizBuilderOpen(true)
  }

  const updateQuiz = (quizId: string, updates: Partial<Quiz>) => {
    setQuizzes(quizzes.map((quiz) => (quiz.id === quizId ? { ...quiz, ...updates } : quiz)))
    if (selectedQuiz?.id === quizId) {
      setSelectedQuiz({ ...selectedQuiz, ...updates })
    }
  }

  const removeQuiz = (quizId: string) => {
    setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId))
    if (selectedQuiz?.id === quizId) {
      setSelectedQuiz(null)
      setIsQuizBuilderOpen(false)
    }
  }

  const addNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "",
      content: "",
    }
    setNotes([...notes, newNote])
  }

  const addTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: "",
      description: "",
      instructions: "",
    }
    setTasks([...tasks, newTask])
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

  const handleQuizSave = () => {
    if (selectedQuiz) {
      updateQuiz(selectedQuiz.id, selectedQuiz)
      setIsQuizBuilderOpen(false)
      toast({
        title: "Success",
        description: "Quiz saved successfully",
      })
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

      {isQuizBuilderOpen && selectedQuiz && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Quiz Builder</CardTitle>
              <Button variant="outline" onClick={() => setIsQuizBuilderOpen(false)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <QuizBuilder
              quiz={selectedQuiz}
              onQuizChange={(updatedQuiz) => setSelectedQuiz(updatedQuiz as Quiz)}
              onSave={handleQuizSave}
            />
          </CardContent>
        </Card>
      )}

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
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Information</CardTitle>
                      <CardDescription>Basic details about your course</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Course Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter course title..."
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e)
                                  handleTitleChange(e.target.value)
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Slug</FormLabel>
                            <FormControl>
                              <Input placeholder="course-url-slug" {...field} />
                            </FormControl>
                            <FormDescription>The URL-friendly version of the title</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe what students will learn..."
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="web-development">Web Development</SelectItem>
                                  <SelectItem value="mobile-development">Mobile Development</SelectItem>
                                  <SelectItem value="data-science">Data Science</SelectItem>
                                  <SelectItem value="design">Design</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price ($)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="99.99"
                                  {...field}
                                  onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration (minutes)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="120"
                                {...field}
                                onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormDescription>Total course duration in minutes</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="published">Published</SelectItem>
                                <SelectItem value="archived">Archived</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Course Thumbnail</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {thumbnail ? (
                        <div className="space-y-2">
                          <Image
                            src={thumbnail || "/placeholder.svg"}
                            alt="Course thumbnail"
                            className="w-full h-32 object-cover rounded-md"
                            width={200}
                            height={200}
                          />
                          <Button type="button" variant="outline" size="sm" onClick={() => setThumbnail("")}>
                            Remove Image
                          </Button>
                        </div>
                      ) : (
                        <MediaSelector
                          onSelect={(media) => setThumbnail(media.url)}
                          trigger={
                            <Button type="button" variant="outline" className="w-full bg-transparent">
                              Select Thumbnail
                            </Button>
                          }
                        />
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="modules" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Course Modules</h3>
                  <p className="text-sm text-muted-foreground">Organize your course content into modules and lessons</p>
                </div>
                <Button type="button" onClick={addModule}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Module
                </Button>
              </div>

              <div className="space-y-4">
                {modules.map((module, moduleIndex) => (
                  <Card key={module.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <GripVertical className="h-4 w-4 text-muted-foreground" />
                          <Badge variant="outline">Module {moduleIndex + 1}</Badge>
                        </div>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeModule(module.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input
                        placeholder="Module title..."
                        value={module.title}
                        onChange={(e) => updateModule(module.id, { title: e.target.value })}
                      />
                      <Textarea
                        placeholder="Module description..."
                        value={module.description}
                        onChange={(e) => updateModule(module.id, { description: e.target.value })}
                      />

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">Lessons</h4>
                          <Button type="button" variant="outline" size="sm" onClick={() => addLesson(module.id)}>
                            <Plus className="mr-2 h-3 w-3" />
                            Add Lesson
                          </Button>
                        </div>

                        {module.lessons.map((lesson, lessonIndex) => (
                          <div key={lesson.id} className="border rounded-lg p-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Play className="h-3 w-3" />
                                <span className="text-xs text-muted-foreground">Lesson {lessonIndex + 1}</span>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeLesson(module.id, lesson.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                            <Input
                              placeholder="Lesson title..."
                              value={lesson.title}
                              onChange={(e) => updateLesson(module.id, lesson.id, { title: e.target.value })}
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <Input
                                placeholder="Video URL (optional)"
                                value={lesson.videoUrl || ""}
                                onChange={(e) => updateLesson(module.id, lesson.id, { videoUrl: e.target.value })}
                              />
                              <Input
                                type="number"
                                placeholder="Duration (min)"
                                value={lesson.duration}
                                onChange={(e) =>
                                  updateLesson(module.id, lesson.id, { duration: Number.parseInt(e.target.value) || 0 })
                                }
                              />
                            </div>
                            <Textarea
                              placeholder="Lesson content..."
                              value={lesson.content}
                              onChange={(e) => updateLesson(module.id, lesson.id, { content: e.target.value })}
                              className="min-h-[80px]"
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="quizzes" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Course Quizzes</h3>
                  <p className="text-sm text-muted-foreground">Add quizzes to test student knowledge</p>
                </div>
                <Button type="button" onClick={addQuiz}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Quiz
                </Button>
              </div>

              <div className="space-y-4">
                {quizzes.map((quiz, quizIndex) => (
                  <Card key={quiz.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <HelpCircle className="h-4 w-4" />
                          <Badge variant="outline">Quiz {quizIndex + 1}</Badge>
                          <Badge variant="secondary">{quiz.questions?.length || 0} questions</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedQuiz(quiz)
                              setIsQuizBuilderOpen(true)
                            }}
                          >
                            Edit Quiz
                          </Button>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeQuiz(quiz.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="Quiz title..."
                          value={quiz.title}
                          onChange={(e) => updateQuiz(quiz.id, { title: e.target.value })}
                        />
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">Passing Score:</span>
                          <Badge variant="outline">{quiz.settings?.passingScore || 70}%</Badge>
                        </div>
                      </div>
                      <Textarea
                        placeholder="Quiz description..."
                        value={quiz.description}
                        onChange={(e) => updateQuiz(quiz.id, { description: e.target.value })}
                      />
                      {quiz.questions && quiz.questions.length > 0 && (
                        <div className="text-sm text-muted-foreground">
                          Questions: {quiz.questions.length} | Total Points:{" "}
                          {quiz.questions.reduce((sum, q) => sum + q.points, 0)}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="notes" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Course Notes</h3>
                  <p className="text-sm text-muted-foreground">Add supplementary notes and resources</p>
                </div>
                <Button type="button" onClick={addNote}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Note
                </Button>
              </div>

              <div className="space-y-4">
                {notes.map((note, noteIndex) => (
                  <Card key={note.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4" />
                          <Badge variant="outline">Note {noteIndex + 1}</Badge>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setNotes(notes.filter((n) => n.id !== note.id))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input
                        placeholder="Note title..."
                        value={note.title}
                        onChange={(e) =>
                          setNotes(notes.map((n) => (n.id === note.id ? { ...n, title: e.target.value } : n)))
                        }
                      />
                      <Textarea
                        placeholder="Note content..."
                        value={note.content}
                        onChange={(e) =>
                          setNotes(notes.map((n) => (n.id === note.id ? { ...n, content: e.target.value } : n)))
                        }
                        className="min-h-[120px]"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tasks" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Course Tasks</h3>
                  <p className="text-sm text-muted-foreground">Add assignments and practical tasks</p>
                </div>
                <Button type="button" onClick={addTask}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
              </div>

              <div className="space-y-4">
                {tasks.map((task, taskIndex) => (
                  <Card key={task.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CheckSquare className="h-4 w-4" />
                          <Badge variant="outline">Task {taskIndex + 1}</Badge>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setTasks(tasks.filter((t) => t.id !== task.id))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input
                        placeholder="Task title..."
                        value={task.title}
                        onChange={(e) =>
                          setTasks(tasks.map((t) => (t.id === task.id ? { ...t, title: e.target.value } : t)))
                        }
                      />
                      <Textarea
                        placeholder="Task description..."
                        value={task.description}
                        onChange={(e) =>
                          setTasks(tasks.map((t) => (t.id === task.id ? { ...t, description: e.target.value } : t)))
                        }
                      />
                      <Textarea
                        placeholder="Task instructions..."
                        value={task.instructions}
                        onChange={(e) =>
                          setTasks(tasks.map((t) => (t.id === task.id ? { ...t, instructions: e.target.value } : t)))
                        }
                        className="min-h-[100px]"
                      />
                      <div className="space-y-2">
                        <Label>Due Date (Optional)</Label>
                        <Input
                          type="datetime-local"
                          value={
                            task.dueDate
                              ? new Date(task.dueDate.getTime() - task.dueDate.getTimezoneOffset() * 60000)
                                  .toISOString()
                                  .slice(0, 16)
                              : ""
                          }
                          onChange={(e) =>
                            setTasks(
                              tasks.map((t) =>
                                t.id === task.id
                                  ? { ...t, dueDate: e.target.value ? new Date(e.target.value) : undefined }
                                  : t,
                              ),
                            )
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="seo" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                  <CardDescription>Optimize your course for search engines</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="seo.metaTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Title</FormLabel>
                        <FormControl>
                          <Input placeholder="SEO title (max 60 characters)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="seo.metaDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="SEO description (max 160 characters)"
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="seo.altText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thumbnail Alt Text</FormLabel>
                        <FormControl>
                          <Input placeholder="Describe the thumbnail image" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="seo.caption"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thumbnail Caption</FormLabel>
                        <FormControl>
                          <Input placeholder="Optional caption for the thumbnail" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </form>
        </Form>
      </Tabs>
    </div>
  )
}
