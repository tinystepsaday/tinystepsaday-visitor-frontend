import { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getAllCourses, getFeaturedCourses, categories, levels } from "@/data/courses";
import CourseCard from "@/components/courses/CourseCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const metadata: Metadata = {
  title: "Courses",
  description: "Explore our transformative online courses on mindfulness, emotional intelligence, career growth, and more. Start your journey today.",
  alternates: {
    canonical: "https://www.tinystepsaday.com/courses",
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

export default async function CoursesPage() {
  const [courses, featuredCourses] = await Promise.all([
    getAllCourses(),
    getFeaturedCourses()
  ]);

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <SectionHeader
        title="Transform Your Life with Our Courses"
        subtitle="Explore self-paced learning experiences designed to help you grow personally and professionally"
        centered
      />

      {featuredCourses.length > 0 && (
        <div className="mt-12 mb-16">
          <h3 className="text-2xl font-bold mb-6">Featured Courses</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      )}

      <div className="bg-muted/30 rounded-xl p-6 mb-10 border-1 border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search courses..."
              className="pl-10"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            <Select
              aria-label="Filter by category"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              aria-label="Filter by level"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                {levels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

               
