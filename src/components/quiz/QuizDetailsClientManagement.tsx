"use client"

import React, { useState } from 'react'
import { ArrowLeft, Edit, BarChart3, Users, Clock, Target, Calendar, Book, Package, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { type Quiz } from '@/data/quizzes'

interface QuizDetailsClientManagementProps {
  quiz: Quiz
}

export default function QuizDetailsClientManagement({ quiz }: QuizDetailsClientManagementProps) {
  const completionRate = quiz.totalAttempts > 0 ? (quiz.completedAttempts / quiz.totalAttempts) * 100 : 0
  const [expandedCriteria, setExpandedCriteria] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center flex-col gap-4 w-full">
          <div className="flex items-start justify-between w-full gap-2">
            <Link href="/management/quizzes">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Quizzes
              </Button>
            </Link>
            <div className="flex items-center justify-end gap-2">
              <Link href={`/management/quizzes/${quiz.id}/analytics`}>
                <Button variant="outline">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analytics
                </Button>
              </Link>
              <Link href={`/management/quizzes/${quiz.id}/edit`}>
                <Button>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Quiz
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{quiz.title}</h1>
            <p className="text-muted-foreground">{quiz.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Attempts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quiz.totalAttempts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {quiz.completedAttempts} completed ({completionRate.toFixed(1)}%)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quiz.averageScore.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Across all completed attempts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quiz.averageCompletionTime.toFixed(1)} min</div>
            <p className="text-xs text-muted-foreground">
              Estimated: {quiz.estimatedTime}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Questions</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quiz.questions.length}</div>
            <p className="text-xs text-muted-foreground">
              Multiple choice format
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quiz Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Quiz Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Category</label>
                  <p className="text-sm">{quiz.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Difficulty</label>
                  <Badge className={
                    quiz.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      quiz.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                  }>
                    {quiz.difficulty}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <Badge className={
                    quiz.status === 'active' ? 'bg-green-100 text-green-800' :
                      quiz.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                  }>
                    {quiz.status}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Visibility</label>
                  <Badge className={quiz.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {quiz.isPublic ? 'Public' : 'Private'}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Created: {new Date(quiz.createdAt).toLocaleDateString()}</span>
                <span>•</span>
                <span>Updated: {new Date(quiz.updatedAt).toLocaleDateString()}</span>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <p className="text-sm mt-1">{quiz.description}</p>
              </div>

              {quiz.tags.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Tags</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {quiz.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Grading Criteria */}
          <Card>
            <CardHeader>
              <CardTitle>Grading Criteria</CardTitle>
              <CardDescription>
                Score ranges, classifications, and recommendations for this quiz
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quiz.gradingCriteria.map((criteria) => (
                  <Collapsible
                    key={criteria.id}
                    open={expandedCriteria === criteria.id}
                    onOpenChange={(open) => setExpandedCriteria(open ? criteria.id : null)}
                  >
                    <div className="border rounded-lg">
                      <CollapsibleTrigger asChild>
                        <div className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: criteria.color }}
                            />
                            <div className="text-left">
                              <p className="font-medium">{criteria.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {criteria.minScore}-{criteria.maxScore} points
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              style={{ 
                                backgroundColor: criteria.color,
                                color: 'white'
                              }}
                            >
                              {criteria.label}
                            </Badge>
                            {expandedCriteria === criteria.id ? (
                              <ChevronUp className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent>
                        <div className="px-4 pb-4 space-y-4">
                          <Separator />
                          
                          {/* Description */}
                          {criteria.description && (
                            <div>
                              <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                                <Lightbulb className="h-4 w-4" />
                                Description
                              </h4>
                              <p className="text-sm text-muted-foreground">{criteria.description}</p>
                            </div>
                          )}

                          {/* Recommendations */}
                          {criteria.recommendations.length > 0 && (
                            <div>
                              <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                                <Lightbulb className="h-4 w-4" />
                                Recommendations ({criteria.recommendations.length})
                              </h4>
                              <ul className="space-y-1">
                                {criteria.recommendations.map((recommendation, index) => (
                                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                    {recommendation}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Proposed Courses */}
                          {criteria.proposedCourses.length > 0 && (
                            <div>
                              <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                                <Book className="h-4 w-4" />
                                Recommended Courses ({criteria.proposedCourses.length})
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {criteria.proposedCourses.map((course) => (
                                  <Badge key={course.id} variant="outline" className="text-xs">
                                    {course.name}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Proposed Products */}
                          {criteria.proposedProducts.length > 0 && (
                            <div>
                              <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                                <Package className="h-4 w-4" />
                                Recommended Products ({criteria.proposedProducts.length})
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {criteria.proposedProducts.map((product) => (
                                  <Badge key={product.id} variant="outline" className="text-xs">
                                    {product.name}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Proposed Streaks */}
                          {criteria.proposedStreaks.length > 0 && (
                            <div>
                              <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                                <Target className="h-4 w-4" />
                                Recommended Streaks ({criteria.proposedStreaks.length})
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {criteria.proposedStreaks.map((streak) => (
                                  <Badge key={streak.id} variant="outline" className="text-xs">
                                    {streak.name}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Questions */}
          <Card>
            <CardHeader>
              <CardTitle>Questions ({quiz.questions.length})</CardTitle>
              <CardDescription>
                All questions and their answer options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {quiz.questions.map((question, index) => (
                  <div key={question.id} className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{question.text}</p>
                        <div className="mt-3 space-y-2">
                          {question.options.map((option) => (
                            <div key={option.id} className="flex items-center gap-3 p-2 border rounded">
                              <div className="w-4 h-4 border rounded flex items-center justify-center text-xs">
                                {String.fromCharCode(65 + question.options.indexOf(option))}
                              </div>
                              <span className="text-sm">{option.text}</span>
                              <Badge variant="outline" className="ml-auto">
                                {option.value} pts
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {index < quiz.questions.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Link href={`/management/quizzes/${quiz.id}/edit`} className="w-full">
                <Button variant="outline" className="w-full justify-start">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Quiz
                </Button>
              </Link>
              <Link href={`/management/quizzes/${quiz.id}/analytics`} className="w-full">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
              </Link>
              <Link href={`/management/quizzes/${quiz.id}/results`} className="w-full">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  View Results
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quiz Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Quiz Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <span className="font-medium">Public URL:</span>
                <p className="text-muted-foreground break-all">
                  {quiz.isPublic ? `/quiz/${quiz.id}` : 'Not publicly accessible'}
                </p>
              </div>
              <div className="text-sm">
                <span className="font-medium">Max Score:</span>
                <p className="text-muted-foreground">
                  {quiz.questions.length * 4} points
                </p>
              </div>
              <div className="text-sm">
                <span className="font-medium">Passing Score:</span>
                <p className="text-muted-foreground">
                  {quiz.gradingCriteria.find(c => c.name.toLowerCase().includes('good'))?.minScore || 60} points (Good level)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 