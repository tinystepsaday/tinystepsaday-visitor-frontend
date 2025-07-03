"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Mail, Eye, Ban, CheckCircle } from "lucide-react"
import { mockStudents } from "@/data/mock-data"
import type { Student } from "@/lib/types"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "user",
    header: "Student",
    cell: ({ row }) => {
      const user = row.original.user
      return (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "enrolledCourses",
    header: "Enrolled Courses",
    cell: ({ row }) => <Badge variant="secondary">{row.original.enrolledCourses.length} courses</Badge>,
  },
  {
    accessorKey: "totalCoursesCompleted",
    header: "Completed",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <span>{row.getValue("totalCoursesCompleted")}</span>
      </div>
    ),
  },
  {
    accessorKey: "totalHoursLearned",
    header: "Hours Learned",
    cell: ({ row }) => <div>{row.getValue("totalHoursLearned")}h</div>,
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
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
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" />
              Send Message
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Ban className="mr-2 h-4 w-4" />
              Suspend Student
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function StudentsPage() {
  const [students] = useState<Student[]>(mockStudents)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Students</h2>
          <p className="text-muted-foreground">Manage your course students and their progress</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Total Students</div>
          </div>
          <div className="text-2xl font-bold">1,234</div>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
        </div>
        <div className="rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Active Students</div>
          </div>
          <div className="text-2xl font-bold">987</div>
          <p className="text-xs text-muted-foreground">80% of total</p>
        </div>
        <div className="rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Course Completions</div>
          </div>
          <div className="text-2xl font-bold">456</div>
          <p className="text-xs text-muted-foreground">+8% from last month</p>
        </div>
        <div className="rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Avg. Progress</div>
          </div>
          <div className="text-2xl font-bold">67%</div>
          <Progress value={67} className="mt-2" />
        </div>
      </div>

      <DataTable columns={columns} data={students} searchKey="user" searchPlaceholder="Search students..." />
    </div>
  )
}
