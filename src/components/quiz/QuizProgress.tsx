
import { Progress } from "@/components/ui/progress";

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function QuizProgress({ currentStep, totalSteps }: QuizProgressProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <span>Question {currentStep} of {totalSteps}</span>
        <span>{Math.round(progressPercentage)}% Complete</span>
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
}
