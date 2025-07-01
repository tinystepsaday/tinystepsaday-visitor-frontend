"use client"

/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { CheckCircle, Clock } from "lucide-react";

interface CourseExerciseProps {
  lessonId: string;
  moduleTitle: string;
  lessonTitle: string;
  onComplete: () => void;
}

const CourseExercise = ({ lessonId, moduleTitle, lessonTitle, onComplete }: CourseExerciseProps) => {
  const [reflection, setReflection] = useState("");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  
  const exerciseSteps = [
    {
      id: "step1",
      title: "Find a quiet space",
      description: "Find a quiet place where you won't be disturbed for at least 10 minutes."
    },
    {
      id: "step2",
      title: "Set a timer",
      description: "Set a timer for 5-10 minutes to help you stay focused on the practice."
    },
    {
      id: "step3",
      title: "Mindful breathing",
      description: "Sit comfortably and focus your attention on your breath. Notice the sensation of breathing in and out."
    },
    {
      id: "step4",
      title: "Notice thoughts",
      description: "When your mind wanders (and it will), gently bring your focus back to your breath without judgment."
    },
    {
      id: "step5",
      title: "Reflect on experience",
      description: "After the timer ends, take a moment to reflect on how the practice felt."
    }
  ];
  
  const toggleStep = (stepId: string) => {
    if (completedSteps.includes(stepId)) {
      setCompletedSteps(completedSteps.filter(id => id !== stepId));
    } else {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };
  
  const handleSubmitExercise = () => {
    if (completedSteps.length < exerciseSteps.length) {
      toast.error("Please complete all steps before submitting");
      return;
    }
    
    if (reflection.length < 20) {
      toast.error("Please add a more detailed reflection (at least 20 characters)");
      return;
    }
    
    setSubmitting(true);
    
    // Simulate API call to submit exercise
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Exercise completed successfully!");
      onComplete();
    }, 1500);
  };
  
  const allStepsCompleted = completedSteps.length === exerciseSteps.length;
  const reflectionValid = reflection.length >= 20;
  const canSubmit = allStepsCompleted && reflectionValid;
  
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{lessonTitle} - Practice Exercise</CardTitle>
          <CardDescription>
            Complete this exercise to apply what you&apos;ve learned
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Estimated time: 15 minutes</span>
            </div>
            <div className="text-sm">
              {completedSteps.length}/{exerciseSteps.length} steps completed
            </div>
          </div>
          
          <div className="bg-muted/30 p-4 rounded-md">
            <h3 className="font-medium mb-2">Exercise Overview</h3>
            <p className="text-sm text-muted-foreground">
              This exercise will guide you through a basic mindfulness meditation practice.
              Follow each step and check them off as you complete them.
            </p>
          </div>
          
          <Separator className="my-6" />
          
          <div className="space-y-4">
            <h3 className="font-medium">Steps to Complete</h3>
            
            {exerciseSteps.map((step, index) => (
              <div key={step.id} className="flex items-start space-x-3">
                <Checkbox
                  id={step.id}
                  checked={completedSteps.includes(step.id)}
                  onCheckedChange={() => toggleStep(step.id)}
                  className="mt-1"
                />
                <div className="grid gap-1">
                  <label 
                    htmlFor={step.id} 
                    className="font-medium cursor-pointer"
                  >
                    {index + 1}. {step.title}
                  </label>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <Separator className="my-6" />
          
          <div className="space-y-4">
            <h3 className="font-medium">Reflection</h3>
            <p className="text-sm text-muted-foreground">
              After completing the exercise, write a brief reflection on what you experienced.
              What was challenging? What did you notice about your thoughts and feelings?
            </p>
            
            <Textarea
              placeholder="Write your reflection here..."
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              className="min-h-[150px]"
            />
            
            <div className="text-sm text-muted-foreground flex justify-between">
              <span>Minimum 20 characters</span>
              <span className={reflection.length >= 20 ? "text-primary" : ""}>
                {reflection.length} characters
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            {canSubmit ? (
              <div className="text-sm text-green-600 dark:text-green-400 flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                Ready to submit
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                Complete all steps and reflection to continue
              </div>
            )}
          </div>
          <Button 
            onClick={handleSubmitExercise} 
            disabled={!canSubmit || submitting}
          >
            {submitting ? "Submitting..." : "Submit Exercise"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CourseExercise;
