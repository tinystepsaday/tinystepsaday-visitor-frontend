
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Timer, Clock } from "lucide-react";

interface StreakTimerProps {
  onTimeUpdate?: (seconds: number) => void;
}

const StreakTimer = ({ onTimeUpdate }: StreakTimerProps) => {
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  const handleStartTimer = () => {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
      const interval = setInterval(() => {
        setTimer(prev => {
          const newTime = prev + 1;
          if (onTimeUpdate) onTimeUpdate(newTime);
          return newTime;
        });
      }, 1000);
      setTimerInterval(interval);
    }
  };

  const handleStopTimer = () => {
    if (isTimerRunning && timerInterval) {
      setIsTimerRunning(false);
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Clean up timer on component unmount
  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  return (
    <div className="pt-4">
      <Button onClick={handleStartTimer} disabled={isTimerRunning} className="mr-2">
        <Timer className="h-5 w-5 mr-2" />
        Start Session
      </Button>
      <Button onClick={handleStopTimer} disabled={!isTimerRunning} variant="outline">
        <Clock className="h-5 w-5 mr-2" />
        End Session
      </Button>
      {(timer > 0 || isTimerRunning) && (
        <div className="mt-4 bg-muted inline-flex items-center px-4 py-2 rounded-md">
          <Clock className="h-5 w-5 mr-2 text-primary" />
          <span className="font-mono text-lg">{formatTime(timer)}</span>
        </div>
      )}
    </div>
  );
};

export default StreakTimer;
