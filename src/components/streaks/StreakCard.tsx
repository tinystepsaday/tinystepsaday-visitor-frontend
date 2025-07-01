"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Users } from "lucide-react";
import Link from "next/link";

export interface StreakCardProps {
  title: string;
  description: string;
  icon: string;
  enrolled: boolean;
  currentStreak: number;
  enrolledCount: number;
  onEnroll: () => void;
  onCheckIn: () => void;
  startDate?: Date;
  lastCheckIn?: Date | null;
}

const StreakCard = ({
  title,
  description,
  icon,
  enrolled,
  currentStreak,
  enrolledCount,
  onEnroll,
  onCheckIn,
  startDate,
  lastCheckIn
}: StreakCardProps) => {
  const canCheckInToday = () => {
    if (!lastCheckIn) return true;
    
    const today = new Date();
    const lastCheck = new Date(lastCheckIn);
    
    return today.getDate() !== lastCheck.getDate() || 
           today.getMonth() !== lastCheck.getMonth() || 
           today.getFullYear() !== lastCheck.getFullYear();
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <span className="text-3xl">{icon}</span>
          {enrolled && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Active
            </Badge>
          )}
        </div>
        <CardTitle className="mt-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {enrolled ? (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Current streak</span>
              <span className="font-medium">{currentStreak} days</span>
            </div>
            {startDate && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Started on</span>
                <span className="font-medium">{format(startDate, 'MMM dd, yyyy')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Last check-in</span>
              <span className="font-medium">
                {lastCheckIn ? format(lastCheckIn, 'MMM dd, yyyy') : 'Never'}
              </span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mt-2">
              <Users className="h-4 w-4 mr-1" />
              <span>{enrolledCount.toLocaleString()} enrolled</span>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Join this streak challenge to build a positive habit and track your progress.
            </p>
            <div className="flex items-center text-sm text-muted-foreground mt-2">
              <Users className="h-4 w-4 mr-1" />
              <span>{enrolledCount.toLocaleString()} enrolled</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        {enrolled ? (
          <Button 
            className="w-full" 
            asChild
          >
            <Link href={`/streaks/${title.toLowerCase().replace(/\s+/g, '-')}`}>
              View More
            </Link>
          </Button>
        ) : (
          <Button 
            className="w-full" 
            asChild
          >
            <Link href={`/streaks/${title.toLowerCase().replace(/\s+/g, '-')}`}>
              Learn More
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default StreakCard;
