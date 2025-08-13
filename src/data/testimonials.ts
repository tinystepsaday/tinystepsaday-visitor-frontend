export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Executive",
    quote: "The streak system at Tiny Steps A Day completely transformed my approach to building habits. Instead of trying to change everything at once, I learned to focus on one small practice at a time. Now I'm on day 47 of my morning meditation streak, and the daily check-ins keep me accountable in a way that feels sustainable.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Engineer",
    quote: "After feeling stuck in my career for years, the self-discovery quiz helped me identify exactly where I needed to focus. The personalized recommendations led me to their career guidance program, and within 3 months, I had clarity on my next steps. The 'tiny steps' approach made the transition feel manageable rather than overwhelming.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Healthcare Professional",
    quote: "The mental health support program taught me practical techniques to manage stress through small, daily practices. Instead of feeling like I needed to meditate for hours, I learned that just 5 minutes of mindful breathing could make a huge difference. The community support and progress tracking kept me motivated during difficult times.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "David Rodriguez",
    role: "Small Business Owner",
    quote: "The life direction program helped me clarify my vision and purpose at a time when I felt completely lost. What I loved most was how they broke down big goals into tiny, actionable steps. I went from feeling overwhelmed about my future to having a clear roadmap with daily practices that actually fit into my busy schedule.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Emma Thompson",
    role: "Graduate Student",
    quote: "I was skeptical about the 'tiny steps' approach at first, but the habit-building streaks completely changed my perspective. Starting with just 2 minutes of journaling each day, I've built a consistent practice that's now part of my routine. The platform's focus on small, sustainable changes rather than dramatic overhauls made all the difference.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Retirement Coach",
    quote: "As someone who helps others navigate life transitions, I was impressed by how Tiny Steps A Day approaches personal growth. Their emphasis on working with life's natural rhythms rather than against them resonated with my philosophy. The daily check-ins and progress tracking provide the accountability many of my clients need to stay on track.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];