
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

interface StreakStatsProps {
  enrolledCount: number;
  rating: number;
  reviewCount: number;
}

const StreakStats = ({ enrolledCount, rating, reviewCount }: StreakStatsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Streak Community</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <span className="font-medium">{enrolledCount} people enrolled</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <div>
              <div className="font-medium">{rating.toFixed(1)} out of 5</div>
              <div className="text-sm text-muted-foreground">
                Based on {reviewCount} reviews
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakStats;
