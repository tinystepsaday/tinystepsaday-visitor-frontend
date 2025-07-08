"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  mockUsers,
  mockUserActivities,
  mockUserCourseEnrollments,
  mockUserStreakEnrollments,
  mockUserPayments,
  mockUserSubscriptions,
  mockUserConsultations,
  mockUserMentorships,
  mockUserQuizResults,
  mockUserReadingList,
  mockUserPurchases,
  mockUserPreferences
} from "@/data/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import {
  Edit,
  Save,
  Mail,
  Shield,
  ShieldCheck,
  Eye,
  Activity,
  BookOpen,
  Users,
  Award,
  Clock,
  TrendingUp,
  ArrowLeft,
  DollarSign,
  BarChart3,
  Zap,
  CreditCard,
  FileText,
  Download,
  Video,
  Settings,
  MessageSquare,
  CheckCircle,
  CalendarDays,
  Star,
  Bookmark,
  Heart,
  Bell,
} from "lucide-react"
import { DetailPageLoader } from "@/components/ui/loaders"
import type {
  User,
  UserActivity,
  UserCourseEnrollment,
  UserStreakEnrollment,
  UserPayment,
  UserSubscription,
  UserConsultation,
  UserMentorship,
  UserQuizResult,
  UserReadingList,
  UserPurchase,
  UserPreference
} from "@/lib/types"

const roleConfig = {
  admin: { label: "Admin", icon: ShieldCheck, variant: "destructive" as const },
  editor: { label: "Editor", icon: Shield, variant: "default" as const },
  viewer: { label: "Viewer", icon: Eye, variant: "secondary" as const },
  subscriber: { label: "Subscriber", icon: Mail, variant: "outline" as const },
  learner: { label: "Learner", icon: BookOpen, variant: "outline" as const },
  "learner-subscriber": { label: "Learner-Subscriber", icon: Users, variant: "outline" as const },
}

const statusColors = {
  active: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
  pending: "bg-yellow-100 text-yellow-800",
  cancelled: "bg-red-100 text-red-800",
  expired: "bg-gray-100 text-gray-800",
  "in-progress": "bg-purple-100 text-purple-800",
  scheduled: "bg-orange-100 text-orange-800",
  "no-show": "bg-red-100 text-red-800",
  failed: "bg-red-100 text-red-800",
  refunded: "bg-gray-100 text-gray-800"
}

