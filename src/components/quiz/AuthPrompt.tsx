"use client"

import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, ArrowRight, CheckCircle, Clock, Target } from 'lucide-react'
import Link from 'next/link'
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
      {/* Quiz Info Card */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-4 flex-wrap">
            <Badge variant="secondary" className="text-sm">
              {quiz.category}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {quiz.difficulty} level
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{quiz.estimatedTime}</span>
            </div>
          </div>
        </CardHeader>
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
          <CardTitle>Why do we require authentication?</CardTitle>
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