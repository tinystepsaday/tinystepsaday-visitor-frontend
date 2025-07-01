
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
    quote: "The mentorship program at InnerPath Journey transformed my approach to leadership. I gained deeper self-awareness and practical tools that helped me navigate a major career transition with confidence and purpose.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Engineer",
    quote: "After feeling stuck in my career for years, the career guidance services helped me rediscover my passion for technology and align it with my personal values. I'm now working on projects that truly fulfill me.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Healthcare Professional",
    quote: "The mental health support I received was life-changing. I learned practical techniques to manage stress and anxiety, and developed a much healthier relationship with my work and personal life.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "David Rodriguez",
    role: "Small Business Owner",
    quote: "The life direction program helped me clarify my vision and purpose at a time when I felt completely lost. The structured guidance and compassionate approach made all the difference in my journey.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];
