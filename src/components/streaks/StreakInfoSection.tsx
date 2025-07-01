"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Calendar, CheckCircle } from "lucide-react";

const StreakInfoSection = () => {
  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="grid gap-6 md:grid-cols-3 mb-12">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Consistency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Maintain a streak by checking in regularly according to the schedule (daily, weekly, or monthly). 
              Missing a check-in breaks your streak.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Milestones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Reach specific milestones and earn badges as your streak grows longer. 
              These achievements mark your progress and dedication.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Check-Ins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Record your activities with detailed check-ins. Track time spent, describe your 
              practice, and reflect on your progress.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4 mb-12">
        <h3 className="text-xl font-semibold">How to Use Streaks</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li className="text-muted-foreground">
            <span className="font-medium text-foreground">Choose a streak challenge</span> that 
            aligns with a habit you want to develop.
          </li>
          <li className="text-muted-foreground">
            <span className="font-medium text-foreground">Enroll in the challenge</span> to start 
            your streak journey and set your starting date.
          </li>
          <li className="text-muted-foreground">
            <span className="font-medium text-foreground">Check in regularly</span> according to 
            the streak&apos;s frequency requirements to maintain your progress.
          </li>
          <li className="text-muted-foreground">
            <span className="font-medium text-foreground">Track your progress</span> using the 
            calendar and milestone features to stay motivated.
          </li>
          <li className="text-muted-foreground">
            <span className="font-medium text-foreground">Earn badges</span> as you reach important 
            milestones in your streak journey.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default StreakInfoSection;
