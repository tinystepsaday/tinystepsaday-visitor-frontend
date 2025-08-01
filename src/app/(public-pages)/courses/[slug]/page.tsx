import { Metadata } from "next";
import { notFound } from "next/navigation";
import CourseDetailsClient from "./CourseDetailsClient";
import { Course } from "@/data/courses";

interface CourseDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Mock course data - in a real app, this would come from your API
const getCourseBySlug = async (slug: string): Promise<Course | null> => {
  // This would be a real API call in production
  const courses: Course[] = [
    {
      id: 1,
      slug: "javascript-fundamentals",
      title: "JavaScript Fundamentals",
      description: "Learn the basics of JavaScript programming",
      fullDescription: "Master JavaScript fundamentals with this comprehensive course. Learn variables, functions, objects, and more.",
      level: "Beginner",
      duration: "10 hours",
      modules: 5,
      lessons: 25,
      students: 1250,
      rating: 4.8,
      reviews: 156,
      instructor: {
        id: 1,
        name: "John Doe",
        title: "Senior JavaScript Developer",
        bio: "John is a senior JavaScript developer with 10+ years of experience.",
        avatar: "/instructors/john-doe.jpg",
        rating: 4.9,
        students: 5000,
        courses: 12,
      },
      image: "/course-js.jpg",
      price: 99,
      featured: true,
      popular: true,
      category: "Programming",
      progress: 0,
      requirements: ["Basic computer knowledge", "No prior programming experience required"],
      curriculum: [
        {
          id: 1,
          title: "Introduction to JavaScript",
          lessons: [
            {
              id: 1,
              title: "What is JavaScript?",
              type: "video",
              duration: "05:30",
              videoUrl: "https://example.com/video1.mp4",
            },
            {
              id: 2,
              title: "Setting up your environment",
              type: "video",
              duration: "08:15",
              videoUrl: "https://example.com/video2.mp4",
            },
          ],
        },
        {
          id: 2,
          title: "Variables and Data Types",
          lessons: [
            {
              id: 3,
              title: "Understanding variables",
              type: "video",
              duration: "12:45",
              videoUrl: "https://example.com/video3.mp4",
            },
            {
              id: 4,
              title: "Data types in JavaScript",
              type: "video",
              duration: "15:20",
              videoUrl: "https://example.com/video4.mp4",
            },
          ],
        },
      ],
      faqs: [
        {
          question: "Do I need any prior programming experience?",
          answer: "No, this course is designed for complete beginners.",
        },
        {
          question: "How long do I have access to the course?",
          answer: "You have lifetime access to the course content.",
        },
      ],
      lastUpdated: "2024-01-15",
      certification: true,
    },
    {
      id: 2, 
      slug: "react-basics",
      title: "React Basics",
      description: "Build modern web applications with React",
      fullDescription: "Learn React from scratch and build real-world applications. Understand components, state, props, and hooks.",
      level: "Intermediate",
      duration: "15 hours",
      modules: 6,
      lessons: 30,
      students: 2100,
      rating: 4.9,
      reviews: 234,
      instructor: {
        id: 2,
        name: "Jane Smith",
        title: "React Expert & Frontend Architect",
        bio: "Jane is a React expert with experience at top tech companies.",
        avatar: "/instructors/jane-smith.jpg",
        rating: 4.8,
        students: 8000,
        courses: 8,
      },
      image: "/course-react.jpg",
      price: 149,
      featured: true,
      popular: true,
      category: "Programming",
      progress: 0,
      requirements: ["Basic JavaScript knowledge", "HTML and CSS fundamentals"],
      curriculum: [
        {
          id: 1,
          title: "React Fundamentals",
          lessons: [
            {
              id: 1,
              title: "Introduction to React",
              type: "video",
              duration: "10:00",
              videoUrl: "https://example.com/react1.mp4",
            },
            {
              id: 2,
              title: "Creating your first component",
              type: "video",
              duration: "12:30",
              videoUrl: "https://example.com/react2.mp4",
            },
          ],
        },
      ],
      faqs: [
        {
          question: "What JavaScript knowledge do I need?",
          answer: "Basic understanding of JavaScript ES6+ features is recommended.",
        },
        {
          question: "Will I learn hooks?",
          answer: "Yes, we cover both class components and functional components with hooks.",
        },
      ],
      lastUpdated: "2024-01-20",
      certification: true,
    }
  ];

  return courses.find(course => course.slug === slug) || null;
};

export async function generateMetadata({ params }: CourseDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return {
      title: "Course Not Found | Tiny Steps A Day",
      description: "The requested course could not be found.",
      robots: "noindex, nofollow",
    };
  }

  return {
    title: `${course.title} | Tiny Steps A Day`,
    description: course.description,
    keywords: `${course.title}, ${course.category}, online course, ${course.instructor.name}, ${course.level}`,
    openGraph: {
      title: `${course.title} | Tiny Steps A Day`,
      description: course.description,
      images: [course.image],
      url: `https://www.tinystepsaday.com/courses/${slug}`,
      siteName: "Tiny Steps A Day",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.title} | Tiny Steps A Day`,
      description: course.description,
      images: [course.image],
    },
    alternates: {
      canonical: `https://www.tinystepsaday.com/courses/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    metadataBase: new URL("https://www.tinystepsaday.com"),
  };
}

export default async function CourseDetailsPage({ params }: CourseDetailsPageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  // Get user authentication status (optional - doesn't block rendering)
  // Note: The CourseDetailsClient component handles authentication internally
  // through the useAuthStore hook, so we don't need to pass user data here

  return <CourseDetailsClient course={course} />;
} 