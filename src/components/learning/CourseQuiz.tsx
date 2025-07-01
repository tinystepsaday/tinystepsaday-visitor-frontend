/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface QuizQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswer: string;
}

interface CourseQuizProps {
  lessonId: string;
  onComplete: () => void;
}

const CourseQuiz = ({ lessonId, onComplete }: CourseQuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  
  // Mock quiz data
  const quizQuestions: QuizQuestion[] = [
    {
      id: "q1",
      question: "What is the primary focus of mindfulness meditation?",
      options: [
        { id: "a", text: "Clearing the mind of all thoughts" },
        { id: "b", text: "Present moment awareness without judgment" },
        { id: "c", text: "Achieving a specific goal or outcome" },
        { id: "d", text: "Visualizing positive outcomes" }
      ],
      correctAnswer: "b"
    },
    {
      id: "q2",
      question: "Which of the following is NOT a benefit of regular mindfulness practice?",
      options: [
        { id: "a", text: "Reduced stress" },
        { id: "b", text: "Improved focus" },
        { id: "c", text: "Guaranteed financial success" },
        { id: "d", text: "Better emotional regulation" }
      ],
      correctAnswer: "c"
    },
    {
      id: "q3",
      question: "What is the recommended minimum duration for a beneficial daily meditation practice?",
      options: [
        { id: "a", text: "60 minutes" },
        { id: "b", text: "30 minutes" },
        { id: "c", text: "5-10 minutes" },
        { id: "d", text: "2 hours" }
      ],
      correctAnswer: "c"
    }
  ];
  
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  const handleSelectAnswer = (questionId: string, answerId: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerId
    });
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const calculateScore = () => {
    let correctAnswers = 0;
    
    quizQuestions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    return {
      correct: correctAnswers,
      total: quizQuestions.length,
      percentage: Math.round((correctAnswers / quizQuestions.length) * 100)
    };
  };
  
  const handleCompleteQuiz = () => {
    const score = calculateScore();
    
    if (score.percentage >= 70) {
      toast.success(`Quiz completed with ${score.percentage}% correct!`);
      onComplete();
    } else {
      toast.error(`You need at least 70% to pass. Your score: ${score.percentage}%`);
    }
  };
  
  const score = calculateScore();
  
  if (showResults) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Quiz Results</CardTitle>
          <CardDescription>
            You scored {score.correct} out of {score.total} questions correctly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  className="text-muted stroke-current" 
                  strokeWidth="8" 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="transparent"
                />
                <circle 
                  className="text-primary stroke-current" 
                  strokeWidth="8" 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="transparent"
                  strokeLinecap="round"
                  strokeDasharray={`${score.percentage * 2.51} 251`}
                  strokeDashoffset="0"
                  style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold">{score.percentage}%</span>
              </div>
            </div>
            
            {score.percentage >= 70 ? (
              <div className="flex items-center mt-6 text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-5 w-5 mr-2" />
                <span>You passed the quiz!</span>
              </div>
            ) : (
              <div className="flex items-center mt-6 text-red-600 dark:text-red-400">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>You need at least 70% to pass. Try again.</span>
              </div>
            )}
          </div>
          
          <div className="mt-6 space-y-4">
            <h3 className="font-medium">Question Review:</h3>
            {quizQuestions.map((question, index) => {
              const isCorrect = selectedAnswers[question.id] === question.correctAnswer;
              const selectedOptionText = question.options.find(o => o.id === selectedAnswers[question.id])?.text;
              const correctOptionText = question.options.find(o => o.id === question.correctAnswer)?.text;
              
              return (
                <div key={question.id} className="border rounded-md p-4">
                  <h4 className="font-medium flex items-center">
                    <span className="mr-2">{index + 1}.</span>
                    {question.question}
                    {isCorrect ? (
                      <CheckCircle2 className="h-4 w-4 ml-2 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 ml-2 text-red-600" />
                    )}
                  </h4>
                  <div className="mt-2 text-sm">
                    <div className="flex">
                      <span className="w-20 font-medium text-muted-foreground">Your answer:</span>
                      <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                        {selectedOptionText || "Not answered"}
                      </span>
                    </div>
                    {!isCorrect && (
                      <div className="flex mt-1">
                        <span className="w-20 font-medium text-muted-foreground">Correct:</span>
                        <span className="text-green-600">{correctOptionText}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline"
            onClick={() => {
              setShowResults(false);
              setCurrentQuestionIndex(0);
              setSelectedAnswers({});
            }}
          >
            Restart Quiz
          </Button>
          
          <Button onClick={handleCompleteQuiz} disabled={score.percentage < 70}>
            {score.percentage >= 70 ? "Complete Lesson" : "Try Again"}
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Quiz: Mindfulness Basics</CardTitle>
          <span className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </span>
        </div>
        <CardDescription>
          Test your understanding of key concepts from this lesson
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
        
        <RadioGroup 
          value={selectedAnswers[currentQuestion.id] || ""}
          onValueChange={(value) => handleSelectAnswer(currentQuestion.id, value)}
          className="space-y-3"
        >
          {currentQuestion.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2 border rounded-md p-3">
              <RadioGroupItem value={option.id} id={`option-${option.id}`} />
              <Label htmlFor={`option-${option.id}`} className="flex-grow cursor-pointer">
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        
        <div className="flex items-center">
          {Array.from({ length: quizQuestions.length }).map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 mx-1 rounded-full ${
                index === currentQuestionIndex ? 'bg-primary' : 
                selectedAnswers[quizQuestions[index].id] ? 'bg-primary/40' : 'bg-muted'
              }`}
            />
          ))}
        </div>
        
        <Button 
          onClick={handleNextQuestion}
          disabled={!selectedAnswers[currentQuestion.id]}
        >
          {currentQuestionIndex < quizQuestions.length - 1 ? "Next" : "Finish"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseQuiz;
