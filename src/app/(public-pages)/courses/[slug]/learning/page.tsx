import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseBySlug, getAllCourses } from "@/data/courses";
import CourseLearningClient from "./CourseLearningClient";
import { sharedMetadata } from "@/app/shared-metadata";

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
    title: `Learning: ${course.title}`,
    description: `Continue your learning journey with ${course.title}`,
    keywords: [
      `Learning: ${course.title}`,
      `Continue your learning journey with ${course.title}`,
      course.title,
      course.category,
      course.instructor.name,
      course.level,
      course.description,
      course.image,
      course.slug,
      course.createdAt.toString(),
      course.updatedAt.toString(),
      course.difficulty,
      course.currency,
      course.instructor.name,
      course.instructor.title,
      course.instructor.bio,
    ],
    openGraph: {
      title: `Learning: ${course.title}`,
      description: `Continue your learning journey with ${course.title}`,
      images: [course.image],
      url: `${sharedMetadata.metadataBase}/courses/${slug}/learning`,
      siteName: sharedMetadata.openGraph.siteName,
      locale: sharedMetadata.openGraph.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `Learning: ${course.title}`,
      description: `Continue your learning journey with ${course.title}`,
      images: [course.image],
    },
    alternates: {
      canonical: `${sharedMetadata.metadataBase}/courses/${slug}/learning`,
    },
    robots: sharedMetadata.robots,
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
