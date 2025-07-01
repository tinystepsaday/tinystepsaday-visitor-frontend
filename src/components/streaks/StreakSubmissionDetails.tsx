"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

interface StreakSubmissionDetailsProps {
  submission?: {
    date: Date;
    activity: string;
    description: string;
    startTime: string;
    endTime: string;
    reflection: string;
  };
}

const StreakSubmissionDetails = ({ submission }: StreakSubmissionDetailsProps) => {
  if (!submission) {
    return null;
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg">
          Submission for {format(submission.date, "MMMM d, yyyy")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-1">Activity</h4>
          <p className="text-muted-foreground">{submission.activity}</p>
        </div>
        <div>
          <h4 className="font-medium mb-1">Description</h4>
          <p className="text-muted-foreground">{submission.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-1">Start Time</h4>
            <p className="text-muted-foreground">{submission.startTime}</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">End Time</h4>
            <p className="text-muted-foreground">{submission.endTime}</p>
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-1">Personal Reflection</h4>
          <p className="text-muted-foreground">{submission.reflection}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakSubmissionDetails;
