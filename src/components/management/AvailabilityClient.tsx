"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Plus,
  Trash2,
  CheckCircle,
  XCircle
} from "lucide-react";
import { getAllTeamMemberAvailability, type TeamMemberAvailability } from "@/data/sessions";
import { getAllTeamMembers } from "@/data/team";
import { toast } from "sonner";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export function AvailabilityClient() {
  const router = useRouter();
  const [selectedMember, setSelectedMember] = useState<string>("");
  const [availability, setAvailability] = useState<TeamMemberAvailability[]>(getAllTeamMemberAvailability());
  const [newSchedule, setNewSchedule] = useState({
    dayOfWeek: 1,
    startTime: "09:00",
    endTime: "17:00",
    isAvailable: true,
    maxSessionsPerDay: 6
  });

  const teamMembers = getAllTeamMembers();

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const getMemberAvailability = (memberId: string) => {
    return availability.filter(avail => avail.memberId === memberId);
  };

  const handleAddSchedule = () => {
    if (!selectedMember) {
      toast.error("Please select a team member");
      return;
    }

    const member = teamMembers.find(m => m.id === selectedMember);
    if (!member) {
      toast.error("Selected team member not found");
      return;
    }

    // Check if schedule already exists for this day
    const existingSchedule = availability.find(
      avail => avail.memberId === selectedMember && avail.dayOfWeek === newSchedule.dayOfWeek
    );

    if (existingSchedule) {
      toast.error("Schedule already exists for this day");
      return;
    }

    const newAvailability: TeamMemberAvailability = {
      id: `avail_${Date.now()}`,
      memberId: selectedMember,
      memberName: member.name,
      dayOfWeek: newSchedule.dayOfWeek,
      startTime: newSchedule.startTime,
      endTime: newSchedule.endTime,
      isAvailable: newSchedule.isAvailable,
      maxSessionsPerDay: newSchedule.maxSessionsPerDay,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setAvailability([...availability, newAvailability]);
    toast.success("Schedule added successfully!");
  };

  const handleUpdateSchedule = (scheduleId: string, updates: Partial<TeamMemberAvailability>) => {
    setAvailability(availability.map(schedule =>
      schedule.id === scheduleId
        ? { ...schedule, ...updates, updatedAt: new Date().toISOString() }
        : schedule
    ));
    toast.success("Schedule updated successfully!");
  };

  const handleDeleteSchedule = (scheduleId: string) => {
    setAvailability(availability.filter(schedule => schedule.id !== scheduleId));
    toast.success("Schedule deleted successfully!");
  };

  const handleToggleAvailability = (scheduleId: string, isAvailable: boolean) => {
    handleUpdateSchedule(scheduleId, { isAvailable });
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 6; hour <= 22; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00`;
      slots.push(time);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center flex-col w-full gap-4">
          <div className="flex items-center gap-2 w-full justify-between">
            <Button variant="outline" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
          <div className="flex flex-col items-start justify-start w-full">
            <h1 className="text-2xl font-bold">Team Availability</h1>
            <p className="text-muted-foreground">
              Manage team member schedules and availability
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add New Schedule */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Add Schedule</CardTitle>
              <CardDescription>
                Set availability for team members
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="member">Team Member</Label>
                <Select value={selectedMember} onValueChange={setSelectedMember}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                          </Avatar>
                          <span>{member.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="day">Day of Week</Label>
                <Select
                  value={newSchedule.dayOfWeek.toString()}
                  onValueChange={(value) => setNewSchedule({ ...newSchedule, dayOfWeek: parseInt(value) })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {dayNames.map((day, index) => (
                      <SelectItem key={index} value={index.toString()}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Select
                    value={newSchedule.startTime}
                    onValueChange={(value) => setNewSchedule({ ...newSchedule, startTime: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Select
                    value={newSchedule.endTime}
                    onValueChange={(value) => setNewSchedule({ ...newSchedule, endTime: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="maxSessions">Max Sessions per Day</Label>
                <Input
                  id="maxSessions"
                  type="number"
                  min="1"
                  max="12"
                  value={newSchedule.maxSessionsPerDay}
                  onChange={(e) => setNewSchedule({ ...newSchedule, maxSessionsPerDay: parseInt(e.target.value) })}
                  className="mt-1"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isAvailable"
                  checked={newSchedule.isAvailable}
                  onCheckedChange={(checked) => setNewSchedule({ ...newSchedule, isAvailable: checked })}
                />
                <Label htmlFor="isAvailable">Available on this day</Label>
              </div>

              <Button onClick={handleAddSchedule} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Schedule
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Team Member Schedules */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Team Schedules</CardTitle>
              <CardDescription>
                View and manage all team member schedules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {teamMembers.map((member) => {
                  const memberSchedules = getMemberAvailability(member.id);

                  return (
                    <div key={member.id} className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>

                      {memberSchedules.length === 0 ? (
                        <div className="text-center py-4 bg-muted/50 rounded-md">
                          <Clock className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">No schedules set</p>
                        </div>
                      ) : (
                        <div className="grid gap-3">
                          {memberSchedules
                            .sort((a, b) => a.dayOfWeek - b.dayOfWeek)
                            .map((schedule) => (
                              <Card key={schedule.id} className="hover:shadow-md transition-shadow">
                                <CardContent>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                      <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium">{dayNames[schedule.dayOfWeek]}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                          {schedule.startTime} - {schedule.endTime}
                                        </span>
                                      </div>
                                      <Badge variant="secondary">
                                        Max {schedule.maxSessionsPerDay} sessions
                                      </Badge>
                                      <div className="flex items-center gap-2">
                                        {schedule.isAvailable ? (
                                          <CheckCircle className="h-4 w-4 text-green-600" />
                                        ) : (
                                          <XCircle className="h-4 w-4 text-red-600" />
                                        )}
                                        <span className="text-sm">
                                          {schedule.isAvailable ? "Available" : "Unavailable"}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                      <Switch
                                        checked={schedule.isAvailable}
                                        onCheckedChange={(checked) => handleToggleAvailability(schedule.id, checked)}
                                      />
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDeleteSchedule(schedule.id)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                        </div>
                      )}

                      <Separator />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 