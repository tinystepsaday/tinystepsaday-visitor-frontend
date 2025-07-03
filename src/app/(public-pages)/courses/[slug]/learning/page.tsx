import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseBySlug, getAllCourses } from "@/data/courses";
import CourseLearningClient from "./CourseLearningClient";

interface CourseLearningPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const courses = await getAllCourses();
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({ params }: CourseLearningPageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return {
      title: "Course Not Found",
    };
  }

  return {
    title: `Learning: ${course.title} | Tiny Steps A Day`,
    description: `Continue your learning journey with ${course.title}`,
  };
}

export default async function CourseLearningPage({ params }: CourseLearningPageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return <CourseLearningClient course={course} />;
}
