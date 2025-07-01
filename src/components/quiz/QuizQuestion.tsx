
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface QuizOption {
  id: string;
  text: string;
  value: string | number;
}

interface QuizQuestionProps {
  question: string;
  options: QuizOption[];
  selectedOption: string | null;
  onOptionSelect: (value: string) => void;
  className?: string;
}

export function QuizQuestion({
  question,
  options,
  selectedOption,
  onOptionSelect,
  className
}: QuizQuestionProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-xl font-medium">{question}</h3>
      
      <RadioGroup
        value={selectedOption || undefined}
        onValueChange={onOptionSelect}
        className="space-y-3"
      >
        {options.map((option) => (
          <div
            key={option.id}
            className={cn(
              "flex items-center space-x-3 rounded-lg border p-4 transition-colors",
              selectedOption === option.id
                ? "border-primary bg-primary/5"
                : "hover:bg-accent"
            )}
          >
            <RadioGroupItem
              value={option.id}
              id={option.id}
              className="data-[state=checked]:border-primary"
            />
            <Label
              htmlFor={option.id}
              className="w-full cursor-pointer font-normal"
            >
              {option.text}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
