"use client"

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/data-table'
import { type QuizResult } from '@/data/quizzes'

/* eslint-disable @typescript-eslint/no-explicit-any */
const resultColumns = [
  {
    accessorKey: "userName",
    header: "User",
    cell: ({ row }: any) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.userName}</span>
        <span className="text-sm text-muted-foreground">{row.original.userEmail}</span>
      </div>
    ),
  },
  {
    accessorKey: "percentage",
    header: "Score",
    cell: ({ row }: any) => (
      <div className="text-center">
        <div className="font-medium">{row.original.percentage}%</div>
        <div className="text-sm text-muted-foreground">
          {row.original.score}/{row.original.maxScore}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "classification",
    header: "Classification",
    cell: ({ row }: any) => (
      <Badge className={
        row.original.level === 'excellent' ? 'bg-green-100 text-green-800' :
        row.original.level === 'good' ? 'bg-blue-100 text-blue-800' :
        row.original.level === 'fair' ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }>
        {row.original.classification}
      </Badge>
    ),
  },
  {
    accessorKey: "timeSpent",
    header: "Time Spent",
    cell: ({ row }: any) => (
      <div className="text-center">
        <div className="font-medium">{row.original.timeSpent} min</div>
      </div>
    ),
  },
  {
    accessorKey: "completedAt",
    header: "Completed",
    cell: ({ row }: any) => (
      <div className="text-sm">
        {new Date(row.original.completedAt).toLocaleDateString()}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }: any) => (
      <Link href={`/management/quizzes/${row.original.quizId}/results/${row.original.id}`}>
        <Button variant="outline" size="sm">View Details</Button>
      </Link>
    ),
  },
]
/* eslint-enable @typescript-eslint/no-explicit-any */

interface QuizAnalyticsDataTableClientProps {
  results: QuizResult[]
}

export default function QuizAnalyticsDataTableClient({ results }: QuizAnalyticsDataTableClientProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Quiz Results</CardTitle>
        <CardDescription>
          Latest user completions and their performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable 
          columns={resultColumns} 
          data={results}
          searchKey="userName"
          searchPlaceholder="Search users..."
        />
      </CardContent>
    </Card>
  )
} 