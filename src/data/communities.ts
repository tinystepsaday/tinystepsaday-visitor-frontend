export interface Community {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  image: string;
  totem: string;
  memberCount: number;
  category: string;
  status: 'active' | 'draft' | 'archived' | 'private';
  isPublic: boolean;
  requiresApproval: boolean;
  maxMembers?: number;
  leader: {
    name: string;
    role: string;
    avatar?: string;
    email: string;
  };
  location: {
    discord?: string;
    instagram?: string;
    facebook?: string;
    website?: string;
    email?: string;
  };
  guidelines: string[];
  rules: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  lastActivity: string;
  averageRating: number;
  reviewCount: number;
  reviews: CommunityReview[];
  members: CommunityMember[];
  events: CommunityEvent[];
  posts: CommunityPost[];
  slug: string;
}

export interface CommunityReview {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  date: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
}

export interface CommunityMember {
  id: string;
  name: string;
  avatar?: string;
  role: 'member' | 'moderator' | 'admin' | 'leader';
  joinedAt: string;
  lastActive: string;
  contributionCount: number;
  status: 'active' | 'inactive' | 'banned';
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees?: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  date: string;
  likes: number;
  comments: number;
  tags: string[];
}

export const communities: Community[] = [];

export const communities2: Community[] = [
  {
    id: "meditation",
    name: "Meditation Masters",
    description: "A community dedicated to mindfulness and meditation practice",
    detailedDescription: "Join our supportive community of meditation practitioners from beginners to advanced levels. Share experiences, learn new techniques, and find accountability partners for your mindfulness journey. We host regular guided sessions, workshops, and discussions on various meditation traditions.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    totem: "🧘",
    memberCount: 1250,
    category: "Mindfulness",
    status: "active",
    isPublic: true,
    requiresApproval: false,
    maxMembers: 2000,
    leader: {
      name: "Sarah Johnson",
      role: "Community Leader",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786",
      email: "sarah@meditationmasters.com"
    },
    location: {
      discord: "discord.gg/meditation-masters",
      instagram: "@meditationmasters",
      facebook: "fb.com/meditationmasters",
      website: "meditationmasters.com"
    },
    guidelines: [
      "Regular participation in community events",
      "Share your meditation experiences",
      "Support fellow meditators",
      "Follow mindfulness principles"
    ],
    rules: [
      "Be respectful and kind to all members",
      "No promotion of commercial products without approval",
      "Keep discussions focused on meditation and mindfulness",
      "Respect different meditation traditions and practices"
    ],
    tags: ["meditation", "mindfulness", "wellness", "spirituality"],
    createdAt: "2024-01-15T00:00:00.000Z",
    updatedAt: "2025-01-20T00:00:00.000Z",
    lastActivity: "2025-01-20T10:30:00.000Z",
    averageRating: 4.8,
    reviewCount: 89,
    slug: "meditation-masters",
    reviews: [
      {
        id: "1",
        user: {
          name: "Alex Chen",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
        },
        date: "2025-01-15T00:00:00.000Z",
        rating: 5,
        title: "Incredibly Supportive Community",
        comment: "This community has transformed my meditation practice. The members are so supportive and the guided sessions are excellent. I've learned so much about different meditation techniques.",
        verified: true
      },
      {
        id: "2",
        user: {
          name: "Maria Rodriguez"
        },
        date: "2025-01-10T00:00:00.000Z",
        rating: 4,
        title: "Great for Beginners",
        comment: "As someone new to meditation, this community has been perfect. The leaders are patient and there's no judgment. I've made real progress in my practice.",
        verified: true
      }
    ],
    members: [
      {
        id: "1",
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786",
        role: "leader",
        joinedAt: "2024-01-15T00:00:00.000Z",
        lastActive: "2025-01-20T10:30:00.000Z",
        contributionCount: 156,
        status: "active"
      },
      {
        id: "2",
        name: "Alex Chen",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        role: "moderator",
        joinedAt: "2024-02-01T00:00:00.000Z",
        lastActive: "2025-01-19T15:45:00.000Z",
        contributionCount: 89,
        status: "active"
      }
    ],
    events: [
      {
        id: "1",
        title: "Weekly Guided Meditation",
        description: "Join us for a 30-minute guided meditation session",
        date: "2025-01-25",
        time: "19:00",
        location: "Online (Zoom)",
        attendees: 45,
        maxAttendees: 50,
        status: "upcoming"
      }
    ],
    posts: [
      {
        id: "1",
        title: "My 30-day meditation challenge experience",
        content: "I just completed a 30-day meditation challenge and wanted to share my journey...",
        author: {
          name: "Alex Chen",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
        },
        date: "2025-01-18T14:30:00.000Z",
        likes: 23,
        comments: 8,
        tags: ["challenge", "experience", "motivation"]
      }
    ]
  },
  {
    id: "reading",
    name: "Book Enthusiasts",
    description: "Share your reading journey and discover new books",
    detailedDescription: "A vibrant community for book lovers to share recommendations, discuss literature, and participate in reading challenges. Whether you're into fiction, non-fiction, self-help, or academic texts, you'll find like-minded readers here.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570",
    totem: "📚",
    memberCount: 890,
    category: "Education",
    status: "active",
    isPublic: true,
    requiresApproval: true,
    maxMembers: 1500,
    leader: {
      name: "David Kim",
      role: "Community Leader",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      email: "david@bookenthusiasts.com"
    },
    location: {
      discord: "discord.gg/book-enthusiasts",
      instagram: "@bookenthusiasts",
      website: "bookenthusiasts.com"
    },
    guidelines: [
      "Share your current reads and recommendations",
      "Participate in monthly reading challenges",
      "Respect different reading preferences",
      "Engage in thoughtful book discussions"
    ],
    rules: [
      "No spoilers without proper warnings",
      "Be respectful of different genres and preferences",
      "No piracy or illegal content sharing",
      "Keep discussions civil and constructive"
    ],
    tags: ["books", "reading", "literature", "education"],
    createdAt: "2024-03-10T00:00:00.000Z",
    updatedAt: "2025-01-19T00:00:00.000Z",
    lastActivity: "2025-01-19T16:20:00.000Z",
    averageRating: 4.6,
    reviewCount: 67,
    slug: "book-enthusiasts",
    reviews: [
      {
        id: "3",
        user: {
          name: "Emma Wilson"
        },
        date: "2025-01-12T00:00:00.000Z",
        rating: 5,
        title: "Amazing Book Recommendations",
        comment: "I've discovered so many great books through this community. The members have diverse tastes and always provide thoughtful recommendations.",
        verified: true
      }
    ],
    members: [
      {
        id: "3",
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        role: "leader",
        joinedAt: "2024-03-10T00:00:00.000Z",
        lastActive: "2025-01-19T16:20:00.000Z",
        contributionCount: 203,
        status: "active"
      }
    ],
    events: [
      {
        id: "2",
        title: "Monthly Book Club Discussion",
        description: "Discussion of this month's selected book",
        date: "2025-01-30",
        time: "20:00",
        location: "Online (Discord)",
        attendees: 28,
        maxAttendees: 40,
        status: "upcoming"
      }
    ],
    posts: [
      {
        id: "2",
        title: "Best self-help books for 2025",
        content: "What are your top recommendations for self-help books this year?",
        author: {
          name: "Emma Wilson"
        },
        date: "2025-01-19T16:20:00.000Z",
        likes: 15,
        comments: 12,
        tags: ["self-help", "recommendations", "2025"]
      }
    ]
  },
  {
    id: "wellness",
    name: "Wellness Warriors",
    description: "Supporting each other in health and wellness goals",
    detailedDescription: "A comprehensive wellness community covering physical health, mental health, nutrition, fitness, and holistic well-being. Share your wellness journey, get support, and learn from others' experiences.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    totem: "🌱",
    memberCount: 750,
    category: "Health",
    status: "active",
    isPublic: true,
    requiresApproval: false,
    maxMembers: 1000,
    leader: {
      name: "Lisa Thompson",
      role: "Community Leader",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      email: "lisa@wellnesswarriors.com"
    },
    location: {
      discord: "discord.gg/wellness-warriors",
      instagram: "@wellnesswarriors",
      facebook: "fb.com/wellnesswarriors"
    },
    guidelines: [
      "Share your wellness goals and progress",
      "Support others in their health journey",
      "Provide evidence-based advice",
      "Celebrate achievements together"
    ],
    rules: [
      "No medical advice - consult professionals",
      "Be supportive and non-judgmental",
      "Respect different health approaches",
      "No promotion of fad diets or unsafe practices"
    ],
    tags: ["wellness", "health", "fitness", "nutrition"],
    createdAt: "2024-05-20T00:00:00.000Z",
    updatedAt: "2025-01-18T00:00:00.000Z",
    lastActivity: "2025-01-18T12:15:00.000Z",
    averageRating: 4.7,
    reviewCount: 45,
    slug: "wellness-warriors",
    reviews: [
      {
        id: "4",
        user: {
          name: "Michael Brown"
        },
        date: "2025-01-08T00:00:00.000Z",
        rating: 5,
        title: "Incredibly Supportive",
        comment: "This community has been instrumental in my wellness journey. The support and encouragement from members is amazing.",
        verified: true
      }
    ],
    members: [
      {
        id: "4",
        name: "Lisa Thompson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
        role: "leader",
        joinedAt: "2024-05-20T00:00:00.000Z",
        lastActive: "2025-01-18T12:15:00.000Z",
        contributionCount: 178,
        status: "active"
      }
    ],
    events: [
      {
        id: "3",
        title: "Wellness Workshop: Stress Management",
        description: "Learn effective stress management techniques",
        date: "2025-01-28",
        time: "18:00",
        location: "Online (Zoom)",
        attendees: 35,
        maxAttendees: 50,
        status: "upcoming"
      }
    ],
    posts: [
      {
        id: "3",
        title: "My 6-month wellness transformation",
        content: "I wanted to share my journey and the lessons I've learned...",
        author: {
          name: "Michael Brown"
        },
        date: "2025-01-18T12:15:00.000Z",
        likes: 42,
        comments: 15,
        tags: ["transformation", "journey", "motivation"]
      }
    ]
  },
  {
    id: "productivity",
    name: "Productivity Masters",
    description: "Master the art of productivity and time management",
    detailedDescription: "A community focused on productivity, time management, goal setting, and personal effectiveness. Share productivity hacks, discuss tools and techniques, and help each other achieve more.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b",
    totem: "⚡",
    memberCount: 620,
    category: "Productivity",
    status: "active",
    isPublic: true,
    requiresApproval: true,
    maxMembers: 800,
    leader: {
      name: "James Wilson",
      role: "Community Leader",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      email: "james@productivitymasters.com"
    },
    location: {
      discord: "discord.gg/productivity-masters",
      instagram: "@productivitymasters",
      website: "productivitymasters.com"
    },
    guidelines: [
      "Share productivity tips and techniques",
      "Discuss time management strategies",
      "Help others with goal setting",
      "Share success stories and challenges"
    ],
    rules: [
      "Focus on practical, actionable advice",
      "Respect different productivity styles",
      "No promotion of productivity tools without value",
      "Be encouraging and supportive"
    ],
    tags: ["productivity", "time-management", "goals", "efficiency"],
    createdAt: "2024-07-15T00:00:00.000Z",
    updatedAt: "2025-01-17T00:00:00.000Z",
    lastActivity: "2025-01-17T09:45:00.000Z",
    averageRating: 4.5,
    reviewCount: 38,
    slug: "productivity-masters",
    reviews: [
      {
        id: "5",
        user: {
          name: "Anna Davis"
        },
        date: "2025-01-05T00:00:00.000Z",
        rating: 4,
        title: "Great Productivity Tips",
        comment: "I've learned so many useful productivity techniques here. The community is very knowledgeable and supportive.",
        verified: true
      }
    ],
    members: [
      {
        id: "5",
        name: "James Wilson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
        role: "leader",
        joinedAt: "2024-07-15T00:00:00.000Z",
        lastActive: "2025-01-17T09:45:00.000Z",
        contributionCount: 145,
        status: "active"
      }
    ],
    events: [
      {
        id: "4",
        title: "Productivity Tools Workshop",
        description: "Learn about the best productivity tools and apps",
        date: "2025-01-26",
        time: "19:30",
        location: "Online (Zoom)",
        attendees: 22,
        maxAttendees: 30,
        status: "upcoming"
      }
    ],
    posts: [
      {
        id: "4",
        title: "My morning routine that changed everything",
        content: "After struggling with productivity for years, I finally found a morning routine that works...",
        author: {
          name: "Anna Davis"
        },
        date: "2025-01-17T09:45:00.000Z",
        likes: 31,
        comments: 11,
        tags: ["morning-routine", "habits", "success"]
      }
    ]
  }
];

