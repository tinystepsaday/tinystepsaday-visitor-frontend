"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { storage } from "@/lib/storage"
import type { Course } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { CourseFormClient } from "../../create/components/CourseFormClient"

export default function EditCoursePage() {
    const params = useParams()
    const router = useRouter()
    const courseId = params.id as string

    const [course, setCourse] = useState<Course | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadCourse = () => {
            try {
                const foundCourse = storage.getCourse(courseId)
                setCourse(foundCourse)
            } catch (error) {
                console.error("Error loading course:", error)
                toast.error("Failed to load course")
            } finally {
                setIsLoading(false)
            }
        }

        if (courseId) {
            loadCourse()
        }
    }, [courseId])

    if (isLoading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <div className="text-muted-foreground">Loading course...</div>
            </div>
        )
    }

    if (!course) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Course Not Found</h2>
                    <p className="text-muted-foreground mb-4">The course you&apos;re looking for doesn&apos;t exist.</p>
                    <Link href="/management/courses">
                        <Button>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Courses
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 w-full">
            <CourseFormClient
                mode="edit"
                initialCourse={course}
                onSave={(updatedCourse) => {
                    try {
                        storage.updateCourse(courseId, updatedCourse)
                        toast.success("Course updated successfully")
                        router.push(`/management/courses/${courseId}`)
                    } catch (error) {
                        console.error("Failed to update course:", error)
                        toast.error("Failed to update course")
                    }
                }}
            />
        </div>
    )
} 