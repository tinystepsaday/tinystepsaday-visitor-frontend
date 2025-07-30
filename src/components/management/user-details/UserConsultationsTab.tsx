"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, CheckCircle, CalendarDays, Users, Star } from "lucide-react";
import { Consultation, Mentorship } from "./types";


export function UserConsultationsTab() {
  // Dummy data for missing fields (to be replaced with real API calls later)
  const consultations: Consultation[] = [
    { id: "1", consultantName: "Dr. Sarah Johnson", type: "career", status: "completed", scheduledAt: new Date(), duration: 60, amount: 150, feedback: { rating: 5 } },
  ];

  const mentorships: Mentorship[] = [
    { id: "1", programName: "Career Transition Program", mentorName: "John Smith", status: "active", sessionsCompleted: 3, totalSessions: 10, amount: 500, startDate: new Date(), feedback: { rating: 4 } },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Consultations</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{consultations.length}</div>
            <p className="text-xs text-muted-foreground">Sessions booked</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {consultations.filter(c => c.status === "completed").length}
            </div>
            <p className="text-xs text-muted-foreground">Sessions completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {consultations.filter(c => c.status === "scheduled").length}
            </div>
            <p className="text-xs text-muted-foreground">Upcoming sessions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mentorships</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mentorships.length}</div>
            <p className="text-xs text-muted-foreground">Programs applied</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Consultation Sessions</CardTitle>
            <CardDescription>All booked consultation sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consultations.map((consultation) => (
                <div key={consultation.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{consultation.consultantName}</h4>
                      <p className="text-sm text-muted-foreground capitalize">{consultation.type} Consultation</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      {consultation.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Date & Time</span>
                      <span>{consultation.scheduledAt.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Duration</span>
                      <span>{consultation.duration} min</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Amount</span>
                      <span>${consultation.amount}</span>
                    </div>
                    {consultation.feedback && (
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{consultation.feedback.rating}/5</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mentorship Programs</CardTitle>
            <CardDescription>Applied and active mentorship programs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mentorships.map((mentorship) => (
                <div key={mentorship.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{mentorship.programName}</h4>
                      <p className="text-sm text-muted-foreground">with {mentorship.mentorName}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {mentorship.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{mentorship.sessionsCompleted}/{mentorship.totalSessions}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Amount</span>
                      <span>${mentorship.amount}</span>
                    </div>
                    {mentorship.startDate && (
                      <div className="flex justify-between text-sm">
                        <span>Start Date</span>
                        <span>{mentorship.startDate.toLocaleDateString()}</span>
                      </div>
                    )}
                    {mentorship.feedback && (
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{mentorship.feedback.rating}/5</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 