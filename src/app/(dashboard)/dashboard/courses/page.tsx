import MyCourses from "@/components/dashboard/MyCourses";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Courses | Tiny Steps A Day",
  description: "Access and manage your enrolled courses, track progress, and continue learning.",
  keywords: "my courses, enrolled courses, learning progress, course management",
  robots: "noindex, nofollow", // Dashboard pages should not be indexed
};

export default function CoursesPage() {
  return <MyCourses />;
}
