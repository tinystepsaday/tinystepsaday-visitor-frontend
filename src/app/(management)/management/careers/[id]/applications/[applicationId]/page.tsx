"use client";

import React, { use, useState } from 'react';
import { ArrowLeft, Mail, Phone, Download, Star, Calendar, MapPin, GraduationCap, Briefcase, ExternalLink, Edit, Save, X, CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { getCareerById, getApplicationById, JobApplication } from '@/data/careers';
import Link from 'next/link';
import { toast } from 'sonner';

const statusColors = {
  new: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  reviewing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  shortlisted: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  interviewing: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  offered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  withdrawn: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
};

const statusIcons = {
  new: Clock,
  reviewing: AlertCircle,
  shortlisted: Star,
  interviewing: Calendar,
  offered: CheckCircle,
  rejected: XCircle,
  withdrawn: XCircle
};

export default function ApplicationDetailPage({ params }: { params: Promise<{ id: string; applicationId: string }> }) {
  const { id, applicationId } = use(params);
  const [application, setApplication] = useState<JobApplication | undefined>(getApplicationById(applicationId));
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState(application?.notes || '');
  const [rating, setRating] = useState(application?.rating || 0);
  const [status, setStatus] = useState(application?.status || 'new');
  const [isUpdating, setIsUpdating] = useState(false);

  const career = getCareerById(id);

  const handleStatusChange = async (newStatus: JobApplication['status']) => {
    setIsUpdating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setStatus(newStatus);
      if (application) {
        setApplication({
          ...application,
          status: newStatus,
          lastUpdated: new Date().toISOString()
        });
      }
      
      toast.success(`Application status updated to ${newStatus}`);
    } catch {
      toast.error('Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveNotes = async () => {
    setIsUpdating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (application) {
        setApplication({
          ...application,
          notes,
          lastUpdated: new Date().toISOString()
        });
      }
      
      setIsEditingNotes(false);
      toast.success('Notes saved successfully');
    } catch {
      toast.error('Failed to save notes');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRatingChange = async (newRating: number) => {
    setIsUpdating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (application) {
        setRating(newRating);
        setApplication({
          ...application,
          rating: newRating,
          lastUpdated: new Date().toISOString()
        });
      }
      
      toast.success(`Rating updated to ${newRating} stars`);
    } catch {
      toast.error('Failed to update rating');
    } finally {
      setIsUpdating(false);
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const StatusIcon = statusIcons[application?.status || 'new'];

  if (!career || !application) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Application not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center flex-col gap-4 w-full">
          <div className="flex flex-row items-start justify-between w-full gap-2">
            <Link href={`/management/careers/${id}/applications`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Applications
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Application Details</h1>
            <p className="text-muted-foreground">
              {career.title} • {application.firstName} {application.lastName}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Applicant Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg">
                      {getInitials(application.firstName, application.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">
                      {application.firstName} {application.lastName}
                    </CardTitle>
                    <CardDescription>
                      Applied for {career.title} on {formatDate(application.appliedAt)}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={statusColors[application.status]}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${application.email}`} className="text-primary hover:underline">
                      {application.email}
                    </a>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${application.phone}`} className="text-primary hover:underline">
                      {application.phone}
                    </a>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Location</Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {application.location}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Heard From</Label>
                  <div>{application.heardFrom}</div>
                </div>
              </div>

              {application.linkedin && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">LinkedIn</Label>
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    <a href={application.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {application.linkedin}
                    </a>
                  </div>
                </div>
              )}

              {application.website && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Website/Portfolio</Label>
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    <a href={application.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {application.website}
                    </a>
                  </div>
                </div>
              )}

              <Separator />

              {/* Education & Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Education
                  </Label>
                  <p>{application.education}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Experience
                  </Label>
                  <p>{application.experience}</p>
                </div>
              </div>

              <Separator />

              {/* Why Interested */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Why Interested</Label>
                <p className="text-sm leading-relaxed">{application.whyInterested}</p>
              </div>

              <Separator />

              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Desired Start Date</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {new Date(application.startDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Salary Expectation</Label>
                  <div>{application.salary}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {application.workAuth && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Work Authorization
                  </Badge>
                )}
                {application.sponsorship && (
                  <Badge variant="outline" className="text-orange-600 border-orange-600">
                    Needs Sponsorship
                  </Badge>
                )}
              </div>

              {/* Files */}
              {(application.resumeUrl || application.coverLetterUrl) && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Documents</Label>
                    <div className="flex gap-2">
                      {application.resumeUrl && (
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download Resume
                        </Button>
                      )}
                      {application.coverLetterUrl && (
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download Cover Letter
                        </Button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Notes</CardTitle>
                {!isEditingNotes ? (
                  <Button variant="outline" size="sm" onClick={() => setIsEditingNotes(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setIsEditingNotes(false)}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSaveNotes} disabled={isUpdating}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isEditingNotes ? (
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about this applicant..."
                  rows={6}
                />
              ) : (
                <p className="text-sm leading-relaxed">
                  {application.notes || 'No notes added yet.'}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status & Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Status & Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Current Status</Label>
                <Select
                  value={status}
                  onValueChange={(value) => handleStatusChange(value as JobApplication['status'])}
                  disabled={isUpdating}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="reviewing">Reviewing</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="interviewing">Interviewing</SelectItem>
                    <SelectItem value="offered">Offered</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="withdrawn">Withdrawn</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Rating</Label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      onClick={() => handleRatingChange(star)}
                      disabled={isUpdating}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`h-5 w-5 ${
                          star <= rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </Button>
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    {rating}/5
                  </span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Quick Actions</Label>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Interview
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Applied</span>
                  <span>{formatDate(application.appliedAt)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span>{formatDate(application.lastUpdated)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          {application.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {application.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 