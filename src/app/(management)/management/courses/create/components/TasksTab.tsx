"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, CheckSquare } from "lucide-react"
import type { Task } from "../types"

interface TasksTabProps {
  tasks: Task[]
  onTasksChange: (tasks: Task[]) => void
}

export function TasksTab({ tasks, onTasksChange }: TasksTabProps) {
  const addTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: "",
      description: "",
      instructions: "",
    }
    onTasksChange([...tasks, newTask])
  }

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    onTasksChange(
      tasks.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
    )
  }

  const removeTask = (taskId: string) => {
    onTasksChange(tasks.filter((task) => task.id !== taskId))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Course Tasks</h3>
          <p className="text-sm text-muted-foreground">Add assignments and practical tasks</p>
        </div>
        <Button type="button" onClick={addTask}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      <div className="space-y-4">
        {tasks.map((task, taskIndex) => (
          <Card key={task.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckSquare className="h-4 w-4" />
                  <Badge variant="outline">Task {taskIndex + 1}</Badge>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTask(task.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Task title..."
                value={task.title}
                onChange={(e) => updateTask(task.id, { title: e.target.value })}
              />
              <Textarea
                placeholder="Task description..."
                value={task.description}
                onChange={(e) => updateTask(task.id, { description: e.target.value })}
              />
              <Textarea
                placeholder="Task instructions..."
                value={task.instructions}
                onChange={(e) => updateTask(task.id, { instructions: e.target.value })}
                className="min-h-[100px]"
              />
              <div className="space-y-2">
                <Label>Due Date (Optional)</Label>
                <Input
                  type="datetime-local"
                  value={
                    task.dueDate
                      ? new Date(task.dueDate.getTime() - task.dueDate.getTimezoneOffset() * 60000)
                          .toISOString()
                          .slice(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    updateTask(task.id, {
                      dueDate: e.target.value ? new Date(e.target.value) : undefined,
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 