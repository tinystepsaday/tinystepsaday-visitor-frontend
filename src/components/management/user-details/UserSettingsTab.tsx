"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Bell, Mail } from "lucide-react";
import { UserPreference } from "./types";

export function UserSettingsTab() {
  // Dummy data for missing fields (to be replaced with real API calls later)
  const preferences: UserPreference[] = [
    { id: "1", key: "emailNotifications", category: "notifications", value: true },
    { id: "2", key: "pushNotifications", category: "notifications", value: false },
    { id: "3", key: "newsletter", category: "marketing", value: true },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Manage how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive updates via email</p>
            </div>
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span className="text-sm">{preferences.find(p => p.key === "emailNotifications")?.value ? "Enabled" : "Disabled"}</span>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive push notifications</p>
            </div>
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span className="text-sm">{preferences.find(p => p.key === "pushNotifications")?.value ? "Enabled" : "Disabled"}</span>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Newsletter</Label>
              <p className="text-sm text-muted-foreground">Receive our newsletter</p>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span className="text-sm">{preferences.find(p => p.key === "newsletter")?.value ? "Subscribed" : "Not subscribed"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Preferences</CardTitle>
          <CardDescription>All user settings and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {preferences.map((pref) => (
              <div key={pref.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium capitalize">{pref.key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                  <p className="text-sm text-muted-foreground capitalize">{pref.category}</p>
                </div>
                <div className="text-sm">
                  {typeof pref.value === 'boolean' ? (pref.value ? "Yes" : "No") : pref.value}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 