"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Mail, Shield, ShieldCheck, BookOpen } from "lucide-react";
import { User } from "@/lib/api/users";

const roleConfig = {
  ADMIN: { label: "Admin", icon: ShieldCheck, variant: "destructive" as const },
  USER: { label: "User", icon: Shield, variant: "default" as const },
  MODERATOR: { label: "Moderator", icon: Shield, variant: "secondary" as const },
  INSTRUCTOR: { label: "Instructor", icon: BookOpen, variant: "outline" as const },
  SUPER_ADMIN: { label: "Super Admin", icon: ShieldCheck, variant: "destructive" as const },
};

interface UserProfileCardProps {
  user: User;
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  const config = roleConfig[user.role as keyof typeof roleConfig] || roleConfig.USER;
  const fullName = `${user.firstName} ${user.lastName}`;

  // Dummy data for missing fields (to be replaced with real API calls later)
  const courseEnrollments = [
    { id: "1", courseName: "Introduction to Programming", progress: 85, completedAt: null, enrolledAt: new Date(), totalTimeSpent: 120 },
    { id: "2", courseName: "Advanced JavaScript", progress: 100, completedAt: new Date(), enrolledAt: new Date(), totalTimeSpent: 180 },
  ];

  const streakEnrollments = [
    { id: "1", streakName: "Daily Coding Challenge", isActive: true, currentStreak: 15, longestStreak: 30, totalCheckIns: 45, enrolledAt: new Date() },
  ];

  const payments = [
    { id: "1", description: "Premium Subscription", amount: 29.99, status: "completed", paymentMethod: "Credit Card", createdAt: new Date(), transactionId: "TXN123" },
  ];

  const subscriptions = [
    { id: "1", tier: "Premium", monthlyAmount: 29.99, status: "active", startDate: new Date(), endDate: null, autoRenew: true },
  ];

  const getTotalSpent = () => {
    return payments.reduce((total, payment) => total + payment.amount, 0);
  };

  const getActiveSubscriptions = () => {
    return subscriptions.filter(sub => sub.status === "active");
  };

  const getActiveStreaks = () => {
    return streakEnrollments.filter(streak => streak.isActive);
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <Avatar className="h-24 w-24 mx-auto">
          <AvatarImage src="/placeholder.svg" alt={fullName} />
          <AvatarFallback className="text-lg">
            {fullName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <CardTitle>{fullName}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
        <Badge variant={config.variant} className="flex items-center gap-1 w-fit mx-auto">
          <config.icon className="h-3 w-3" />
          {config.label}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Status</span>
          <Badge variant={user.isActive ? "default" : "secondary"}>{user.isActive ? "Active" : "Inactive"}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Email Verified</span>
          <Badge variant={user.isEmailVerified ? "default" : "secondary"}>{user.isEmailVerified ? "Verified" : "Unverified"}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">2FA Enabled</span>
          <Badge variant={user.twoFactorEnabled ? "default" : "secondary"}>{user.twoFactorEnabled ? "Enabled" : "Disabled"}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Member Since</span>
          <span className="text-sm text-muted-foreground">{new Date(user.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Last Login</span>
          <span className="text-sm text-muted-foreground">
            {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Never"}
          </span>
        </div>

        {/* Quick Stats */}
        <Separator />
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Courses Enrolled</span>
            <span className="text-sm text-muted-foreground">{courseEnrollments.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Active Streaks</span>
            <span className="text-sm text-muted-foreground">{getActiveStreaks().length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Spent</span>
            <span className="text-sm text-muted-foreground">${getTotalSpent().toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Active Subscriptions</span>
            <span className="text-sm text-muted-foreground">{getActiveSubscriptions().length}</span>
          </div>
        </div>

        <Separator />
        <Button className="w-full bg-transparent" variant="outline">
          <Mail className="mr-2 h-4 w-4" />
          Send Message
        </Button>
      </CardContent>
    </Card>
  );
} 