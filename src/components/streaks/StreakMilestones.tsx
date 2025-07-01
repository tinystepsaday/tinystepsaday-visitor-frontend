
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck } from "lucide-react";

interface Milestone {
  days: number;
  name: string;
  achieved: boolean;
}

interface StreakMilestonesProps {
  milestones: Milestone[];
  currentStreak: number;
}

const StreakMilestones = ({ milestones, currentStreak }: StreakMilestonesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Milestones & Badges</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {milestones.map((milestone) => (
            <div 
              key={milestone.days}
              className="flex items-center justify-between p-4 rounded-lg border"
            >
              <div className="flex items-center gap-3">
                <BadgeCheck className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{milestone.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {milestone.days} days streak
                  </p>
                </div>
              </div>
              {currentStreak >= milestone.days ? (
                <Badge variant="default">Achieved!</Badge>
              ) : (
                <span className="text-sm text-muted-foreground">
                  {milestone.days - currentStreak} days to go
                </span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakMilestones;
