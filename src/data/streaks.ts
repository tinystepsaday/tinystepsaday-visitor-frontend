// Streak and Review types
export interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface StreakGoal {
  id: string;
  title: string;
  description: string;
  targetHours?: number;
  isRequired: boolean;
}

export interface CheckInActivity {
  id: string;
  goalId: string;
  startTime: string;
  endTime: string;
  hours: number;
  notes?: string;
}

export interface CheckIn {
  id: string;
  date: string;
  activities: CheckInActivity[];
  reflection: string;
  completed: boolean;
}

export interface UserStreakProgress {
  userId: string;
  streakId: string;
  enrolledDate: string;
  currentStreak: number;
  longestStreak: number;
  totalCheckIns: number;
  lastCheckIn?: string;
  checkIns: CheckIn[];
  isActive: boolean;
}

export interface Streak {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  creatorId: string;
  creatorName: string;
  startDate: string; // ISO string
  endDate: string; // ISO string
  durationGoal: number; // in days
  checkInFrequency: 'daily' | '3times-week' | 'weekly' | 'monthly' | 'quarterly';
  goals: StreakGoal[];
  guidelines: string[];
  milestones: { days: number; name: string; achieved: boolean }[];
  enrolledCount: number;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  isPublic: boolean;
  requiresApproval: boolean;
  maxParticipants?: number;
  tags: string[];
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTimePerDay: number; // in minutes
  privacyPolicy: string;
  termsAndConditions: string;
}

