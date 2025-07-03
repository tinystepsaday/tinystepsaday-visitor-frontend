"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { storage } from "@/lib/storage"
import type { Course } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Edit,
  Users,
  BookOpen,
  FileText,
  CheckSquare,
  HelpCircle,
  Play,
  Calendar,
  DollarSign,
  Clock,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

export default function CourseDetailPage() {
  const params = useParams()

  const courseId = params.id as string

  const [course, setCourse] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const loadCourse = () => {
      try {
        const foundCourse = storage.getCourse(courseId)
        setCourse(foundCourse)
      } catch (error) {
        console.error("Error loading course:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (courseId) {
      loadCourse()
    }
  }, [courseId])

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-muted-foreground">Loading course...</div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Course Not Found</h2>
          <p className="text-muted-foreground mb-4">The course you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/courses">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const totalLessons = course.modules.reduce((total, module) => total + module.lessons.length, 0)
  const totalQuizPoints = course.quizzes.reduce(
    (total, quiz) => total + quiz.questions.reduce((sum, q) => sum + q.points, 0),
    0,
  )

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/courses">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{course.title}</h2>
            <p className="text-muted-foreground">{course.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link href={`/courses/${course.id}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Course
            </Button>
          </Link>
          <Badge variant={course.status === "published" ? "default" : "secondary"}>{course.status}</Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Course Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {course.thumbnail && (
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-32 object-cover rounded-md"
                />
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Price</span>
                  <div className="flex items-center">
                    <DollarSign className="mr-1 h-3 w-3" />
                    <span>${course.price.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Duration</span>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>
                      {Math.floor(course.duration / 60)}h {course.duration % 60}m
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Students</span>
                  <div className="flex items-center">
                    <Users className="mr-1 h-3 w-3" />
                    <span>{course.students.length}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Lessons</span>
                  <div className="flex items-center">
                    <Play className="mr-1 h-3 w-3" />
                    <span>{totalLessons}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Created</span>
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>{course.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <span className="text-sm font-medium">Instructor</span>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} alt={course.instructor.name} />
                    <AvatarFallback>
                      {course.instructor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{course.instructor.name}</p>
                    <p className="text-xs text-muted-foreground">{course.instructor.email}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <span className="text-sm font-medium">Category</span>
                <Badge variant="outline">{course.category}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Modules</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{course.modules.length}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Lessons</CardTitle>
                    <Play className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalLessons}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Quizzes</CardTitle>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{course.quizzes.length}</div>
                    <p className="text-xs text-muted-foreground">{totalQuizPoints} total points</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Enrolled Students</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{course.students.length}</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Course Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{course.description}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="modules" className="space-y-4">
              {course.modules.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No modules yet</h3>
                    <p className="text-muted-foreground text-center">This course doesn&apos;t have any modules yet.</p>
                  </CardContent>
                </Card>
              ) : (
                course.modules.map((module, index) => (
                  <Card key={module.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">Module {index + 1}</Badge>
                          <CardTitle className="text-lg">{module.title}</CardTitle>
                        </div>
                        <Badge variant="secondary">{module.lessons.length} lessons</Badge>
                      </div>
                      <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {module.lessons.map((lesson) => (
                          <div key={lesson.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-2">
                              <Play className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{lesson.title}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">{lesson.duration} min</Badge>
                              {lesson.videoUrl && <Badge variant="secondary">Video</Badge>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="quizzes" className="space-y-4">
              {course.quizzes.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <HelpCircle className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No quizzes yet</h3>
                    <p className="text-muted-foreground text-center">This course doesn&apos;t have any quizzes yet.</p>
                  </CardContent>
                </Card>
              ) : (
                course.quizzes.map((quiz, index) => (
                  <Card key={quiz.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">Quiz {index + 1}</Badge>
                          <CardTitle className="text-lg">{quiz.title}</CardTitle>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">{quiz.questions.length} questions</Badge>
                          <Badge variant="outline">{quiz.questions.reduce((sum, q) => sum + q.points, 0)} points</Badge>
                        </div>
                      </div>
                      <CardDescription>{quiz.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Passing Score:</span> {quiz.settings.passingScore}%
                        </div>
                        <div>
                          <span className="font-medium">Max Attempts:</span> {quiz.settings.maxAttempts}
                        </div>
                        <div>
                          <span className="font-medium">Time Limit:</span>{" "}
                          {quiz.settings.timeLimit ? `${quiz.settings.timeLimit} minutes` : "No limit"}
                        </div>
                        <div>
                          <span className="font-medium">Shuffle Questions:</span>{" "}
                          {quiz.settings.shuffleQuestions ? "Yes" : "No"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="students" className="space-y-4">
              {course.students.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Users className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No students enrolled</h3>
                    <p className="text-muted-foreground text-center">No students have enrolled in this course yet.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {course.students.map((student) => (
                    <Card key={student.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                            <AvatarFallback>
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              {course.notes.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No notes yet</h3>
                    <p className="text-muted-foreground text-center">This course doesn&apos;t have any notes yet.</p>
                  </CardContent>
                </Card>
              ) : (
                course.notes.map((note, index) => (
                  <Card key={note.id}>
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">Note {index + 1}</Badge>
                        <CardTitle className="text-lg">{note.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground whitespace-pre-wrap">{note.content}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="tasks" className="space-y-4">
              {course.tasks.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <CheckSquare className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No tasks yet</h3>
                    <p className="text-muted-foreground text-center">This course doesn&apos;t have any tasks yet.</p>
                  </CardContent>
                </Card>
              ) : (
                course.tasks.map((task, index) => (
                  <Card key={task.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">Task {index + 1}</Badge>
                          <CardTitle className="text-lg">{task.title}</CardTitle>
                        </div>
                        {task.dueDate && <Badge variant="secondary">Due: {task.dueDate.toLocaleDateString()}</Badge>}
                      </div>
                      <CardDescription>{task.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="font-medium">Instructions:</h4>
                        <p className="text-muted-foreground whitespace-pre-wrap">{task.instructions}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
