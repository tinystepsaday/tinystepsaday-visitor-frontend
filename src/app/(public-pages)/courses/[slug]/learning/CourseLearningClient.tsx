"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Check, 
  ChevronLeft, 
  BookOpen, 
  FileText, 
  PlayCircle, 
  Award, 
  CheckCircle, 
  Clock,
  MessageSquare,
  Download,
  Star,
  Users,
  Calendar,
  Lock,
  LogIn
} from "lucide-react";
import { toast } from "sonner";
import CourseVideoPlayer from "@/components/learning/CourseVideoPlayer";
import CourseNotes from "@/components/learning/CourseNotes";
import CourseExercise from "@/components/learning/CourseExercise";
import CourseProgress from "@/components/learning/CourseProgress";
import CourseCertificate from "@/components/learning/CourseCertificate";
import { Course } from "@/data/courses";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuthStore } from "@/store/authStore";
import { getEnrolledCourses, enrollInCourse } from "@/utils/localStorage";
import Image from "next/image";

interface CourseLearningClientProps {
  course: Course;
}

const CourseLearningClient = ({ course }: CourseLearningClientProps) => {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [contentType, setContentType] = useState("video");
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [enrolledStatus, setEnrolledStatus] = useState(false);
  const [courseCompleted, setCourseCompleted] = useState(false);
  const [completionDate, setCompletionDate] = useState("");

  useEffect(() => {
    // Check if user is logged in
    if (!isLoggedIn) {
      return;
    }

    // Check enrollment status from localStorage
    const enrolledCourses = getEnrolledCourses();
    const isEnrolled = enrolledCourses.some((c: { slug: string }) => c.slug === course.slug);
    setEnrolledStatus(isEnrolled);

    // Load progress from localStorage
    const storedProgress = localStorage.getItem(`course-progress-${course.slug}`);
    if (storedProgress) {
      const parsedProgress = JSON.parse(storedProgress);
      setProgress(parsedProgress.progress || 0);
      setCompletedLessons(parsedProgress.completedLessons || []);
      setCourseCompleted(parsedProgress.courseCompleted || false);
      setCompletionDate(parsedProgress.completionDate || "");
    }
  }, [course.slug, isLoggedIn]);

  useEffect(() => {
    // Update progress whenever completedLessons changes
    const totalLessons = course.curriculum.reduce((total, module) => total + module.lessons.length, 0);
    const newProgress = (completedLessons.length / totalLessons) * 100;
    setProgress(newProgress);
    
    // Check if course is completed
    if (newProgress >= 100 && !courseCompleted) {
      setCourseCompleted(true);
      setCompletionDate(new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }));
      toast.success("🎉 Congratulations! You've completed the course!");
    }
    
    // Save progress to localStorage
    localStorage.setItem(`course-progress-${course.slug}`, JSON.stringify({
      progress: newProgress,
      completedLessons,
      courseCompleted: newProgress >= 100,
      completionDate: newProgress >= 100 ? new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) : ""
    }));
  }, [completedLessons, course.curriculum, course.slug, courseCompleted]);

  const handleLessonComplete = () => {
    // const currentLesson = course.curriculum[activeModule].lessons[activeLesson];
    const lessonId = `${activeModule}-${activeLesson}`;
    
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
      toast.success("Lesson completed!");
    }
    
    // Move to the next lesson if available
    const nextLesson = activeLesson + 1;
    if (nextLesson < course.curriculum[activeModule].lessons.length) {
      setActiveLesson(nextLesson);
    } else {
      const nextModule = activeModule + 1;
      if (nextModule < course.curriculum.length) {
        setActiveModule(nextModule);
        setActiveLesson(0);
        toast.success("Module completed! Moving to the next one.");
      } else {
        toast.success("Congratulations! You've completed the course!");
      }
    }
  };

  const handleSelectLesson = (moduleIndex: number, lessonIndex: number) => {
    setActiveModule(moduleIndex);
    setActiveLesson(lessonIndex);
    
    // Set content type based on the lesson type
    const lessonType = course.curriculum[moduleIndex].lessons[lessonIndex].type;
    
    switch (lessonType) {
      case "video":
        setContentType("video");
        break;
      case "exercise":
        setContentType("exercise");
        break;
      case "pdf":
        setContentType("notes");
        break;
      case "certificate":
        setContentType("certificate");
        break;
      default:
        setContentType("video");
    }
  };

  const handleEnroll = () => {
    if (!isLoggedIn) {
      // Redirect to login with return URL
      router.push(`/auth/login?returnUrl=${encodeURIComponent(`/courses/${course.slug}/learning`)}`);
      return;
    }

    // Check if course is free or paid
    const coursePrice = course.sale ? course.salePrice! : course.price;
    
    if (coursePrice === 0) {
      // Free course - enroll directly
      enrollInCourse({
        id: course.id,
        title: course.title,
        slug: course.slug,
        price: coursePrice,
        image: course.image
      });
      setEnrolledStatus(true);
      toast.success("Successfully enrolled in the course!");
    } else {
      // Paid course - redirect to checkout
      router.push(`/checkout?course=${course.slug}`);
    }
  };

  // If not logged in, show login prompt
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Lock className="h-5 w-5" />
              Login Required
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              You need to be logged in to access course materials.
            </p>
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href={`/auth/login?returnUrl=${encodeURIComponent(`/courses/${course.slug}/learning`)}`}>
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/auth/signup">
                  Create Account
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If not enrolled, show enrollment prompt
  if (!enrolledStatus) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Enrollment Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">{course.title}</h3>
              <p className="text-sm text-muted-foreground">{course.description}</p>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span>Course Price:</span>
              <span className="font-semibold">
                {course.sale ? (
                  <span className="flex items-center gap-2">
                    <span className="text-primary">${course.salePrice}</span>
                    <span className="text-muted-foreground line-through">${course.price}</span>
                  </span>
                ) : (
                  course.price === 0 ? "Free" : `$${course.price}`
                )}
              </span>
            </div>
            
            <p className="text-muted-foreground">
              {course.price === 0 
                ? "Enroll now to start learning!" 
                : "Complete your purchase to access the learning materials."
              }
            </p>
            
            <Button onClick={handleEnroll} className="w-full">
              {course.price === 0 ? "Enroll Now" : "Purchase Course"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentLesson = course.curriculum[activeModule].lessons[activeLesson];

  return (
    <div className="flex flex-col h-screen bg-background w-full">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/courses/${course.slug}`}>
                  <ChevronLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div className="h-4 w-px bg-border" />
              <h1 className="text-lg font-semibold">{course.title}</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Progress</span>
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
                <span className="text-sm font-medium">{Math.round(progress)}%</span>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-full lg:w-80 xl:w-96 border-r bg-muted/30 overflow-auto">
          <div className="p-4">
            {/* Progress Overview */}
            <div className="mb-6">
              <CourseProgress 
                course={course}
                completedLessons={completedLessons}
                activeModule={activeModule}
                activeLesson={activeLesson}
              />
            </div>
            
            <div className="mb-4">
              <h2 className="font-semibold mb-2">Course Content</h2>
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <Clock className="h-4 w-4 mr-1" />
                <span>{course.modules} modules • {course.lessons} lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={progress} className="flex-1" />
                <span className="text-xs font-medium">{Math.round(progress)}%</span>
              </div>
            </div>
            
            <Accordion type="multiple" className="w-full" defaultValue={[`module-${activeModule}`]}>
              {course.curriculum.map((module, moduleIndex) => (
                <AccordionItem value={`module-${moduleIndex}`} key={moduleIndex}>
                  <AccordionTrigger className="text-sm py-3">
                    <div className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                        <span className="text-xs text-primary font-medium">{moduleIndex + 1}</span>
                      </span>
                      <span className="text-left font-medium">{module.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-1">
                      {module.lessons.map((lesson, lessonIndex) => {
                        const isActive = moduleIndex === activeModule && lessonIndex === activeLesson;
                        const isCompleted = completedLessons.includes(`${moduleIndex}-${lessonIndex}`);
                        
                        return (
                          <li key={lessonIndex}>
                            <Button
                              variant={isActive ? "secondary" : "ghost"}
                              className={`w-full justify-start h-auto py-2 px-8 text-left ${isCompleted ? "text-muted-foreground" : ""}`}
                              onClick={() => handleSelectLesson(moduleIndex, lessonIndex)}
                            >
                              <div className="flex items-center w-full">
                                <span className="flex-shrink-0 w-5 h-5 rounded-full mr-2 flex items-center justify-center">
                                  {isCompleted ? (
                                    <CheckCircle className="h-4 w-4 text-primary" />
                                  ) : (
                                    <>
                                      {lesson.type === "video" && <PlayCircle className="h-4 w-4" />}
                                      {lesson.type === "exercise" && <FileText className="h-4 w-4" />}
                                      {lesson.type === "pdf" && <BookOpen className="h-4 w-4" />}
                                      {lesson.type === "certificate" && <Award className="h-4 w-4" />}
                                    </>
                                  )}
                                </span>
                                <span className="text-sm truncate">{lesson.title}</span>
                                {isActive && <Badge className="ml-auto">Current</Badge>}
                              </div>
                            </Button>
                          </li>
                        );
                      })}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 lg:p-8">
            <div className="max-w-5xl mx-auto">
              {/* Show certificate if course is completed */}
              {courseCompleted ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <h1 className="text-3xl font-bold mb-2">🎉 Course Completed!</h1>
                    <p className="text-muted-foreground">
                      Congratulations on completing {course.title}!
                    </p>
                  </div>
                  <CourseCertificate 
                    course={course}
                    completedDate={completionDate}
                  />
                </div>
              ) : (
                <>
                  {/* Lesson Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{course.curriculum[activeModule].title}</Badge>
                      <Badge variant="secondary">{currentLesson.type}</Badge>
                    </div>
                    <h1 className="text-2xl font-bold mb-1">{currentLesson.title}</h1>
                    <div className="text-sm text-muted-foreground">
                      {currentLesson.type !== "pdf" && currentLesson.type !== "certificate" ? `${currentLesson.duration} minutes` : "Resource"}
                    </div>
                  </div>
                  
                  {/* Content Tabs */}
                  <Tabs value={contentType} onValueChange={setContentType} className="mb-8">
                    <TabsList className="grid w-full grid-cols-4">
                      {currentLesson.type === "video" && <TabsTrigger value="video">Video</TabsTrigger>}
                      <TabsTrigger value="notes">Notes</TabsTrigger>
                      {currentLesson.type === "exercise" && <TabsTrigger value="exercise">Exercise</TabsTrigger>}
                      <TabsTrigger value="discussion">Discussion</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="video" className="mt-6">
                      <CourseVideoPlayer 
                        lessonTitle={currentLesson.title}
                        onComplete={handleLessonComplete}
                      />
                    </TabsContent>
                    
                    <TabsContent value="notes" className="mt-6">
                      <CourseNotes 
                        lessonId={`${activeModule}-${activeLesson}`}
                        moduleTitle={course.curriculum[activeModule].title}
                        lessonTitle={currentLesson.title}
                      />
                    </TabsContent>
                    
                    <TabsContent value="exercise" className="mt-6">
                      <CourseExercise 
                        lessonId={`${activeModule}-${activeLesson}`}
                        moduleTitle={course.curriculum[activeModule].title}
                        lessonTitle={currentLesson.title}
                        onComplete={handleLessonComplete}
                      />
                    </TabsContent>
                    
                    <TabsContent value="discussion" className="mt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5" />
                            Discussion Forum
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center py-8">
                            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="font-medium text-lg mb-2">Discussion coming soon</h3>
                            <p className="text-muted-foreground">
                              We&apos;re working on adding a discussion forum for this lesson where you can ask questions and share insights with other learners.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                  
                  {/* Course Info and Navigation */}
                  <div className="grid lg:grid-cols-3 gap-6 mt-8">
                    <div className="lg:col-span-2">
                      {/* Navigation */}
                      <div className="flex justify-between border-t pt-6">
                        <Button 
                          variant="outline" 
                          disabled={activeLesson === 0 && activeModule === 0}
                          onClick={() => {
                            if (activeLesson > 0) {
                              handleSelectLesson(activeModule, activeLesson - 1);
                            } else if (activeModule > 0) {
                              const prevModuleIndex = activeModule - 1;
                              const prevModule = course.curriculum[prevModuleIndex];
                              handleSelectLesson(prevModuleIndex, prevModule.lessons.length - 1);
                            }
                          }}
                        >
                          Previous Lesson
                        </Button>
                        
                        <Button 
                          onClick={handleLessonComplete}
                          disabled={completedLessons.includes(`${activeModule}-${activeLesson}`)}
                        >
                          {completedLessons.includes(`${activeModule}-${activeLesson}`) ? (
                            <>
                              <Check className="mr-2 h-4 w-4" /> Completed
                            </>
                          ) : "Mark as Complete"}
                        </Button>
                        
                        <Button
                          disabled={
                            activeModule === course.curriculum.length - 1 && 
                            activeLesson === course.curriculum[course.curriculum.length - 1].lessons.length - 1
                          }
                          onClick={() => {
                            if (activeLesson < course.curriculum[activeModule].lessons.length - 1) {
                              handleSelectLesson(activeModule, activeLesson + 1);
                            } else if (activeModule < course.curriculum.length - 1) {
                              handleSelectLesson(activeModule + 1, 0);
                            }
                          }}
                        >
                          Next Lesson
                        </Button>
                      </div>
                    </div>
                    
                    {/* Course Info */}
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Course Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{course.modules} modules</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{course.lessons} lessons</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{course.students.toLocaleString()} students</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{course.rating} ({course.reviews} reviews)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Updated {course.lastUpdated}</span>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Instructor</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-3">
                            <Image 
                              src={course.instructor.avatar} 
                              alt={course.instructor.name}  
                              className="w-12 h-12 rounded-full object-cover"
                              width={48}
                              height={48}
                            />
                            <div>
                              <h4 className="font-medium">{course.instructor.name}</h4>
                              <p className="text-sm text-muted-foreground">{course.instructor.title}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      {course.certification && (
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Award className="h-5 w-5" />
                              Certificate
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                              Complete all lessons to earn your certificate of completion.
                            </p>
                            <Button variant="outline" className="w-full" disabled>
                              <Download className="h-4 w-4 mr-2" />
                              Download Certificate
                            </Button>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearningClient; 