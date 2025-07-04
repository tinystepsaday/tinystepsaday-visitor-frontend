"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle, PauseCircle, ExternalLink } from "lucide-react";
import Image from "next/image";

interface CourseVideoPlayerProps {
  lessonTitle: string;
  videoUrl?: string;
  onComplete: () => void;
}

const CourseVideoPlayer = ({ lessonTitle, videoUrl, onComplete }: CourseVideoPlayerProps) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [videoId, setVideoId] = useState<string>("");

  // Extract video ID from various video URLs
  useEffect(() => {
    if (videoUrl) {
      let id = "";
      
      // YouTube URL patterns
      if (videoUrl.includes("youtube.com/watch")) {
        const urlParams = new URLSearchParams(new URL(videoUrl).search);
        id = urlParams.get("v") || "";
      } else if (videoUrl.includes("youtu.be/")) {
        id = videoUrl.split("youtu.be/")[1]?.split("?")[0] || "";
      } else if (videoUrl.includes("youtube.com/embed/")) {
        id = videoUrl.split("youtube.com/embed/")[1]?.split("?")[0] || "";
      }
      
      setVideoId(id);
    }
  }, [videoUrl]);

  // This is a simulated video player that progresses automatically
  useEffect(() => {
    if (playing && !videoId) {
      const interval = setInterval(() => {
        setProgress(prevProgress => {
          const newProgress = prevProgress + 0.5;

          // Automatically mark as complete when reaching 100%
          if (newProgress >= 100) {
            clearInterval(interval);
            setPlaying(false);
            setCompleted(true);
            onComplete();
            return 100;
          }

          return newProgress;
        });
      }, 500); // Update every half second for demo purposes

      return () => clearInterval(interval);
    }
  }, [playing, onComplete, videoId]);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVideoComplete = () => {
    setCompleted(true);
    onComplete();
  };

  // If we have a valid video URL, render the embedded video
  if (videoId) {
    return (
      <div className="space-y-4">
        <div className="relative bg-black aspect-video rounded-md overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=${playing ? 1 : 0}&rel=0&modestbranding=1`}
            title={lessonTitle}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => {
              if (playing) {
                // Simulate video completion after a delay
                setTimeout(() => {
                  handleVideoComplete();
                }, 5000); // 5 seconds for demo
              }
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {completed ? "Video completed" : "Watch the full video to complete this lesson"}
          </div>

          <div className="flex items-center gap-2">
            {videoUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in YouTube
                </a>
              </Button>
            )}
            <Button variant="outline" onClick={handlePlayPause}>
              {playing ? "Pause" : "Play"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Fallback to placeholder video player
  return (
    <div className="space-y-4">
      <div className="relative bg-black aspect-video rounded-md overflow-hidden">
        {/* Video placeholder */}
        <div className="w-full h-full flex items-center justify-center">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Course Video"
            width={500}
            height={96}
            className="w-full h-full object-cover opacity-50"
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <Button
              variant="ghost"
              size="icon"
              className="h-20 w-20 rounded-full hover:scale-110 transition-transform"
              onClick={handlePlayPause}
            >
              {playing ? (
                <PauseCircle className="h-20 w-20 text-white" />
              ) : (
                <PlayCircle className="h-20 w-20 text-white" />
              )}
            </Button>
            <h3 className="mt-4 font-medium text-xl">{lessonTitle}</h3>
            {playing && <p className="text-sm mt-2">Simulating video playback...</p>}
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700">
            <div
              className="h-full bg-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {completed ? "Video completed" : "Watch the full video to complete this lesson"}
        </div>

        <div>
          <Button variant="outline" onClick={handlePlayPause}>
            {playing ? "Pause" : "Play"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseVideoPlayer;
