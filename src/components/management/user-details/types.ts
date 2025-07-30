export const statusColors = {
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
} as const;

export type StatusType = keyof typeof statusColors;

export interface Activity {
  id: string;
  description: string;
  type: string;
  timestamp: Date;
}

export interface CourseEnrollment {
  id: string;
  courseName: string;
  progress: number;
  completedAt: Date | null;
  enrolledAt: Date;
  totalTimeSpent: number;
}

export interface StreakEnrollment {
  id: string;
  streakName: string;
  isActive: boolean;
  currentStreak: number;
  longestStreak: number;
  totalCheckIns: number;
  enrolledAt: Date;
}

export interface Payment {
  id: string;
  description: string;
  amount: number;
  status: StatusType;
  paymentMethod: string;
  createdAt: Date;
  transactionId: string;
}

export interface Subscription {
  id: string;
  tier: string;
  monthlyAmount: number;
  status: StatusType;
  startDate: Date;
  endDate: Date | null;
  autoRenew: boolean;
}

export interface Consultation {
  id: string;
  consultantName: string;
  type: string;
  status: StatusType;
  scheduledAt: Date;
  duration: number;
  amount: number;
  feedback?: { rating: number };
}

export interface Mentorship {
  id: string;
  programName: string;
  mentorName: string;
  status: StatusType;
  sessionsCompleted: number;
  totalSessions: number;
  amount: number;
  startDate: Date;
  feedback?: { rating: number };
}

export interface QuizResult {
  id: string;
  quizName: string;
  percentage: number;
  score: number;
  maxScore: number;
  level: string;
  timeSpent: number;
  completedAt: Date;
  certificateEarned: boolean;
}

export interface ReadingListItem {
  id: string;
  articleTitle: string;
  category: string;
  isBookmarked: boolean;
  readAt: Date;
}

export interface UserPreference {
  id: string;
  key: string;
  category: string;
  value: boolean | string;
} 