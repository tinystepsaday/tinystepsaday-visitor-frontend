"use client"

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, BarChart3, Clock, Users, Target } from 'lucide-react'
import QuizAnalyticsDataTableClient from './QuizAnalyticsDataTableClient'
import type { Quiz, QuizAnalytics, QuizResult } from '@/data/quizzes'

interface QuizAnalyticsClientProps {
  quiz: Quiz
  analytics: QuizAnalytics
  recentResults: QuizResult[]
}

export default function QuizAnalyticsClient({ quiz, analytics, recentResults }: QuizAnalyticsClientProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start gap-4 w-full">
          <div className="flex items-center justify-between w-full">
            <Link href="/management/quizzes">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Quizzes
              </Button>
            </Link>
            <Link href={`/management/quizzes/${quiz.id}/edit`}>
              <Button>Edit Quiz</Button>
            </Link>
          </div>
          <div>
            <h1 className="text-3xl font-bold">{quiz.title} Analytics</h1>
            <p className="text-muted-foreground">Performance insights and user statistics</p>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Attempts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalAttempts}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.completedAttempts} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.averageScore.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Across all completions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.completionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Successfully completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.averageTimeSpent.toFixed(1)} min</div>
            <p className="text-xs text-muted-foreground">
              Per completion
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Score Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
            <CardDescription>How users are performing across different score ranges</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(analytics.levelDistribution).map(([level, count]) => {
              const percentage = analytics.completedAttempts > 0 ? (count / analytics.completedAttempts) * 100 : 0
              const labels = {
                excellent: 'Excellent (80-100%)',
                good: 'Good (60-79%)',
                fair: 'Fair (40-59%)',
                needsImprovement: 'Needs Improvement (0-39%)'
              }

              return (
                <div key={level} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{labels[level as keyof typeof labels]}</span>
                    <span className="text-muted-foreground">{count} users ({percentage.toFixed(1)}%)</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance by Classification</CardTitle>
            <CardDescription>Breakdown of user performance levels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {analytics.popularClassifications.map((classification) => (
              <div key={classification.classification} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">
                    {classification.classification}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="font-medium">{classification.count} users</div>
                  <div className="text-sm text-muted-foreground">{classification.percentage.toFixed(1)}%</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Results Table */}
      <QuizAnalyticsDataTableClient results={recentResults} />
    </div>
  )
} 