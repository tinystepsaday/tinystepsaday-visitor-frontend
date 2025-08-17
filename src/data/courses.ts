export interface Lesson {
  id: string;
  title: string;
  type: "video" | "exercise" | "pdf" | "certificate" | "quiz" | "note";
  duration: string;
  videoUrl?: string;
  quizId?: string;
  noteId?: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  rating: number;
  students: number;
  courses: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  description: string;
  fullDescription: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  duration: string;
  modules: number;
  lessons: number;
  createdAt: string;
  updatedAt: string;
  students: number;
  rating: number;
  reviews: number;
  instructor: Instructor;
  image: string;
  price: number;
  sale?: boolean;
  salePrice?: number;
  featured: boolean;
  popular: boolean;
  category: string;
  progress: number;
  requirements: string[];
  curriculum: Module[];
  faqs: FAQ[];
  badges?: string[];
  lastUpdated: string;
  certification: boolean;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  currency: string;
}

export const courses: Course[] = [];

export const courses2: Course[] = [
  {
    id: "1",
    slug: "mindful-living-essentials",
    title: "Mindful Living Essentials",
    metaTitle: "Mindful Living Essentials",
    metaDescription: "Learn foundational mindfulness practices to reduce stress and increase presence in your daily life.",
    description: "Learn foundational mindfulness practices to reduce stress and increase presence in your daily life.",
    fullDescription: `
      <p>Discover the transformative power of mindfulness in this comprehensive course. You'll learn practical techniques to bring awareness and calm to your daily life, reduce stress, and cultivate a more balanced lifestyle.</p>
      <p>Through guided meditations, practical exercises, and real-world applications, you'll develop a strong foundation in mindfulness that you can build upon for years to come.</p>
      <h3>What you'll learn:</h3>
      <ul>
        <li>Understanding the science behind mindfulness and its benefits</li>
        <li>Core meditation techniques for daily practice</li>
        <li>Stress reduction and emotional regulation strategies</li>
        <li>Mindful communication and relationship building</li>
        <li>Creating sustainable habits for long-term wellbeing</li>
      </ul>
    `,
    level: "Beginner",
    duration: "4 weeks",
    modules: 8,
    lessons: 32,
    students: 2438,
    rating: 4.8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    difficulty: "Beginner",
    currency: "USD",
    reviews: 428,
    instructor: {
      id: "1",
      name: "Dr. Sarah Johnson",
      title: "Mindfulness Expert & Clinical Psychologist",
      bio: "Dr. Sarah Johnson has over 15 years of experience teaching mindfulness and meditation. She combines her clinical psychology background with extensive meditation training to create practical, science-based programs for modern life.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rating: 4.9,
      students: 15000,
      courses: 3
    },
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 129,
    sale: true,
    salePrice: 79,
    featured: true,
    popular: true,
    category: "Mindfulness",
    progress: 0,
    requirements: [
      "No prior meditation experience needed",
      "Willingness to practice daily for 10-20 minutes",
      "Open mind and dedication to personal growth"
    ],
    curriculum: [
      {
        id: "1",
        title: "Foundation of Mindfulness",
        lessons: [
          {
            id: "1",
            title: "What is Mindfulness?",
            type: "video",
            duration: "15:24",
            videoUrl: "https://www.youtube.com/watch?v=77-akvFPEdw&list=PLKiCse6nxKm_UP-RcdnBEpgawWRRr_tXE"
          },
          {
            id: "2",
            title: "The Science Behind Mindfulness",
            type: "video",
            duration: "18:36",
            videoUrl: "https://www.youtube.com/watch?v=77-akvFPEdw&list=PLKiCse6nxKm_UP-RcdnBEpgawWRRr_tXE"
          },
          {
            id: "3",
            title: "Setting Up Your Practice",
            type: "video",
            duration: "12:45",
            videoUrl: "https://www.youtube.com/watch?v=77-akvFPEdw&list=PLKiCse6nxKm_UP-RcdnBEpgawWRRr_tXE"
          },
          {
            id: "4",
            title: "Guided Meditation: First Steps",
            type: "exercise",
            duration: "10:00"
          }
        ]
      },
      {
        id: "2" ,
        title: "Mindful Awareness in Daily Life",
        lessons: [
          {
            id: "5",
            title: "Mindful Eating Practice",
            type: "video",
            duration: "14:52"
          },
          {
            id: "6",
            title: "Mindful Movement Basics",
            type: "video",
            duration: "20:18"
          },
          {
            id: "7",
            title: "Bringing Awareness to Routine Activities",
            type: "exercise",
            duration: "08:40"
          },
          {
            id: "8",
            title: "Reflection Exercise",
            type: "pdf",
            duration: "N/A"
          }
        ]
      },
      {
        id: "3",
        title: "Working with Difficult Emotions",
        lessons: [
          {
            id: "9",
            title: "Understanding Emotional Reactions",
            type: "video",
            duration: "16:29"
          },
          {
            id: "10",
            title: "The RAIN Technique for Emotions",
            type: "video",
            duration: "22:10"
          },
          {
            id: "11",
            title: "Guided Practice: Working with Anxiety",
            type: "exercise",
            duration: "15:00"
          },
          {
            id: "12",
            title: "Journaling Exercise",
            type: "pdf",
            duration: "N/A"
          }
        ]
      },
      {
        id: "4",
        title: "Mindfulness in Relationships",
        lessons: [
          {
            id: "13",
            title: "Mindful Listening",
            type: "video",
            duration: "19:45"
          },
          {
            id: "14",
            title: "Compassion and Loving-Kindness Practices",
            type: "video",
            duration: "21:36"
          },
          {
            id: "15",
            title: "Navigating Difficult Conversations",
            type: "video",
            duration: "17:28"
          },
          {
            id: "16",
            title: "Partner Practice Exercise",
            type: "exercise",
            duration: "25:00"
          }
        ]
      },
      {
        id: "5",
        title: "Stress Reduction Techniques",
        lessons: [
          {
            id: "17",
            title: "Understanding Your Stress Response",
            type: "video",
            duration: "14:55"
          },
          {
            id: "18",
            title: "Body Scan Meditation",
            type: "exercise",
            duration: "18:20"
          },
          {
            id: "19",
            title: "Mindful Approaches to Overwhelm",
            type: "video",
            duration: "16:42"
          },
          {
            id: "20",
            title: "Progressive Relaxation Guide",
            type: "pdf",
            duration: "N/A"
          }
        ]
      },
      {
        id: "6",
        title: "Cultivating Gratitude and Joy",
        lessons: [
          {
            id: "21",
            title: "The Science of Gratitude",
            type: "video",
            duration: "13:18"
          },
          {
            id: "22",
            title: "Gratitude Meditation Practice",
            type: "exercise",
            duration: "10:15"
          },
          {
            id: "23",
            title: "Finding Joy in Simple Moments",
            type: "video",
            duration: "15:36"
          },
          {
            id: "24",
            title: "Weekly Gratitude Journal Template",
            type: "pdf",
            duration: "N/A"
          }
        ]
      },
      {
        id: "7",
        title: "Mindfulness for Better Sleep",
        lessons: [
          {
            id: "25",
            title: "Understanding Sleep Challenges",
            type: "video",
            duration: "16:22"
          },
          {
            id: "26",
            title: "Evening Wind-Down Routine",
            type: "video",
            duration: "12:47"
          },
          {
            id: "27",
            title: "Bedtime Meditation Practice",
            type: "exercise",
            duration: "15:30"
          },
          {
            id: "28",
            title: "Sleep Journal Template",
            type: "pdf",
            duration: "N/A"
          }
        ]
      },
      {
        id: "8",
        title: "Sustaining Your Practice",
        lessons: [
          {
            id: "29",
            title: "Creating a Sustainable Routine",
            type: "video",
            duration: "18:25"
          },
          {
            id: "30",
            title: "Overcoming Common Obstacles",
            type: "video",
            duration: "20:14"
          },
          {
            id: "31",
            title: "Advanced Practices to Explore",
            type: "video",
            duration: "23:18"
          },
          {
            id: "32",
            title: "Final Reflection and Next Steps",
            type: "exercise",
            duration: "10:00"
          },
          {
            id: "33",
            title: "Course Completion Certification",
            type: "certificate",
            duration: "N/A"
          }
        ]
      }
    ],
    faqs: [
      {
        question: "How much time do I need to dedicate daily?",
        answer: "We recommend 10-20 minutes daily for optimal results, but even 5 minutes can make a difference."
      },
      {
        question: "Do I need any special equipment?",
        answer: "No special equipment is needed. Just a quiet space and a comfortable place to sit."
      }
    ],
    badges: ["Bestseller", "Highest Rated"],
    lastUpdated: "2025-03",
    certification: true
  },
  {
    id: "2",
    slug: "emotional-intelligence-mastery",
    title: "Emotional Intelligence Mastery",
    metaTitle: "Emotional Intelligence Mastery",
    metaDescription: "Master the art of understanding and managing emotions to improve relationships and leadership abilities.",
    description: "Master the art of understanding and managing emotions to improve relationships and leadership abilities.",
    fullDescription: `
      <p>Develop your emotional intelligence through practical exercises, real-world scenarios, and evidence-based techniques. This course will transform how you understand and manage emotions, leading to better relationships and improved leadership capabilities.</p>
      <h3>Course Benefits:</h3>
      <ul>
        <li>Enhanced self-awareness and emotional regulation</li>
        <li>Improved communication and relationship skills</li>
        <li>Better conflict resolution abilities</li>
        <li>Increased empathy and social awareness</li>
        <li>Advanced leadership capabilities</li>
      </ul>
    `,
    level: "Intermediate",
    duration: "6 weeks",
    modules: 8,
    lessons: 33,
    students: 1876,
    rating: 4.7,
    reviews: 345,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    difficulty: "Intermediate",
    currency: "USD",
    instructor: {
      id: "2",
      name: "Michael Chen",
      title: "Leadership Coach & EQ Specialist",
      bio: "Michael Chen is a certified emotional intelligence coach with over a decade of experience training leaders at Fortune 500 companies. His approach combines psychological research with practical business applications.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rating: 4.8,
      students: 12000,
      courses: 4
    },
    image: "https://images.unsplash.com/photo-1454923634634-bd1614719a7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 199,
    featured: false,
    popular: true,
    category: "Personal Growth",
    progress: 0,
    requirements: [
      "Basic understanding of emotions and relationships",
      "Willingness to engage in self-reflection",
      "Open to receiving and giving feedback"
    ],
    curriculum: [
      {
        id: "1",
        title: "Foundations of Emotional Intelligence",
        lessons: [
          {
            id: "1",
            title: "Understanding EQ vs IQ",
            type: "video",
            duration: "12:45"
          },
          {
            id: "2",
            title: "The Four Pillars of EQ",
            type: "video",
            duration: "18:20"
          },
          {
            id: "3",
            title: "Self-Assessment Exercise",
            type: "exercise",
            duration: "30:00"
          },
          {
            id: "4",
            title: "EQ Assessment Tools",
            type: "pdf",
            duration: "N/A"
          }
        ]
      },
      {
        id: "2",
        title: "Self-Awareness Mastery",
        lessons: [
          {
            id: "5",
            title: "Understanding Your Emotional Patterns",
            type: "video",
            duration: "16:35"
          },
          {
            id: "6",
            title: "Body Awareness and Emotions",
            type: "video",
            duration: "14:22"
          },
          {
            id: "7",
            title: "Emotional Journaling Practice",
            type: "exercise",
            duration: "20:00"
          },
          {
            id: "8",
            title: "Self-Reflection Templates",
            type: "pdf",
            duration: "N/A"
          }
        ]
      },
      {
        id: "3",
        title: "Self-Regulation Techniques",
        lessons: [
          {
            id: "9",
            title: "The Pause Technique",
            type: "video",
            duration: "13:45"
          },
          {
            id: "10",
            title: "Cognitive Reappraisal",
            type: "video",
            duration: "19:18"
          },
          {
            id: "11",
            title: "Emotional Regulation Practice",
            type: "exercise",
            duration: "25:00"
          },
          {
            id: "12",
            title: "Regulation Strategies Guide",
            type: "pdf",
            duration: "N/A"
          }
        ]
      },
      {
        id: "4",
        title: "Social Awareness Development",
        lessons: [
          {
            id: "13",
            title: "Reading Social Cues",
            type: "video",
            duration: "17:30"
          },
          {
            id: "14",
            title: "Empathy Building",
            type: "video",
            duration: "21:15"
          },
          {
            id: "15",
            title: "Perspective-Taking Exercise",
            type: "exercise",
            duration: "22:00"
          },
          {
            id: "16",
            title: "Social Awareness Checklist",
            type: "pdf",
            duration: "N/A"
          }
        ]
      },
      {
        id: "5",
        title: "Relationship Management",
        lessons: [
          {
            id: "17",
            title: "Influencing Others Positively",
            type: "video",
            duration: "18:45"
          },
          {
            id: "18",
            title: "Conflict Resolution Strategies",
            type: "video",
            duration: "24:12"
          },
          {
            id: "19",
            title: "Difficult Conversation Practice",
            type: "exercise",
            duration: "30:00"
          },
          {
            id: "20",
            title: "Communication Templates",
            type: "pdf",
            duration: "N/A"
          }
        ]
      },
      {
        id: "6",
        title: "Leadership and EQ",
        lessons: [
          {
            id: "21",
            title: "Emotional Leadership",
            type: "video",
            duration: "20:30"
          },
          {
            id: "22",
            title: "Building Trust and Rapport",
            type: "video",
            duration: "16:55"
          },
          {
            id: "23",
            title: "Leadership Scenario Practice",
            type: "exercise",
            duration: "35:00"
          },
          {
            id: "24",
            title: "Leadership Assessment",
            type: "pdf",
            duration: "N/A"
          }
        ]
      },
      {
        id: "7",
        title: "EQ in the Workplace",
        lessons: [
          {
            id: "25",
            title: "Workplace Emotional Intelligence",
            type: "video",
            duration: "19:20"
          },
          {
            id: "26",
            title: "Team Dynamics and EQ",
            type: "video",
            duration: "22:45"
          },
          {
            id: "27",
            title: "Workplace Scenario Practice",
            type: "exercise",
            duration: "28:00"
          },
          {
            id: "28",
            title: "Workplace EQ Strategies",
            type: "pdf",
            duration: "N/A"
          }
        ]
      },
      {
        id: "8",
        title: "Advanced EQ Applications",
        lessons: [
          {
            id: "29",
            title: "EQ in Digital Communication",
            type: "video",
            duration: "15:40"
          },
          {
            id: "30",
            title: "Crisis Management with EQ",
            type: "video",
            duration: "26:15"
          },
          {
            id: "31",
            title: "Advanced Scenario Practice",
            type: "exercise",
            duration: "40:00"
          },
          {
            id: "32",
            title: "EQ Development Plan",
            type: "pdf",
            duration: "N/A"
          },
          {
            id: "33",
            title: "Course Completion Certification",
            type: "certificate",
            duration: "N/A"
          }
        ]
      }
    ],
    faqs: [
      {
        question: "How is this different from other EQ courses?",
        answer: "Our course focuses on practical application through real-world scenarios and personalized feedback."
      }
    ],
    lastUpdated: "2025-02",
    certification: true
  },
  {
    id: "3",
    slug: "stress-management-techniques",
    title: "Advanced Stress Management Techniques",
    metaTitle: "Advanced Stress Management Techniques",
    metaDescription: "Learn evidence-based strategies to manage stress and build resilience in challenging times.",
    description: "Learn evidence-based strategies to manage stress and build resilience in challenging times.",
    fullDescription: `
      <p>This comprehensive course provides you with practical tools and techniques to effectively manage stress in both personal and professional settings. Based on the latest research in neuroscience and psychology, you'll learn how to transform your relationship with stress.</p>
      <h3>You'll master:</h3>
      <ul>
        <li>Quick stress relief techniques</li>
        <li>Long-term resilience building</li>
        <li>Cognitive restructuring methods</li>
        <li>Work-life balance strategies</li>
        <li>Sleep optimization techniques</li>
      </ul>
    `,
    level: "All Levels",
    duration: "5 weeks",
    modules: 7,
    lessons: 29,
    students: 1567,
    rating: 4.9,
    reviews: 289,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    difficulty: "All Levels",
    currency: "USD",
    instructor: {
      id: "3",
      name: "Dr. Rachel Martinez",
      title: "Stress Management Expert & Neuroscientist",
      bio: "Dr. Martinez combines her background in neuroscience with practical stress management techniques. She has helped thousands of professionals and individuals develop effective stress management strategies.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rating: 4.9,
      students: 8500,
      courses: 2
    },
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 149,
    sale: true,
    salePrice: 99,
    featured: true,
    popular: true,
    category: "Mental Health",
    progress: 0,
    requirements: [
      "No prior experience needed",
      "Interest in improving stress management",
      "Commitment to practicing techniques"
    ],
    curriculum: [
      {
        id: "1",
        title: "Understanding Stress",
        lessons: [
          {
            id: "1",
            title: "The Science of Stress",
            type: "video",
            duration: "15:30"
          },
          {
            id: "2",
            title: "Types of Stress and Their Impact",
            type: "video",
            duration: "18:45"
          },
          {
            id: "3",
            title: "Stress Assessment Exercise",
            type: "exercise",
            duration: "20:00"
          },
          {
            id: "4",
            title: "Stress Response Patterns",
            type: "pdf",
            duration: "N/A"
          }
        ]
      },
      {
        id: "2",
        title: "Quick Stress Relief Techniques",
        lessons: [
          {
            id: "5",
            title: "The 4-7-8 Breathing Method",
            type: "video",
            duration: "12:20"
          },
          {
            id: "6",
            title: "Progressive Muscle Relaxation",
            type: "video",
            duration: "16:35"
          },
          {
            id: "7",
            title: "Quick Relief Practice Session",
            type: "exercise",
            duration: "15:00"
          },
          {
            id: "8",
            title: "Emergency Stress Relief Guide",
            type: "pdf",
            duration: "N/A"
          }
        ]
      },
      {
        id: "3",
        title: "Cognitive Stress Management",
        lessons: [
          {
            id: "9",
            title: "Cognitive Restructuring Basics",
            type: "video",
            duration: "19:15"
          },
          {
            id: "10",
            title: "Challenging Negative Thoughts",
            type: "video",
            duration: "22:40"
          },
          {
            id: "11",
            title: "Thought Record Exercise",
            type: "exercise",
            duration: "25:00"
          },
          {
            id: "12",
            title: "Cognitive Tools Workbook",
            type: "pdf",
            duration: "N/A"
          }
        ]
      },
      {
        id: "4",
        title: "Workplace Stress Management",
        lessons: [
          {
            id: "13",
            title: "Identifying Workplace Stressors",
            type: "video",
            duration: "17:25"
          },
          {
            id: "14",
            title: "Boundary Setting at Work",
            type: "video",
            duration: "20:10"
          },
          {
            id: "15",
            title: "Workplace Stress Audit",
            type: "exercise",
            duration: "30:00"
          },
          {
            id: "16",
            title: "Work-Life Balance Strategies",
            type: "pdf",
            duration: "N/A"
          }
        ]
      },
      {
        id: "5",
        title: "Lifestyle and Stress",
        lessons: [
          {
            id: "17",
            title: "Sleep and Stress Connection",
            type: "video",
            duration: "14:50"
          },
          {
            id: "18",
            title: "Nutrition for Stress Management",
            type: "video",
            duration: "18:30"
          },
          {
            id: "19",
            title: "Exercise and Stress Relief",
            type: "video",
            duration: "16:45"
          },
          {
            id: "20",
            title: "Lifestyle Assessment Tool",
            type: "exercise",
            duration: "20:00"
          }
        ]
      },
      {
        id: "6",
        title: "Building Resilience",
        lessons: [
          {
            id: "21",
            title: "The Science of Resilience",
            type: "video",
            duration: "21:15"
          },
          {
            id: "22",
            title: "Resilience Building Practices",
            type: "video",
            duration: "24:20"
          },
          {
            id: "23",
            title: "Resilience Assessment",
            type: "exercise",
            duration: "25:00"
          },
          {
            id: "24",
            title: "Resilience Development Plan",
            type: "pdf",
            duration: "N/A"
          }
        ]
      },
      {
        id: "7",
        title: "Advanced Stress Management",
        lessons: [
          {
            id: "25",
            title: "Mindfulness-Based Stress Reduction",
            type: "video",
            duration: "26:40"
          },
          {
            id: "26",
            title: "Biofeedback Techniques",
            type: "video",
            duration: "19:55"
          },
          {
            id: "27",
            title: "Advanced Practice Session",
            type: "exercise",
            duration: "35:00"
          },
          {
            id: "28",
            title: "Personal Stress Management Plan",
            type: "pdf",
            duration: "N/A"
          },
          {
            id: "29",
            title: "Course Completion Certification",
            type: "certificate",
            duration: "N/A"
          }
        ]
      }
    ],
    faqs: [
      {
        question: "Will this help with workplace stress?",
        answer: "Yes, the course includes specific modules dedicated to workplace stress management."
      }
    ],
    badges: ["Most Popular", "High Impact"],
    lastUpdated: "2025-03",
    certification: true
  },
  {
    id: "4",
    slug: "meditation-for-modern-life",
    title: "Meditation for Modern Life",
    metaTitle: "Meditation for Modern Life",
    metaDescription: "A practical approach to meditation designed for busy professionals and modern lifestyles.",
    description: "A practical approach to meditation designed for busy professionals and modern lifestyles.",
    fullDescription: `
      <p>This course makes meditation accessible and practical for modern living. Learn how to integrate mindfulness into your busy schedule and develop a sustainable practice that fits your lifestyle.</p>
      <h3>Course highlights:</h3>
      <ul>
        <li>Quick meditation techniques for busy schedules</li>
        <li>Mobile meditation practices</li>
        <li>Digital age mindfulness</li>
        <li>Stress-relief on the go</li>
        <li>Building lasting habits</li>
      </ul>
    `,
    level: "Beginner",
    duration: "4 weeks",
    modules: 5,
    lessons: 21,
    students: 2156,
    rating: 4.8,
    reviews: 376,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    difficulty: "Beginner",
    currency: "USD",
    instructor: {
      id: "4",
      name: "Alex Thompson",
      title: "Modern Meditation Coach",
      bio: "Alex Thompson specializes in making meditation accessible for busy professionals. With a background in tech and mindfulness, he bridges the gap between ancient practices and modern living.",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rating: 4.7,
      students: 9800,
      courses: 3
    },
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 89,
    featured: true,
    popular: true,
    category: "Mindfulness",
    progress: 0,
    requirements: [
      "No meditation experience required",
      "Smartphone for mobile meditations",
      "5-10 minutes daily for practice"
    ],
    curriculum: [
      {
        id: "1",
        title: "Getting Started",
        lessons: [
          {
            id: "1",
            title: "Modern Meditation Basics",
            type: "video",
            duration: "08:45"
          },
          {
            id: "2",
            title: "Why Meditation Matters Today",
            type: "video",
            duration: "12:30"
          },
          {
            id: "3",
            title: "Quick Start Meditation",
            type: "exercise",
            duration: "05:00"
          },
          {
            id: "4",
            title: "Meditation Readiness Assessment",
            type: "pdf",
            duration: "N/A"
          }
        ]
      },
      {
        id: "2",
        title: "Quick Meditation Techniques",
        lessons: [
          {
            id: "5",
            title: "One-Minute Breathing",
            type: "video",
            duration: "06:15"
          },
          {
            id: "6",
            title: "Walking Meditation",
            type: "video",
            duration: "10:20"
          },
          {
            id: "7",
            title: "Quick Meditation Practice",
            type: "exercise",
            duration: "08:00"
          },
          {
            id: "8",
            title: "Quick Meditation Guide",
            type: "pdf",
            duration: "N/A"
          }
        ]
      },
      {
        id: "3",
        title: "Digital Age Mindfulness",
        lessons: [
          {
            id: "9",
            title: "Mindful Technology Use",
            type: "video",
            duration: "14:25"
          },
          {
            id: "10",
            title: "Meditation Apps and Tools",
            type: "video",
            duration: "11:40"
          },
          {
            id: "11",
            title: "Digital Detox Practice",
            type: "exercise",
            duration: "15:00"
          },
          {
            id: "12",
            title: "Digital Wellness Checklist",
            type: "pdf",
            duration: "N/A"
          }
        ]
      },
      {
        id: "4",
        title: "Workplace Meditation",
        lessons: [
          {
            id: "13",
            title: "Desk Meditation Techniques",
            type: "video",
            duration: "09:30"
          },
          {
            id: "14",
            title: "Meeting Preparation Meditation",
            type: "video",
            duration: "07:45"
          },
          {
            id: "15",
            title: "Workplace Meditation Practice",
            type: "exercise",
            duration: "12:00"
          },
          {
            id: "16",
            title: "Workplace Integration Guide",
            type: "pdf",
            duration: "N/A"
          }
        ]
      },
      {
        id: "5",
        title: "Building Lasting Habits",
        lessons: [
          {
            id: "17",
            title: "Habit Formation Science",
            type: "video",
            duration: "16:20"
          },
          {
            id: "18",
            title: "Creating Your Meditation Routine",
            type: "video",
            duration: "13:15"
          },
          {
            id: "19",
            title: "Habit Tracking Exercise",
            type: "exercise",
            duration: "10:00"
          },
          {
            id: "20",
            title: "Meditation Habit Tracker",
            type: "pdf",
            duration: "N/A"
          },
          {
            id: "21",
            title: "Course Completion Certification",
            type: "certificate",
            duration: "N/A"
          }
        ]
      }
    ],
    faqs: [
      {
        question: "Can I meditate at work?",
        answer: "Yes, we teach specific techniques for the workplace that can be done discreetly."
      }
    ],
    badges: ["Quick Start", "Beginner Friendly"],
    lastUpdated: "2025-04",
    certification: true
  }
];

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  return courses.find(course => course.slug === slug);
}

export async function getAllCourses(): Promise<Course[]> {
  return courses;
}

export async function getCoursesByCategory(category: string): Promise<Course[]> {
  if (category === "All Categories") {
    return courses;
  }
  return courses.filter(course => course.category === category);
}

export async function getCoursesByLevel(level: string): Promise<Course[]> {
  if (level === "All Levels") {
    return courses;
  }
  return courses.filter(course => course.level === level);
}

export async function getFeaturedCourses(): Promise<Course[]> {
  return courses.filter(course => course.featured);
}

export async function getPopularCourses(): Promise<Course[]> {
  return courses.filter(course => course.popular);
}

export async function searchCourses(query: string): Promise<Course[]> {
  const lowercaseQuery = query.toLowerCase();
  return courses.filter(course => 
    course.title.toLowerCase().includes(lowercaseQuery) ||
    course.description.toLowerCase().includes(lowercaseQuery) ||
    course.instructor.name.toLowerCase().includes(lowercaseQuery)
  );
}

export const categories = [
  "All Categories",
  "Mindfulness",
  "Personal Growth", 
  "Career",
  "Relationships",
  "Mental Health",
  "Spirituality"
];

export const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];
