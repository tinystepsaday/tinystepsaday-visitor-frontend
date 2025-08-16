"use client"

import { useEffect, useState } from "react";
import { ArrowLeft, Book, Target, Package, Clock, Calendar, CheckCircle, XCircle, AlertCircle, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { getQuizResultById, getQuizById, type QuizResult, type Quiz } from "@/data/quizzes";
import { downloadQuizResultPDF } from "@/utils/pdfGenerator";

interface QuizResultDetailsProps {
  resultId: string;
}

interface QuizResultWithQuiz extends QuizResult {
  quiz: Quiz;
  matchingCriteria?: {
    name: string;
    description: string;
    recommendations: string[];
    proposedCourses: Array<{ id: string; name: string; slug: string }>;
    proposedProducts: Array<{ id: string; name: string; slug: string }>;
    proposedStreaks: Array<{ id: string; name: string; slug: string }>;
  };
}

export default function QuizResultDetails({ resultId }: QuizResultDetailsProps) {
  const [result, setResult] = useState<QuizResultWithQuiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizResult = async () => {
      try {
        setIsLoading(true);
        const quizResult = await getQuizResultById(resultId);
        
        if (!quizResult) {
          setError('Quiz result not found');
          return;
        }

        const quiz = await getQuizById(quizResult.quizId);
        if (!quiz) {
          setError('Quiz not found');
          return;
        }

        // Find matching grading criteria based on score
        const matchingCriteria = quiz.gradingCriteria.find(criteria => 
          quizResult.percentage >= criteria.minScore && quizResult.percentage <= criteria.maxScore
        );

        setResult({
          ...quizResult,
          quiz,
          matchingCriteria: matchingCriteria ? {
            name: matchingCriteria.name,
            description: matchingCriteria.description || "",
            recommendations: matchingCriteria.recommendations,
            proposedCourses: matchingCriteria.proposedCourses,
            proposedProducts: matchingCriteria.proposedProducts,
            proposedStreaks: matchingCriteria.proposedStreaks
          } : undefined
        });
      } catch (err) {
        setError('Failed to load quiz result');
        console.error('Error fetching quiz result:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizResult();
  }, [resultId]);

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'excellent':
        return 'bg-green-100 text-green-800';
      case 'good':
        return 'bg-blue-100 text-blue-800';
      case 'fair':
        return 'bg-yellow-100 text-yellow-800';
      case 'needs-improvement':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAnswerValue = (questionId: string, answerId: string | null) => {
    if (!result || !answerId) return 0;
    
    const question = result.quiz.questions.find(q => q.id === questionId);
    if (!question) return 0;
    
    const option = question.options.find(o => o.id === answerId);
    return option ? option.value : 0;
  };

  const getUserAnswer = (questionId: string) => {
    if (!result) return null;
    
    // Handle both array and Record formats for backward compatibility
    if (Array.isArray(result.answers)) {
      // New format: array of { questionId, optionId }
      const userAnswer = result.answers.find((answer: { questionId: string; optionId: string }) => answer.questionId === questionId);
      return userAnswer ? userAnswer.optionId : null;
    } else if (typeof result.answers === 'object' && result.answers !== null) {
      // Old format: Record<string, string>
      return (result.answers as Record<string, string>)[questionId] || null;
    }
    return null;
  };

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/quiz-results">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Results
            </Button>
          </Link>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button asChild>
            <Link href="/dashboard/quiz-results">Back to Quiz Results</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/quiz-results">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Results
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading quiz result...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/quiz-results">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Results
            </Button>
          </Link>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Quiz result not found.</p>
          <Button asChild>
            <Link href="/dashboard/quiz-results">Back to Quiz Results</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/quiz-results">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Results
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => downloadQuizResultPDF(result.quiz, result)}
          >
            <FileText className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Quiz Result Details</h1>
            <p className="text-muted-foreground">
              {result.quiz.title} - {format(new Date(result.completedAt), "MMM d, yyyy")}
            </p>
          </div>
      </div>

      {/* Result Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{result.percentage}%</div>
            <p className="text-xs text-muted-foreground">
              {result.score}/{result.maxScore} points
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classification</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Badge className={getLevelBadgeColor(result.level)}>
              {result.matchingCriteria?.name || result.classification}
            </Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{result.timeSpent} min</div>
            <p className="text-xs text-muted-foreground">
              Estimated: {result.quiz.estimatedTime}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">
              {format(new Date(result.completedAt), "MMM d, yyyy")}
            </div>
            <p className="text-xs text-muted-foreground">
              {format(new Date(result.completedAt), "h:mm a")}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
              <CardDescription>
                Overall assessment and feedback
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Performance Level</span>
                  <Badge className={getLevelBadgeColor(result.level)}>
                    {result.matchingCriteria?.name || result.level}
                  </Badge>
                </div>
                <Progress value={result.percentage} className="h-2" />
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Feedback</h4>
                <p className="text-sm">{result.matchingCriteria?.description || result.feedback}</p>
              </div>
            </CardContent>
          </Card>

          {/* Question Responses */}
          <Card>
            <CardHeader>
              <CardTitle>Question Responses</CardTitle>
              <CardDescription>
                Detailed breakdown of each question and answer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {result.quiz.questions.map((question, index) => {
                  const userAnswer = getUserAnswer(question.id);
                  const userAnswerValue = getAnswerValue(question.id, userAnswer);
                  const maxValue = Math.max(...question.options.map(o => o.value));
                  const isGoodAnswer = userAnswerValue <= maxValue / 2; // Lower values are better in this system
                  
                  return (
                    <div key={question.id} className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="font-medium">{question.text}</p>
                            {userAnswer ? (
                              isGoodAnswer ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-500" />
                              )
                            ) : (
                              <AlertCircle className="h-4 w-4 text-yellow-500" />
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            {question.options.map((option) => (
                              <div 
                                key={option.id} 
                                className={`flex items-center gap-3 p-2 border rounded ${
                                  option.id === userAnswer ? 'bg-blue-50 border-blue-200' : ''
                                }`}
                              >
                                <div className="w-4 h-4 border rounded flex items-center justify-center text-xs">
                                  {String.fromCharCode(65 + question.options.indexOf(option))}
                                </div>
                                <span className="text-sm flex-1">{option.text}</span>
                                <Badge variant="outline" className="ml-auto">
                                  {option.value} pts
                                </Badge>
                                {option.id === userAnswer && (
                                  <Badge className="bg-blue-100 text-blue-800">
                                    Selected
                                  </Badge>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {index < result.quiz.questions.length - 1 && <Separator />}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quiz Information */}
          <Card>
            <CardHeader>
              <CardTitle>Quiz Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Quiz</label>
                <p className="text-sm">{result.quiz.title}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Category</label>
                <p className="text-sm">{result.quiz.category}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Difficulty</label>
                <Badge className={
                  result.quiz.difficulty === 'BEGINNER' ? 'bg-green-100 text-green-800' :
                  result.quiz.difficulty === 'INTERMEDIATE' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }>
                  {result.quiz.difficulty}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>
                Personalized suggestions for improvement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(result.matchingCriteria?.recommendations || result.recommendations).map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Proposed Courses */}
          {result.matchingCriteria?.proposedCourses && result.matchingCriteria.proposedCourses.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  Recommended Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {result.matchingCriteria.proposedCourses.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm font-medium">{course.name}</span>
                      <Link href={`/courses/${course.slug}`}>
                        <Button variant="outline" size="sm">
                          View Course
                          <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Proposed Products */}
          {result.matchingCriteria?.proposedProducts && result.matchingCriteria.proposedProducts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Recommended Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {result.matchingCriteria.proposedProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm font-medium">{product.name}</span>
                      <Link href={`/shop/${product.slug}`}>
                        <Button variant="outline" size="sm">
                          View Product
                          <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Proposed Streaks */}
          {result.matchingCriteria?.proposedStreaks && result.matchingCriteria.proposedStreaks.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Recommended Streaks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {result.matchingCriteria.proposedStreaks.map((streak, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm font-medium">{streak.name}</span>
                      <Link href={`/streaks/${streak.slug}`}>
                        <Button variant="outline" size="sm">
                          Join Streak
                          <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Areas of Improvement */}
          {result.areasOfImprovement.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Areas of Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {result.areasOfImprovement.map((area, index) => (
                    <Badge key={index} variant="secondary" className="mr-1 mb-1">
                      {area}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Support Needed */}
          {result.supportNeeded.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Support Needed</CardTitle>
                <CardDescription>
                  Resources and assistance recommended
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {result.supportNeeded.map((support, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-sm">{support}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <Button
          onClick={() => window.history.back()}
          variant="outline"
          className="flex-1"
        >
          Back to Results
        </Button>
        
        <Link href={`/quiz/${result.quizId}`} className="flex-1">
          <Button className="w-full">
            Retake Quiz
          </Button>
        </Link>
        
        <Link href="/quiz" className="flex-1">
          <Button variant="outline" className="w-full">
            Try Another Quiz
          </Button>
        </Link>
      </div>
    </div>
  );
} 