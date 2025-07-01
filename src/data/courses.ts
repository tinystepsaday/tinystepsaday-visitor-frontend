
export interface Lesson {
  id: number;
  title: string;
  type: "video" | "exercise" | "pdf" | "certificate";
  duration: string;
}

export interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

export interface Instructor {
  id: number;
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
  id: number;
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  duration: string;
  modules: number;
  lessons: number;
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
}

export const courses: Course[] = [
  {
    id: 1,
    slug: "mindful-living-essentials",
    title: "Mindful Living Essentials",
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
    modules: 6,
    lessons: 24,
    students: 2438,
    rating: 4.8,
    reviews: 428,
    instructor: {
      id: 1,
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
        id: 1,
        title: "Introduction to Mindfulness",
        lessons: [
          {
            id: 1,
            title: "What is Mindfulness?",
            type: "video",
            duration: "10:23"
          },
          {
            id: 2,
            title: "The Science of Mindfulness",
            type: "video",
            duration: "15:45"
          },
          {
            id: 3,
            title: "Your First Meditation",
            type: "exercise",
            duration: "20:00"
          }
        ]
      },
      {
        id: 2,
        title: "Building Your Practice",
        lessons: [
          {
            id: 4,
            title: "Setting Up Your Meditation Space",
            type: "video",
            duration: "08:30"
          },
          {
            id: 5,
            title: "Breath Awareness Technique",
            type: "exercise",
            duration: "15:00"
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
    lastUpdated: "2024-03",
    certification: true
  },
  {
    id: 2,
    slug: "emotional-intelligence-mastery",
    title: "Emotional Intelligence Mastery",
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
    lessons: 32,
    students: 1876,
    rating: 4.7,
    reviews: 345,
    instructor: {
      id: 2,
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
        id: 1,
        title: "Foundations of Emotional Intelligence",
        lessons: [
          {
            id: 1,
            title: "Understanding EQ vs IQ",
            type: "video",
            duration: "12:45"
          },
          {
            id: 2,
            title: "Self-Assessment Exercise",
            type: "exercise",
            duration: "30:00"
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
    lastUpdated: "2024-02",
    certification: true
  },
  {
    id: 3,
    slug: "stress-management-techniques",
    title: "Advanced Stress Management Techniques",
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
    lessons: 28,
    students: 1567,
    rating: 4.9,
    reviews: 289,
    instructor: {
      id: 3,
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
        id: 1,
        title: "Understanding Stress",
        lessons: [
          {
            id: 1,
            title: "The Science of Stress",
            type: "video",
            duration: "15:30"
          },
          {
            id: 2,
            title: "Stress Assessment",
            type: "exercise",
            duration: "20:00"
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
    lastUpdated: "2024-03",
    certification: true
  },
  {
    id: 4,
    slug: "meditation-for-modern-life",
    title: "Meditation for Modern Life",
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
    lessons: 20,
    students: 2156,
    rating: 4.8,
    reviews: 376,
    instructor: {
      id: 4,
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
        id: 1,
        title: "Getting Started",
        lessons: [
          {
            id: 1,
            title: "Modern Meditation Basics",
            type: "video",
            duration: "08:45"
          },
          {
            id: 2,
            title: "Quick Start Meditation",
            type: "exercise",
            duration: "05:00"
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
    lastUpdated: "2024-04",
    certification: true
  }
];
