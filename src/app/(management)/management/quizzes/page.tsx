"use client"

import React from 'react'
import { Plus, TrendingUp, Users, Clock, Target, Copy, Download, Trash2, Archive, Play } from 'lucide-react'
import Link from 'next/link'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { quizAPI, transformBackendQuiz, type Quiz } from '@/integration/quiz'
import { ListPageLoader } from '@/components/ui/loaders'
import { useToast } from '@/hooks/use-toast'

export default function QuizzesManagementPage() {
  const { toast } = useToast()
  const [quizzes, setQuizzes] = React.useState<Quiz[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [selectedQuizzes, setSelectedQuizzes] = React.useState<string[]>([])

  React.useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setIsLoading(true)
        const response = await quizAPI.getQuizzes({
          page: 1,
          limit: 100,
          sortBy: 'createdAt',
          sortOrder: 'desc'
        })
        const transformedQuizzes = response.quizzes.map(transformBackendQuiz)
        setQuizzes(transformedQuizzes)
      } catch (err) {
        console.error('Error fetching quizzes:', err)
        toast({
          title: "Error",
          description: "Failed to load quizzes",
          variant: "destructive"
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuizzes()
  }, [toast])

  const handleDuplicateQuiz = async (quizId: string) => {
    try {
      const quiz = quizzes.find(q => q.id === quizId)
      if (!quiz) return

      const duplicateData = {
        title: `${quiz.title} (Copy)`,
        subtitle: quiz.subtitle,
        description: quiz.description,
        category: quiz.category,
        estimatedTime: quiz.estimatedTime,
        difficulty: quiz.difficulty,
        status: 'draft' as const,
        isPublic: false,
        tags: quiz.tags,
        questions: quiz.questions.map((q, index) => ({
          text: q.text,
          order: index + 1,
          options: q.options.map((opt, optIndex) => ({
            text: opt.text,
            value: opt.value,
            order: optIndex + 1
          }))
        })),
        gradingCriteria: quiz.gradingCriteria.map((gc) => ({
          name: gc.name,
          minScore: gc.minScore,
          maxScore: gc.maxScore,
          label: gc.label,
          color: gc.color,
          recommendations: gc.recommendations,
          proposedCourses: gc.proposedCourses,
          proposedProducts: gc.proposedProducts,
          proposedStreaks: gc.proposedStreaks,
          description: gc.description
        }))
      }

      await quizAPI.createQuiz(duplicateData)
      toast({
        title: "Success",
        description: "Quiz duplicated successfully"
      })
      
      // Refresh the quiz list
      const response = await quizAPI.getQuizzes({
        page: 1,
        limit: 100,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      })
      const transformedQuizzes = response.quizzes.map(transformBackendQuiz)
      setQuizzes(transformedQuizzes)
    } catch (err: unknown) {
      console.error('Error duplicating quiz:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to duplicate quiz';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      })
    }
  }

  const handleToggleStatus = async (quizId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'active' ? 'archived' : 'active'
      const quiz = quizzes.find(q => q.id === quizId)
      if (!quiz) return

      await quizAPI.updateQuiz(quizId, { status: newStatus })
      toast({
        title: "Success",
        description: `Quiz ${newStatus === 'active' ? 'activated' : 'archived'} successfully`
      })
      
      // Update local state
      setQuizzes(prev => prev.map(q => 
        q.id === quizId ? { ...q, status: newStatus } : q
      ))
    } catch (err: unknown) {
      console.error('Error updating quiz status:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to update quiz status';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      })
    }
  }

  const handleBulkDelete = async () => {
    if (selectedQuizzes.length === 0) return
    
    if (!confirm(`Are you sure you want to delete ${selectedQuizzes.length} quiz(zes)?`)) return

    try {
      for (const quizId of selectedQuizzes) {
        await quizAPI.deleteQuiz(quizId)
      }
      
      toast({
        title: "Success",
        description: `${selectedQuizzes.length} quiz(zes) deleted successfully`
      })
      
      setSelectedQuizzes([])
      // Refresh the quiz list
      const response = await quizAPI.getQuizzes({
        page: 1,
        limit: 100,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      })
      const transformedQuizzes = response.quizzes.map(transformBackendQuiz)
      setQuizzes(transformedQuizzes)
    } catch (err: unknown) {
      console.error('Error deleting quizzes:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete some quizzes';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      })
    }
  }

  const exportToCSV = () => {
    const csvContent = [
      ['Title', 'Category', 'Difficulty', 'Status', 'Total Attempts', 'Completed Attempts', 'Average Score', 'Average Time'],
      ...quizzes.map(q => [
        q.title,
        q.category,
        q.difficulty,
        q.status,
        q.totalAttempts.toString(),
        q.completedAttempts.toString(),
        q.averageScore.toString(),
        q.averageCompletionTime.toString()
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `quizzes-export-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // Calculate overall stats
  const totalQuizzes = quizzes.length
  const activeQuizzes = quizzes.filter((q: Quiz) => q.status === 'active').length
  const totalAttempts = quizzes.reduce((sum: number, q: Quiz) => sum + q.totalAttempts, 0)
  const totalCompleted = quizzes.reduce((sum: number, q: Quiz) => sum + q.completedAttempts, 0)
  const averageCompletionRate = totalAttempts > 0 ? (totalCompleted / totalAttempts) * 100 : 0
  const averageScore = quizzes.length > 0 ? quizzes.reduce((sum: number, q: Quiz) => sum + q.averageScore, 0) / quizzes.length : 0

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const columns = [
  {
    id: "select",
    header: ({ table }: { table: any }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }: { row: any }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/management/quizzes/${row.original.id}`}>
              View
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/management/quizzes/${row.original.id}/edit`}>
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/management/quizzes/${row.original.id}/analytics`}>
              Analytics
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDuplicateQuiz(row.original.id)}>
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleToggleStatus(row.original.id, row.original.status)}>
            {row.original.status === 'active' ? (
              <>
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Activate
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
/* eslint-enable @typescript-eslint/no-explicit-any */

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
        <div className="flex gap-2">
          {selectedQuizzes.length > 0 && (
            <>
              <Button variant="outline" onClick={handleBulkDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Selected ({selectedQuizzes.length})
              </Button>
              <Button variant="outline" onClick={exportToCSV}>
                <Download className="mr-2 h-4 w-4" />
                Export Selected
              </Button>
            </>
          )}
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export All
          </Button>
          <Link href="/management/quizzes/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Quiz
            </Button>
          </Link>
        </div>
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
