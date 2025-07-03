import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    Star,
    CheckCircle,
    Play,
    FileText,
    Award
} from "lucide-react";
import { getCourseBySlug, getAllCourses } from "@/data/courses";
import Image from "next/image";

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
                                        <span>👥 {course.students} students</span>
                                    </div>

                                    <div className="flex items-center text-muted-foreground">
                                        <span>📅 Last updated {course.lastUpdated}</span>
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
                                                <span>${course.price}</span>
                                            )}
                                        </div>

                                        {course.sale && (
                                            <span className="bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded text-xs">
                                                {Math.round((1 - (course.salePrice! / course.price)) * 100)}% off
                                            </span>
                                        )}
                                    </div>

                                    <Button className="w-full text-base py-6" asChild>
                                        <Link href={`/courses/${course.slug}/learning`}>
                                            Enroll Now
                                        </Link>
                                    </Button>
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
                                <Button size="lg" asChild>
                                    <Link href={`/courses/${course.slug}/learning`}>
                                        Enroll in This Course
                                    </Link>
                                </Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="curriculum" className="p-0 border-0">
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-2">Course Curriculum</h3>
                                <p className="text-muted-foreground mb-4">
                                    {course.modules} modules • {course.lessons} lessons • {getTotalDuration()} total length
                                </p>
                            </div>

                            <div className="space-y-4">
                                {course.curriculum.map((module, moduleIndex) => (
                                    <Card key={moduleIndex} className="overflow-hidden">
                                        <div className="px-6 py-4 flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="bg-primary/10 w-8 h-8 flex items-center justify-center rounded-full mr-3">
                                                    <span className="text-primary font-medium">{moduleIndex + 1}</span>
                                                </div>
                                                <h4 className="font-medium text-left">{module.title}</h4>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-sm text-muted-foreground mr-2">
                                                    {module.lessons.length} lessons
                                                </span>
                                            </div>
                                        </div>

                                        <div className="border-t">
                                            {module.lessons.map((lesson, lessonIndex) => (
                                                <div key={lessonIndex} className="px-6 py-3 flex items-center justify-between hover:bg-muted/40">
                                                    <div className="flex items-center">
                                                        <div className="w-6 h-6 flex items-center justify-center mr-3">
                                                            {lesson.type === "video" && <Play className="h-4 w-4 text-muted-foreground" />}
                                                            {lesson.type === "exercise" && <FileText className="h-4 w-4 text-muted-foreground" />}
                                                            {lesson.type === "pdf" && <FileText className="h-4 w-4 text-muted-foreground" />}
                                                            {lesson.type === "certificate" && <Award className="h-4 w-4 text-muted-foreground" />}
                                                        </div>
                                                        <span className="text-sm">{lesson.title}</span>
                                                    </div>
                                                    <span className="text-xs text-muted-foreground">
                                                        {lesson.duration}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="instructor" className="p-0 border-0">
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="md:w-1/3">
                                    <Card>
                                        <CardContent className="p-6 text-center">
                                            <Avatar className="w-24 h-24 mx-auto mb-4">
                                                <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                                                <AvatarFallback>{course.instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <h3 className="text-xl font-semibold mb-2">{course.instructor.name}</h3>
                                            <p className="text-muted-foreground mb-4">{course.instructor.title}</p>

                                            <div className="space-y-2 text-sm">
                                                <div className="flex items-center justify-between">
                                                    <span>Rating</span>
                                                    <div className="flex items-center">
                                                        <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
                                                        <span>{course.instructor.rating}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span>Students</span>
                                                    <span>{course.instructor.students.toLocaleString()}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span>Courses</span>
                                                    <span>{course.instructor.courses}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div className="md:w-2/3">
                                    <h3 className="text-xl font-semibold mb-4">About the Instructor</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {course.instructor.bio}
                                    </p>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="faq" className="p-0 border-0">
                            <div className="space-y-6">
                                {course.faqs.map((faq, index) => (
                                    <div key={index} className="border-b pb-6 last:border-b-0">
                                        <h4 className="text-lg font-semibold mb-2">{faq.question}</h4>
                                        <p className="text-muted-foreground">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
}
