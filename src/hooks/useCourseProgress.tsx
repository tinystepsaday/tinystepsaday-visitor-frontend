/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';

export const useCourseProgress = (slug: string | undefined) => {
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);


  useEffect(() => {
    if (!slug) return;

    const storedProgress = localStorage.getItem(`course-progress-${slug}`);
    if (storedProgress) {
      const parsedProgress = JSON.parse(storedProgress);
      setProgress(parsedProgress.progress || 0);
      setCompletedLessons(parsedProgress.completedLessons || []);
    }
  }, [slug]);

  const updateProgress = (course: any) => {
    if (!course || !slug) return;
    
    const totalLessons = course.curriculum.reduce((total: number, module: any) => 
      total + module.lessons.length, 0);
    const newProgress = (completedLessons.length / totalLessons) * 100;
    setProgress(newProgress);
    
    localStorage.setItem(`course-progress-${slug}`, JSON.stringify({
      progress: newProgress,
      completedLessons
    }));
  };

  const markLessonComplete = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  return {
    progress,
    completedLessons,
    updateProgress,
    markLessonComplete
  };
};
