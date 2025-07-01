"use client"

/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface Answer {
  [key: string]: string | string[];
}

// Define the assessment questions
const assessmentQuestions = [
  {
    id: "section1",
    title: "Personal Wellbeing",
    questions: [
      {
        id: "wellbeing1",
        question: "How would you rate your overall sense of wellbeing?",
        type: "scale",
        options: [
          { value: "1", label: "Struggling" },
          { value: "2", label: "Challenging" },
          { value: "3", label: "Neutral" },
          { value: "4", label: "Good" },
          { value: "5", label: "Excellent" }
        ]
      },
      {
        id: "wellbeing2",
        question: "How often do you feel overwhelmed by stress?",
        type: "scale",
        options: [
          { value: "1", label: "Daily" },
          { value: "2", label: "Several times a week" },
          { value: "3", label: "Weekly" },
          { value: "4", label: "Monthly" },
          { value: "5", label: "Rarely" }
        ]
      }
    ]
  },
  {
    id: "section2",
    title: "Spiritual Practices",
    questions: [
      {
        id: "spiritual1",
        question: "Do you currently have a spiritual or mindfulness practice?",
        type: "scale",
        options: [
          { value: "1", label: "Not at all" },
          { value: "2", label: "Rarely" },
          { value: "3", label: "Sometimes" },
          { value: "4", label: "Regularly" },
          { value: "5", label: "Daily practice" }
        ]
      },
      {
        id: "spiritual2",
        question: "How connected do you feel to your sense of purpose?",
        type: "scale",
        options: [
          { value: "1", label: "Very disconnected" },
          { value: "2", label: "Somewhat disconnected" },
          { value: "3", label: "Neutral" },
          { value: "4", label: "Somewhat connected" },
          { value: "5", label: "Deeply connected" }
        ]
      }
    ]
  },
  {
    id: "section3",
    title: "Emotional Health",
    questions: [
      {
        id: "emotional1",
        question: "How often do you reflect or journal about your thoughts and emotions?",
        type: "scale",
        options: [
          { value: "1", label: "Never" },
          { value: "2", label: "Rarely" },
          { value: "3", label: "Sometimes" },
          { value: "4", label: "Regularly" },
          { value: "5", label: "Daily" }
        ]
      },
      {
        id: "emotional2",
        question: "How comfortable are you expressing your emotions?",
        type: "scale",
        options: [
          { value: "1", label: "Very uncomfortable" },
          { value: "2", label: "Somewhat uncomfortable" },
          { value: "3", label: "Neutral" },
          { value: "4", label: "Somewhat comfortable" },
          { value: "5", label: "Very comfortable" }
        ]
      }
    ]
  },
  {
    id: "section4",
    title: "Life Purpose & Direction",
    questions: [
      {
        id: "purpose1",
        question: "On a scale of 1-5, how aligned do you feel with your life's purpose?",
        type: "scale",
        options: [
          { value: "1", label: "Completely misaligned" },
          { value: "2", label: "Somewhat misaligned" },
          { value: "3", label: "Neutral" },
          { value: "4", label: "Somewhat aligned" },
          { value: "5", label: "Completely aligned" }
        ]
      },
      {
        id: "purpose2",
        question: "How clear are your goals for the next 1-3 years?",
        type: "scale",
        options: [
          { value: "1", label: "Not clear at all" },
          { value: "2", label: "Somewhat unclear" },
          { value: "3", label: "Neutral" },
          { value: "4", label: "Somewhat clear" },
          { value: "5", label: "Very clear" }
        ]
      }
    ]
  },
  {
    id: "section5",
    title: "Confidence & Self-Worth",
    questions: [
      {
        id: "confidence1",
        question: "How would you rate your overall self-confidence?",
        type: "scale",
        options: [
          { value: "1", label: "Very low" },
          { value: "2", label: "Low" },
          { value: "3", label: "Moderate" },
          { value: "4", label: "High" },
          { value: "5", label: "Very high" }
        ]
      },
      {
        id: "confidence2",
        question: "How often do you acknowledge your achievements and strengths?",
        type: "scale",
        options: [
          { value: "1", label: "Never" },
          { value: "2", label: "Rarely" },
          { value: "3", label: "Sometimes" },
          { value: "4", label: "Often" },
          { value: "5", label: "Very often" }
        ]
      }
    ]
  },
  {
    id: "section6",
    title: "Growth Areas",
    questions: [
      {
        id: "growth1",
        question: "What is your biggest challenge in this season of life?",
        type: "text"
      },
      {
        id: "growth2",
        question: "Which areas do you want to grow in?",
        type: "checkbox",
        options: [
          { value: "faith", label: "Faith/Spirituality" },
          { value: "relationships", label: "Relationships" },
          { value: "confidence", label: "Confidence" },
          { value: "purpose", label: "Purpose" },
          { value: "peace", label: "Inner Peace" },
          { value: "career", label: "Career" }
        ]
      }
    ]
  }
];

// Define a mapping of score ranges to profile types
// const profileTypes = {
//   "10-15": "The Seeker",
//   "16-20": "The Explorer",
//   "21-25": "The Builder",
//   "26-30": "The Awakener",
//   "31-50": "The Sage"
// };