// Utility functions
export function getCommunityById(id: string): Community | undefined {
  return communities.find(community => community.id === id);
}

export function getCommunityBySlug(slug: string): Community | undefined {
  return communities.find(community => community.slug === slug);
}

export function getAllCommunities(): Community[] {
  return communities;
}

export function getCommunitiesByCategory(category: string): Community[] {
  return communities.filter(community => community.category === category);
}

export function getActiveCommunities(): Community[] {
  return communities.filter(community => community.status === 'active');
}

export function getPublicCommunities(): Community[] {
  return communities.filter(community => community.isPublic);
}

export function getFilteredCommunities(params: {
  search?: string;
  category?: string;
  status?: string;
  isPublic?: boolean;
  requiresApproval?: boolean;
  sortBy?: 'name' | 'memberCount' | 'rating' | 'createdAt' | 'lastActivity';
  sortOrder?: 'asc' | 'desc';
}): Community[] {
  let filtered = [...communities];

  // Search filter
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filtered = filtered.filter(community =>
      community.name.toLowerCase().includes(searchLower) ||
      community.description.toLowerCase().includes(searchLower) ||
      community.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  // Category filter
  if (params.category && params.category !== 'All Categories') {
    filtered = filtered.filter(community => community.category === params.category);
  }

  // Status filter
  if (params.status && params.status !== 'All Status') {
    filtered = filtered.filter(community => community.status === params.status);
  }

  // Public filter
  if (params.isPublic !== undefined) {
    filtered = filtered.filter(community => community.isPublic === params.isPublic);
  }

  // Approval filter
  if (params.requiresApproval !== undefined) {
    filtered = filtered.filter(community => community.requiresApproval === params.requiresApproval);
  }

  // Sorting
  if (params.sortBy) {
    filtered.sort((a, b) => {
      let aValue: string | number | Date;
      let bValue: string | number | Date;

      switch (params.sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'memberCount':
          aValue = a.memberCount;
          bValue = b.memberCount;
          break;
        case 'rating':
          aValue = a.averageRating;
          bValue = b.averageRating;
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        case 'lastActivity':
          aValue = new Date(a.lastActivity);
          bValue = new Date(b.lastActivity);
          break;
        default:
          return 0;
      }

      if (params.sortOrder === 'desc') {
        return bValue > aValue ? 1 : -1;
      } else {
        return aValue > bValue ? 1 : -1;
      }
    });
  }

  return filtered;
}

export function getPaginatedCommunities(
  communities: Community[],
  page: number,
  pageSize: number
): { communities: Community[]; totalPages: number; totalCommunities: number } {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedCommunities = communities.slice(startIndex, endIndex);
  const totalPages = Math.ceil(communities.length / pageSize);

  return {
    communities: paginatedCommunities,
    totalPages,
    totalCommunities: communities.length
  };
}

export function getUniqueCategories(): string[] {
  return [...new Set(communities.map(community => community.category))];
}

export function getCommunityStats() {
  const totalCommunities = communities.length;
  const activeCommunities = communities.filter(c => c.status === 'active').length;
  const totalMembers = communities.reduce((acc, c) => acc + c.memberCount, 0);
  const averageRating = communities.reduce((acc, c) => acc + c.averageRating, 0) / communities.length;

  return {
    totalCommunities,
    activeCommunities,
    totalMembers,
    averageRating: averageRating || 0
  };
} 