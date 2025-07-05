"use client";

import React, { use, useState, useMemo } from 'react';
import { ArrowLeft, MoreHorizontal, Eye, Download, Mail, Phone, Calendar, MapPin, Briefcase, Star, Clock, CheckCircle, XCircle, AlertCircle, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getCareerById, getApplicationsByCareerId, JobApplication } from '@/data/careers';
import { DataTable } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

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

export default function ApplicationsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [applications, setApplications] = useState<JobApplication[]>(getApplicationsByCareerId(id));
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');

  const career = getCareerById(id);

  const handleStatusChange = (applicationId: string, newStatus: JobApplication['status']) => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId 
        ? { ...app, status: newStatus, lastUpdated: new Date().toISOString() }
        : app
    ));
  };

  // Filter applications based on selected filters
  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      const matchesLocation = locationFilter === 'all' || app.location === locationFilter;
      
      let matchesRating = true;
      if (ratingFilter !== 'all') {
        const rating = app.rating || 0;
        switch (ratingFilter) {
          case 'high':
            matchesRating = rating >= 4;
            break;
          case 'medium':
            matchesRating = rating >= 2 && rating < 4;
            break;
          case 'low':
            matchesRating = rating < 2;
            break;
          case 'unrated':
            matchesRating = !app.rating;
            break;
        }
      }
      
      return matchesStatus && matchesLocation && matchesRating;
    });
  }, [applications, statusFilter, ratingFilter, locationFilter]);

  const getStatusCount = (status: JobApplication['status']) => {
    return applications.filter(app => app.status === status).length;
  };

  const getAverageRating = () => {
    const ratedApps = applications.filter(app => app.rating);
    if (ratedApps.length === 0) return 0;
    return ratedApps.reduce((sum, app) => sum + (app.rating || 0), 0) / ratedApps.length;
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Get unique locations for filter
  const uniqueLocations = useMemo(() => {
    const locations = [...new Set(applications.map(app => app.location))];
    return locations.sort();
  }, [applications]);

  // Define columns for the data table
  const columns: ColumnDef<JobApplication>[] = [
    {
      accessorKey: "firstName",
      header: "Applicant",
      cell: ({ row }) => {
        const application = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">
                {getInitials(application.firstName, application.lastName)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="font-medium">
                {application.firstName} {application.lastName}
              </div>
              <div className="text-sm text-muted-foreground">{application.email}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3 text-muted-foreground" />
          {row.getValue("location")}
        </div>
      ),
    },
    {
      accessorKey: "experience",
      header: "Experience",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Briefcase className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm max-w-[200px] truncate">{row.getValue("experience")}</span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const StatusIcon = statusIcons[status as keyof typeof statusIcons];
        return (
          <Badge className={statusColors[status as keyof typeof statusColors]}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => {
        const rating = row.getValue("rating") as number;
        if (!rating) return <span className="text-muted-foreground">-</span>;
        return (
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}/5</span>
          </div>
        );
      },
    },
    {
      accessorKey: "appliedAt",
      header: "Applied",
      cell: ({ row }) => {
        const date = new Date(row.getValue("appliedAt"));
        return (
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm">{date.toLocaleDateString()}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "salary",
      header: "Salary",
      cell: ({ row }) => (
        <span className="text-sm font-medium">{row.getValue("salary")}</span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const application = row.original;
        
        return (
          <div className="flex items-center gap-2">
            <Link href={`/management/careers/${id}/applications/${application.id}`}>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Phone className="h-4 w-4 mr-2" />
                  Call Applicant
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem 
                  onClick={() => handleStatusChange(application.id, 'shortlisted')}
                  disabled={application.status === 'shortlisted'}
                >
                  Shortlist
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleStatusChange(application.id, 'interviewing')}
                  disabled={application.status === 'interviewing'}
                >
                  Schedule Interview
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleStatusChange(application.id, 'offered')}
                  disabled={application.status === 'offered'}
                >
                  Make Offer
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleStatusChange(application.id, 'rejected')}
                  disabled={application.status === 'rejected'}
                >
                  Reject
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  if (!career) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Career position not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
        <div className="flex items-center flex-col gap-4 w-full">
          <div className="flex flex-row items-start justify-between w-full gap-2">
            <Link href="/management/careers">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Careers
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Bulk Email
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
            <p className="text-muted-foreground">
              {career.title} • {applications.length} applications
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
            <p className="text-xs text-muted-foreground">
              {getStatusCount('new')} new, {getStatusCount('reviewing')} reviewing
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shortlisted</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStatusCount('shortlisted')}</div>
            <p className="text-xs text-muted-foreground">
              {getStatusCount('interviewing')} in interviews
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getAverageRating().toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              Out of 5 stars
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offers Made</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStatusCount('offered')}</div>
            <p className="text-xs text-muted-foreground">
              {getStatusCount('rejected')} rejected
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="reviewing">Reviewing</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                <SelectItem value="interviewing">Interviewing</SelectItem>
                <SelectItem value="offered">Offered</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="withdrawn">Withdrawn</SelectItem>
              </SelectContent>
            </Select>

            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="high">High (4-5 stars)</SelectItem>
                <SelectItem value="medium">Medium (2-3 stars)</SelectItem>
                <SelectItem value="low">Low (0-1 stars)</SelectItem>
                <SelectItem value="unrated">Unrated</SelectItem>
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {uniqueLocations.map(location => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Showing {filteredApplications.length} of {applications.length} applications</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredApplications}
            searchKey="firstName"
            searchPlaceholder="Search applicants..."
          />
        </CardContent>
      </Card>
    </div>
  );
} 