"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";

// Mock scheduled consultations data - in a real app, you'd fetch this from localStorage or backend
const consultationsData = [
  {
    id: 1,
    title: "Personal Growth Strategy Session",
    mentor: "Dr. Sarah Johnson",
    date: new Date(2025, 4, 15, 10, 0),
    duration: 60,
    type: "Video Call",
    link: "https://zoom.us/j/123456789",
    notes: "Prepare your goals and challenges to discuss during our session.",
  },
  {
    id: 2,
    title: "Mindfulness Coaching",
    mentor: "Michael Chen",
    date: new Date(2025, 4, 18, 15, 30),
    duration: 45,
    type: "Video Call",
    link: "https://zoom.us/j/987654321",
    notes: "We'll review your meditation progress and address any difficulties.",
  },
];

const ScheduledConsultations = () => {
  return (
    <div>
      <SectionHeader
        title="Scheduled Consultations"
        subtitle="Your upcoming mentorship and coaching sessions"
      />
      
      {consultationsData.length > 0 ? (
        <div className="space-y-6">
          {consultationsData.map((consultation) => (
            <Card key={consultation.id}>
              <CardHeader>
                <CardTitle>{consultation.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Mentor</span>
                    <span className="font-medium">{consultation.mentor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{format(consultation.date, "EEEE, MMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {format(consultation.date, "h:mm a")} ({consultation.duration} min)
                    </span>
                  </div>
                </div>
                
                {consultation.notes && (
                  <div className="bg-muted p-3 rounded-md">
                    <span className="block text-sm font-medium mb-1">Session Notes:</span>
                    <p className="text-sm text-muted-foreground">{consultation.notes}</p>
                  </div>
                )}
                
                <div className="flex space-x-4 pt-2">
                  <Button asChild className="flex-1">
                    <a href={consultation.link} target="_blank" rel="noopener noreferrer">
                      Join {consultation.type}
                    </a>
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Reschedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg">
          <h3 className="text-lg font-medium mb-2">No Scheduled Consultations</h3>
          <p className="text-muted-foreground mb-6">
            Book a mentorship or coaching session to accelerate your growth.
          </p>
          <Button asChild>
            <Link href="/schedule">Book a Session</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ScheduledConsultations;
