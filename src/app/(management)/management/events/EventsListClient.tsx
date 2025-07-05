"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable } from "@/components/data-table";
import { ListPageLoader } from "@/components/ui/loaders";
import { 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  Clock, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Filter,
  Search,
  MoreHorizontal
} from "lucide-react";
import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import type { Event } from "@/data/events";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EventsListClientProps {
  initialEvents: Event[];
  initialStats: {
    totalEvents: number;
    publishedEvents: number;
    draftEvents: number;
    totalApplicants: number;
    pendingApplicants: number;
    approvedApplicants: number;
  };
}

const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "title",
    header: "Event",
    cell: ({ row }) => {
      const event = row.original;
      return (
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <div className="font-medium">{event.title}</div>
            <div className="text-sm text-muted-foreground">{event.category}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date & Time",
    cell: ({ row }) => {
      const event = row.original;
      return (
        <div>
          <div className="font-medium">{event.date}</div>
          <div className="text-sm text-muted-foreground">{event.time}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      const event = row.original;
      return (
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{event.location}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "availableSeats",
    header: "Seats",
    cell: ({ row }) => {
      const event = row.original;
      const occupancyRate = ((event.maxSeats - event.availableSeats) / event.maxSeats) * 100;
      return (
        <div>
          <div className="font-medium">{event.availableSeats}/{event.maxSeats}</div>
          <div className="text-sm text-muted-foreground">{occupancyRate.toFixed(0)}% full</div>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      return (
        <div className="flex items-center space-x-2">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">${price}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusConfig = {
        draft: { label: "Draft", variant: "secondary" as const },
        published: { label: "Published", variant: "default" as const },
        cancelled: { label: "Cancelled", variant: "destructive" as const },
        completed: { label: "Completed", variant: "outline" as const },
      };
      const config = statusConfig[status as keyof typeof statusConfig];

      return <Badge variant={config.variant}>{config.label}</Badge>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const event = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/management/events/${event.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/management/events/${event.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Event
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/management/events/${event.id}/applicants`}>
                <Users className="mr-2 h-4 w-4" />
                View Applicants
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Event
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function EventsListClient({ initialEvents, initialStats }: EventsListClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Use TanStack Query for client-side data management
  const { data: events = initialEvents, isLoading } = useQuery({
    queryKey: ["events", searchTerm, statusFilter, categoryFilter],
    queryFn: async () => {
      // Simulate API call with filtering
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredEvents = initialEvents;

      // Apply search filter
      if (searchTerm) {
        filteredEvents = filteredEvents.filter(event =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.facilitator.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply status filter
      if (statusFilter !== "all") {
        filteredEvents = filteredEvents.filter(event => event.status === statusFilter);
      }

      // Apply category filter
      if (categoryFilter !== "all") {
        filteredEvents = filteredEvents.filter(event => event.category === categoryFilter);
      }

      return filteredEvents;
    },
    initialData: initialEvents,
  });

  const { data: stats = initialStats } = useQuery({
    queryKey: ["eventStats"],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return initialStats;
    },
    initialData: initialStats,
  });

  const categories = Array.from(new Set(initialEvents.map(event => event.category)));

  if (isLoading) {
    return <ListPageLoader title="Loading Events..." subtitle="Please wait while we load the events data" createButtonText="Create Event" createHref="/management/events/create" />;
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Events Management</h2>
          <p className="text-muted-foreground">Manage your events, registrations, and schedules</p>
        </div>
        <Button asChild>
          <Link href="/management/events/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Link>
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEvents}</div>
            <p className="text-xs text-muted-foreground">
              {stats.publishedEvents} published, {stats.draftEvents} drafts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApplicants}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingApplicants} pending approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Applicants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approvedApplicants}</div>
            <p className="text-xs text-muted-foreground">
              Successfully registered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.filter(e => e.status === 'published').length}</div>
            <p className="text-xs text-muted-foreground">
              Active and published
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Events Table */}
      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
          <CardDescription>
            Manage your events and view registration details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={events} 
            searchKey="title"
            searchPlaceholder="Search events..."
          />
        </CardContent>
      </Card>
    </div>
  );
} 