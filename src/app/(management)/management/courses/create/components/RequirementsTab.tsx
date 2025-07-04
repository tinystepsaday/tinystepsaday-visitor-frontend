"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, CheckCircle } from "lucide-react"

interface RequirementsTabProps {
  requirements: string[]
  onRequirementsChange: (requirements: string[]) => void
}

export function RequirementsTab({ requirements, onRequirementsChange }: RequirementsTabProps) {
  const addRequirement = () => {
    onRequirementsChange([...requirements, ""])
  }

  const updateRequirement = (index: number, value: string) => {
    const newRequirements = [...requirements]
    newRequirements[index] = value
    onRequirementsChange(newRequirements)
  }

  const removeRequirement = (index: number) => {
    onRequirementsChange(requirements.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Course Requirements</h3>
          <p className="text-sm text-muted-foreground">List what students need to know or have before starting</p>
        </div>
        <Button type="button" onClick={addRequirement}>
          <Plus className="mr-2 h-4 w-4" />
          Add Requirement
        </Button>
      </div>

      <div className="space-y-4">
        {requirements.map((requirement, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <Badge variant="outline">Requirement {index + 1}</Badge>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeRequirement(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="e.g., No prior experience needed, Basic computer skills..."
                value={requirement}
                onChange={(e) => updateRequirement(index, e.target.value)}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 