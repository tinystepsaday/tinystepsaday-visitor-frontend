"use client"

import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, ArrowRight, CheckCircle, Clock, Target, ImageIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { type Quiz } from '@/data/quizzes'

interface AuthPromptProps {
  quiz: Quiz
  onAuthenticated: () => void
}

export default function AuthPrompt({ quiz, onAuthenticated }: AuthPromptProps) {
  const { isLoggedIn } = useAuthStore()
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)

  // If user is already logged in, call the callback
  if (isLoggedIn) {
    onAuthenticated()
    return null
  }

  const handleAuthRedirect = (authType: 'login' | 'signup') => {
    setIsRedirecting(true)
    const currentPath = `/quiz/${quiz.id}`
    const authUrl = `/auth/${authType}?returnUrl=${encodeURIComponent(currentPath)}`
    router.push(authUrl)
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12 space-y-8 mt-16">
      {/* Cover Image Section */}
      {quiz.coverImage ? (
        <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-xl shadow-2xl">
          <Image
            src={quiz.coverImage}
            alt={quiz.title}
            className="w-full h-full object-cover"
            width={800}
            height={600}
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
        <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-xl shadow-2xl bg-gradient-to-br from-primary/10 to-primary/20 dark:from-primary/20 dark:to-primary/30 border-2 border-dashed border-primary/30">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-center">
              <ImageIcon className="h-16 w-16 text-primary/60 dark:text-primary/60 mx-auto mb-3" />
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

      {/* Quiz Info Card */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent>
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-semibold mb-2">{quiz.title}</h1>
              <p className="text-muted-foreground text-justify">{quiz.description}</p>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">{quiz.questions.length}</div>
                  <div className="text-sm text-muted-foreground">Questions</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Free</div>
                  <div className="text-sm text-muted-foreground">No cost</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Instant</div>
                  <div className="text-sm text-muted-foreground">Results</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Authentication Options */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Sign In Option */}
        <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Sign In
            </CardTitle>
            <CardDescription>
              Already have an account? Sign in to continue your journey.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Access your quiz history</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Track your progress over time</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Save personalized recommendations</span>
              </div>
            </div>
            
            <Button 
              className="w-full" 
              size="lg"
              onClick={() => handleAuthRedirect('login')}
              disabled={isRedirecting}
            >
              {isRedirecting ? 'Redirecting...' : 'Sign In'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Sign Up Option */}
        <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Create Account
            </CardTitle>
            <CardDescription>
              New to Tiny Steps A Day? Create a free account to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Free account creation</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Access to all quizzes</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Personalized learning path</span>
              </div>
            </div>
            
            <Button 
              className="w-full" 
              size="lg"
              variant="outline"
              onClick={() => handleAuthRedirect('signup')}
              disabled={isRedirecting}
            >
              {isRedirecting ? 'Redirecting...' : 'Create Account'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Why Authentication */}
      <Card>
        <CardHeader>
          <CardTitle>Why authenticate?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-medium">Personalized Experience</h4>
              <p className="text-sm text-muted-foreground">
                We save your quiz results and progress to provide you with a personalized learning experience tailored to your needs.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Track Your Progress</h4>
              <p className="text-sm text-muted-foreground">
                Monitor your growth over time and see how your understanding and skills develop through our assessments.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Save Recommendations</h4>
              <p className="text-sm text-muted-foreground">
                Access your personalized course and product recommendations anytime, and receive updates as new content becomes available.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Secure & Private</h4>
              <p className="text-sm text-muted-foreground">
                Your data is protected and private. We never share your personal information with third parties.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Back to Quiz List */}
      <div className="text-center">
        <Link href="/quiz">
          <Button variant="ghost">
            ← Back to Quiz List
          </Button>
        </Link>
      </div>
    </div>
  )
} 