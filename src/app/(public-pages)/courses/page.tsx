import { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Clock, Star, Users } from "lucide-react";
import { getAllCourses, getFeaturedCourses, categories, levels } from "@/data/courses";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Online Courses | InnerPath Journey",
  description: "Explore our transformative online courses on mindfulness, emotional intelligence, career growth, and more. Start your journey today.",
};

export default async function CoursesPage() {
  const [courses, featuredCourses] = await Promise.all([
    getAllCourses(),
    getFeaturedCourses()
  ]);

  return (
    <div className="container mx-auto px-4 py-16">
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
              <Link href={`/courses/${course.slug}`} key={course.id} className="group">
                <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden relative">
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {course.sale && (
                      <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                        Sale
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {course.category}
                      </Badge>
                      <div className="flex items-center text-amber-500">
                        <Star className="h-3 w-3 fill-amber-500" />
                        <span className="text-sm ml-1">{course.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {course.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {course.modules} modules
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="px-6 py-4 border-t flex items-center justify-between">
                    <div className="font-bold">
                      {course.sale ? (
                        <div className="flex items-center gap-2">
                          <span className="text-primary">${course.salePrice}</span>
                          <span className="text-muted-foreground line-through text-sm">${course.price}</span>
                        </div>
                      ) : (
                        <span>${course.price}</span>
                      )}
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students.toLocaleString()} students
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="bg-muted/30 rounded-xl p-6 mb-10">
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
             <select 
               className="bg-background border border-input rounded-md h-10 px-3 py-2 text-sm"
               aria-label="Filter by category"
             >
               {categories.map(category => (
                 <option key={category} value={category}>{category}</option>
               ))}
             </select>

             <select 
               className="bg-background border border-input rounded-md h-10 px-3 py-2 text-sm"
               aria-label="Filter by level"
             >
               {levels.map(level => (
                 <option key={level} value={level}>{level}</option>
               ))}
             </select>
           </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {courses.map(course => (
          <Link href={`/courses/${course.slug}`} key={course.id} className="group">
            <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden relative">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {course.sale && (
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    Sale
                  </div>
                )}
                {course.popular && !course.sale && (
                  <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    Popular
                  </div>
                )}
              </div>

              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {course.category}
                  </Badge>
                  <div className="flex items-center text-amber-500">
                    <Star className="h-3 w-3 fill-amber-500" />
                    <span className="text-sm ml-1">{course.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {course.modules} modules
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="px-6 py-4 border-t flex items-center justify-between">
                <div className="font-bold">
                  {course.sale ? (
                    <div className="flex items-center gap-2">
                      <span className="text-primary">${course.salePrice}</span>
                      <span className="text-muted-foreground line-through text-sm">${course.price}</span>
                    </div>
                  ) : (
                    <span>${course.price}</span>
                  )}
                </div>

                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  {course.students.toLocaleString()} students
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
