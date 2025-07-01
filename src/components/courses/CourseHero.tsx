"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Calendar, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";

interface CourseHeroProps {
  course: any;
  onEnroll: () => void;
  isEnrolled: boolean;
}

export function CourseHero({ course, onEnroll, isEnrolled }: CourseHeroProps) {
  return (
    <div className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <Link href="/courses" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Link>

            <div className="space-y-4">
              {course.badges && course.badges.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {course.badges.map((badge: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}

              <h1 className="text-3xl md:text-4xl font-bold">{course.title}</h1>
              <p className="text-muted-foreground text-lg">{course.description}</p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <div className="flex items-center text-amber-500">
                  <Star className="h-4 w-4 fill-amber-500 mr-1" />
                  <span>{course.rating}</span>
                  <span className="text-muted-foreground ml-1">({course.reviews} reviews)</span>
                </div>

                <div className="flex items-center text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  {course.students} students
                </div>

                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  Last updated {course.lastUpdated}
                </div>
              </div>

              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-2">
                  <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                  <AvatarFallback>{course.instructor.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{course.instructor.name}</div>
                  <div className="text-sm text-muted-foreground">{course.instructor.title}</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-xl overflow-hidden shadow-xl">
              <div className="relative aspect-video">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={400}
                  height={250}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="bg-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="font-bold text-2xl">
                    {course.sale ? (
                      <div className="flex items-center gap-2">
                        <span className="text-primary">${course.salePrice}</span>
                        <span className="text-muted-foreground line-through text-lg">${course.price}</span>
                      </div>
                    ) : (
                      <span>${course.price}</span>
                    )}
                  </div>

                  {course.sale && (
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {Math.round((1 - (course.salePrice! / course.price)) * 100)}% off
                    </Badge>
                  )}
                </div>

                <Button
                  className="w-full text-base py-6"
                  onClick={onEnroll}
                >
                  {isEnrolled ? "Continue Learning" : "Enroll Now"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
