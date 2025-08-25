"use client"

import React, { useState, useEffect } from 'react'
import { ArrowLeft, Users, Clock, Target, Book, Package, Lightbulb, Play } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/store/authStore'
import { useRouter, useSearchParams } from 'next/navigation'
import { type Quiz } from '@/data/quizzes'
import AuthPrompt from './AuthPrompt'
import Image from 'next/image'

interface QuizDetailsClientProps {
  quiz: Quiz
}

export default function QuizDetailsClient({ quiz }: QuizDetailsClientProps) {
  const { isLoggedIn } = useAuthStore()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  // Check authentication status on mount
  useEffect(() => {
    // Check if user is returning from auth flow
    const returnUrl = searchParams.get('returnUrl')
    if (returnUrl && isLoggedIn) {
      // User just logged in and is being redirected back
      router.push(returnUrl)
      return
    }

    // If not logged in, show auth prompt
    if (!isLoggedIn) {
      setShowAuthPrompt(true)
    }
    setIsCheckingAuth(false)
  }, [isLoggedIn, searchParams, router])

  // Show loading while checking auth
  if (isCheckingAuth) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-12 space-y-8 mt-16">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Checking authentication...</p>
          </div>
        </div>
      </div>
    )
  }

  // Show auth prompt if not logged in
  if (showAuthPrompt) {
    return (
      <AuthPrompt 
        quiz={quiz} 
        onAuthenticated={() => setShowAuthPrompt(false)} 
      />
    )
  }
  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 space-y-8 mt-16">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center flex-col gap-8 w-full">
          <div className="flex items-start justify-between w-full gap-2">
            <Link href="/quiz">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Quizzes
              </Button>
            </Link>
          </div>
          <div className="flex flex-col items-start justify-start w-full gap-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{quiz.title}</h1>
            <p className="text-lg md:text-xl leading-tight text-muted-foreground max-w-3xl">{quiz.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Cover Image Section */}
      {quiz.coverImage ? (
        <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-xl shadow-2xl">
          <Image
            src={quiz.coverImage}
            alt={quiz.title}
            className="w-full h-full object-cover"
            width={1000}
            height={1000}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-4 text-white">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                {quiz.category}
              </Badge>
              <div className="flex items-center gap-2 text-sm bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/30">
                <Clock className="h-4 w-4" />
                <span>{quiz.estimatedTime}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-xl shadow-2xl bg-gradient-to-br from-primary/10 to-primary/20 dark:from-primary/20 dark:to-primary/30 border-2 border-dashed border-primary/30">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="p-6 rounded-xl bg-primary/20 dark:bg-primary/30 shadow-lg mb-4">
              <Image
                src="/cross-roads-decision-making-chooice-career-pexels-googledeepmind-17485632.jpg"
                alt="Target"
                className="h-16 w-16 text-primary dark:text-primary/80"
                width={1000}
                height={1000}
              />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-primary dark:text-primary/80 mb-2">
                {quiz.title}
              </h3>
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                  {quiz.category}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-primary/70 dark:text-primary/70">
                  <Clock className="h-4 w-4" />
                  <span>{quiz.estimatedTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section with CTA */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                {/* <h2 className="text-xl md:text-2xl leading-tight font-semibold">Ready to discover your personalized path?</h2> */}
                <p className="text-muted-foreground text-justify">
                  This {quiz.questions.length}-question assessment will help you {quiz.subtitle}&nbsp;and provide tailored recommendations for articles (Blog posts), streaks, courses, and resources that match your unique needs.
                </p>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>{quiz.totalAttempts.toLocaleString()} people have taken this quiz</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">{quiz.questions.length}</div>
                <div className="text-sm text-muted-foreground">Questions</div>
              </div>
              <Button size="lg" className="px-8 py-6 text-lg" asChild>
                <Link href={`/quiz/${quiz.id}/answering`}>
                  <Play className="mr-2 h-5 w-5" />
                  Start Quiz Now
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quiz Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Detailed Description */}
          <Card>
            <CardHeader>
              <CardTitle>About This Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-justify">
                {quiz.description}
              </p>
            </CardContent>
          </Card>

          {/* What You'll Learn */}
          <Card>
            <CardHeader>
              <CardTitle>What You&apos;ll Discover</CardTitle>
              <CardDescription>
                This quiz will help you understand your current situation and provide personalized recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Current Assessment</h4>
                    <p className="text-sm text-muted-foreground">
                      Understand where you are in your journey
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Personalized Insights</h4>
                    <p className="text-sm text-muted-foreground">
                      Get specific recommendations for your situation
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Book className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Course Recommendations</h4>
                    <p className="text-sm text-muted-foreground">
                      Find the best courses for your learning style
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Package className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Product Suggestions</h4>
                    <p className="text-sm text-muted-foreground">
                      Discover tools and resources that can help
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quiz Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quiz Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Attempts</span>
                <span className="font-medium">{quiz.totalAttempts.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg Time</span>
                <span className="font-medium">{quiz.averageCompletionTime.toFixed(1)} min</span>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          {quiz.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Related Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {quiz.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Start */}
          <Card>
            <CardHeader>
              <CardTitle>Ready to Start?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" size="lg" asChild>
                <Link href={`/quiz/${quiz.id}/answering`}>
                  <Play className="mr-2 h-4 w-4" />
                  Begin Quiz
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Takes about {quiz.estimatedTime} • No registration needed
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 