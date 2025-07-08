"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DetailPageLoader } from "@/components/ui/loaders";
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Clock,
  Edit,
  Trash2,
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  Tag,
  FileText,
  Package
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import type { Event, EventApplicant } from "@/data/events";

interface EventDetailsClientProps {
  eventId: string;
  initialEvent: Event;
  initialApplicants: EventApplicant[];
}

export default function EventDetailsClient({ eventId, initialEvent, initialApplicants }: EventDetailsClientProps) {
  // Use TanStack Query for client-side data management
  const { data: event = initialEvent, isLoading: eventLoading } = useQuery({
    queryKey: ["event", eventId],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return initialEvent;
    },
    initialData: initialEvent,
  });

  const { data: applicants = initialApplicants, isLoading: applicantsLoading } = useQuery({
    queryKey: ["eventApplicants", eventId],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 200));
      return initialApplicants;
    },
    initialData: initialApplicants,
  });

  if (eventLoading) {
    return <DetailPageLoader title="Loading Event Details..." subtitle="Please wait while we load the event information" />;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getApplicantStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-gray-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const occupancyRate = ((event.maxSeats - event.availableSeats) / event.maxSeats) * 100;
  const pendingApplicants = applicants.filter(a => a.status === 'pending').length;
  const approvedApplicants = applicants.filter(a => a.status === 'approved').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between w-full">
        <div className="flex items-start w-full flex-col gap-4">
          <div className="flex items-center gap-4 w-full justify-between">
            <Link href="/management/events">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
              </Button>
            </Link>
            <div className="flex items-center gap-2 w-full justify-end">
              <Button asChild variant="outline">
                <Link href={`/management/events/${event.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Event
                </Link>
              </Button>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{event.title}</h1>
            <p className="text-muted-foreground">
              {event.category} • {event.location}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Event Overview</CardTitle>
                <Badge className={getStatusColor(event.status)}>
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Date
                  </div>
                  <p className="font-medium">{event.date}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Time
                  </div>
                  <p className="font-medium">{event.time}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    Location
                  </div>
                  <p className="font-medium">{event.location}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    Price
                  </div>
                  <p className="font-medium">${event.price}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-muted-foreground">{event.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Agenda */}
          <Card>
            <CardHeader>
              <CardTitle>Agenda</CardTitle>
              <CardDescription>Event schedule and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {event.agenda.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <p className="text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Requirements & Materials */}
          <div className="grid gap-6 md:grid-cols-2">
            {event.requirements && event.requirements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {event.requirements.map((requirement, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {event.materials && event.materials.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Materials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {event.materials.map((material, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm">{material}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Event Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Event Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Seats</span>
                <span className="text-sm">{event.maxSeats}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Available Seats</span>
                <span className="text-sm">{event.availableSeats}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Occupancy Rate</span>
                <span className="text-sm">{occupancyRate.toFixed(0)}%</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Applicants</span>
                <span className="text-sm">{applicants.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Pending Approval</span>
                <span className="text-sm">{pendingApplicants}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Approved</span>
                <span className="text-sm">{approvedApplicants}</span>
              </div>
            </CardContent>
          </Card>

          {/* Facilitator Info */}
          <Card>
            <CardHeader>
              <CardTitle>Facilitator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">{event.facilitator}</h4>
                  <p className="text-sm text-muted-foreground">{event.facilitatorBio}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild className="w-full" variant="outline">
                <Link href={`/management/events/${event.id}/applicants`}>
                  <Users className="mr-2 h-4 w-4" />
                  View Applicants ({applicants.length})
                </Link>
              </Button>
              <Button asChild className="w-full" variant="outline">
                <Link href={`/management/events/${event.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Event
                </Link>
              </Button>
              {event.status === 'draft' && (
                <Button className="w-full">
                  <Star className="mr-2 h-4 w-4" />
                  Publish Event
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Applicants */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Applicants</CardTitle>
          <CardDescription>Latest applications for this event</CardDescription>
        </CardHeader>
        <CardContent>
          {applicantsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading applicants...</p>
            </div>
          ) : applicants.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No applicants yet</h3>
              <p className="text-muted-foreground">When people apply to your event, they&apos;ll appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {applicants.slice(0, 5).map((applicant) => (
                <div key={applicant.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getApplicantStatusIcon(applicant.status)}
                    <div>
                      <div className="font-medium">{applicant.name}</div>
                      <div className="text-sm text-muted-foreground">{applicant.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      applicant.status === 'approved' ? 'default' :
                        applicant.status === 'rejected' ? 'destructive' :
                          applicant.status === 'pending' ? 'secondary' : 'outline'
                    }>
                      {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(applicant.appliedAt), "MMM d, yyyy")}
                    </span>
                  </div>
                </div>
              ))}
              {applicants.length > 5 && (
                <div className="text-center pt-4">
                  <Button asChild variant="outline">
                    <Link href={`/management/events/${event.id}/applicants`}>
                      View All Applicants ({applicants.length})
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 