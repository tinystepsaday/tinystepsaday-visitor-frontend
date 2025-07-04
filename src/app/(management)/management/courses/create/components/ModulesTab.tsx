"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, GripVertical, Play, FileText, BookOpen, Award } from "lucide-react"
import type { Module, Lesson } from "../types"
import { createDefaultModule, createDefaultLesson } from "../utils"

interface ModulesTabProps {
  modules: Module[]
  onModulesChange: (modules: Module[]) => void
}

export function ModulesTab({ modules, onModulesChange }: ModulesTabProps) {
  const addModule = () => {
    const newModule = createDefaultModule()
    onModulesChange([...modules, newModule])
  }

  const updateModule = (moduleId: number, updates: Partial<Module>) => {
    onModulesChange(
      modules.map((module) => (module.id === moduleId ? { ...module, ...updates } : module))
    )
  }

  const removeModule = (moduleId: number) => {
    onModulesChange(modules.filter((module) => module.id !== moduleId))
  }

  const addLesson = (moduleId: number) => {
    const newLesson = createDefaultLesson()
    onModulesChange(
      modules.map((module) =>
        module.id === moduleId ? { ...module, lessons: [...module.lessons, newLesson] } : module
      )
    )
  }

  const updateLesson = (moduleId: number, lessonId: number, updates: Partial<Lesson>) => {
    onModulesChange(
      modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, ...updates } : lesson
              ),
            }
          : module
      )
    )
  }

  const removeLesson = (moduleId: number, lessonId: number) => {
    onModulesChange(
      modules.map((module) =>
        module.id === moduleId
          ? { ...module, lessons: module.lessons.filter((lesson) => lesson.id !== lessonId) }
          : module
      )
    )
  }

  const getLessonIcon = (type: Lesson["type"]) => {
    switch (type) {
      case "video":
        return <Play className="h-3 w-3" />
      case "exercise":
        return <FileText className="h-3 w-3" />
      case "pdf":
        return <BookOpen className="h-3 w-3" />
      case "certificate":
        return <Award className="h-3 w-3" />
      default:
        return <Play className="h-3 w-3" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Course Modules</h3>
          <p className="text-sm text-muted-foreground">
            Organize your course content into modules and lessons
          </p>
        </div>
        <Button type="button" onClick={addModule}>
          <Plus className="mr-2 h-4 w-4" />
          Add Module
        </Button>
      </div>

      <div className="space-y-4">
        {modules.map((module, moduleIndex) => (
          <Card key={module.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="outline">Module {moduleIndex + 1}</Badge>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeModule(module.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Module title..."
                value={module.title}
                onChange={(e) => updateModule(module.id, { title: e.target.value })}
              />

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Lessons</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addLesson(module.id)}
                  >
                    <Plus className="mr-2 h-3 w-3" />
                    Add Lesson
                  </Button>
                </div>

                {module.lessons.map((lesson, lessonIndex) => (
                  <div key={lesson.id} className="border rounded-lg p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getLessonIcon(lesson.type)}
                        <span className="text-xs text-muted-foreground">
                          Lesson {lessonIndex + 1}
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLesson(module.id, lesson.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <Input
                      placeholder="Lesson title..."
                      value={lesson.title}
                      onChange={(e) =>
                        updateLesson(module.id, lesson.id, { title: e.target.value })
                      }
                    />
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Select
                        value={lesson.type}
                        onValueChange={(value: Lesson["type"]) =>
                          updateLesson(module.id, lesson.id, { type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Lesson type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="exercise">Exercise</SelectItem>
                          <SelectItem value="pdf">PDF/Resource</SelectItem>
                          <SelectItem value="certificate">Certificate</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Input
                        placeholder="Duration (MM:SS)"
                        value={lesson.duration}
                        onChange={(e) =>
                          updateLesson(module.id, lesson.id, { duration: e.target.value })
                        }
                      />
                    </div>
                    
                    {lesson.type === "video" && (
                      <Input
                        placeholder="Video URL (optional)"
                        value={lesson.videoUrl || ""}
                        onChange={(e) =>
                          updateLesson(module.id, lesson.id, { videoUrl: e.target.value })
                        }
                      />
                    )}
                    
                    <Textarea
                      placeholder="Lesson content or description..."
                      value={lesson.content || ""}
                      onChange={(e) =>
                        updateLesson(module.id, lesson.id, { content: e.target.value })
                      }
                      className="min-h-[80px]"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 