const AssessmentForm = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Answer>({});
  const [showResults, setShowResults] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [checkboxValues, setCheckboxValues] = useState<string[]>([]);
  
  const totalSections = assessmentQuestions.length;
  const progress = ((currentSection + 1) / totalSections) * 100;
  
  const handleRadioChange = (questionId: string, value: string) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });
  };
  
  const handleTextChange = (questionId: string, value: string) => {
    setTextInput(value);
    setAnswers({
      ...answers,
      [questionId]: value
    });
  };
  
  const handleCheckboxChange = (questionId: string, value: string) => {
    const newValues = checkboxValues.includes(value)
      ? checkboxValues.filter(v => v !== value)
      : [...checkboxValues, value];
    
    setCheckboxValues(newValues);
    setAnswers({
      ...answers,
      [questionId]: newValues
    });
  };
  
  const handleNext = () => {
    // Check if current section questions are answered
    const currentQuestions = assessmentQuestions[currentSection].questions;
    const allAnswered = currentQuestions.every(q => 
      answers[q.id] !== undefined && 
      (q.type !== 'checkbox' || (Array.isArray(answers[q.id]) && answers[q.id].length > 0))
    );
    
    if (!allAnswered) {
      // Could show an error message here
      return;
    }
    
    if (currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      // Calculate results
      setShowResults(true);
    }
  };
  
  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };
  
  // Calculate a simple score based on scale questions
  const calculateScore = () => {
    let totalScore = 0;
    let scoreableQuestions = 0;
    
    Object.entries(answers).forEach(([questionId, value]) => {
      // Only calculate score for scale questions (1-5)
      const isScoreQuestion = assessmentQuestions.some(section => 
        section.questions.some(q => 
          q.id === questionId && q.type === 'scale'
        )
      );
      
      if (isScoreQuestion && typeof value === 'string') {
        totalScore += parseInt(value);
        scoreableQuestions++;
      }
    });
    
    return scoreableQuestions > 0 ? totalScore : 0;
  };
  
  // Determine profile type based on score
  const getProfileType = (score: number) => {
    if (score <= 15) return "The Seeker";
    if (score <= 20) return "The Explorer";
    if (score <= 25) return "The Builder";
    if (score <= 30) return "The Awakener";
    return "The Sage";
  };
  
  // Get recommended programs based on profile
  const getRecommendedPrograms = (profileType: string) => {
    switch(profileType) {
      case "The Seeker":
        return ["Self-Discovery Workshop", "Foundations of Mindfulness", "Finding Your Path"];
      case "The Explorer":
        return ["Purposeful Living", "Emotional Intelligence", "Spiritual Practices"];
      case "The Builder":
        return ["Career Alignment", "Relationship Mastery", "Goal Setting & Achievement"];
      case "The Awakener":
        return ["Advanced Mindfulness", "Leadership Development", "Life Purpose Accelerator"];
      case "The Sage":
        return ["Mentorship Certification", "Wisdom Integration", "Legacy Creation"];
      default:
        return ["Personal Mentorship", "Foundational Program", "Wellbeing Essentials"];
    }
  };
  
  const currentContent = showResults ? (
    <div className="space-y-8 py-6 animate-fade-in">
      <div className="text-center">
        <div className="inline-block mb-4 p-4 rounded-full bg-primary/10">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">
              {calculateScore()}
            </span>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold mb-2">
          Your Profile: {getProfileType(calculateScore())}
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Based on your responses, you&apos;re at a stage where personalized guidance can help you navigate your current challenges and aspirations.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-background/50">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">Your Strengths</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                Openness to growth and change
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                Self-awareness of your needs
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                Willingness to seek guidance
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-background/50">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">Areas for Growth</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                Developing consistent practices
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                Clarifying your life purpose
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                Building emotional resilience
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-background/50">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">Recommended Programs</h3>
            <ul className="space-y-2 text-sm">
              {getRecommendedPrograms(getProfileType(calculateScore())).map((program, i) => (
                <li key={i} className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                  {program}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-center mt-10">
        <Button size="lg" className="rounded-full">
          Schedule Your Free Consultation
        </Button>
      </div>
    </div>
  ) : (
    <div className="space-y-8 py-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">
          {assessmentQuestions[currentSection].title}
        </h3>
        
        {assessmentQuestions[currentSection].questions.map((q) => (
          <div key={q.id} className="mb-8">
            <p className="mb-4 font-medium">{q.question}</p>
            
            {q.type === "scale" && (
              <RadioGroup
                onValueChange={(value) => handleRadioChange(q.id, value)}
                value={typeof answers[q.id] === 'string' ? answers[q.id] as string : ""}
                className="flex flex-col space-y-3"
              >
                {q.options?.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <RadioGroupItem value={option.value} id={`${q.id}-${option.value}`} />
                    <Label 
                      htmlFor={`${q.id}-${option.value}`} 
                      className="ml-2 flex-grow"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
            
            {q.type === "text" && (
              <textarea
                className="w-full h-32 p-3 rounded-md border border-border bg-background resize-none"
                placeholder="Share your thoughts..."
                value={answers[q.id] || ""}
                onChange={(e) => handleTextChange(q.id, e.target.value)}
              />
            )}
            
            {q.type === "checkbox" && (
              <div className="grid grid-cols-2 gap-3">
                {q.options?.map((option) => {
                  const isChecked = checkboxValues.includes(option.value);
                  return (
                    <div key={option.value} className="flex items-center">
                      <Checkbox
                        id={`${q.id}-${option.value}`}
                        checked={isChecked}
                        onCheckedChange={() => handleCheckboxChange(q.id, option.value)}
                      />
                      <Label 
                        htmlFor={`${q.id}-${option.value}`} 
                        className="ml-2"
                      >
                        {option.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex justify-between pt-6">
        {currentSection > 0 ? (
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            className="rounded-full"
          >
            Previous
          </Button>
        ) : (
          <div></div>
        )}
        
        <Button 
          onClick={handleNext}
          className="rounded-full"
        >
          {currentSection < totalSections - 1 ? "Next" : "See Results"}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      {!showResults && (
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}
      
      <Card className="border-2 border-muted">
        <CardContent className="p-6 md:p-8">
          {currentContent}
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentForm;
