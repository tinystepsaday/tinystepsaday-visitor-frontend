"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { storage } from "@/lib/storage"
import type { Course } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Search,
  Filter,
  ArrowLeft,
  Mail,
  Calendar,
  Clock,
  CheckCircle,
  Play,
  BookOpen,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

export default function LearnersPage() {
  const params = useParams()
  const courseId = params.id as string

  const [course, setCourse] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

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
        <div className="text-muted-foreground">Loading learners...</div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Course Not Found</h2>
          <p className="text-muted-foreground mb-4">The course you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/management/courses">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Filter learners based on search term and status
  const filteredLearners = course.students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())

    if (statusFilter === "all") return matchesSearch
    if (statusFilter === "active") return matchesSearch && true // All enrolled students are considered active
    if (statusFilter === "completed") return matchesSearch && false // Placeholder for completion logic

    return matchesSearch
  })

  const totalLearners = course.students.length
  const activeLearners = course.students.length // All enrolled students are active
  const completedLearners = 0 // Placeholder for completion tracking

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-start flex-col w-full">
        <Link href={`/management/courses/${course.id}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Button>
        </Link>
        <div className="w-full mt-4">
          <h2 className="text-3xl font-bold tracking-tight">Course Learners</h2>
          <p className="text-muted-foreground">{course.title}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Learners</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLearners}</div>
            <p className="text-xs text-muted-foreground">Enrolled students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Learners</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeLearners}</div>
            <p className="text-xs text-muted-foreground">Currently learning</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedLearners}</div>
            <p className="text-xs text-muted-foreground">Finished course</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Learners</CardTitle>
          <CardDescription>Manage and track student progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search learners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Learners</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredLearners.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No learners found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "No students have enrolled in this course yet."
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLearners.map((student) => (
                <Card key={student.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{student.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            <span>{student.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                            <Calendar className="h-3 w-3" />
                            <span>Enrolled {new Date(student.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <Play className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Progress</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: "25%" }}></div>
                            </div>
                            <span className="text-sm text-muted-foreground">25%</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Lessons</span>
                          </div>
                          <span className="text-sm text-muted-foreground">8 of 32 completed</span>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Time</span>
                          </div>
                          <span className="text-sm text-muted-foreground">2h 15m spent</span>
                        </div>

                        <Badge variant="secondary">Active</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
