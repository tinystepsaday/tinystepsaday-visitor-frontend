
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity } from "lucide-react";

interface StreakProgressProps {
  currentStreak: number;
  longestStreak: number;
  startDate: Date;
  lastCheckIn?: Date;
}

const StreakProgress = ({ currentStreak, longestStreak, startDate, lastCheckIn }: StreakProgressProps) => {
  const progressValue = (currentStreak / longestStreak) * 100;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Your Streak Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="text-primary h-5 w-5" />
              <span className="font-medium">Current Streak</span>
            </div>
            <span className="text-xl font-bold">{currentStreak} days</span>
          </div>

          <Progress value={progressValue} className="h-2" />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Started</p>
              <p className="font-medium">{startDate.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Longest Streak</p>
              <p className="font-medium">{longestStreak} days</p>
            </div>
          </div>

          {lastCheckIn && (
            <div className="text-sm">
              <p className="text-muted-foreground">Last Check-in</p>
              <p className="font-medium">{lastCheckIn.toLocaleDateString()}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakProgress;