export default function UserDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.id as string

  const [user, setUser] = useState<User | undefined>()
  const [activities, setActivities] = useState<UserActivity[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState<User | undefined>()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  // User activity data
  const [courseEnrollments, setCourseEnrollments] = useState<UserCourseEnrollment[]>([])
  const [streakEnrollments, setStreakEnrollments] = useState<UserStreakEnrollment[]>([])
  const [payments, setPayments] = useState<UserPayment[]>([])
  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([])
  const [consultations, setConsultations] = useState<UserConsultation[]>([])
  const [mentorships, setMentorships] = useState<UserMentorship[]>([])
  const [quizResults, setQuizResults] = useState<UserQuizResult[]>([])
  const [readingList, setReadingList] = useState<UserReadingList[]>([])
  const [purchases, setPurchases] = useState<UserPurchase[]>([])
  const [preferences, setPreferences] = useState<UserPreference[]>([])

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const foundUser = mockUsers.find((u) => u.id === userId)
      const userActivities = mockUserActivities.filter(a => a.userId === userId)

      // Load all user activity data
      const userCourseEnrollments = mockUserCourseEnrollments.filter(e => e.userId === userId)
      const userStreakEnrollments = mockUserStreakEnrollments.filter(s => s.userId === userId)
      const userPayments = mockUserPayments.filter(p => p.userId === userId)
      const userSubscriptions = mockUserSubscriptions.filter(s => s.userId === userId)
      const userConsultations = mockUserConsultations.filter(c => c.userId === userId)
      const userMentorships = mockUserMentorships.filter(m => m.userId === userId)
      const userQuizResults = mockUserQuizResults.filter(q => q.userId === userId)
      const userReadingList = mockUserReadingList.filter(r => r.userId === userId)
      const userPurchases = mockUserPurchases.filter(p => p.userId === userId)
      const userPreferences = mockUserPreferences.filter(p => p.userId === userId)

      setUser(foundUser)
      setEditedUser(foundUser)
      setActivities(userActivities)
      setCourseEnrollments(userCourseEnrollments)
      setStreakEnrollments(userStreakEnrollments)
      setPayments(userPayments)
      setSubscriptions(userSubscriptions)
      setConsultations(userConsultations)
      setMentorships(userMentorships)
      setQuizResults(userQuizResults)
      setReadingList(userReadingList)
      setPurchases(userPurchases)
      setPreferences(userPreferences)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [userId])

  if (isLoading) {
    return <DetailPageLoader title="Loading User Details..." subtitle="Please wait while we fetch the user information" />
  }

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">User Not Found</h2>
          <p className="text-muted-foreground">The user you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => router.push("/management/users")} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Button>
        </div>
      </div>
    )
  }

  const handleSave = () => {
    console.log("Saving user:", editedUser)
    setUser(editedUser)
    setIsEditing(false)
  }

  const config = roleConfig[user.role]

  const formatActivityType = (type: string) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  const getTotalSpent = () => {
    return payments.reduce((total, payment) => total + payment.amount, 0)
  }

  const getActiveSubscriptions = () => {
    return subscriptions.filter(sub => sub.status === "active")
  }

  const getCompletedCourses = () => {
    return courseEnrollments.filter(course => course.completedAt)
  }

  const getActiveStreaks = () => {
    return streakEnrollments.filter(streak => streak.isActive)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center flex-col w-full gap-4">
        <div className="flex items-center w-full justify-between">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit User
              </Button>
            )}
          </div>
        </div>
        <div className="flex justify-start flex-col w-full">
          <h2 className="text-3xl font-bold tracking-tight">User Details</h2>
          <p className="text-muted-foreground">Comprehensive view of user activities and engagement</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* User Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-lg">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
              <Badge variant={config.variant} className="flex items-center gap-1 w-fit mx-auto">
                <config.icon className="h-3 w-3" />
                {config.label}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge variant={user.isActive ? "default" : "secondary"}>{user.isActive ? "Active" : "Inactive"}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Member Since</span>
                <span className="text-sm text-muted-foreground">{user.createdAt.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Login</span>
                <span className="text-sm text-muted-foreground">
                  {user.lastLogin ? user.lastLogin.toLocaleDateString() : "Never"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Logins</span>
                <span className="text-sm text-muted-foreground">{user.totalLogins || 0}</span>
              </div>

              {/* Quick Stats */}
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Courses Enrolled</span>
                  <span className="text-sm text-muted-foreground">{courseEnrollments.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Active Streaks</span>
                  <span className="text-sm text-muted-foreground">{getActiveStreaks().length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Spent</span>
                  <span className="text-sm text-muted-foreground">${getTotalSpent().toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Active Subscriptions</span>
                  <span className="text-sm text-muted-foreground">{getActiveSubscriptions().length}</span>
                </div>
              </div>

              <Separator />
              <Button className="w-full bg-transparent" variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="learning">Learning</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="consultations">Consultations</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{courseEnrollments.length}</div>
                    <p className="text-xs text-muted-foreground">
                      {getCompletedCourses().length} completed
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Streaks</CardTitle>
                    <Zap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{getActiveStreaks().length}</div>
                    <p className="text-xs text-muted-foreground">Current challenges</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${getTotalSpent().toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">Lifetime value</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Quiz Results</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{quizResults.length}</div>
                    <p className="text-xs text-muted-foreground">Assessments taken</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest user actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activities.slice(0, 5).map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-3">
                          <Activity className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {activity.timestamp.toLocaleString()}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {formatActivityType(activity.type)}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Active Subscriptions</CardTitle>
                    <CardDescription>Current subscription status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {getActiveSubscriptions().map((subscription) => (
                        <div key={subscription.id} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">{subscription.tier} Plan</p>
                            <p className="text-xs text-muted-foreground">
                              ${subscription.monthlyAmount}/month
                            </p>
                          </div>
                          <Badge className={statusColors[subscription.status]}>
                            {subscription.status}
                          </Badge>
                        </div>
                      ))}
                      {getActiveSubscriptions().length === 0 && (
                        <p className="text-sm text-muted-foreground">No active subscriptions</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Learning Tab */}
            <TabsContent value="learning" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{courseEnrollments.length}</div>
                    <p className="text-xs text-muted-foreground">Total enrollments</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{getCompletedCourses().length}</div>
                    <p className="text-xs text-muted-foreground">Certificates earned</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {Math.round(courseEnrollments.reduce((total, course) => total + course.totalTimeSpent, 0) / 60)}
                    </div>
                    <p className="text-xs text-muted-foreground">Hours spent learning</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Quiz Average</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {quizResults.length > 0
                        ? Math.round(quizResults.reduce((total, quiz) => total + quiz.percentage, 0) / quizResults.length)
                        : 0}%
                    </div>
                    <p className="text-xs text-muted-foreground">Average score</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Enrollments</CardTitle>
                    <CardDescription>All enrolled courses and progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {courseEnrollments.map((enrollment) => (
                        <div key={enrollment.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{enrollment.courseName}</h4>
                            <Badge variant={enrollment.completedAt ? "default" : "secondary"}>
                              {enrollment.completedAt ? "Completed" : `${enrollment.progress}%`}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{enrollment.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${enrollment.progress}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Enrolled: {enrollment.enrolledAt.toLocaleDateString()}</span>
                              <span>{enrollment.totalTimeSpent} min</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Streak Enrollments</CardTitle>
                    <CardDescription>Active and completed streaks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {streakEnrollments.map((streak) => (
                        <div key={streak.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{streak.streakName}</h4>
                            <Badge variant={streak.isActive ? "default" : "secondary"}>
                              {streak.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Current Streak</span>
                              <span>{streak.currentStreak} days</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Longest Streak</span>
                              <span>{streak.longestStreak} days</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Total Check-ins</span>
                              <span>{streak.totalCheckIns}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Enrolled: {streak.enrolledAt.toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Quiz Results</CardTitle>
                  <CardDescription>Assessment performance and feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {quizResults.map((quiz) => (
                      <div key={quiz.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{quiz.quizName}</h4>
                          <Badge variant={quiz.percentage >= 80 ? "default" : quiz.percentage >= 60 ? "secondary" : "destructive"}>
                            {quiz.percentage}%
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Score</span>
                            <span>{quiz.score}/{quiz.maxScore}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Level</span>
                            <span className="capitalize">{quiz.level}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Time Spent</span>
                            <span>{quiz.timeSpent} min</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Completed: {quiz.completedAt.toLocaleDateString()}
                          </div>
                          {quiz.certificateEarned && (
                            <div className="flex items-center gap-2 text-sm text-green-600">
                              <Award className="h-4 w-4" />
                              Certificate earned
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {quizResults.length === 0 && (
                      <p className="text-center text-muted-foreground py-8">No quiz results available</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Financial Tab */}
            <TabsContent value="financial" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${getTotalSpent().toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">Lifetime value</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{getActiveSubscriptions().length}</div>
                    <p className="text-xs text-muted-foreground">Current plans</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{payments.length}</div>
                    <p className="text-xs text-muted-foreground">Transactions</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Purchases</CardTitle>
                    <Download className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{purchases.length}</div>
                    <p className="text-xs text-muted-foreground">Digital products</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                    <CardDescription>All financial transactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {payments.map((payment) => (
                        <div key={payment.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-medium">{payment.description}</h4>
                              <p className="text-sm text-muted-foreground">{payment.paymentMethod}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">${payment.amount}</div>
                              <Badge className={statusColors[payment.status]}>
                                {payment.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{payment.createdAt.toLocaleDateString()}</span>
                            <span>{payment.transactionId}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Subscriptions</CardTitle>
                    <CardDescription>Current and past subscription plans</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {subscriptions.map((subscription) => (
                        <div key={subscription.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-medium">{subscription.tier} Plan</h4>
                              <p className="text-sm text-muted-foreground">${subscription.monthlyAmount}/month</p>
                            </div>
                            <Badge className={statusColors[subscription.status]}>
                              {subscription.status}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Start Date</span>
                              <span>{subscription.startDate.toLocaleDateString()}</span>
                            </div>
                            {subscription.endDate && (
                              <div className="flex justify-between text-sm">
                                <span>End Date</span>
                                <span>{subscription.endDate.toLocaleDateString()}</span>
                              </div>
                            )}
                            <div className="flex justify-between text-sm">
                              <span>Auto Renew</span>
                              <span>{subscription.autoRenew ? "Yes" : "No"}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Digital Purchases</CardTitle>
                  <CardDescription>E-books, workshops, and digital products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {purchases.map((purchase) => (
                      <div key={purchase.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-muted rounded">
                              {purchase.productType === "ebook" && <FileText className="h-4 w-4" />}
                              {purchase.productType === "workshop" && <Video className="h-4 w-4" />}
                              {purchase.productType === "course" && <BookOpen className="h-4 w-4" />}
                              {purchase.productType === "tool" && <Settings className="h-4 w-4" />}
                            </div>
                            <div>
                              <h4 className="font-medium">{purchase.productName}</h4>
                              <p className="text-sm text-muted-foreground capitalize">{purchase.productType}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">${purchase.amount}</div>
                            <Badge className={statusColors[purchase.status]}>
                              {purchase.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Purchased: {purchase.purchasedAt.toLocaleDateString()}</span>
                          {purchase.accessExpiry && (
                            <span>Expires: {purchase.accessExpiry.toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Consultations Tab */}
            <TabsContent value="consultations" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Consultations</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{consultations.length}</div>
                    <p className="text-xs text-muted-foreground">Sessions booked</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {consultations.filter(c => c.status === "completed").length}
                    </div>
                    <p className="text-xs text-muted-foreground">Sessions completed</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {consultations.filter(c => c.status === "scheduled").length}
                    </div>
                    <p className="text-xs text-muted-foreground">Upcoming sessions</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Mentorships</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mentorships.length}</div>
                    <p className="text-xs text-muted-foreground">Programs applied</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Consultation Sessions</CardTitle>
                    <CardDescription>All booked consultation sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {consultations.map((consultation) => (
                        <div key={consultation.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-medium">{consultation.consultantName}</h4>
                              <p className="text-sm text-muted-foreground capitalize">{consultation.type} Consultation</p>
                            </div>
                            <Badge className={statusColors[consultation.status]}>
                              {consultation.status}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Date & Time</span>
                              <span>{consultation.scheduledAt.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Duration</span>
                              <span>{consultation.duration} min</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Amount</span>
                              <span>${consultation.amount}</span>
                            </div>
                            {consultation.feedback && (
                              <div className="flex items-center gap-2 text-sm">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span>{consultation.feedback.rating}/5</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Mentorship Programs</CardTitle>
                    <CardDescription>Applied and active mentorship programs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mentorships.map((mentorship) => (
                        <div key={mentorship.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-medium">{mentorship.programName}</h4>
                              <p className="text-sm text-muted-foreground">with {mentorship.mentorName}</p>
                            </div>
                            <Badge className={statusColors[mentorship.status as keyof typeof statusColors]}>
                              {mentorship.status}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{mentorship.sessionsCompleted}/{mentorship.totalSessions}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Amount</span>
                              <span>${mentorship.amount}</span>
                            </div>
                            {mentorship.startDate && (
                              <div className="flex justify-between text-sm">
                                <span>Start Date</span>
                                <span>{mentorship.startDate.toLocaleDateString()}</span>
                              </div>
                            )}
                            {mentorship.feedback && (
                              <div className="flex items-center gap-2 text-sm">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span>{mentorship.feedback.rating}/5</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>User&apos;s recent actions and system interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.length > 0 ? (
                      activities.map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                          <Activity className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {activity.timestamp.toLocaleString()}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {formatActivityType(activity.type)}
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Activity className="h-8 w-8 mx-auto mb-2" />
                        <p>No recent activity</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reading List</CardTitle>
                  <CardDescription>Articles and content bookmarked by the user</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {readingList.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Bookmark className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">{item.articleTitle}</h4>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.isBookmarked && <Heart className="h-4 w-4 text-red-500" />}
                          <Badge variant="outline" className="text-xs">
                            {item.readAt ? "Read" : "Unread"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4" />
                      <span className="text-sm">{user.preferences?.emailNotifications ? "Enabled" : "Disabled"}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4" />
                      <span className="text-sm">{user.preferences?.pushNotifications ? "Enabled" : "Disabled"}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Newsletter</Label>
                      <p className="text-sm text-muted-foreground">Receive our newsletter</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{user.preferences?.newsletter ? "Subscribed" : "Not subscribed"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Preferences</CardTitle>
                  <CardDescription>All user settings and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {preferences.map((pref) => (
                      <div key={pref.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium capitalize">{pref.key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                          <p className="text-sm text-muted-foreground capitalize">{pref.category}</p>
                        </div>
                        <div className="text-sm">
                          {typeof pref.value === 'boolean' ? (pref.value ? "Yes" : "No") : pref.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}