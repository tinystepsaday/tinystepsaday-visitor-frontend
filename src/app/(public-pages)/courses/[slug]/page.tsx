import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseBySlug, getAllCourses } from "@/data/courses";
import CourseDetailsClient from "./CourseDetailsClient";

interface CoursePageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
    const courses = await getAllCourses();
    return courses.map((course) => ({
        slug: course.slug,
    }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
    const { slug } = await params;
    const course = await getCourseBySlug(slug);

    if (!course) {
        return {
            title: "Course Not Found",
        };
    }

    return {
        title: `${course.title} | InnerPath Journey`,
        description: course.description,
    };
}

export default async function CoursePage({ params }: CoursePageProps) {
    const { slug } = await params;
    const course = await getCourseBySlug(slug);

    if (!course) {
        notFound();
    }

    return <CourseDetailsClient course={course} />;
} 