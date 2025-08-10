export interface Event {
  id: string;
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  description: string;
  price: number;
  availableSeats: number;
  facilitator: string;
  facilitatorBio: string;
  agenda: string[];
  image: string;
  featured?: boolean;
  category: string;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  maxSeats: number;
  registrationDeadline: string;
  tags: string[];
  requirements?: string[];
  materials?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface EventApplicant {
  id: string;
  eventId: string;
  name: string;
  email: string;
  phone?: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  appliedAt: string;
  notes?: string;
  dietaryRestrictions?: string;
  specialRequirements?: string;
}

export const events: Event[] = [];

export const events2: Event[] = [
  {
    id: "1",
    slug: "mindfulness-workshop",
    title: "Mindfulness Workshop",
    date: "April 25, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Online",
    address: "Zoom (link will be sent after registration)",
    description: "Join us for a transformative mindfulness workshop led by expert practitioners. This interactive session will guide you through proven techniques to reduce stress, increase focus, and cultivate greater awareness in your daily life. Suitable for beginners and experienced practitioners alike.",
    price: 49.99,
    availableSeats: 15,
    maxSeats: 30,
    facilitator: "Dr. Sarah Johnson",
    facilitatorBio: "Dr. Sarah Johnson is a clinical psychologist specializing in mindfulness-based cognitive therapy with over 15 years of experience.",
    agenda: [
      "Introduction to mindfulness concepts",
      "Guided meditation sessions",
      "Mindful breathing techniques",
      "Body scan practice",
      "Q&A and personalized guidance"
    ],
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    featured: true,
    category: "mindfulness",
    status: "published",
    registrationDeadline: "April 20, 2025",
    tags: ["mindfulness", "meditation", "stress-relief", "online"],
    requirements: ["Comfortable seating", "Quiet environment"],
    materials: ["Meditation cushion (optional)", "Journal and pen"],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T14:30:00Z"
  },
  {
    id: "2",
    slug: "meditation-retreat",
    title: "Meditation Retreat",
    date: "May 15-17, 2025",
    time: "All Day",
    location: "Serenity Center",
    address: "123 Peaceful Valley Road, Tranquility, CA 90210",
    description: "A three-day immersive retreat focusing on meditation and inner peace. This transformative experience will help you deepen your practice and connect with like-minded individuals in a serene natural setting.",
    price: 299.99,
    availableSeats: 8,
    maxSeats: 20,
    facilitator: "Master Zen Chen",
    facilitatorBio: "Master Zen Chen has been teaching meditation for over 25 years and has guided thousands of students on their spiritual journey.",
    agenda: [
      "Morning meditation sessions",
      "Walking meditation in nature",
      "Mindful eating practices",
      "Evening reflection circles",
      "Personal guidance sessions"
    ],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    featured: true,
    category: "retreat",
    status: "published",
    registrationDeadline: "May 1, 2025",
    tags: ["retreat", "meditation", "nature", "immersive"],
    requirements: ["Comfortable walking shoes", "Weather-appropriate clothing"],
    materials: ["Meditation cushion", "Yoga mat", "Journal"],
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-01-18T16:45:00Z"
  },
  {
    id: "3",
    slug: "stress-management-seminar",
    title: "Stress Management Seminar",
    date: "June 10, 2025",
    time: "6:00 PM - 8:00 PM",
    location: "Community Center",
    address: "456 Wellness Avenue, Health City, CA 90211",
    description: "Learn practical techniques to manage stress in your daily life. This seminar combines scientific research with practical exercises to help you develop a personalized stress management toolkit.",
    price: 29.99,
    availableSeats: 25,
    maxSeats: 50,
    facilitator: "Dr. Michael Rodriguez",
    facilitatorBio: "Dr. Michael Rodriguez is a stress management expert with a PhD in Clinical Psychology and specializes in workplace wellness.",
    agenda: [
      "Understanding stress and its impact",
      "Breathing and relaxation techniques",
      "Time management strategies",
      "Building resilience",
      "Creating a personal stress management plan"
    ],
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56",
    category: "wellness",
    status: "published",
    registrationDeadline: "June 5, 2025",
    tags: ["stress-management", "wellness", "workplace", "seminar"],
    requirements: ["Comfortable clothing", "Open mind"],
    materials: ["Workbook", "Stress assessment tools"],
    createdAt: "2024-01-12T11:30:00Z",
    updatedAt: "2024-01-22T10:15:00Z"
  },
  {
    id: "4",
    slug: "yoga-for-beginners",
    title: "Yoga for Beginners",
    date: "July 5, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "Online",
    address: "Live stream (link will be sent after registration)",
    description: "Perfect for those new to yoga, this workshop will introduce you to basic poses, breathing techniques, and the fundamentals of a yoga practice. No experience required!",
    price: 39.99,
    availableSeats: 30,
    maxSeats: 40,
    facilitator: "Emma Thompson",
    facilitatorBio: "Emma Thompson is a certified yoga instructor with 10 years of experience teaching beginners and advanced practitioners alike.",
    agenda: [
      "Introduction to yoga philosophy",
      "Basic yoga poses and alignment",
      "Breathing techniques (pranayama)",
      "Simple meditation practices",
      "Creating a home practice routine"
    ],
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
    category: "yoga",
    status: "draft",
    registrationDeadline: "July 1, 2025",
    tags: ["yoga", "beginners", "online", "fitness"],
    requirements: ["Yoga mat", "Comfortable space"],
    materials: ["Yoga mat", "Props (blocks, straps)"],
    createdAt: "2024-01-25T08:00:00Z",
    updatedAt: "2024-01-25T08:00:00Z"
  }
];

// Mock applicants data
export const eventApplicants: EventApplicant[] = [
  {
    id: "1",
    eventId: "1",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1-555-0123",
    status: "approved",
    appliedAt: "2024-01-16T14:30:00Z",
    notes: "Experienced meditator, looking to deepen practice",
    dietaryRestrictions: "Vegetarian",
    specialRequirements: "None"
  },
  {
    id: "2",
    eventId: "1",
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    status: "pending",
    appliedAt: "2024-01-17T09:15:00Z",
    notes: "First time attending mindfulness workshop",
    dietaryRestrictions: "None",
    specialRequirements: "None"
  },
  {
    id: "3",
    eventId: "2",
    name: "Michael Brown",
    email: "michael.brown@email.com",
    phone: "+1-555-0456",
    status: "approved",
    appliedAt: "2024-01-11T16:20:00Z",
    notes: "Looking for intensive retreat experience",
    dietaryRestrictions: "Vegan",
    specialRequirements: "Accessibility accommodations needed"
  },
  {
    id: "4",
    eventId: "3",
    name: "Lisa Davis",
    email: "lisa.davis@email.com",
    status: "rejected",
    appliedAt: "2024-01-13T11:45:00Z",
    notes: "Application received after deadline",
    dietaryRestrictions: "None",
    specialRequirements: "None"
  }
];

// Management functions
export function getEventBySlug(slug: string): Event | undefined {
  return events.find(event => event.slug === slug);
}

export function getEventById(id: string): Event | undefined {
  return events.find(event => event.id === id);
}

export function getUpcomingEvents(): Event[] {
  return events.filter(event => event.availableSeats > 0 && event.status === 'published');
}

export function getFeaturedEvents(): Event[] {
  return events.filter(event => event.featured && event.status === 'published');
}

export function getAllEvents(): Event[] {
  return events;
}

export function getEventsByStatus(status: Event['status']): Event[] {
  return events.filter(event => event.status === status);
}

export function getEventsByCategory(category: string): Event[] {
  return events.filter(event => event.category === category);
}

export function getEventApplicants(eventId: string): EventApplicant[] {
  return eventApplicants.filter(applicant => applicant.eventId === eventId);
}

export function getApplicantById(id: string): EventApplicant | undefined {
  return eventApplicants.find(applicant => applicant.id === id);
}

export function getApplicantsByStatus(status: EventApplicant['status']): EventApplicant[] {
  return eventApplicants.filter(applicant => applicant.status === status);
}

// Statistics functions
export function getEventStats() {
  const totalEvents = events.length;
  const publishedEvents = events.filter(e => e.status === 'published').length;
  const draftEvents = events.filter(e => e.status === 'draft').length;
  const totalApplicants = eventApplicants.length;
  const pendingApplicants = eventApplicants.filter(a => a.status === 'pending').length;
  const approvedApplicants = eventApplicants.filter(a => a.status === 'approved').length;

  return {
    totalEvents,
    publishedEvents,
    draftEvents,
    totalApplicants,
    pendingApplicants,
    approvedApplicants
  };
} 