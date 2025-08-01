"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, X, Target, Settings } from "lucide-react";
import { checkInFrequencyOptions, streakCategories, difficultyLevels } from "@/data/streaks";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface StreakGoal {
  id: string;
  title: string;
  description: string;
  targetHours?: number;
  isRequired: boolean;
}

interface StreakEditClientProps {
  streakId: string;
  slug: string;
}

export default function StreakEditClient({ streakId, slug }: StreakEditClientProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _streakId = streakId;
  const router = useRouter();
  
  // Mock streak data - in real app this would be fetched
  const [formData, setFormData] = useState({
    title: "Daily Meditation Challenge",
    description: "Build a consistent meditation practice to improve mindfulness and reduce stress.",
    icon: "🧘",
    durationGoal: 30,
    checkInFrequency: "daily",
    category: "Wellness",
    difficulty: "beginner",
    estimatedTimePerDay: 15,
    isPublic: true,
    requiresApproval: false,
    maxParticipants: undefined as number | undefined,
    tags: ["meditation", "mindfulness", "wellness"] as string[],
  });

  const [goals, setGoals] = useState<StreakGoal[]>([
    {
      id: "goal-1",
      title: "Daily Meditation",
      description: "Practice meditation for at least 10 minutes each day",
      targetHours: 0.17,
      isRequired: true,
    }
  ]);

  const [guidelines, setGuidelines] = useState<string[]>([
    "Find a quiet space for meditation",
    "Start with guided meditation if you're new",
    "Be consistent with your practice time"
  ]);

  const [currentStep, setCurrentStep] = useState(1);
  const [newTag, setNewTag] = useState("");

  const addGoal = () => {
    const newGoal: StreakGoal = {
      id: `goal-${Date.now()}`,
      title: "",
      description: "",
      isRequired: false,
    };
    setGoals([...goals, newGoal]);
  };

  const updateGoal = (id: string, field: keyof StreakGoal, value: string | number | boolean | undefined) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, [field]: value } : goal
    ));
  };

  const removeGoal = (id: string) => {
    if (goals.length > 1) {
      setGoals(goals.filter(goal => goal.id !== id));
    }
  };

  const addGuideline = () => {
    setGuidelines([...guidelines, ""]);
  };

  const updateGuideline = (index: number, value: string) => {
    const newGuidelines = [...guidelines];
    newGuidelines[index] = value;
    setGuidelines(newGuidelines);
  };

  const removeGuideline = (index: number) => {
    if (guidelines.length > 1) {
      setGuidelines(guidelines.filter((_, i) => i !== index));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    });
  };

  const handleSubmit = () => {
    // In a real app, this would save to the backend
    console.log("Updating streak:", {
      ...formData,
      goals: goals.filter(g => g.title.trim()),
      guidelines: guidelines.filter(g => g.trim()),
    });

    // Redirect to streak details page
    router.push(`/streaks/${slug}`);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="max-w-4xl mx-auto">
        <Link href={`/streaks/${slug}`} className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Streak Details
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Edit Streak</h1>
          <p className="text-muted-foreground">
            Update your streak challenge settings and details.
          </p>
        </div>

        <Tabs value={currentStep.toString()} onValueChange={(value) => setCurrentStep(parseInt(value))} className="space-y-6">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="1">Basic Info</TabsTrigger>
            <TabsTrigger value="2">Goals & Guidelines</TabsTrigger>
            <TabsTrigger value="3">Settings</TabsTrigger>
          </TabsList>

          {/* Step 1: Basic Information */}
          <TabsContent value="1" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Streak Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Daily Meditation Challenge"
                    />
                  </div>
                  <div>
                    <Label htmlFor="icon">Icon</Label>
                    <Input
                      id="icon"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      placeholder="🎯"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe what this streak is about and what participants will achieve..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration (days) *</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="1"
                      value={formData.durationGoal}
                      onChange={(e) => setFormData({ ...formData, durationGoal: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="frequency">Check-in Frequency *</Label>
                    <Select value={formData.checkInFrequency} onValueChange={(value) => setFormData({ ...formData, checkInFrequency: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {checkInFrequencyOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timePerDay">Time per Day (minutes)</Label>
                    <Input
                      id="timePerDay"
                      type="number"
                      min="1"
                      value={formData.estimatedTimePerDay}
                      onChange={(e) => setFormData({ ...formData, estimatedTimePerDay: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {streakCategories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {difficultyLevels.map(level => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag..."
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} size="sm">Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={() => setCurrentStep(2)} disabled={!formData.title || !formData.description}>
                Next: Goals & Guidelines
              </Button>
            </div>
          </TabsContent>

          {/* Step 2: Goals & Guidelines */}
          <TabsContent value="2" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Streak Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {goals.map((goal, index) => (
                  <div key={goal.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Goal {index + 1}</h4>
                      {goals.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeGoal(goal.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor={`goal-title-${goal.id}`}>Goal Title *</Label>
                        <Input
                          id={`goal-title-${goal.id}`}
                          value={goal.title}
                          onChange={(e) => updateGoal(goal.id, 'title', e.target.value)}
                          placeholder="e.g., Daily Meditation"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`goal-description-${goal.id}`}>Description</Label>
                        <Textarea
                          id={`goal-description-${goal.id}`}
                          value={goal.description}
                          onChange={(e) => updateGoal(goal.id, 'description', e.target.value)}
                          placeholder="Describe what this goal involves..."
                        />
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`goal-hours-${goal.id}`}>Target Hours (optional)</Label>
                          <Input
                            id={`goal-hours-${goal.id}`}
                            type="number"
                            step="0.25"
                            min="0"
                            value={goal.targetHours || ""}
                            onChange={(e) => updateGoal(goal.id, 'targetHours', e.target.value ? parseFloat(e.target.value) : undefined)}
                            placeholder="e.g., 0.5"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`goal-required-${goal.id}`}
                            checked={goal.isRequired}
                            onCheckedChange={(checked) => updateGoal(goal.id, 'isRequired', checked)}
                          />
                          <Label htmlFor={`goal-required-${goal.id}`}>Required goal</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button type="button" onClick={addGoal} variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Goal
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {guidelines.map((guideline, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={guideline}
                      onChange={(e) => updateGuideline(index, e.target.value)}
                      placeholder={`Guideline ${index + 1}...`}
                    />
                    {guidelines.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeGuideline(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                
                <Button type="button" onClick={addGuideline} variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Guideline
                </Button>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                Previous
              </Button>
              <Button onClick={() => setCurrentStep(3)}>
                Next: Settings
              </Button>
            </div>
          </TabsContent>

          {/* Step 3: Settings */}
          <TabsContent value="3" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Privacy & Access Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isPublic"
                    checked={formData.isPublic}
                    onCheckedChange={(checked) => setFormData({ ...formData, isPublic: checked as boolean })}
                  />
                  <Label htmlFor="isPublic">Make this streak public (others can join)</Label>
                </div>

                {formData.isPublic && (
                  <>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="requiresApproval"
                        checked={formData.requiresApproval}
                        onCheckedChange={(checked) => setFormData({ ...formData, requiresApproval: checked as boolean })}
                      />
                      <Label htmlFor="requiresApproval">Require approval for new participants</Label>
                    </div>

                    <div>
                      <Label htmlFor="maxParticipants">Maximum Participants (optional)</Label>
                      <Input
                        id="maxParticipants"
                        type="number"
                        min="1"
                        value={formData.maxParticipants || ""}
                        onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value ? parseInt(e.target.value) : undefined })}
                        placeholder="Leave empty for unlimited"
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                Previous
              </Button>
              <Button onClick={handleSubmit}>
                Save Changes
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 