import { Course } from '@/data/courses';
import { Badge } from '@/components/ui/badge';
import { Star, BookOpen, Clock, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CourseCard({ course }: { course: Course }) {
    return (
        <Link href={`/courses/${course.slug}`} key={course.id} className="group border-1 border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-md transition-shadow hover:rounded-lg">
            <div className="overflow-hidden h-full hover:shadow-md transition-shadow">
                <div className="h-48 overflow-hidden relative">
                    <Image
                        src={course.image}
                        alt={course.title}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-105"
                    />
                    {course.sale && (
                        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                            Sale
                        </div>
                    )}
                </div>

                <div className="p-6">
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
                </div>

                <div className="px-6 py-4 border-t flex items-center justify-between">
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
                </div>
            </div>
        </Link>
    )
}