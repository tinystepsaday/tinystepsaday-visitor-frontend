"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import StreakSubmissionDetails from "@/components/streaks/StreakSubmissionDetails";

interface StreakCalendarViewProps {
  checkedDays: Date[];
  selectedSubmission: any;
}

const StreakCalendarView = ({ 
  checkedDays, 
  selectedSubmission 
}: StreakCalendarViewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Streak Calendar</CardTitle>
        <CardDescription>
          Track your check-ins and missed days. Click on a day to view submission details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="multiple"
          selected={checkedDays}
          className="rounded-md border"
          // To customize day rendering, modify CalendarDayButton in the Calendar component.
        />
        
        {selectedSubmission && (
          <StreakSubmissionDetails submission={selectedSubmission} />
        )}

        <div className="flex gap-4 mt-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-600"></div>
            <span className="text-sm">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-600"></div>
            <span className="text-sm">Missed</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakCalendarView;
