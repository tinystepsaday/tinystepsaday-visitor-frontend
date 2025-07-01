"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import CourseVideoPlayer from './CourseVideoPlayer';
import CourseQuiz from './CourseQuiz';
import CourseExercise from './CourseExercise';
import CourseNotes from './CourseNotes';

interface CourseContentViewerProps {
  contentType: string;
  currentLesson: any;
  onComplete: () => void;
}

export const CourseContentViewer = ({
  contentType,
  currentLesson,
  onComplete
}: CourseContentViewerProps) => {
  return (
    <div className="h-full">
      {contentType === "video" && (
        <CourseVideoPlayer
          lessonTitle={currentLesson.title || "Untitled Lesson"}
          onComplete={onComplete}
        />
      )}
      {contentType === "quiz" && (
        <CourseQuiz
          lessonId={currentLesson.id || ""}
          onComplete={onComplete}
        />
      )}
      {contentType === "exercise" && (
        <CourseExercise
          lessonId={currentLesson.id || ""}
          moduleTitle={currentLesson.moduleTitle || ""}
          lessonTitle={currentLesson.title || ""}
          onComplete={onComplete}
        />
      )}
      {contentType === "notes" && (
        <CourseNotes
          lessonId={currentLesson.id || ""}
          moduleTitle={currentLesson.moduleTitle || ""}
          lessonTitle={currentLesson.title || ""}
        />
      )}
    </div>
  );
};
