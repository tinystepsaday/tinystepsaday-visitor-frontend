export interface QuizOption {
  id: string;
  text: string;
  value: number;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
}

export interface GradingCriteria {
  id: string;
  name: string;
  minScore: number;
  maxScore: number;
  label: string;
  color: string;
  recommendations: string[];
  proposedCourses: Array<{ id: string; name: string; slug: string }>;
  proposedProducts: Array<{ id: string; name: string; slug: string }>;
  proposedStreaks: Array<{ id: string; name: string; slug: string }>;
  description?: string;
}

export interface Quiz {
  id: string;
  quizType: 'DEFAULT' | 'ONBOARDING';
  redirectAfterAnswer: 'HOME' | 'RESULTS';
  title: string;
  subtitle: string;
  description: string;
  questions: QuizQuestion[];
  category: string;
  estimatedTime: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  // Management fields
  status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  totalAttempts: number;
  completedAttempts: number;
  averageScore: number;
  averageCompletionTime: number; // in minutes
  tags: string[];
  gradingCriteria: GradingCriteria[];
  createdBy: string;
  updatedBy: string;
  createdByUser: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface QuizResult {
  id: string;
  quizId: string;
  userId: string;
  userName: string;
  userEmail: string;
  score: number;
  maxScore: number;
  percentage: number;
  level: 'excellent' | 'good' | 'fair' | 'needs-improvement';
  feedback: string;
  recommendations: string[];
  completedAt: string;
  timeSpent: number; // in minutes
  answers: Record<string, string>;
  classification: string;
  areasOfImprovement: string[];
  supportNeeded: string[];
}

export interface QuizAnalytics {
  totalAttempts: number;
  completedAttempts: number;
  completionRate: number;
  averageScore: number;
  averageTimeSpent: number;
  levelDistribution: {
    excellent: number;
    good: number;
    fair: number;
    needsImprovement: number;
  };
  dropoffPoints: Array<{
    questionNumber: number;
    dropoffCount: number;
    dropoffRate: number;
  }>;
  popularClassifications: Array<{
    classification: string;
    count: number;
    percentage: number;
  }>;
  timeDistribution: {
    fast: number; // < 5 minutes
    normal: number; // 5-15 minutes
    slow: number; // > 15 minutes
  };
}

export const quizzes: Record<string, Quiz> = {};

// Enhanced quiz data with management fields
export const quizzes2: Record<string, Quiz> = {
  "self-mastery": {
    id: "self-mastery",
    quizType: 'DEFAULT',
    redirectAfterAnswer: 'HOME',
    title: "Master Your Habits",
    subtitle: "Assess your self-discipline, routines, and habits",
    description: "This comprehensive assessment evaluates your current habit formation practices, self-discipline levels, and routine consistency. It provides personalized insights into your strengths and areas for improvement in building sustainable habits that lead to long-term success.",
    category: "Personal Development",
    estimatedTime: "10-15 minutes",
    difficulty: "INTERMEDIATE",
    status: "ACTIVE",
    isPublic: true,
    createdBy: "system",
    updatedBy: "system",
    createdByUser: {
      id: "system",
      firstName: "System",
      lastName: "User",
      email: "system@example.com"
    },
    createdAt: "2025-01-01",
    updatedAt: "2025-01-15",
    totalAttempts: 1247,
    completedAttempts: 1189,
    averageScore: 72.5,
    averageCompletionTime: 12.3,
    tags: ["habits", "self-discipline", "productivity", "routines"],
    gradingCriteria: [
      {
        id: "gc1",
        name: "Habit Master",
        minScore: 80,
        maxScore: 100,
        label: "Habit Master",
        color: "bg-green-100 text-green-800",
        recommendations: [
          "Continue building on your strong foundation",
          "Share your knowledge with others",
          "Consider mentoring or coaching others"
        ],
        proposedCourses: [{ id: "1", name: "Habit Mastery Course", slug: "habit-mastery-course" }],
        proposedProducts: [{ id: "1", name: "Habit Mastery Book", slug: "habit-mastery-book" }],
        proposedStreaks: [{ id: "1", name: "Meditation Streak", slug: "meditation-streak" }],
        description: "Excellent mastery of habits"
      },
      {
        id: "gc2",
        name: "Habit Builder",
        minScore: 60,
        maxScore: 79,
        label: "Habit Builder",
        color: "bg-blue-100 text-blue-800",
        recommendations: [
          "Focus on consistency in your routines",
          "Identify and work on your weakest areas",
          "Set specific, measurable goals"
        ],
        proposedCourses: [{ id: "2", name: "Habit Building Course", slug: "habit-building-course" }],
        proposedProducts: [{ id: "2", name: "Habit Building Book", slug: "habit-building-book" }],
        proposedStreaks: [{ id: "2", name: "Reading Streak", slug: "reading-streak" }],
        description: "Good foundation with room for improvement"
      },
      {
        id: "gc3",
        name: "Habit Learner",
        minScore: 40,
        maxScore: 59,
        label: "Habit Learner",
        color: "bg-yellow-100 text-yellow-800",
        recommendations: [
          "Start with one small change",
          "Create a structured practice routine",
          "Seek accountability from friends or family"
        ],
        proposedCourses: [{ id: "3", name: "Habit Learning Course", slug: "habit-learning-course" }],
        proposedProducts: [{ id: "3", name: "Habit Learning Book", slug: "habit-learning-book" }],
        proposedStreaks: [{ id: "3", name: "Gratitude Streak", slug: "gratitude-streak" }],
        description: "Potential but needs better practices"
      },
      {
        id: "gc4",
        name: "Habit Starter",
        minScore: 0,
        maxScore: 39,
        label: "Habit Starter",
        color: "bg-red-100 text-red-800",
        recommendations: [
          "Start with very small, manageable changes",
          "Consider working with a coach or mentor",
          "Focus on building one practice at a time"
        ],
        proposedCourses: [{ id: "4", name: "Habit Starting Course", slug: "habit-starting-course" }],
        proposedProducts: [{ id: "4", name: "Habit Starting Book", slug: "habit-starting-book" }],
        proposedStreaks: [{ id: "1", name: "Meditation Streak", slug: "meditation-streak" }],
        description: "Significant room for improvement"
      }
    ],
    questions: [
      {
        id: "q1",
        text: "How often do you struggle to stick to a new habit?",
        options: [
          { id: "q1-a", text: "Almost never - I can maintain new habits easily", value: 1 },
          { id: "q1-b", text: "Occasionally - Some habits stick, others don't", value: 2 },
          { id: "q1-c", text: "Often - I regularly start strong but lose momentum", value: 3 },
          { id: "q1-d", text: "Almost always - I find it very difficult to maintain new habits", value: 4 }
        ]
      },
      {
        id: "q2",
        text: "How would you rate your current morning routine?",
        options: [
          { id: "q2-a", text: "Excellent - Consistent, energizing and sets me up for success", value: 1 },
          { id: "q2-b", text: "Good - Mostly consistent but could be improved", value: 2 },
          { id: "q2-c", text: "Fair - Inconsistent but I have some good elements", value: 3 },
          { id: "q2-d", text: "Poor - Chaotic or non-existent", value: 4 }
        ]
      },
      {
        id: "q3",
        text: "When you set goals, how often do you achieve them?",
        options: [
          { id: "q3-a", text: "Almost always - I consistently achieve what I set out to do", value: 1 },
          { id: "q3-b", text: "Usually - I achieve most goals with some exceptions", value: 2 },
          { id: "q3-c", text: "Sometimes - I achieve about half of my goals", value: 3 },
          { id: "q3-d", text: "Rarely - I struggle to follow through on most goals", value: 4 }
        ]
      },
      {
        id: "q4",
        text: "How do you typically respond to setbacks in your routine?",
        options: [
          { id: "q4-a", text: "I quickly adjust and get back on track", value: 1 },
          { id: "q4-b", text: "I feel discouraged but eventually resume", value: 2 },
          { id: "q4-c", text: "I often abandon the routine and try something new", value: 3 },
          { id: "q4-d", text: "I give up and feel like I've failed", value: 4 }
        ]
      },
      {
        id: "q5",
        text: "How easy is it for you to avoid distractions when working on important tasks?",
        options: [
          { id: "q5-a", text: "Very easy - I can focus deeply for extended periods", value: 1 },
          { id: "q5-b", text: "Somewhat easy - I can focus but need occasional breaks", value: 2 },
          { id: "q5-c", text: "Somewhat difficult - I get distracted fairly often", value: 3 },
          { id: "q5-d", text: "Very difficult - I'm constantly fighting distractions", value: 4 }
        ]
      },
      {
        id: "q6",
        text: "How often do you procrastinate on important tasks?",
        options: [
          { id: "q6-a", text: "Rarely - I usually start tasks promptly", value: 1 },
          { id: "q6-b", text: "Sometimes - I procrastinate on certain types of tasks", value: 2 },
          { id: "q6-c", text: "Often - I frequently delay starting important work", value: 3 },
          { id: "q6-d", text: "Very often - Procrastination is a significant issue for me", value: 4 }
        ]
      },
      {
        id: "q7",
        text: "How effectively do you manage your time?",
        options: [
          { id: "q7-a", text: "Very effectively - I consistently prioritize well", value: 1 },
          { id: "q7-b", text: "Somewhat effectively - I'm usually on top of things", value: 2 },
          { id: "q7-c", text: "Not very effectively - I often feel rushed or behind", value: 3 },
          { id: "q7-d", text: "Poorly - I feel constantly overwhelmed by time pressure", value: 4 }
        ]
      },
      {
        id: "q8",
        text: "How consistent are you with your sleep schedule?",
        options: [
          { id: "q8-a", text: "Very consistent - I go to bed and wake up at similar times daily", value: 1 },
          { id: "q8-b", text: "Mostly consistent - With some variation on weekends", value: 2 },
          { id: "q8-c", text: "Somewhat inconsistent - My schedule varies frequently", value: 3 },
          { id: "q8-d", text: "Very inconsistent - I have no regular sleep pattern", value: 4 }
        ]
      },
      {
        id: "q9",
        text: "How often do you engage in deliberate self-improvement activities?",
        options: [
          { id: "q9-a", text: "Daily - I consistently make time for personal growth", value: 1 },
          { id: "q9-b", text: "Weekly - I regularly set aside time for development", value: 2 },
          { id: "q9-c", text: "Monthly - I occasionally focus on self-improvement", value: 3 },
          { id: "q9-d", text: "Rarely - I seldom engage in deliberate self-improvement", value: 4 }
        ]
      },
      {
        id: "q10",
        text: "How would you rate your ability to say 'no' to things that don't align with your priorities?",
        options: [
          { id: "q10-a", text: "Excellent - I confidently protect my priorities", value: 1 },
          { id: "q10-b", text: "Good - I usually set boundaries but sometimes give in", value: 2 },
          { id: "q10-c", text: "Fair - I often find it difficult to decline requests", value: 3 },
          { id: "q10-d", text: "Poor - I regularly overcommit and struggle with boundaries", value: 4 }
        ]
      }
    ]
  },
  "addictions": {
    id: "addictions",
    quizType: 'DEFAULT',
    redirectAfterAnswer: 'RESULTS',
    title: "Break Free From Addictions",
    subtitle: "Assess your relationship with habits and dependencies",
    description: "This assessment helps you understand your relationship with various habits and dependencies, including digital consumption, substances, or behavioral patterns. It provides insights into your current level of awareness and control, offering personalized strategies for building healthier relationships with potentially problematic behaviors.",
    category: "Mental Health",
    estimatedTime: "5-10 minutes",
    difficulty: "BEGINNER",
    status: "ACTIVE",
    isPublic: true,
    createdBy: "system",
    updatedBy: "system",
    createdByUser: {
      id: "system",
      firstName: "System",
      lastName: "User",
      email: "system@example.com"
    },
    createdAt: "2025-01-05",
    updatedAt: "2025-01-12",
    totalAttempts: 892,
    completedAttempts: 756,
    averageScore: 65.2,
    averageCompletionTime: 8.7,
    tags: ["addictions", "mental-health", "habits", "dependencies"],
    gradingCriteria: [
      {
        id: "gc1",
        name: "Freedom Master",
        minScore: 80,
        maxScore: 100,
        label: "Freedom Master",
        color: "bg-green-100 text-green-800",
        recommendations: [
          "Continue building on your strong foundation",
          "Share your knowledge with others",
          "Consider mentoring or coaching others"
        ],
        proposedCourses: [{ id: "5", name: "Freedom Mastery Course", slug: "freedom-mastery-course" }],
        proposedProducts: [{ id: "5", name: "Freedom Mastery Book", slug: "freedom-mastery-book" }],
        proposedStreaks: [{ id: "1", name: "Meditation Streak", slug: "meditation-streak" }],
        description: "Excellent mastery of habits"
      },
      {
        id: "gc2",
        name: "Freedom Seeker",
        minScore: 60,
        maxScore: 79,
        label: "Freedom Seeker",
        color: "bg-blue-100 text-blue-800",
        recommendations: [
          "Continue monitoring your social media usage",
          "Set specific boundaries for digital consumption",
          "Consider digital detox periods"
        ],
        proposedCourses: [{ id: "6", name: "Freedom Seeking Course", slug: "freedom-seeking-course" }],
        proposedProducts: [{ id: "6", name: "Freedom Seeking Book", slug: "freedom-seeking-book" }],
        proposedStreaks: [{ id: "2", name: "Reading Streak", slug: "reading-streak" }],
        description: "Good awareness of habits and dependencies"
      },
      {
        id: "gc3",
        name: "Freedom Learner",
        minScore: 40,
        maxScore: 59,
        label: "Freedom Learner",
        color: "bg-yellow-100 text-yellow-800",
        recommendations: [
          "Continue monitoring your social media usage",
          "Set specific boundaries for digital consumption",
          "Consider digital detox periods"
        ],
        proposedCourses: [{ id: "7", name: "Freedom Learning Course", slug: "freedom-learning-course" }],
        proposedProducts: [{ id: "7", name: "Freedom Learning Book", slug: "freedom-learning-book" }],
        proposedStreaks: [{ id: "3", name: "Gratitude Streak", slug: "gratitude-streak" }],
        description: "Awareness of habits and dependencies"
      },
      {
        id: "gc4",
        name: "Freedom Starter",
        minScore: 0,
        maxScore: 39,
        label: "Freedom Starter",
        color: "bg-red-100 text-red-800",
        recommendations: [
          "Start with one small change",
          "Create a structured practice routine",
          "Seek accountability from friends or family"
        ],
        proposedCourses: [{ id: "8", name: "Freedom Starting Course", slug: "freedom-starting-course" }],
        proposedProducts: [{ id: "8", name: "Freedom Starting Book", slug: "freedom-starting-book" }],
        proposedStreaks: [{ id: "1", name: "Meditation Streak", slug: "meditation-streak" }],
        description: "Significant room for improvement"
      }
    ],
    questions: [
      {
        id: "q1",
        text: "How often do you find yourself using social media when you intended not to?",
        options: [
          { id: "q1-a", text: "Rarely or never", value: 1 },
          { id: "q1-b", text: "Sometimes (1-2 times per week)", value: 2 },
          { id: "q1-c", text: "Often (several times per week)", value: 3 },
          { id: "q1-d", text: "Very frequently (daily)", value: 4 }
        ]
      },
      {
        id: "q2",
        text: "When you try to cut back on a habit you're concerned about, how difficult is it?",
        options: [
          { id: "q2-a", text: "Not difficult at all", value: 1 },
          { id: "q2-b", text: "Slightly difficult, but manageable", value: 2 },
          { id: "q2-c", text: "Moderately difficult, requiring significant effort", value: 3 },
          { id: "q2-d", text: "Extremely difficult or seemingly impossible", value: 4 }
        ]
      },
      {
        id: "q3",
        text: "How has your behavior affected your relationships with others?",
        options: [
          { id: "q3-a", text: "Not at all - my relationships are healthy", value: 1 },
          { id: "q3-b", text: "Minimally - occasional tension but generally fine", value: 2 },
          { id: "q3-c", text: "Moderately - recurring conflicts or distance", value: 3 },
          { id: "q3-d", text: "Significantly - serious relationship damage", value: 4 }
        ]
      }
    ]
  },
  "purpose": {
    id: "purpose",
    quizType: 'DEFAULT',
    redirectAfterAnswer: 'RESULTS',
    title: "Find Your Purpose",
    subtitle: "Explore your life direction and meaning",
    description: "This assessment explores your current understanding of life purpose, values alignment, and career satisfaction. It helps identify areas where you feel fulfilled versus areas that may need more attention, providing guidance for aligning your daily activities with your deeper sense of meaning and purpose.",
    category: "Life Purpose",
    estimatedTime: "5-10 minutes",
    difficulty: "INTERMEDIATE",
    status: "ACTIVE",
    isPublic: true,
    createdBy: "system",
    updatedBy: "system",
    createdByUser: {
      id: "system",
      firstName: "System",
      lastName: "User",
      email: "system@example.com"
    },
    createdAt: "2025-01-10",
    updatedAt: "2025-01-18",
    totalAttempts: 567,
    completedAttempts: 523,
    averageScore: 58.9,
    averageCompletionTime: 9.2,
    tags: ["purpose", "meaning", "life-direction", "values"],
    gradingCriteria: [
      {
        id: "gc1",
        name: "Purpose Master",
        minScore: 80,
        maxScore: 100,
        label: "Purpose Master",
        color: "bg-green-100 text-green-800",
        recommendations: [
          "Continue building on your strong foundation",
          "Share your knowledge with others",
          "Consider mentoring or coaching others"
        ],
        proposedCourses: [{ id: "9", name: "Purpose Mastery Course", slug: "purpose-mastery-course" }],
        proposedProducts: [{ id: "9", name: "Purpose Mastery Book", slug: "purpose-mastery-book" }],
        proposedStreaks: [{ id: "1", name: "Meditation Streak", slug: "meditation-streak" }],
        description: "Excellent mastery of purpose"
      },
      {
        id: "gc2",
        name: "Purpose Seeker",
        minScore: 60,
        maxScore: 79,
        label: "Purpose Seeker",
        color: "bg-blue-100 text-blue-800",
        recommendations: [
          "Reflect on your core values",
          "Explore different career paths",
          "Seek guidance from mentors or coaches"
        ],
        proposedCourses: [{ id: "10", name: "Purpose Seeking Course", slug: "purpose-seeking-course" }],
        proposedProducts: [{ id: "10", name: "Purpose Seeking Book", slug: "purpose-seeking-book" }],
        proposedStreaks: [{ id: "2", name: "Reading Streak", slug: "reading-streak" }],
        description: "Good exploration of purpose"
      },
      {
        id: "gc3",
        name: "Purpose Explorer",
        minScore: 40,
        maxScore: 59,
        label: "Purpose Explorer",
        color: "bg-yellow-100 text-yellow-800",
        recommendations: [
          "Reflect on your core values",
          "Explore different career paths",
          "Seek guidance from mentors or coaches"
        ],
        proposedCourses: [{ id: "11", name: "Purpose Exploring Course", slug: "purpose-exploring-course" }],
        proposedProducts: [{ id: "11", name: "Purpose Exploring Book", slug: "purpose-exploring-book" }],
        proposedStreaks: [{ id: "3", name: "Gratitude Streak", slug: "gratitude-streak" }],
        description: "Good exploration of purpose"
      },
      {
        id: "gc4",
        name: "Purpose Beginner",
        minScore: 0,
        maxScore: 39,
        label: "Purpose Beginner",
        color: "bg-red-100 text-red-800",
        recommendations: [
          "Reflect on your core values",
          "Explore different career paths",
          "Seek guidance from mentors or coaches"
        ],
        proposedCourses: [{ id: "12", name: "Purpose Starting Course", slug: "purpose-starting-course" }],
        proposedProducts: [{ id: "12", name: "Purpose Starting Book", slug: "purpose-starting-book" }],
        proposedStreaks: [{ id: "1", name: "Meditation Streak", slug: "meditation-streak" }],
        description: "Significant room for improvement"
      }
    ],
    questions: [
      {
        id: "q1",
        text: "How clear are you about your purpose in life?",
        options: [
          { id: "q1-a", text: "Very clear - I know exactly what gives my life meaning", value: 1 },
          { id: "q1-b", text: "Somewhat clear - I have some ideas but not complete clarity", value: 2 },
          { id: "q1-c", text: "Somewhat unclear - I'm exploring but still confused", value: 3 },
          { id: "q1-d", text: "Very unclear - I feel lost about my purpose", value: 4 }
        ]
      },
      {
        id: "q2",
        text: "How satisfied are you with your current career path?",
        options: [
          { id: "q2-a", text: "Very satisfied - My work aligns with my values and strengths", value: 1 },
          { id: "q2-b", text: "Somewhat satisfied - It's good but could be better", value: 2 },
          { id: "q2-c", text: "Somewhat dissatisfied - I often feel unfulfilled", value: 3 },
          { id: "q2-d", text: "Very dissatisfied - My work feels meaningless or draining", value: 4 }
        ]
      },
      {
        id: "q3",
        text: "How often do you feel that what you do day-to-day matters in the bigger picture?",
        options: [
          { id: "q3-a", text: "Almost always - I regularly see the impact of my actions", value: 1 },
          { id: "q3-b", text: "Often - I frequently feel my contributions matter", value: 2 },
          { id: "q3-c", text: "Sometimes - I occasionally feel my actions have meaning", value: 3 },
          { id: "q3-d", text: "Rarely - I seldom feel what I do matters", value: 4 }
        ]
      }
    ]
  },
  "trauma": {
    id: "trauma",
    quizType: 'DEFAULT',
    redirectAfterAnswer: 'RESULTS',
    title: "Heal Your Past",
    subtitle: "Process and integrate past experiences",
    description: "This assessment evaluates your relationship with past experiences and current emotional well-being. It helps identify areas where past events may be affecting your present life and provides guidance for developing healthy coping mechanisms and healing practices.",
    category: "Mental Health",
    estimatedTime: "10-15 minutes",
    difficulty: "ADVANCED",
    status: "DRAFT",
    isPublic: false,
    createdBy: "system",
    updatedBy: "system",
    createdByUser: {
      id: "system",
      firstName: "System",
      lastName: "User",
      email: "system@example.com"
    },
    createdAt: "2025-01-15",
    updatedAt: "2025-01-15",
    totalAttempts: 0,
    completedAttempts: 0,
    averageScore: 0,
    averageCompletionTime: 0,
    tags: ["trauma", "healing", "mental-health", "past"],
    gradingCriteria: [
      {
        id: "gc1",
        name: "Healing Master",
        minScore: 80,
        maxScore: 100,
        label: "Healing Master",
        color: "bg-green-100 text-green-800",
        recommendations: [
          "Continue building on your strong foundation",
          "Share your knowledge with others",
          "Consider mentoring or coaching others"
        ],
        proposedCourses: [{ id: "13", name: "Healing Mastery Course", slug: "healing-mastery-course" }],
        proposedProducts: [{ id: "13", name: "Healing Mastery Book", slug: "healing-mastery-book" }],
        proposedStreaks: [{ id: "1", name: "Meditation Streak", slug: "meditation-streak" }],
        description: "Excellent mastery of healing"
      },
      {
        id: "gc2",
        name: "Healing Journey",
        minScore: 60,
        maxScore: 79,
        label: "Healing Journey",
        color: "bg-blue-100 text-blue-800",
        recommendations: [
          "Focus on consistency in your practice",
          "Identify and work on your weakest areas",
          "Set specific, measurable goals"
        ],
        proposedCourses: [{ id: "14", name: "Healing Journey Course", slug: "healing-journey-course" }],
        proposedProducts: [{ id: "14", name: "Healing Journey Book", slug: "healing-journey-book" }],
        proposedStreaks: [{ id: "2", name: "Reading Streak", slug: "reading-streak" }],
        description: "Good progress in healing"
      },
      {
        id: "gc3",
        name: "Healing Explorer",
        minScore: 40,
        maxScore: 59,
        label: "Healing Explorer",
        color: "bg-yellow-100 text-yellow-800",
        recommendations: [
          "Reflect on your past experiences",
          "Explore different healing methods",
          "Seek guidance from professionals"
        ],
        proposedCourses: [{ id: "15", name: "Healing Exploring Course", slug: "healing-exploring-course" }],
        proposedProducts: [{ id: "15", name: "Healing Exploring Book", slug: "healing-exploring-book" }],
        proposedStreaks: [{ id: "3", name: "Gratitude Streak", slug: "gratitude-streak" }],
        description: "Good exploration of healing"
      },
      {
        id: "gc4",
        name: "Healing Starter",
        minScore: 0,
        maxScore: 39,
        label: "Healing Starter",
        color: "bg-red-100 text-red-800",
        recommendations: [
          "Start with one small change",
          "Consider working with a therapist or counselor",
          "Focus on building one healing practice at a time"
        ],
        proposedCourses: [{ id: "16", name: "Healing Starting Course", slug: "healing-starting-course" }],
        proposedProducts: [{ id: "16", name: "Healing Starting Book", slug: "healing-starting-book" }],
        proposedStreaks: [{ id: "1", name: "Meditation Streak", slug: "meditation-streak" }],
        description: "Significant room for improvement"
      }
    ],
    questions: [
      {
        id: "q1",
        text: "How often do difficult past experiences intrude on your present thoughts?",
        options: [
          { id: "q1-a", text: "Rarely or never - Past experiences don't trouble me", value: 1 },
          { id: "q1-b", text: "Occasionally - They come up but don't disrupt my life", value: 2 },
          { id: "q1-c", text: "Often - They frequently affect my mood and thoughts", value: 3 },
          { id: "q1-d", text: "Very often - They constantly interfere with my daily life", value: 4 }
        ]
      },
      {
        id: "q2",
        text: "How do you typically respond to reminders of difficult experiences?",
        options: [
          { id: "q2-a", text: "I can process them calmly and move on", value: 1 },
          { id: "q2-b", text: "I feel some discomfort but can manage it", value: 2 },
          { id: "q2-c", text: "I experience significant emotional distress", value: 3 },
          { id: "q2-d", text: "I become overwhelmed and struggle to function", value: 4 }
        ]
      },
      {
        id: "q3",
        text: "How has your past affected your ability to trust others?",
        options: [
          { id: "q3-a", text: "Not at all - I can trust appropriately", value: 1 },
          { id: "q3-b", text: "Minimally - I'm somewhat cautious but generally trusting", value: 2 },
          { id: "q3-c", text: "Moderately - I have difficulty trusting in certain situations", value: 3 },
          { id: "q3-d", text: "Significantly - I struggle to trust anyone", value: 4 }
        ]
      }
    ]
  },
  "mindfulness": {
    id: "mindfulness",
    quizType: 'DEFAULT',
    redirectAfterAnswer: 'RESULTS',
    title: "Mindfulness Assessment",
    subtitle: "Evaluate your mindfulness practice and awareness",
    description: "This assessment measures your current mindfulness practice, awareness levels, and ability to stay present. It evaluates your meditation habits, stress management techniques, and overall mental clarity, providing personalized recommendations for deepening your mindfulness practice.",
    category: "Wellness",
    estimatedTime: "8-12 minutes",
    difficulty: "INTERMEDIATE",
    status: "ACTIVE",
    isPublic: true,
    createdBy: "system",
    updatedBy: "system",
    createdByUser: {
      id: "system",
      firstName: "System",
      lastName: "User",
      email: "system@example.com"
    },
    createdAt: "2025-01-20",
    updatedAt: "2025-01-25",
    totalAttempts: 445,
    completedAttempts: 398,
    averageScore: 69.8,
    averageCompletionTime: 10.1,
    tags: ["mindfulness", "meditation", "awareness", "wellness"],
    gradingCriteria: [
      {
        id: "gc1",
        name: "Mindfulness Master",
        minScore: 80,
        maxScore: 100,
        label: "Mindfulness Master",
        color: "bg-green-100 text-green-800",
        recommendations: [
          "Continue your daily practice",
          "Explore advanced meditation techniques",
          "Share your wisdom with others"
        ],
        proposedCourses: [{ id: "17", name: "Mindfulness Mastery Course", slug: "mindfulness-mastery-course" }],
        proposedProducts: [{ id: "17", name: "Mindfulness Mastery Book", slug: "mindfulness-mastery-book" }],
        proposedStreaks: [{ id: "1", name: "Meditation Streak", slug: "meditation-streak" }],
        description: "Excellent mindfulness practice"
      },
      {
        id: "gc2",
        name: "Mindfulness Practitioner",
        minScore: 60,
        maxScore: 79,
        label: "Mindfulness Practitioner",
        color: "bg-blue-100 text-blue-800",
        recommendations: [
          "Continue your daily practice",
          "Explore advanced meditation techniques",
          "Share your wisdom with others"
        ],
        proposedCourses: [{ id: "18", name: "Mindfulness Practitioner Course", slug: "mindfulness-practitioner-course" }],
        proposedProducts: [{ id: "18", name: "Mindfulness Practitioner Book", slug: "mindfulness-practitioner-book" }],
        proposedStreaks: [{ id: "2", name: "Reading Streak", slug: "reading-streak" }],
        description: "Good mindfulness practice"
      },
      {
        id: "gc3",
        name: "Mindfulness Explorer",
        minScore: 40,
        maxScore: 59,
        label: "Mindfulness Explorer",
        color: "bg-yellow-100 text-yellow-800",
        recommendations: [
          "Start with one small change",
          "Create a structured practice routine",
          "Seek accountability from friends or family"
        ],
        proposedCourses: [{ id: "19", name: "Mindfulness Exploring Course", slug: "mindfulness-exploring-course" }],
        proposedProducts: [{ id: "19", name: "Mindfulness Exploring Book", slug: "mindfulness-exploring-book" }],
        proposedStreaks: [{ id: "3", name: "Gratitude Streak", slug: "gratitude-streak" }],
        description: "Good mindfulness practice"
      },
      {
        id: "gc4",
        name: "Mindfulness Beginner",
        minScore: 0,
        maxScore: 39,
        label: "Mindfulness Beginner",
        color: "bg-red-100 text-red-800",
        recommendations: [
          "Start with one small change",
          "Create a structured practice routine",
          "Seek accountability from friends or family"
        ],
        proposedCourses: [{ id: "20", name: "Mindfulness Starting Course", slug: "mindfulness-starting-course" }],
        proposedProducts: [{ id: "20", name: "Mindfulness Starting Book", slug: "mindfulness-starting-book" }],
        proposedStreaks: [{ id: "1", name: "Meditation Streak", slug: "meditation-streak" }],
        description: "Significant room for improvement"
      }
    ],
    questions: [
      {
        id: "q1",
        text: "How often do you practice mindfulness or meditation?",
        options: [
          { id: "q1-a", text: "Daily - I have a consistent practice", value: 1 },
          { id: "q1-b", text: "Several times per week", value: 2 },
          { id: "q1-c", text: "Occasionally - once or twice per week", value: 3 },
          { id: "q1-d", text: "Rarely or never", value: 4 }
        ]
      },
      {
        id: "q2",
        text: "How aware are you of your thoughts and emotions throughout the day?",
        options: [
          { id: "q2-a", text: "Very aware - I notice most thoughts and emotions", value: 1 },
          { id: "q2-b", text: "Somewhat aware - I notice them when I pay attention", value: 2 },
          { id: "q2-c", text: "Occasionally aware - I notice them sometimes", value: 3 },
          { id: "q2-d", text: "Rarely aware - I'm usually caught up in thoughts", value: 4 }
        ]
      },
      {
        id: "q3",
        text: "How do you typically respond to stress or difficult emotions?",
        options: [
          { id: "q3-a", text: "I observe them mindfully and respond skillfully", value: 1 },
          { id: "q3-b", text: "I usually manage them well with some mindfulness", value: 2 },
          { id: "q3-c", text: "I sometimes get overwhelmed but can calm down", value: 3 },
          { id: "q3-d", text: "I often get caught up in them and react impulsively", value: 4 }
        ]
      }
    ]
  }
};

// Mock quiz results data
export const quizResults: QuizResult[] = [
  {
    id: "result-1",
    quizId: "self-mastery",
    userId: "user-1",
    userName: "Sarah Johnson",
    userEmail: "sarah.johnson@email.com",
    score: 85,
    maxScore: 100,
    percentage: 85,
    level: "excellent",
    feedback: "Excellent! You demonstrate strong self-mastery and healthy habits.",
    recommendations: [
      "Continue building on your strong foundation",
      "Share your knowledge with others",
      "Consider mentoring or coaching others"
    ],
    completedAt: "2025-01-15T10:30:00Z",
    timeSpent: 11,
    answers: {
      "q1": "q1-a",
      "q2": "q2-a",
      "q3": "q3-a",
      "q4": "q4-a",
      "q5": "q5-b",
      "q6": "q6-a",
      "q7": "q7-a",
      "q8": "q8-a",
      "q9": "q9-a",
      "q10": "q10-a"
    },
    classification: "Habit Master",
    areasOfImprovement: ["Focus management"],
    supportNeeded: ["Advanced habit optimization"]
  },
  {
    id: "result-2",
    quizId: "self-mastery",
    userId: "user-2",
    userName: "Michael Chen",
    userEmail: "michael.chen@email.com",
    score: 72,
    maxScore: 100,
    percentage: 72,
    level: "good",
    feedback: "Good! You have a solid foundation with room for improvement.",
    recommendations: [
      "Focus on consistency in your routines",
      "Identify and work on your weakest areas",
      "Set specific, measurable goals"
    ],
    completedAt: "2025-01-16T14:20:00Z",
    timeSpent: 13,
    answers: {
      "q1": "q1-b",
      "q2": "q2-b",
      "q3": "q3-b",
      "q4": "q4-b",
      "q5": "q5-b",
      "q6": "q6-b",
      "q7": "q7-b",
      "q8": "q8-b",
      "q9": "q9-b",
      "q10": "q10-b"
    },
    classification: "Habit Builder",
    areasOfImprovement: ["Consistency", "Goal setting"],
    supportNeeded: ["Habit tracking tools", "Accountability partner"]
  },
  {
    id: "result-3",
    quizId: "addictions",
    userId: "user-3",
    userName: "Emily Rodriguez",
    userEmail: "emily.rodriguez@email.com",
    score: 45,
    maxScore: 60,
    percentage: 75,
    level: "good",
    feedback: "Good! You show awareness of your habits and dependencies.",
    recommendations: [
      "Continue monitoring your social media usage",
      "Set specific boundaries for digital consumption",
      "Consider digital detox periods"
    ],
    completedAt: "2025-01-17T09:15:00Z",
    timeSpent: 7,
    answers: {
      "q1": "q1-c",
      "q2": "q2-b",
      "q3": "q3-b"
    },
    classification: "Freedom Seeker",
    areasOfImprovement: ["Digital boundaries", "Social media usage"],
    supportNeeded: ["Digital wellness tools", "Screen time management"]
  },
  {
    id: "result-4",
    quizId: "purpose",
    userId: "user-4",
    userName: "David Thompson",
    userEmail: "david.thompson@email.com",
    score: 35,
    maxScore: 60,
    percentage: 58,
    level: "fair",
    feedback: "Fair. You're exploring your purpose but need more clarity.",
    recommendations: [
      "Reflect on your core values",
      "Explore different career paths",
      "Seek guidance from mentors or coaches"
    ],
    completedAt: "2025-01-18T16:45:00Z",
    timeSpent: 9,
    answers: {
      "q1": "q1-c",
      "q2": "q2-c",
      "q3": "q3-c"
    },
    classification: "Purpose Explorer",
    areasOfImprovement: ["Career clarity", "Value identification"],
    supportNeeded: ["Career counseling", "Purpose coaching"]
  },
  {
    id: "result-5",
    quizId: "mindfulness",
    userId: "user-5",
    userName: "Lisa Wang",
    userEmail: "lisa.wang@email.com",
    score: 88,
    maxScore: 100,
    percentage: 88,
    level: "excellent",
    feedback: "Excellent! You have a strong mindfulness practice.",
    recommendations: [
      "Continue your daily practice",
      "Explore advanced meditation techniques",
      "Share your wisdom with others"
    ],
    completedAt: "2025-01-19T11:30:00Z",
    timeSpent: 8,
    answers: {
      "q1": "q1-a",
      "q2": "q2-a",
      "q3": "q3-a"
    },
    classification: "Mindfulness Master",
    areasOfImprovement: [],
    supportNeeded: ["Advanced meditation resources"]
  }
];

// Sample user quiz results for dashboard display
export const userQuizResults: QuizResult[] = [
  {
    id: "user-result-1",
    quizId: "self-mastery",
    userId: "current-user",
    userName: "Current User",
    userEmail: "user@example.com",
    score: 78,
    maxScore: 100,
    percentage: 78,
    level: "good",
    feedback: "Good! You have a solid foundation with room for improvement.",
    recommendations: [
      "Focus on consistency in your routines",
      "Identify and work on your weakest areas",
      "Set specific, measurable goals"
    ],
    completedAt: "2025-01-15T10:30:00Z",
    timeSpent: 12,
    answers: {
      "q1": "q1-b",
      "q2": "q2-b",
      "q3": "q3-a",
      "q4": "q4-b",
      "q5": "q5-b",
      "q6": "q6-a",
      "q7": "q7-b",
      "q8": "q8-b",
      "q9": "q9-b",
      "q10": "q10-b"
    },
    classification: "Habit Builder",
    areasOfImprovement: ["Consistency", "Goal setting"],
    supportNeeded: ["Habit tracking tools", "Accountability partner"]
  },
  {
    id: "user-result-2",
    quizId: "purpose",
    userId: "current-user",
    userName: "Current User",
    userEmail: "user@example.com",
    score: 35,
    maxScore: 60,
    percentage: 58,
    level: "fair",
    feedback: "Fair. You're exploring your purpose but need more clarity.",
    recommendations: [
      "Reflect on your core values",
      "Explore different career paths",
      "Seek guidance from mentors or coaches"
    ],
    completedAt: "2025-01-10T14:20:00Z",
    timeSpent: 9,
    answers: {
      "q1": "q1-c",
      "q2": "q2-c",
      "q3": "q3-c"
    },
    classification: "Purpose Explorer",
    areasOfImprovement: ["Career clarity", "Value identification"],
    supportNeeded: ["Career counseling", "Purpose coaching"]
  },
  {
    id: "user-result-3",
    quizId: "mindfulness",
    userId: "current-user",
    userName: "Current User",
    userEmail: "user@example.com",
    score: 65,
    maxScore: 100,
    percentage: 65,
    level: "good",
    feedback: "Good! You have a developing mindfulness practice.",
    recommendations: [
      "Continue your daily practice",
      "Explore advanced meditation techniques",
      "Share your wisdom with others"
    ],
    completedAt: "2025-01-05T16:45:00Z",
    timeSpent: 10,
    answers: {
      "q1": "q1-b",
      "q2": "q2-b",
      "q3": "q3-b"
    },
    classification: "Mindfulness Practitioner",
    areasOfImprovement: ["Consistency", "Advanced techniques"],
    supportNeeded: ["Practice tools", "Accountability partner"]
  },
  {
    id: "user-result-4",
    quizId: "addictions",
    userId: "current-user",
    userName: "Current User",
    userEmail: "user@example.com",
    score: 42,
    maxScore: 60,
    percentage: 70,
    level: "good",
    feedback: "Good! You show awareness of your habits and dependencies.",
    recommendations: [
      "Continue monitoring your social media usage",
      "Set specific boundaries for digital consumption",
      "Consider digital detox periods"
    ],
    completedAt: "2024-12-28T09:15:00Z",
    timeSpent: 8,
    answers: {
      "q1": "q1-b",
      "q2": "q2-b",
      "q3": "q3-b"
    },
    classification: "Freedom Seeker",
    areasOfImprovement: ["Digital boundaries", "Social media usage"],
    supportNeeded: ["Digital wellness tools", "Screen time management"]
  }
];

export function calculateQuizResult(answers: Record<string, string>, quizId: string): QuizResult {
  const quiz = quizzes[quizId];
  if (!quiz) {
    throw new Error(`Quiz not found: ${quizId}`);
  }

  const totalScore = Object.values(answers).reduce((sum, answerId) => {
      for (const question of quiz.questions) {
        const option = question.options.find(opt => opt.id === answerId);
        if (option) {
          return sum + option.value;
      }
    }
    return sum;
  }, 0);

  const maxScore = quiz.questions.length * 4;
  const percentage = Math.round((totalScore / maxScore) * 100);

  let level: QuizResult['level'];
  let feedback: string;
  let recommendations: string[];
  let classification: string;
  let areasOfImprovement: string[];
  let supportNeeded: string[];

  // Find the appropriate grading criteria based on percentage
  const matchingCriteria = quiz.gradingCriteria.find(criteria => 
    percentage >= criteria.minScore && percentage <= criteria.maxScore
  );

  if (matchingCriteria) {
    // Map criteria name to level
    const nameLower = matchingCriteria.name.toLowerCase();
    if (nameLower.includes('excellent') || nameLower.includes('master')) {
      level = 'excellent';
    } else if (nameLower.includes('good') || nameLower.includes('builder')) {
      level = 'good';
    } else if (nameLower.includes('fair') || nameLower.includes('learner')) {
      level = 'fair';
    } else {
      level = 'needs-improvement';
    }

    feedback = matchingCriteria.description || `You scored in the ${matchingCriteria.name} range.`;
    recommendations = matchingCriteria.recommendations;
    classification = matchingCriteria.label;
    areasOfImprovement = ["Focus on areas for improvement"];
    supportNeeded = ["Consider the recommended courses and products"];
  } else {
    // Fallback to default logic
  if (percentage >= 80) {
    level = 'excellent';
      feedback = "Excellent! You demonstrate mastery in this area.";
    recommendations = [
      "Continue building on your strong foundation",
      "Share your knowledge with others",
      "Consider mentoring or coaching others"
    ];
      classification = "Master";
      areasOfImprovement = [];
      supportNeeded = ["Advanced resources", "Mentorship opportunities"];
  } else if (percentage >= 60) {
    level = 'good';
    feedback = "Good! You have a solid foundation with room for improvement.";
    recommendations = [
        "Focus on consistency in your practice",
      "Identify and work on your weakest areas",
      "Set specific, measurable goals"
    ];
      classification = "Builder";
      areasOfImprovement = ["Consistency", "Advanced techniques"];
      supportNeeded = ["Practice tools", "Accountability partner"];
  } else if (percentage >= 40) {
    level = 'fair';
      feedback = "Fair. You have potential but need to develop better practices.";
    recommendations = [
        "Start with one small change",
        "Create a structured practice routine",
      "Seek accountability from friends or family"
    ];
      classification = "Learner";
      areasOfImprovement = ["Basic practices", "Consistency", "Understanding"];
      supportNeeded = ["Beginner resources", "Practice guidance", "Community support"];
  } else {
    level = 'needs-improvement';
      feedback = "You have significant room for improvement in this area.";
    recommendations = [
      "Start with very small, manageable changes",
      "Consider working with a coach or mentor",
        "Focus on building one practice at a time"
    ];
      classification = "Starter";
      areasOfImprovement = ["Basic understanding", "Practice habits", "Consistency"];
      supportNeeded = ["Professional guidance", "Structured programs", "Regular check-ins"];
    }
  }

  return {
    id: `result-${Date.now()}`,
    quizId,
    userId: "current-user",
    userName: "Current User",
    userEmail: "user@example.com",
    score: totalScore,
    maxScore,
    percentage,
    level,
    feedback,
    recommendations,
    completedAt: new Date().toISOString(),
    timeSpent: 0,
    answers,
    classification,
    areasOfImprovement,
    supportNeeded
  };
}

export async function getQuizById(id: string): Promise<Quiz | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return quizzes[id] || null;
}

