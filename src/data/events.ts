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
}

export const events: Event[] = [
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
    category: "mindfulness"
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
    category: "retreat"
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
    category: "wellness"
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
    category: "yoga"
  }
];

export function getEventBySlug(slug: string): Event | undefined {
  return events.find(event => event.slug === slug);
}

export function getUpcomingEvents(): Event[] {
  return events.filter(event => event.availableSeats > 0);
}

export function getFeaturedEvents(): Event[] {
  return events.filter(event => event.featured);
} 