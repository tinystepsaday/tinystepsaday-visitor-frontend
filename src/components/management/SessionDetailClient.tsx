"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  RefreshCw,
  Send
} from "lucide-react";
import { 
  type SessionRequest, 
  getSessionTypeLabel, 
  getSessionPrice,
  confirmSessionRequest,
  rescheduleSession,
  cancelSession,
  checkSessionConflict,
  getAvailableTimeSlots
} from "@/data/sessions";
import { getMessageTemplates } from "@/data/messages";
import { getAllTeamMembers } from "@/data/team";  
import { format, parseISO } from "date-fns";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  rescheduled: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-gray-100 text-gray-800"
};

const typeColors = {
  individual: "bg-purple-100 text-purple-800",
  couple: "bg-pink-100 text-pink-800",
  group: "bg-orange-100 text-orange-800",
  initial: "bg-blue-100 text-blue-800"
};

interface SessionDetailClientProps {
  session: SessionRequest;
}

export function SessionDetailClient({ session }: SessionDetailClientProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string>("");
  const [newDate, setNewDate] = useState<string>("");
  const [newTime, setNewTime] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  const teamMembers = getAllTeamMembers();
  const messageTemplates = getMessageTemplates();

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const handleConfirmSession = async () => {
    if (!selectedMember) {
      toast.error("Please select a team member");
      return;
    }

    setIsLoading(true);
    try {
      const member = teamMembers.find(m => m.id === selectedMember);
      if (!member) {
        toast.error("Selected team member not found");
        return;
      }

      // Check for conflicts
      const conflict = checkSessionConflict(selectedMember, session.date, session.time, getSessionDuration(session.type));
      if (conflict) {
        toast.error(`Conflict detected: ${conflict.memberName} already has a session at ${conflict.conflictingSession.time}`);
        return;
      }

      await confirmSessionRequest(session.id, selectedMember, member.name);
      toast.success("Session confirmed successfully!");
      router.push("/management/sessions");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to confirm session");
    } finally {
      setIsLoading(false);
      setShowConfirmDialog(false);
    }
  };

  const handleRescheduleSession = async () => {
    if (!newDate || !newTime) {
      toast.error("Please select a new date and time");
      return;
    }

    setIsLoading(true);
    try {
      await rescheduleSession(session.id, newDate, newTime);
      toast.success("Session rescheduled successfully!");
      router.push("/management/sessions");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to reschedule session");
    } finally {
      setIsLoading(false);
      setShowRescheduleDialog(false);
    }
  };

  const handleCancelSession = async () => {
    setIsLoading(true);
    try {
      await cancelSession(session.id, "Cancelled by admin");
      toast.success("Session cancelled successfully!");
      router.push("/management/sessions");
    } catch {
      toast.error("Failed to cancel session");
    } finally {
      setIsLoading(false);
      setShowCancelDialog(false);
    }
  };

  const handleMemberChange = (memberId: string) => {
    setSelectedMember(memberId);
    if (memberId && newDate) {
      const slots = getAvailableTimeSlots(memberId, newDate);
      setAvailableSlots(slots);
    }
  };

  const handleDateChange = (date: string) => {
    setNewDate(date);
    if (selectedMember && date) {
      const slots = getAvailableTimeSlots(selectedMember, date);
      setAvailableSlots(slots);
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = messageTemplates.find(t => t.id === templateId);
    if (template) {
      setResponseMessage(template.content.replace('{{name}}', session.name));
      setSelectedTemplate(templateId);
    }
  };

  const getSessionDuration = (type: SessionRequest['type']): number => {
    switch (type) {
      case "individual": return 60;
      case "couple": return 90;
      case "group": return 120;
      case "initial": return 45;
      default: return 60;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center flex-col w-full gap-4">
          <div className="flex items-center gap-2 w-full justify-start">
            <Button variant="outline" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
          <div className="flex flex-col items-start justify-start w-full">
            <h1 className="text-2xl font-bold">Session Request Details</h1>
            <p className="text-muted-foreground">
              Manage session request from {session.name}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Session Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{getInitials(session.name)}</AvatarFallback>
                    </Avatar>
                    {session.name}
                  </CardTitle>
                  <CardDescription>
                    Session request submitted {format(parseISO(session.createdAt), "PPP 'at' p")}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge className={statusColors[session.status]}>
                    {session.status}
                  </Badge>
                  <Badge className={typeColors[session.type]}>
                    {session.type}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{session.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{session.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{format(parseISO(session.date), "PPP")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{session.time}</span>
                </div>
              </div>

              {session.notes && (
                <div>
                  <h4 className="font-medium mb-2">Client Notes</h4>
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                    {session.notes}
                  </p>
                </div>
              )}

              {session.assignedToName && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Assigned to: <strong>{session.assignedToName}</strong>
                  </span>
                </div>
              )}

              {session.rescheduledTo && (
                <div className="bg-blue-50 p-3 rounded-md">
                  <h4 className="font-medium text-blue-800 mb-1">Rescheduled To</h4>
                  <p className="text-sm text-blue-700">
                    {format(parseISO(session.rescheduledTo.date), "PPP")} at {session.rescheduledTo.time}
                  </p>
                </div>
              )}

              <Separator />

              <div className="flex flex-col sm:flex-row gap-2">
                {session.status === "pending" && (
                  <>
                    <Button 
                      onClick={() => setShowConfirmDialog(true)}
                      className="flex-1"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Confirm Session
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setShowRescheduleDialog(true)}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Reschedule
                    </Button>
                    <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                          <XCircle className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Cancel Session Request</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to cancel this session request? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>No, keep it</AlertDialogCancel>
                          <AlertDialogAction onClick={handleCancelSession} className="bg-destructive text-destructive-foreground">
                            Yes, cancel it
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}

                {session.status === "confirmed" && (
                  <>
                    <Button 
                      variant="outline"
                      onClick={() => setShowRescheduleDialog(true)}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Reschedule
                    </Button>
                    <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                          <XCircle className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Cancel Session</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to cancel this confirmed session? The client will be notified.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>No, keep it</AlertDialogCancel>
                          <AlertDialogAction onClick={handleCancelSession} className="bg-destructive text-destructive-foreground">
                            Yes, cancel it
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Response Message */}
          <Card>
            <CardHeader>
              <CardTitle>Send Response</CardTitle>
              <CardDescription>
                Send a message to the client about their session request
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Quick Templates</label>
                <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a template (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {messageTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  value={responseMessage}
                  onChange={(e) => setResponseMessage(e.target.value)}
                  placeholder="Type your response message..."
                  rows={6}
                  className="mt-1"
                />
              </div>

              <Button className="w-full" disabled={!responseMessage.trim()}>
                <Send className="mr-2 h-4 w-4" />
                Send Response
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Session Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Session Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Session Type</h4>
                <p className="text-sm text-muted-foreground">{getSessionTypeLabel(session.type)}</p>
                <p className="text-sm font-medium">${getSessionPrice(session.type)}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Duration</h4>
                <p className="text-sm text-muted-foreground">{getSessionDuration(session.type)} minutes</p>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Request Timeline</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Requested:</span>
                    <span>{format(parseISO(session.createdAt), "MMM dd, yyyy")}</span>
                  </div>
                  {session.confirmedAt && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Confirmed:</span>
                      <span>{format(parseISO(session.confirmedAt), "MMM dd, yyyy")}</span>
                    </div>
                  )}
                  {session.cancelledAt && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cancelled:</span>
                      <span>{format(parseISO(session.cancelledAt), "MMM dd, yyyy")}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirm Session Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Session</AlertDialogTitle>
            <AlertDialogDescription>
              Assign this session to a team member and confirm the booking.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium">Select Team Member</label>
              <Select value={selectedMember} onValueChange={handleMemberChange}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose a team member" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name} - {member.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmSession} disabled={isLoading || !selectedMember}>
              {isLoading ? "Confirming..." : "Confirm Session"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reschedule Session Dialog */}
      <AlertDialog open={showRescheduleDialog} onOpenChange={setShowRescheduleDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Reschedule Session</AlertDialogTitle>
            <AlertDialogDescription>
              Select a new date and time for this session.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium">New Date</label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-input rounded-md"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="text-sm font-medium">New Time</label>
              <Select value={newTime} onValueChange={setNewTime}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {availableSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRescheduleSession} disabled={isLoading || !newDate || !newTime}>
              {isLoading ? "Rescheduling..." : "Reschedule Session"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 