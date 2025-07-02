// Streak and Review types
export interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Streak {
  slug: string;
  title: string;
  description: string;
  icon: string;
  currentStreak: number;
  longestStreak: number;
  startDate: string; // ISO string
  endDate: string; // ISO string
  lastCheckIn: string; // ISO string
  frequency: string;
  guidelines: string[];
  milestones: { days: number; name: string; achieved: boolean }[];
  enrolledCount: number;
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

export const streaks: Streak[] = [
  {
    slug: "meditation-streak",
    title: "Meditation Streak",
    description: "Daily mindfulness practice",
    icon: "🧘",
    currentStreak: 5,
    longestStreak: 7,
    startDate: "2025-04-10T00:00:00.000Z",
    endDate: "2025-06-10T00:00:00.000Z",
    lastCheckIn: new Date().toISOString(),
    frequency: "Daily",
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
  },
  {
    slug: "reading-streak",
    title: "Reading Streak",
    description: "Build a daily reading habit",
    icon: "📚",
    currentStreak: 12,
    longestStreak: 15,
    startDate: "2025-03-01T00:00:00.000Z",
    endDate: "2025-06-01T00:00:00.000Z",
    lastCheckIn: "2025-04-16T00:00:00.000Z",
    frequency: "Daily",
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
  },
  {
    slug: "gratitude-streak",
    title: "Gratitude Streak",
    description: "Daily gratitude journaling",
    icon: "🙏",
    currentStreak: 3,
    longestStreak: 8,
    startDate: "2025-04-05T00:00:00.000Z",
    endDate: "2025-07-05T00:00:00.000Z",
    lastCheckIn: "2025-04-15T00:00:00.000Z",
    frequency: "Daily",
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
  },
];