export async function getAllQuizzes(): Promise<Quiz[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  return Object.values(quizzes);
}

export async function getQuizResultsByQuizId(quizId: string): Promise<QuizResult[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 150));
  return quizResults.filter(result => result.quizId === quizId);
}

export async function getQuizResultById(resultId: string): Promise<QuizResult | undefined> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return quizResults.find(result => result.id === resultId);
}

export async function getAllQuizResults(): Promise<QuizResult[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  return quizResults;
}

export async function getUserQuizResults(userId: string = "current-user"): Promise<QuizResult[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 150));
  return userQuizResults.filter(result => result.userId === userId);
}

export async function getQuizAnalytics(quizId: string): Promise<QuizAnalytics> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const quiz = quizzes[quizId];
  const results = await getQuizResultsByQuizId(quizId);
  
  if (!quiz || results.length === 0) {
    return {
      totalAttempts: 0,
      completedAttempts: 0,
      completionRate: 0,
      averageScore: 0,
      averageTimeSpent: 0,
      levelDistribution: { excellent: 0, good: 0, fair: 0, needsImprovement: 0 },
      dropoffPoints: [],
      popularClassifications: [],
      timeDistribution: { fast: 0, normal: 0, slow: 0 }
    };
  }

  const completedResults = results.filter((r: QuizResult) => r.completedAt);
  const completionRate = (completedResults.length / quiz.totalAttempts) * 100;
  const averageScore = completedResults.reduce((sum: number, r: QuizResult) => sum + r.percentage, 0) / completedResults.length;
  const averageTimeSpent = completedResults.reduce((sum: number, r: QuizResult) => sum + r.timeSpent, 0) / completedResults.length;

  const levelDistribution = {
    excellent: completedResults.filter((r: QuizResult) => r.level === 'excellent').length,
    good: completedResults.filter((r: QuizResult) => r.level === 'good').length,
    fair: completedResults.filter((r: QuizResult) => r.level === 'fair').length,
    needsImprovement: completedResults.filter((r: QuizResult) => r.level === 'needs-improvement').length
  };

  const classificationCounts = completedResults.reduce((acc: Record<string, number>, result: QuizResult) => {
    acc[result.classification] = (acc[result.classification] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const popularClassifications = Object.entries(classificationCounts)
    .map(([classification, count]) => ({
      classification,
      count,
      percentage: (count / completedResults.length) * 100
    }))
    .sort((a, b) => b.count - a.count);

  const timeDistribution = {
    fast: completedResults.filter((r: QuizResult) => r.timeSpent < 5).length,
    normal: completedResults.filter((r: QuizResult) => r.timeSpent >= 5 && r.timeSpent <= 15).length,
    slow: completedResults.filter((r: QuizResult) => r.timeSpent > 15).length
  };

  // Mock dropoff points (in real app, this would be calculated from actual data)
  const dropoffPoints = [
    { questionNumber: 1, dropoffCount: 12, dropoffRate: 1.2 },
    { questionNumber: 5, dropoffCount: 8, dropoffRate: 0.8 },
    { questionNumber: 8, dropoffCount: 15, dropoffRate: 1.5 }
  ];

  return {
    totalAttempts: quiz.totalAttempts,
    completedAttempts: completedResults.length,
    completionRate,
    averageScore,
    averageTimeSpent,
    levelDistribution,
    dropoffPoints,
    popularClassifications,
    timeDistribution
  };
} 