export const streaks: Streak[] = [
  {
    id: "1",
    slug: "meditation-streak",
    title: "Meditation Streak",
    description: "Daily mindfulness practice to cultivate inner peace and mental clarity",
    icon: "🧘",
    creatorId: "creator1",
    creatorName: "Mindful Living",
    startDate: "2025-04-10T00:00:00.000Z",
    endDate: "2025-06-10T00:00:00.000Z",
    durationGoal: 60,
    checkInFrequency: "daily",
    goals: [
      {
        id: "goal1",
        title: "Daily Meditation",
        description: "Practice meditation for at least 10 minutes",
        targetHours: 0.17, // 10 minutes
        isRequired: true
      },
      {
        id: "goal2",
        title: "Mindful Breathing",
        description: "Focus on your breath and be present",
        isRequired: false
      }
    ],
    guidelines: [
      "Meditate for at least 10 minutes per day",
      "Find a quiet space with minimal distractions",
      "Focus on your breath and be present in the moment",
      "Try different meditation techniques to find what works for you",
    ],
    milestones: [
      { days: 7, name: "Week Warrior", achieved: false },
      { days: 30, name: "Monthly Master", achieved: false },
      { days: 100, name: "Century Club", achieved: false },
    ],
    enrolledCount: 1250,
    rating: 4.8,
    reviewCount: 325,
    reviews: [
      {
        id: 1,
        user: "John D.",
        rating: 5,
        comment: "This streak challenge has transformed my daily routine!",
        date: "2025-04-15",
      },
      {
        id: 2,
        user: "Sarah M.",
        rating: 5,
        comment: "Great community support and motivation.",
        date: "2025-04-14",
      },
    ],
    isPublic: true,
    requiresApproval: false,
    tags: ["meditation", "mindfulness", "wellness"],
    category: "Mental Health",
    difficulty: "beginner",
    estimatedTimePerDay: 15,
    privacyPolicy: "Your data and progress will be kept confidential and used only to track your personal growth journey.",
    termsAndConditions: "By joining this streak, participants agree to follow the guidelines and practice safely."
  },
  {
    id: "2",
    slug: "reading-streak",
    title: "Reading Streak",
    description: "Build a daily reading habit to expand knowledge and imagination",
    icon: "📚",
    creatorId: "creator2",
    creatorName: "Book Lovers Community",
    startDate: "2025-03-01T00:00:00.000Z",
    endDate: "2025-06-01T00:00:00.000Z",
    durationGoal: 90,
    checkInFrequency: "daily",
    goals: [
      {
        id: "goal3",
        title: "Daily Reading",
        description: "Read at least 20 pages per day",
        targetHours: 0.5,
        isRequired: true
      },
      {
        id: "goal4",
        title: "Reading Reflection",
        description: "Write a brief reflection on what you read",
        isRequired: false
      }
    ],
    guidelines: [
      "Read at least 20 pages per day",
      "Choose books that inspire and challenge you",
      "Reflect on what you read in a journal",
    ],
    milestones: [
      { days: 7, name: "Bookworm", achieved: true },
      { days: 30, name: "Page Turner", achieved: false },
      { days: 100, name: "Literary Legend", achieved: false },
    ],
    enrolledCount: 890,
    rating: 4.6,
    reviewCount: 210,
    reviews: [
      {
        id: 3,
        user: "Alex P.",
        rating: 4,
        comment: "Helped me finally stick to my reading goals!",
        date: "2025-04-10",
      },
    ],
    isPublic: true,
    requiresApproval: false,
    tags: ["reading", "learning", "knowledge"],
    category: "Education",
    difficulty: "beginner",
    estimatedTimePerDay: 30,
    privacyPolicy: "Your data and progress will be kept confidential and used only to track your personal growth journey.",
    termsAndConditions: "By joining this streak, participants agree to follow the guidelines and practice safely."
  },
  {
    id: "3",
    slug: "gratitude-streak",
    title: "Gratitude Streak",
    description: "Daily gratitude journaling to cultivate positivity and appreciation",
    icon: "🙏",
    creatorId: "creator3",
    creatorName: "Positive Living",
    startDate: "2025-04-05T00:00:00.000Z",
    endDate: "2025-07-05T00:00:00.000Z",
    durationGoal: 90,
    checkInFrequency: "daily",
    goals: [
      {
        id: "goal5",
        title: "Gratitude Journal",
        description: "Write down three things you're grateful for each day",
        isRequired: true
      },
      {
        id: "goal6",
        title: "Gratitude Sharing",
        description: "Share gratitude with someone else",
        isRequired: false
      }
    ],
    guidelines: [
      "Write down three things you're grateful for each day",
      "Reflect on positive moments before bed",
      "Share gratitude with others when possible",
    ],
    milestones: [
      { days: 7, name: "Thankful Week", achieved: false },
      { days: 30, name: "Gratitude Guru", achieved: false },
      { days: 100, name: "Appreciation Ace", achieved: false },
    ],
    enrolledCount: 830,
    rating: 4.9,
    reviewCount: 150,
    reviews: [
      {
        id: 4,
        user: "Maria L.",
        rating: 5,
        comment: "A simple but powerful habit!",
        date: "2025-04-12",
      },
    ],
    isPublic: true,
    requiresApproval: false,
    tags: ["gratitude", "positivity", "mindfulness"],
    category: "Mental Health",
    difficulty: "beginner",
    estimatedTimePerDay: 10,
    privacyPolicy: "Your data and progress will be kept confidential and used only to track your personal growth journey.",
    termsAndConditions: "By joining this streak, participants agree to follow the guidelines and practice safely."
  },
];

// Mock user streak progress data
export const userStreakProgress: UserStreakProgress[] = [
  {
    userId: "user1",
    streakId: "1",
    enrolledDate: "2025-04-10T00:00:00.000Z",
    currentStreak: 5,
    longestStreak: 7,
    totalCheckIns: 5,
    lastCheckIn: "2025-04-15T00:00:00.000Z",
    checkIns: [
      {
        id: "checkin1",
        date: "2025-04-15T00:00:00.000Z",
        activities: [
          {
            id: "activity1",
            goalId: "goal1",
            startTime: "2025-04-15T07:00:00.000Z",
            endTime: "2025-04-15T07:15:00.000Z",
            hours: 0.25,
            notes: "Morning meditation session"
          }
        ],
        reflection: "Felt very peaceful and centered today. The morning meditation helped me start the day with clarity.",
        completed: true
      }
    ],
    isActive: true
  }
];

// Check-in frequency options
export const checkInFrequencyOptions = [
  { value: 'daily', label: 'Daily' },
  { value: '3times-week', label: '3 Times a Week' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' }
];

// Streak categories
export const streakCategories = [
  'Mental Health',
  'Physical Health',
  'Education',
  'Productivity',
  'Relationships',
  'Creativity',
  'Finance',
  'Spirituality',
  'Other'
];

// Streak difficulty levels
export const difficultyLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' }
];
