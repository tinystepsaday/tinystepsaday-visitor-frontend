"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    Star,
    CheckCircle,
    Play,
    FileText,
    Award,
    Users,
    Calendar,
    LogIn,
    ChevronLeft
} from "lucide-react";
import { Course } from "@/data/courses";
import { useAuthStore } from "@/store/authStore";
import { getEnrolledCourses, enrollInCourse } from "@/utils/localStorage";
import { toast } from "sonner";
import Image from "next/image";

interface CourseDetailsClientProps {
    course: Course;
}

export default function CourseDetailsClient({ course }: CourseDetailsClientProps) {
    const router = useRouter();
    const { isLoggedIn, hasActiveSubscription } = useAuthStore();
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [expandedModule, setExpandedModule] = useState<number | null>(0);

    useEffect(() => {
        if (isLoggedIn) {
            // Check if user is enrolled in this course
            const enrolledCourses = getEnrolledCourses();
            setIsEnrolled(enrolledCourses.some((c: Course) => c.slug === course.slug));
        }
    }, [course.slug, isLoggedIn]);

    const toggleModule = (moduleIndex: number) => {
        setExpandedModule(expandedModule === moduleIndex ? null : moduleIndex);
    };

    const getTotalDuration = () => {
        let totalMinutes = 0;
        course.curriculum.forEach(module => {
            module.lessons.forEach(lesson => {
                if (lesson.type !== "pdf" && lesson.type !== "certificate") {
                    const [minutes, seconds] = lesson.duration.split(":").map(part => parseInt(part, 10));
                    totalMinutes += minutes + (seconds / 60);
                }
            });
        });

        const hours = Math.floor(totalMinutes / 60);
        const minutes = Math.round(totalMinutes % 60);

        return `${hours}h ${minutes}m`;
    };

    const handleEnroll = () => {
        if (!isLoggedIn) {
            // Redirect to login with return URL
            router.push(`/auth/login?returnUrl=${encodeURIComponent(`/courses/${course.slug}`)}`);
            return;
        }

        if (isEnrolled) {
            // If already enrolled, navigate to learning page
            router.push(`/courses/${course.slug}/learning`);
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
            setIsEnrolled(true);
            toast.success("Successfully enrolled in the course!");
            router.push(`/courses/${course.slug}/learning`);
        } else if (hasActiveSubscription) {
            // If user has active subscription, enroll them directly
            enrollInCourse({
                id: course.id,
                title: course.title,
                slug: course.slug,
                price: coursePrice,
                image: course.image
            });
            setIsEnrolled(true);
            toast.success("Successfully enrolled with your subscription!");
            router.push(`/courses/${course.slug}/learning`);
        } else {
            // Paid course - redirect to checkout
            router.push(`/checkout?course=${course.slug}`);
        }
    };

    return (
        <>
            <div className="bg-muted/30 py-16 w-full mt-16">
                <div className="container mx-auto px-4 w-full">
                    <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto w-full">
                        <div>
                            <Link href="/courses" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
                                ← Back to Courses
                            </Link>

                            <div className="space-y-4">
                                {course.badges && course.badges.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {course.badges.map((badge: string, index: number) => (
                                            <span key={index} className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs">
                                                {badge}
                                            </span>
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
                                        <span>{course.students} students</span>
                                    </div>

                                    <div className="flex items-center text-muted-foreground">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        <span>Last updated {course.lastUpdated}</span>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <Avatar className="h-10 w-10 mr-2">
                                        <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                                        <AvatarFallback>{course.instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
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
                                        width={500}
                                        height={500}
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
                                                <span>{course.price === 0 ? "Free" : `$${course.price}`}</span>
                                            )}
                                        </div>

                                        {course.sale && (
                                            <span className="bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded text-xs">
                                                {Math.round((1 - (course.salePrice! / course.price)) * 100)}% off
                                            </span>
                                        )}
                                    </div>

                                    {!isLoggedIn ? (
                                        <div className="space-y-2">
                                            <Button className="w-full text-base py-6" onClick={handleEnroll}>
                                                <LogIn className="h-4 w-4 mr-2" />
                                                Login to Enroll
                                            </Button>
                                            <p className="text-xs text-muted-foreground text-center">
                                                You need to be logged in to enroll in this course
                                            </p>
                                        </div>
                                    ) : (
                                        <Button className="w-full text-base py-6" onClick={handleEnroll}>
                                            {isEnrolled ? "Continue Learning" : "Enroll Now"}
                                        </Button>
                                    )}

                                    {course.price > 0 && !isEnrolled && (
                                        <p className="text-xs text-muted-foreground text-center mt-2">
                                            {hasActiveSubscription 
                                                ? "Included with your subscription" 
                                                : "One-time purchase"
                                            }
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-5xl mx-auto">
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="mb-8 w-full justify-start border-b rounded-none h-auto p-0">
                            <TabsTrigger value="overview" className="rounded-none pb-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary">
                                Overview
                            </TabsTrigger>
                            <TabsTrigger value="curriculum" className="rounded-none pb-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary">
                                Curriculum
                            </TabsTrigger>
                            <TabsTrigger value="instructor" className="rounded-none pb-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary">
                                Instructor
                            </TabsTrigger>
                            <TabsTrigger value="faq" className="rounded-none pb-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary">
                                FAQ
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="p-0 border-0">
                            <div className="prose prose-lg max-w-none mb-12" dangerouslySetInnerHTML={{ __html: course.fullDescription }} />

                            <h3 className="text-xl font-semibold mb-6">Requirements</h3>
                            <ul className="space-y-2 mb-12">
                                {course.requirements.map((requirement, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                                        <span>{requirement}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex justify-center mt-12">
                                <Button size="lg" onClick={handleEnroll}>
                                    {isEnrolled ? "Continue Learning" : "Enroll in This Course"}
                                </Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="curriculum" className="p-0 border-0">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-semibold">Course Curriculum</h3>
                                    <div className="text-sm text-muted-foreground">
                                        {course.modules} modules • {course.lessons} lessons • {getTotalDuration()}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {course.curriculum.map((module, moduleIndex) => (
                                        <Card key={moduleIndex}>
                                            <CardContent className="p-0">
                                                <button
                                                    onClick={() => toggleModule(moduleIndex)}
                                                    className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                                            <span className="text-sm font-medium text-primary">{moduleIndex + 1}</span>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-medium">{module.title}</h4>
                                                            <p className="text-sm text-muted-foreground">
                                                                {module.lessons.length} lessons
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm text-muted-foreground">
                                                            {module.lessons.filter(l => l.type !== "pdf" && l.type !== "certificate").length} videos
                                                        </span>
                                                        <ChevronLeft className={`h-4 w-4 transition-transform ${expandedModule === moduleIndex ? 'rotate-90' : ''}`} />
                                                    </div>
                                                </button>

                                                {expandedModule === moduleIndex && (
                                                    <div className="border-t px-6 py-4">
                                                        <ul className="space-y-2">
                                                            {module.lessons.map((lesson, lessonIndex) => (
                                                                <li key={lessonIndex} className="flex items-center gap-3 py-2">
                                                                    <div className="flex-shrink-0">
                                                                        {lesson.type === "video" && <Play className="h-4 w-4 text-muted-foreground" />}
                                                                        {lesson.type === "exercise" && <FileText className="h-4 w-4 text-muted-foreground" />}
                                                                        {lesson.type === "pdf" && <FileText className="h-4 w-4 text-muted-foreground" />}
                                                                        {lesson.type === "certificate" && <Award className="h-4 w-4 text-muted-foreground" />}
                                                                    </div>
                                                                    <span className="text-sm flex-1">{lesson.title}</span>
                                                                    <span className="text-xs text-muted-foreground">
                                                                        {lesson.type !== "pdf" && lesson.type !== "certificate" ? lesson.duration : "Resource"}
                                                                    </span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="instructor" className="p-0 border-0">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <div className="flex items-start gap-4 mb-6">
                                        <Avatar className="h-16 w-16">
                                            <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                                            <AvatarFallback>{course.instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="text-xl font-semibold">{course.instructor.name}</h3>
                                            <p className="text-muted-foreground">{course.instructor.title}</p>
                                            <div className="flex items-center gap-4 mt-2 text-sm">
                                                <span className="flex items-center gap-1">
                                                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                                                    {course.instructor.rating}
                                                </span>
                                                <span>{course.instructor.courses} courses</span>
                                                <span>{course.instructor.students.toLocaleString()} students</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">{course.instructor.bio}</p>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-semibold">Instructor Stats</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Card>
                                            <CardContent className="p-4 text-center">
                                                <div className="text-2xl font-bold text-primary">{course.instructor.courses}</div>
                                                <div className="text-sm text-muted-foreground">Courses</div>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardContent className="p-4 text-center">
                                                <div className="text-2xl font-bold text-primary">{course.instructor.students.toLocaleString()}</div>
                                                <div className="text-sm text-muted-foreground">Students</div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="faq" className="p-0 border-0">
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
                                <div className="space-y-4">
                                    {course.faqs.map((faq, index) => (
                                        <Card key={index}>
                                            <CardHeader>
                                                <CardTitle>{faq.question}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-muted-foreground">{faq.answer}</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
} 