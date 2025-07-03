import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, BookOpen, FileText, PlayCircle, Award, CheckCircle, Clock } from "lucide-react";
import { getCourseBySlug, getAllCourses } from "@/data/courses";
import { ThemeToggle } from "@/components/theme-toggle";

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

  return (
    <div className="min-h-screen bg-background w-full">
      {/* Header */}
      <div className="border-b bg-card w-full sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href={`/courses/${course.slug}`} className="flex items-center text-sm text-muted-foreground hover:text-primary">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Course
              </Link>
              <div className="h-4 w-px bg-border" />
              <h1 className="text-lg font-semibold">{course.title}</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">0%</span> Complete
              </div>
              <Progress value={0} className="w-24" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="bg-card rounded-lg border p-4">
                <h3 className="font-semibold mb-4">Course Content</h3>
                
                <Accordion type="single" collapsible defaultValue="0">
                  {course.curriculum.map((module, moduleIndex) => (
                    <AccordionItem key={moduleIndex} value={moduleIndex.toString()}>
                      <AccordionTrigger className="text-sm">
                        <div className="flex items-center">
                          <div className="w-6 h-6 flex items-center justify-center mr-2">
                            {moduleIndex + 1}
                          </div>
                          <span className="text-left">{module.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pl-8">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div key={lessonIndex} className="flex items-center justify-between py-1">
                              <div className="flex items-center">
                                <div className="w-4 h-4 flex items-center justify-center mr-2">
                                  {lesson.type === "video" && <PlayCircle className="h-3 w-3 text-muted-foreground" />}
                                  {lesson.type === "exercise" && <FileText className="h-3 w-3 text-muted-foreground" />}
                                  {lesson.type === "pdf" && <FileText className="h-3 w-3 text-muted-foreground" />}
                                  {lesson.type === "certificate" && <Award className="h-3 w-3 text-muted-foreground" />}
                                </div>
                                <span className="text-xs">{lesson.title}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {lesson.duration}
                              </span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-lg border p-8">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Welcome to {course.title}</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Click on any lesson in the sidebar to begin your learning journey. Track your progress and complete all modules to earn your certificate.
                </p>
                
                <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>{course.modules} modules</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span>{course.lessons} lessons</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-8">
                <h3 className="text-lg font-semibold mb-4">Course Overview</h3>
                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: course.fullDescription }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
