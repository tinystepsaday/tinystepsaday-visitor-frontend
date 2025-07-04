"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MediaSelector } from "@/components/media-selector"
import Image from "next/image"
import type { Instructor } from "../types"

interface InstructorTabProps {
  instructor: Instructor
  onInstructorChange: (instructor: Instructor) => void
}

export function InstructorTab({ instructor, onInstructorChange }: InstructorTabProps) {
  const updateInstructor = (updates: Partial<Instructor>) => {
    onInstructorChange({ ...instructor, ...updates })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Instructor Information</h3>
        <p className="text-sm text-muted-foreground">Tell students about the course instructor</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Instructor&apos;s name and title</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="instructor-name">Full Name</Label>
                <Input
                  id="instructor-name"
                  placeholder="e.g., Dr. Sarah Johnson"
                  value={instructor.name}
                  onChange={(e) => updateInstructor({ name: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instructor-title">Professional Title</Label>
                <Input
                  id="instructor-title"
                  placeholder="e.g., Mindfulness Expert & Clinical Psychologist"
                  value={instructor.title}
                  onChange={(e) => updateInstructor({ title: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instructor-bio">Biography</Label>
                <Textarea
                  id="instructor-bio"
                  placeholder="Tell students about the instructor&apos;s background, experience, and expertise..."
                  value={instructor.bio}
                  onChange={(e) => updateInstructor({ bio: e.target.value })}
                  className="min-h-[120px]"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Photo</CardTitle>
            </CardHeader>
            <CardContent>
              {instructor.avatar ? (
                <div className="space-y-2">
                  <Image
                    src={instructor.avatar}
                    alt="Instructor avatar"
                    className="w-full h-32 object-cover rounded-md"
                    width={200}
                    height={200}
                  />
                  <button
                    type="button"
                    className="text-sm text-muted-foreground hover:text-foreground"
                    onClick={() => updateInstructor({ avatar: "" })}
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <MediaSelector
                  onSelect={(media) => updateInstructor({ avatar: media.url })}
                  trigger={
                    <button
                      type="button"
                      className="w-full h-32 border-2 border-dashed border-muted-foreground rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Select Photo
                    </button>
                  }
                />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
              <CardDescription>Instructor&apos;s teaching stats</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="instructor-rating">Rating</Label>
                <Input
                  id="instructor-rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  placeholder="4.8"
                  value={instructor.rating}
                  onChange={(e) => updateInstructor({ rating: parseFloat(e.target.value) || 0 })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instructor-students">Total Students</Label>
                <Input
                  id="instructor-students"
                  type="number"
                  min="0"
                  placeholder="15000"
                  value={instructor.students}
                  onChange={(e) => updateInstructor({ students: parseInt(e.target.value) || 0 })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instructor-courses">Total Courses</Label>
                <Input
                  id="instructor-courses"
                  type="number"
                  min="0"
                  placeholder="3"
                  value={instructor.courses}
                  onChange={(e) => updateInstructor({ courses: parseInt(e.target.value) || 0 })}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 