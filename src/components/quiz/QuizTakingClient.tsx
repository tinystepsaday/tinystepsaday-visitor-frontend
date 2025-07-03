"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { QuizQuestion } from "@/components/quiz/QuizQuestion";
import { QuizProgress } from "@/components/quiz/QuizProgress";
import { QuizLayout } from "@/components/quiz/QuizLayout";
import { ArrowRight, ArrowLeft, Book } from "lucide-react";
import { Quiz } from "@/data/quizzes";

interface QuizTakingClientProps {
  quiz: Quiz;
}

export default function QuizTakingClient({ quiz }: QuizTakingClientProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const hasAnsweredCurrent = answers[currentQuestion.id];

  const handleOptionSelect = (optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Submit quiz
      setIsSubmitting(true);
      const answersParam = encodeURIComponent(JSON.stringify(answers));
      router.push(`/quiz/${quiz.id}/results?answers=${answersParam}`);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleBackClick = () => {
    if (isFirstQuestion) {
      router.push("/quiz");
    } else {
      handlePreviousQuestion();
    }
  };

  return (
    <QuizLayout
      title={quiz.title}
      subtitle={quiz.description}
      showBackButton={!isFirstQuestion}
      onBackClick={handleBackClick}
    >
      <div className="space-y-6">
        <QuizProgress 
          currentStep={currentQuestionIndex + 1}
          totalSteps={totalQuestions}
        />
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </h2>
              <p className="text-sm text-muted-foreground">
                {quiz.estimatedTime} • {quiz.difficulty} level
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Book className="h-4 w-4" />
              <span>{quiz.category}</span>
            </div>
          </div>
          
          <QuizQuestion
            question={currentQuestion.text}
            options={currentQuestion.options}
            selectedOption={answers[currentQuestion.id]}
            onOptionSelect={handleOptionSelect}
          />
        </div>
        
        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={handleBackClick}
            disabled={isSubmitting}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {isFirstQuestion ? "Back to Quizzes" : "Previous"}
          </Button>
          
          <Button
            onClick={handleNextQuestion}
            disabled={!hasAnsweredCurrent || isSubmitting}
          >
            {isSubmitting ? (
              "Submitting..."
            ) : isLastQuestion ? (
              <>
                Submit Quiz
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Next Question
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </QuizLayout>
  );
} 