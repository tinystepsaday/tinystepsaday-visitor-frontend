"use client"

import React from 'react'
import { Plus, TrendingUp, Users, Clock, Target } from 'lucide-react'
import Link from 'next/link'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getAllQuizzes, type Quiz } from '@/data/quizzes'
import { ListPageLoader } from '@/components/ui/loaders'

/* eslint-disable @typescript-eslint/no-explicit-any */
const columns = [
  {
    accessorKey: "title",
    header: "Quiz Title",
    cell: ({ row }: { row: { original: any } }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.title}</span>
        <span className="text-sm text-muted-foreground">{row.original.category}</span>
      </div>
    ),
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
    cell: ({ row }: { row: { original: any } }) => {
      const difficulty = row.original.difficulty
      const colors = {
        beginner: "bg-green-100 text-green-800",
        intermediate: "bg-yellow-100 text-yellow-800",
        advanced: "bg-red-100 text-red-800"
      }
      return (
        <Badge className={colors[difficulty as keyof typeof colors]}>
          {difficulty}
        </Badge>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: { original: any } }) => {
      const status = row.original.status
      const colors = {
        draft: "bg-gray-100 text-gray-800",
        active: "bg-green-100 text-green-800",
        archived: "bg-red-100 text-red-800"
      }
      return (
        <Badge className={colors[status as keyof typeof colors]}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "totalAttempts",
    header: "Total Attempts",
    cell: ({ row }: { row: { original: any } }) => (
      <div className="text-center">
        <div className="font-medium">{row.original.totalAttempts.toLocaleString()}</div>
        <div className="text-sm text-muted-foreground">
          {row.original.completedAttempts} completed
        </div>
      </div>
    ),
  },
  {
    accessorKey: "averageScore",
    header: "Avg Score",
    cell: ({ row }: { row: { original: any } }) => (
      <div className="text-center">
        <div className="font-medium">{row.original.averageScore.toFixed(1)}%</div>
        <div className="text-sm text-muted-foreground">
          {row.original.averageCompletionTime.toFixed(1)} min
        </div>
      </div>
    ),
  },
  {
    accessorKey: "popularity",
    header: "Popularity",
    cell: ({ row }: { row: { original: any } }) => {
      const quiz = row.original
      const popularity = (quiz.completedAttempts / quiz.totalAttempts) * 100
      return (
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${Math.min(popularity, 100)}%` }}
            />
          </div>
          <span className="text-sm text-muted-foreground w-12">
            {popularity.toFixed(0)}%
          </span>
        </div>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }: { row: { original: any } }) => (
      <div className="flex items-center gap-2">
        <Link href={`/management/quizzes/${row.original.id}`}>
          <Button variant="outline" size="sm">View</Button>
        </Link>
        <Link href={`/management/quizzes/${row.original.id}/analytics`}>
          <Button variant="outline" size="sm">Analytics</Button>
        </Link>
        <Link href={`/management/quizzes/${row.original.id}/edit`}>
          <Button variant="outline" size="sm">Edit</Button>
        </Link>
      </div>
    ),
  },
]
/* eslint-enable @typescript-eslint/no-explicit-any */

export default function QuizzesManagementPage() {
  const [quizzes, setQuizzes] = React.useState<Quiz[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setIsLoading(true)
        const quizzesData = await getAllQuizzes()
        setQuizzes(quizzesData)
      } catch (err) {
        console.error('Error fetching quizzes:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuizzes()
  }, [])

  // Calculate overall stats
  const totalQuizzes = quizzes.length
  const activeQuizzes = quizzes.filter((q: Quiz) => q.status === 'active').length
  const totalAttempts = quizzes.reduce((sum: number, q: Quiz) => sum + q.totalAttempts, 0)
  const totalCompleted = quizzes.reduce((sum: number, q: Quiz) => sum + q.completedAttempts, 0)
  const averageCompletionRate = totalAttempts > 0 ? (totalCompleted / totalAttempts) * 100 : 0
  const averageScore = quizzes.length > 0 ? quizzes.reduce((sum: number, q: Quiz) => sum + q.averageScore, 0) / quizzes.length : 0

  if (isLoading) {
    return (
      <ListPageLoader 
        createButtonText="Create Quiz"
        createHref="/management/quizzes/create"
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quiz Management</h1>
          <p className="text-muted-foreground">
            Manage and analyze your assessment quizzes
          </p>
        </div>
        <Link href="/management/quizzes/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Quiz
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quizzes</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuizzes}</div>
            <p className="text-xs text-muted-foreground">
              {activeQuizzes} active, {totalQuizzes - activeQuizzes} inactive
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Attempts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAttempts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {totalCompleted.toLocaleString()} completed
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageCompletionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Average across all quizzes
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Across all completed quizzes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quizzes Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Quizzes</CardTitle>
          <CardDescription>
            Manage your assessment quizzes and view their performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={quizzes}
            searchKey="title"
            searchPlaceholder="Search quizzes..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
