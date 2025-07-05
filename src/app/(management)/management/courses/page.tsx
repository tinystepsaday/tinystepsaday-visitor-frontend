"use client"

import { useState, useEffect } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Plus, Edit, Trash2, DollarSign, Eye, Users } from "lucide-react"
import { storage } from "@/lib/storage"
import type { Course } from "@/lib/types"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ListPageLoader } from "@/components/ui/loaders"

export default function CoursesPage() {
  const [status, setStatus] = useState<string>("all")
  const [category, setCategory] = useState<string>("all")
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadCourses = () => {
      try {
        let allCourses = storage.getCourses()

        // Filter by status
        if (status !== "all") {
          allCourses = allCourses.filter((course) => course.status === status)
        }

        // Filter by category
        if (category !== "all") {
          allCourses = allCourses.filter((course) => course.category === category)
        }

        setCourses(allCourses)
      } catch (error) {
        console.error("Error loading courses:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCourses()
  }, [status, category])

  const handleDeleteCourse = (courseId: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      storage.deleteCourse(courseId)
      setCourses(courses.filter((course) => course.id !== courseId))
    }
  }

  const columns: ColumnDef<Course>[] = [
    {
      accessorKey: "title",
      header: "Course",
      cell: ({ row }) => (
        <div className="max-w-[200px]">
          <div className="font-medium">{row.getValue("title")}</div>
          <div className="text-sm text-muted-foreground truncate">{row.original.description}</div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <Badge variant="outline">{row.getValue("category")}</Badge>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price = row.getValue("price") as number
        return (
          <div className="flex items-center">
            <DollarSign className="mr-1 h-3 w-3" />
            {price.toFixed(2)}
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return <Badge variant={status === "published" ? "default" : "secondary"}>{status}</Badge>
      },
    },
    {
      accessorKey: "instructor",
      header: "Instructor",
      cell: ({ row }) => {
        const instructor = row.original.instructor
        return <div>{instructor.name}</div>
      },
    },
    {
      accessorKey: "duration",
      header: "Duration",
      cell: ({ row }) => {
        const duration = row.getValue("duration") as number
        const hours = Math.floor(duration / 60)
        const minutes = duration % 60
        return (
          <div>
            {hours}h {minutes}m
          </div>
        )
      },
    },
    {
      accessorKey: "students",
      header: "Students",
      cell: ({ row }) => {
        const students = row.original.students || []
        return <div>{students.length}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const course = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => router.push(`/management/courses/${course.id}`)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(`/management/courses/${course.id}/edit`)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(`/management/courses/${course.id}/learners`)}>
                <Users className="mr-2 h-4 w-4" />
                View Learners
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteCourse(course.id)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  if (isLoading) {
    return (
      <ListPageLoader 
        title="Courses"
        subtitle="Manage your online courses and lessons"
        createButtonText="New Course"
        createHref="/management/courses/create"
      />
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
          <p className="text-muted-foreground">Manage your online courses and lessons</p>
        </div>
        <Link href="/management/courses/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Course
          </Button>
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Web Development">Web Development</SelectItem>
            <SelectItem value="Mobile Development">Mobile Development</SelectItem>
            <SelectItem value="Data Science">Data Science</SelectItem>
            <SelectItem value="Design">Design</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable columns={columns} data={courses} searchKey="title" searchPlaceholder="Search courses..." />
    </div>
  )
}
