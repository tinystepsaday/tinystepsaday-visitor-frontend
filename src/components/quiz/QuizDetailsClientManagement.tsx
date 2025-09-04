"use client"

import React, { useState } from 'react'
import { ArrowLeft, Edit, BarChart3, Users, Clock, Target, Calendar, Book, Package, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
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
              {quiz.coverImage && (
                <Image src={quiz.coverImage} alt='' height={200} width={500} className='w-full rounded-xl mb-4' />
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className='flex gap-2 items-center'>
                  <label className="text-sm font-medium text-muted-foreground">Category</label>
                  <p className="text-sm">{quiz.category}</p>
                </div>
                <div className='flex gap-2 items-center'>
                  <label className="text-sm font-medium text-muted-foreground">Difficulty</label>
                  <Badge className={
                    quiz.difficulty === 'BEGINNER' ? 'bg-green-100 text-green-800' :
                      quiz.difficulty === 'INTERMEDIATE' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                  }>
                    {quiz.difficulty}
                  </Badge>
                </div>
                <div className='flex gap-2 items-center'>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <Badge className={
                    quiz.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                      quiz.status === 'DRAFT' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                  }>
                    {quiz.status}
                  </Badge>
                </div>
                <div className='flex gap-2 items-center'>
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
                {quiz.quizType === 'COMPLEX' ? (
                  // Complex Quiz Grading Criteria
                  quiz.complexGradingCriteria?.map((criteria) => (
                    <Collapsible
                      key={criteria.id}
                      open={expandedCriteria === criteria.id}
                      onOpenChange={(open) => setExpandedCriteria(open ? criteria.id : null)}
                    >
                      <div className="border rounded-lg">
                        <CollapsibleTrigger asChild>
                          <div className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                            <div className="flex items-center gap-3">
                              {criteria.image ? (
                                <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200">
                                  <Image
                                    src={criteria.image}
                                    alt={`${criteria.name} illustration`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              ) : (
                                <div 
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: criteria.color }}
                                />
                              )}
                              <div className="text-left">
                                <p className="font-medium">{criteria.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {criteria.label}
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
                                {criteria.name}
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

                            {/* Scoring Logic */}
                            {criteria.scoringLogic && (
                              <div>
                                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                                  <Target className="h-4 w-4" />
                                  Scoring Logic: {criteria.scoringLogic.type}
                                </h4>
                                <div className="space-y-2">
                                  {criteria.scoringLogic.dimensions?.map((dim) => (
                                    <div key={`${criteria.id}-${dim.name}`} className="flex items-center gap-2 text-sm">
                                      <Badge variant="outline" className="text-xs">
                                        {dim.name}: {dim.value} (threshold: {dim.threshold})
                                      </Badge>
                                    </div>
                                  ))}
                                </div>
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

                            {/* Areas of Improvement */}
                            {criteria.areasOfImprovement.length > 0 && (
                              <div>
                                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                                  <Target className="h-4 w-4" />
                                  Areas of Improvement ({criteria.areasOfImprovement.length})
                                </h4>
                                <ul className="space-y-1">
                                  {criteria.areasOfImprovement.map((area, index) => (
                                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                                      {area}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Support Needed */}
                            {criteria.supportNeeded.length > 0 && (
                              <div>
                                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                                  <Target className="h-4 w-4" />
                                  Support Needed ({criteria.supportNeeded.length})
                                </h4>
                                <ul className="space-y-1">
                                  {criteria.supportNeeded.map((support, index) => (
                                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                                      {support}
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

                            {/* Proposed Blog Posts */}
                            {criteria.proposedBlogPosts.length > 0 && (
                              <div>
                                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                                  <Book className="h-4 w-4" />
                                  Recommended Blog Posts ({criteria.proposedBlogPosts.length})
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {criteria.proposedBlogPosts.map((blogPost) => (
                                    <Badge key={blogPost.id} variant="outline" className="text-xs">
                                      {blogPost.title}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  ))
                ) : (
                  // Default Quiz Grading Criteria
                  quiz.gradingCriteria?.map((criteria) => (
                  <Collapsible
                    key={criteria.id}
                    open={expandedCriteria === criteria.id}
                    onOpenChange={(open) => setExpandedCriteria(open ? criteria.id : null)}
                  >
                    <div className="border rounded-lg">
                      <CollapsibleTrigger asChild>
                        <div className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                          <div className="flex items-center gap-3">
                            {criteria.image ? (
                              <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200">
                                <Image
                                  src={criteria.image}
                                  alt={`${criteria.name} illustration`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div 
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: criteria.color }}
                              />
                            )}
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

                            {/* Areas of Improvement */}
                            {criteria.areasOfImprovement && criteria.areasOfImprovement.length > 0 && (
                              <div>
                                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                                  <Target className="h-4 w-4" />
                                  Areas of Improvement ({criteria.areasOfImprovement.length})
                                </h4>
                                <ul className="space-y-1">
                                  {criteria.areasOfImprovement.map((area, index) => (
                                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                                      {area}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Support Needed */}
                            {criteria.supportNeeded && criteria.supportNeeded.length > 0 && (
                              <div>
                                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                                  <Target className="h-4 w-4" />
                                  Support Needed ({criteria.supportNeeded.length})
                                </h4>
                                <ul className="space-y-1">
                                  {criteria.supportNeeded.map((support, index) => (
                                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                                      {support}
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

                          {/* Proposed Blog Posts */}
                          {criteria.proposedBlogPosts.length > 0 && (
                            <div>
                              <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                                <Book className="h-4 w-4" />
                                Recommended Blog Posts ({criteria.proposedBlogPosts.length})
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {criteria.proposedBlogPosts.map((blogPost) => (
                                  <Badge key={blogPost.id} variant="outline" className="text-xs">
                                    {blogPost.title}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Dimensions for Complex Quizzes */}
          {quiz.quizType === 'COMPLEX' && quiz.dimensions && quiz.dimensions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Quiz Dimensions</CardTitle>
                <CardDescription>
                  The dimensions used to calculate personality types for this complex quiz
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quiz.dimensions.map((dimension) => (
                    <div key={dimension.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{dimension.name}</h4>
                        <Badge variant="outline">{dimension.shortName}</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-muted-foreground">Range:</span>
                          <p>{dimension.minScore} - {dimension.maxScore}</p>
                        </div>
                        <div>
                          <span className="font-medium text-muted-foreground">Threshold:</span>
                          <p>{dimension.threshold}</p>
                        </div>
                        <div>
                          <span className="font-medium text-muted-foreground">Low Label:</span>
                          <p className="text-blue-600">{dimension.lowLabel}</p>
                        </div>
                        <div>
                          <span className="font-medium text-muted-foreground">High Label:</span>
                          <p className="text-green-600">{dimension.highLabel}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

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
                        {quiz.quizType === 'COMPLEX' && question.dimensionId && (
                          <div className="mt-2">
                            <Badge variant="secondary" className="text-xs">
                              Dimension: {quiz.dimensions?.find(d => d.id === question.dimensionId)?.shortName || question.dimensionId}
                            </Badge>
                          </div>
                        )}
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
                  {quiz.quizType === 'COMPLEX' 
                    ? `${quiz.dimensions?.reduce((sum, dim) => sum + dim.maxScore, 0) || 0} points (across ${quiz.dimensions?.length || 0} dimensions)`
                    : `${quiz.questions.length * 4} points`
                  }
                </p>
              </div>
              <div className="text-sm">
                <span className="font-medium">Quiz Type:</span>
                <p className="text-muted-foreground">
                  {quiz.quizType === 'COMPLEX' ? 'Complex (MBTI-style)' : quiz.quizType === 'ONBOARDING' ? 'Onboarding' : 'Standard'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 