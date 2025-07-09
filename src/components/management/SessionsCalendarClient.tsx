"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  User,
  Mail,
  Video,
  CheckCircle,
  XCircle,
  Play
} from "lucide-react";
import { getAllScheduledSessions, getSessionsByDate, type ScheduledSession } from "@/data/sessions";
import { format } from "date-fns";
import { toast } from "sonner";

const statusColors = {
  scheduled: "bg-blue-100 text-blue-800",
  "in-progress": "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  "no-show": "bg-gray-100 text-gray-800"
};

const typeColors = {
  individual: "bg-purple-100 text-purple-800",
  couple: "bg-pink-100 text-pink-800",
  group: "bg-orange-100 text-orange-800",
  initial: "bg-blue-100 text-blue-800"
};

export function SessionsCalendarClient() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [sessions, setSessions] = useState<ScheduledSession[]>(getAllScheduledSessions());

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const getSessionsForDate = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return getSessionsByDate(dateString);
  };

  const getCalendarSessions = () => {
    const calendarSessions: { [key: string]: ScheduledSession[] } = {};

    sessions.forEach(session => {
      const dateKey = session.date;
      if (!calendarSessions[dateKey]) {
        calendarSessions[dateKey] = [];
      }
      calendarSessions[dateKey].push(session);
    });

    return calendarSessions;
  };

  const calendarSessions = getCalendarSessions();
  const selectedDateSessions = selectedDate ? getSessionsForDate(selectedDate) : [];

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleStartSession = (sessionId: string) => {
    // In a real app, this would start the video session
    toast.success("Session started!");
    setSessions(sessions.map(session =>
      session.id === sessionId
        ? { ...session, status: "in-progress", startedAt: new Date().toISOString() }
        : session
    ));
  };

  const handleCompleteSession = (sessionId: string) => {
    toast.success("Session completed!");
    setSessions(sessions.map(session =>
      session.id === sessionId
        ? { ...session, status: "completed", completedAt: new Date().toISOString() }
        : session
    ));
  };

  const handleCancelSession = (sessionId: string) => {
    toast.success("Session cancelled!");
    setSessions(sessions.map(session =>
      session.id === sessionId
        ? { ...session, status: "cancelled", cancelledAt: new Date().toISOString() }
        : session
    ));
  };

  const getSessionActions = (session: ScheduledSession) => {
    switch (session.status) {
      case "scheduled":
        return (
          <div className="flex gap-2">
            <Button size="sm" onClick={() => handleStartSession(session.id)}>
              <Play className="mr-2 h-4 w-4" />
              Start
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCancelSession(session.id)}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        );
      case "in-progress":
        return (
          <Button size="sm" onClick={() => handleCompleteSession(session.id)}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Complete
          </Button>
        );
      default:
        return null;
    }
  };

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
            <Button variant="outline" onClick={() => router.push("/management/sessions")}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              List View
            </Button>
          </div>
          <div className="flex flex-col items-start justify-start w-full">
            <h1 className="text-2xl font-bold">Sessions Calendar</h1>
            <p className="text-muted-foreground">
              View and manage scheduled sessions
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>
                Click on a date to view sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="rounded-md border"
                modifiers={{
                  hasSessions: (date) => {
                    const dateKey = format(date, "yyyy-MM-dd");
                    return calendarSessions[dateKey] && calendarSessions[dateKey].length > 0;
                  }
                }}
                modifiersStyles={{
                  hasSessions: { backgroundColor: "#dbeafe", color: "#1e40af" }
                }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Daily Sessions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate ? (
                  <>
                    Sessions for {format(selectedDate, "EEEE, MMMM d, yyyy")}
                    {selectedDateSessions.length > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {selectedDateSessions.length} session{selectedDateSessions.length !== 1 ? 's' : ''}
                      </Badge>
                    )}
                  </>
                ) : (
                  "Select a date to view sessions"
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateSessions.length === 0 ? (
                <div className="text-center py-8">
                  <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No sessions scheduled</h3>
                  <p className="text-muted-foreground">
                    {selectedDate ? "No sessions are scheduled for this date" : "Select a date to view scheduled sessions"}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedDateSessions
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((session) => (
                      <Card key={session.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                            <div className="flex items-start gap-4 flex-1">
                              <Avatar className="h-12 w-12">
                                <AvatarFallback>{getInitials(session.clientName)}</AvatarFallback>
                              </Avatar>

                              <div className="flex-1 space-y-2">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                  <h3 className="font-semibold">{session.clientName}</h3>
                                  <div className="flex gap-2">
                                    <Badge className={statusColors[session.status]}>
                                      {session.status}
                                    </Badge>
                                    <Badge className={typeColors[session.type]}>
                                      {session.type}
                                    </Badge>
                                  </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {session.time} ({session.duration} min)
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    {session.assignedToName}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Mail className="h-3 w-3" />
                                    {session.clientEmail}
                                  </div>
                                </div>

                                {session.notes && (
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {session.notes}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              {session.meetingLink && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => window.open(session.meetingLink, '_blank')}
                                >
                                  <Video className="mr-2 h-4 w-4" />
                                  Join Meeting
                                </Button>
                              )}
                              {getSessionActions(session)}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 