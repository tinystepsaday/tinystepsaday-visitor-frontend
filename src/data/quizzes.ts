export interface QuizOption {
  id: string;
  text: string;
  value: number;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  category: string;
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface QuizResult {
  score: number;
  maxScore: number;
  percentage: number;
  level: 'excellent' | 'good' | 'fair' | 'needs-improvement';
  feedback: string;
  recommendations: string[];
}

export const quizzes: Record<string, Quiz> = {
  "self-mastery": {
    id: "self-mastery",
    title: "Master Your Habits",
    description: "Assess your self-discipline, routines, and habits",
    category: "Personal Development",
    estimatedTime: "10-15 minutes",
    difficulty: "intermediate",
    questions: [
      {
        id: "q1",
        text: "How often do you struggle to stick to a new habit?",
        options: [
          { id: "q1-a", text: "Almost never - I can maintain new habits easily", value: 1 },
          { id: "q1-b", text: "Occasionally - Some habits stick, others don't", value: 2 },
          { id: "q1-c", text: "Often - I regularly start strong but lose momentum", value: 3 },
          { id: "q1-d", text: "Almost always - I find it very difficult to maintain new habits", value: 4 }
        ]
      },
      {
        id: "q2",
        text: "How would you rate your current morning routine?",
        options: [
          { id: "q2-a", text: "Excellent - Consistent, energizing and sets me up for success", value: 1 },
          { id: "q2-b", text: "Good - Mostly consistent but could be improved", value: 2 },
          { id: "q2-c", text: "Fair - Inconsistent but I have some good elements", value: 3 },
          { id: "q2-d", text: "Poor - Chaotic or non-existent", value: 4 }
        ]
      },
      {
        id: "q3",
        text: "When you set goals, how often do you achieve them?",
        options: [
          { id: "q3-a", text: "Almost always - I consistently achieve what I set out to do", value: 1 },
          { id: "q3-b", text: "Usually - I achieve most goals with some exceptions", value: 2 },
          { id: "q3-c", text: "Sometimes - I achieve about half of my goals", value: 3 },
          { id: "q3-d", text: "Rarely - I struggle to follow through on most goals", value: 4 }
        ]
      },
      {
        id: "q4",
        text: "How do you typically respond to setbacks in your routine?",
        options: [
          { id: "q4-a", text: "I quickly adjust and get back on track", value: 1 },
          { id: "q4-b", text: "I feel discouraged but eventually resume", value: 2 },
          { id: "q4-c", text: "I often abandon the routine and try something new", value: 3 },
          { id: "q4-d", text: "I give up and feel like I've failed", value: 4 }
        ]
      },
      {
        id: "q5",
        text: "How easy is it for you to avoid distractions when working on important tasks?",
        options: [
          { id: "q5-a", text: "Very easy - I can focus deeply for extended periods", value: 1 },
          { id: "q5-b", text: "Somewhat easy - I can focus but need occasional breaks", value: 2 },
          { id: "q5-c", text: "Somewhat difficult - I get distracted fairly often", value: 3 },
          { id: "q5-d", text: "Very difficult - I'm constantly fighting distractions", value: 4 }
        ]
      },
      {
        id: "q6",
        text: "How often do you procrastinate on important tasks?",
        options: [
          { id: "q6-a", text: "Rarely - I usually start tasks promptly", value: 1 },
          { id: "q6-b", text: "Sometimes - I procrastinate on certain types of tasks", value: 2 },
          { id: "q6-c", text: "Often - I frequently delay starting important work", value: 3 },
          { id: "q6-d", text: "Very often - Procrastination is a significant issue for me", value: 4 }
        ]
      },
      {
        id: "q7",
        text: "How effectively do you manage your time?",
        options: [
          { id: "q7-a", text: "Very effectively - I consistently prioritize well", value: 1 },
          { id: "q7-b", text: "Somewhat effectively - I'm usually on top of things", value: 2 },
          { id: "q7-c", text: "Not very effectively - I often feel rushed or behind", value: 3 },
          { id: "q7-d", text: "Poorly - I feel constantly overwhelmed by time pressure", value: 4 }
        ]
      },
      {
        id: "q8",
        text: "How consistent are you with your sleep schedule?",
        options: [
          { id: "q8-a", text: "Very consistent - I go to bed and wake up at similar times daily", value: 1 },
          { id: "q8-b", text: "Mostly consistent - With some variation on weekends", value: 2 },
          { id: "q8-c", text: "Somewhat inconsistent - My schedule varies frequently", value: 3 },
          { id: "q8-d", text: "Very inconsistent - I have no regular sleep pattern", value: 4 }
        ]
      },
      {
        id: "q9",
        text: "How often do you engage in deliberate self-improvement activities?",
        options: [
          { id: "q9-a", text: "Daily - I consistently make time for personal growth", value: 1 },
          { id: "q9-b", text: "Weekly - I regularly set aside time for development", value: 2 },
          { id: "q9-c", text: "Monthly - I occasionally focus on self-improvement", value: 3 },
          { id: "q9-d", text: "Rarely - I seldom engage in deliberate self-improvement", value: 4 }
        ]
      },
      {
        id: "q10",
        text: "How would you rate your ability to say 'no' to things that don't align with your priorities?",
        options: [
          { id: "q10-a", text: "Excellent - I confidently protect my priorities", value: 1 },
          { id: "q10-b", text: "Good - I usually set boundaries but sometimes give in", value: 2 },
          { id: "q10-c", text: "Fair - I often find it difficult to decline requests", value: 3 },
          { id: "q10-d", text: "Poor - I regularly overcommit and struggle with boundaries", value: 4 }
        ]
      }
    ]
  },
  "addictions": {
    id: "addictions",
    title: "Break Free From Addictions",
    description: "Assess your relationship with habits and dependencies",
    category: "Mental Health",
    estimatedTime: "5-10 minutes",
    difficulty: "beginner",
    questions: [
      {
        id: "q1",
        text: "How often do you find yourself using social media when you intended not to?",
        options: [
          { id: "q1-a", text: "Rarely or never", value: 1 },
          { id: "q1-b", text: "Sometimes (1-2 times per week)", value: 2 },
          { id: "q1-c", text: "Often (several times per week)", value: 3 },
          { id: "q1-d", text: "Very frequently (daily)", value: 4 }
        ]
      },
      {
        id: "q2",
        text: "When you try to cut back on a habit you're concerned about, how difficult is it?",
        options: [
          { id: "q2-a", text: "Not difficult at all", value: 1 },
          { id: "q2-b", text: "Slightly difficult, but manageable", value: 2 },
          { id: "q2-c", text: "Moderately difficult, requiring significant effort", value: 3 },
          { id: "q2-d", text: "Extremely difficult or seemingly impossible", value: 4 }
        ]
      },
      {
        id: "q3",
        text: "How has your behavior affected your relationships with others?",
        options: [
          { id: "q3-a", text: "Not at all - my relationships are healthy", value: 1 },
          { id: "q3-b", text: "Minimally - occasional tension but generally fine", value: 2 },
          { id: "q3-c", text: "Moderately - recurring conflicts or distance", value: 3 },
          { id: "q3-d", text: "Significantly - serious relationship damage", value: 4 }
        ]
      }
    ]
  },
  "purpose": {
    id: "purpose",
    title: "Find Your Purpose",
    description: "Explore your life direction and meaning",
    category: "Life Purpose",
    estimatedTime: "5-10 minutes",
    difficulty: "intermediate",
    questions: [
      {
        id: "q1",
        text: "How clear are you about your purpose in life?",
        options: [
          { id: "q1-a", text: "Very clear - I know exactly what gives my life meaning", value: 1 },
          { id: "q1-b", text: "Somewhat clear - I have some ideas but not complete clarity", value: 2 },
          { id: "q1-c", text: "Somewhat unclear - I'm exploring but still confused", value: 3 },
          { id: "q1-d", text: "Very unclear - I feel lost about my purpose", value: 4 }
        ]
      },
      {
        id: "q2",
        text: "How satisfied are you with your current career path?",
        options: [
          { id: "q2-a", text: "Very satisfied - My work aligns with my values and strengths", value: 1 },
          { id: "q2-b", text: "Somewhat satisfied - It's good but could be better", value: 2 },
          { id: "q2-c", text: "Somewhat dissatisfied - I often feel unfulfilled", value: 3 },
          { id: "q2-d", text: "Very dissatisfied - My work feels meaningless or draining", value: 4 }
        ]
      },
      {
        id: "q3",
        text: "How often do you feel that what you do day-to-day matters in the bigger picture?",
        options: [
          { id: "q3-a", text: "Almost always - I regularly see the impact of my actions", value: 1 },
          { id: "q3-b", text: "Often - I frequently feel my contributions matter", value: 2 },
          { id: "q3-c", text: "Sometimes - I occasionally feel my actions have meaning", value: 3 },
          { id: "q3-d", text: "Rarely - I seldom feel what I do matters", value: 4 }
        ]
      }
    ]
  },
  "trauma": {
    id: "trauma",
    title: "Heal Your Past",
    description: "Process and integrate past experiences",
    category: "Mental Health",
    estimatedTime: "10-15 minutes",
    difficulty: "advanced",
    questions: [
      {
        id: "q1",
        text: "How often do difficult past experiences intrude on your present thoughts?",
        options: [
          { id: "q1-a", text: "Rarely or never - Past experiences don't trouble me", value: 1 },
          { id: "q1-b", text: "Occasionally - They come up but don't disrupt my life", value: 2 },
          { id: "q1-c", text: "Often - They frequently affect my mood and thoughts", value: 3 },
          { id: "q1-d", text: "Very often - They constantly interfere with my daily life", value: 4 }
        ]
      },
      {
        id: "q2",
        text: "How do you typically respond to reminders of difficult experiences?",
        options: [
          { id: "q2-a", text: "I can process them calmly and move on", value: 1 },
          { id: "q2-b", text: "I feel some discomfort but can manage it", value: 2 },
          { id: "q2-c", text: "I experience significant emotional distress", value: 3 },
          { id: "q2-d", text: "I become overwhelmed and struggle to function", value: 4 }
        ]
      },
      {
        id: "q3",
        text: "How has your past affected your ability to trust others?",
        options: [
          { id: "q3-a", text: "Not at all - I can trust appropriately", value: 1 },
          { id: "q3-b", text: "Minimally - I'm somewhat cautious but generally trusting", value: 2 },
          { id: "q3-c", text: "Moderately - I have difficulty trusting in certain situations", value: 3 },
          { id: "q3-d", text: "Significantly - I struggle to trust anyone", value: 4 }
        ]
      }
    ]
  }
};

export function calculateQuizResult(answers: Record<string, string>): QuizResult {
  const totalScore = Object.values(answers).reduce((sum, answerId) => {
    for (const quiz of Object.values(quizzes)) {
      for (const question of quiz.questions) {
        const option = question.options.find(opt => opt.id === answerId);
        if (option) {
          return sum + option.value;
        }
      }
    }
    return sum;
  }, 0);

  const maxScore = Object.values(quizzes).reduce((sum, quiz) => {
    return sum + quiz.questions.length * 4;
  }, 0);

  const percentage = Math.round((totalScore / maxScore) * 100);

  let level: QuizResult['level'];
  let feedback: string;
  let recommendations: string[];

  if (percentage >= 80) {
    level = 'excellent';
    feedback = "Excellent! You demonstrate strong self-mastery and healthy habits.";
    recommendations = [
      "Continue building on your strong foundation",
      "Share your knowledge with others",
      "Consider mentoring or coaching others"
    ];
  } else if (percentage >= 60) {
    level = 'good';
    feedback = "Good! You have a solid foundation with room for improvement.";
    recommendations = [
      "Focus on consistency in your routines",
      "Identify and work on your weakest areas",
      "Set specific, measurable goals"
    ];
  } else if (percentage >= 40) {
    level = 'fair';
    feedback = "Fair. You have potential but need to develop better habits and routines.";
    recommendations = [
      "Start with one small habit change",
      "Create a structured daily routine",
      "Seek accountability from friends or family"
    ];
  } else {
    level = 'needs-improvement';
    feedback = "You have significant room for improvement in self-mastery and habit formation.";
    recommendations = [
      "Start with very small, manageable changes",
      "Consider working with a coach or mentor",
      "Focus on building one habit at a time"
    ];
  }

  return {
    score: totalScore,
    maxScore,
    percentage,
    level,
    feedback,
    recommendations
  };
}

export function getQuizById(id: string): Quiz | null {
  return quizzes[id] || null;
}

export function getAllQuizzes(): Quiz[] {
  return Object.values(quizzes);
} 