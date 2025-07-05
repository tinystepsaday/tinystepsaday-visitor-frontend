"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable } from "@/components/data-table";
import { ListPageLoader } from "@/components/ui/loaders";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { 
  Users, 
  Search, 
  Filter, 
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Mail,
  Phone,
  Calendar,
  MoreHorizontal,
  Download
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import type { ColumnDef } from "@tanstack/react-table";
import type { Event, EventApplicant } from "@/data/events";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface EventApplicantsClientProps {
  eventId: string;
  initialEvent: Event;
  initialApplicants: EventApplicant[];
}

const columns: ColumnDef<EventApplicant>[] = [
  {
    accessorKey: "name",
    header: "Applicant",
    cell: ({ row }) => {
      const applicant = row.original;
      return (
        <div>
          <div className="font-medium">{applicant.name}</div>
          <div className="text-sm text-muted-foreground">{applicant.email}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Contact",
    cell: ({ row }) => {
      const phone = row.getValue("phone") as string;
      return phone ? (
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{phone}</span>
        </div>
      ) : (
        <span className="text-sm text-muted-foreground">No phone</span>
      );
    },
  },
  {
    accessorKey: "appliedAt",
    header: "Applied",
    cell: ({ row }) => {
      const appliedAt = row.getValue("appliedAt") as string;
      return (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{format(new Date(appliedAt), "MMM d, yyyy")}</span>
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
        pending: { label: "Pending", variant: "secondary" as const, icon: AlertCircle },
        approved: { label: "Approved", variant: "default" as const, icon: CheckCircle },
        rejected: { label: "Rejected", variant: "destructive" as const, icon: XCircle },
        cancelled: { label: "Cancelled", variant: "outline" as const, icon: XCircle },
      };
      const config = statusConfig[status as keyof typeof statusConfig];

      return (
        <Badge variant={config.variant} className="flex items-center gap-1">
          <config.icon className="h-3 w-3" />
          {config.label}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
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
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-green-600">
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function EventApplicantsClient({ eventId, initialEvent, initialApplicants }: EventApplicantsClientProps) {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedApplicant, setSelectedApplicant] = useState<EventApplicant | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    queryKey: ["eventApplicants", eventId, searchTerm, statusFilter],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredApplicants = initialApplicants;

      // Apply search filter
      if (searchTerm) {
        filteredApplicants = filteredApplicants.filter(applicant =>
          applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          applicant.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply status filter
      if (statusFilter !== "all") {
        filteredApplicants = filteredApplicants.filter(applicant => applicant.status === statusFilter);
      }

      return filteredApplicants;
    },
    initialData: initialApplicants,
  });

  // Update applicant status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ applicantId, status }: { applicantId: string; status: EventApplicant['status'] }) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log(`Updating applicant ${applicantId} status to ${status}`);
      return { applicantId, status };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["eventApplicants", eventId] });
      toast.success(`Applicant ${data.status} successfully`);
    },
    onError: (error) => {
      toast.error("Failed to update applicant status");
      console.error("Error updating applicant status:", error);
    }
  });

  const handleStatusUpdate = (applicantId: string, status: EventApplicant['status']) => {
    updateStatusMutation.mutate({ applicantId, status });
    setSelectedApplicant(null);
    setIsDialogOpen(false);
  };

  const pendingApplicants = applicants.filter(a => a.status === 'pending').length;
  const approvedApplicants = applicants.filter(a => a.status === 'approved').length;
  const rejectedApplicants = applicants.filter(a => a.status === 'rejected').length;

  if (eventLoading || applicantsLoading) {
    return <ListPageLoader title="Loading Applicants..." subtitle="Please wait while we load the applicant data" />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between w-full flex-col gap-4">
        <div className="flex items-center gap-2 w-full justify-between">
          <Link href={`/management/events/${eventId}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Event
            </Button>
          </Link>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
        <div className="flex items-start w-full flex-col">
            <h1 className="text-3xl font-bold tracking-tight">Event Applicants</h1>
            <p className="text-muted-foreground">
              {event.title} • {applicants.length} total applicants
            </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicants.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingApplicants}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedApplicants}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedApplicants}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
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
                  placeholder="Search applicants..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applicants Table */}
      <Card>
        <CardHeader>
          <CardTitle>Applicants</CardTitle>
          <CardDescription>
            Manage applications for this event
          </CardDescription>
        </CardHeader>
        <CardContent>
          {applicants.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No applicants found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "all" 
                  ? "Try adjusting your search or filter criteria."
                  : "When people apply to your event, they'll appear here."
                }
              </p>
            </div>
          ) : (
            <DataTable 
              columns={columns} 
              data={applicants} 
              searchKey="name"
              searchPlaceholder="Search applicants..."
            />
          )}
        </CardContent>
      </Card>

      {/* Applicant Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Applicant Details</DialogTitle>
            <DialogDescription>
              View and manage applicant information
            </DialogDescription>
          </DialogHeader>
          {selectedApplicant && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Name</Label>
                  <p className="text-sm">{selectedApplicant.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm">{selectedApplicant.email}</p>
                </div>
                {selectedApplicant.phone && (
                  <div>
                    <Label className="text-sm font-medium">Phone</Label>
                    <p className="text-sm">{selectedApplicant.phone}</p>
                  </div>
                )}
                <div>
                  <Label className="text-sm font-medium">Applied</Label>
                  <p className="text-sm">{format(new Date(selectedApplicant.appliedAt), "MMM d, yyyy 'at' h:mm a")}</p>
                </div>
              </div>

              {selectedApplicant.notes && (
                <div>
                  <Label className="text-sm font-medium">Notes</Label>
                  <p className="text-sm">{selectedApplicant.notes}</p>
                </div>
              )}

              {selectedApplicant.dietaryRestrictions && (
                <div>
                  <Label className="text-sm font-medium">Dietary Restrictions</Label>
                  <p className="text-sm">{selectedApplicant.dietaryRestrictions}</p>
                </div>
              )}

              {selectedApplicant.specialRequirements && (
                <div>
                  <Label className="text-sm font-medium">Special Requirements</Label>
                  <p className="text-sm">{selectedApplicant.specialRequirements}</p>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Status</Label>
                <Badge variant={
                  selectedApplicant.status === 'approved' ? 'default' :
                  selectedApplicant.status === 'rejected' ? 'destructive' :
                  selectedApplicant.status === 'pending' ? 'secondary' : 'outline'
                }>
                  {selectedApplicant.status.charAt(0).toUpperCase() + selectedApplicant.status.slice(1)}
                </Badge>
              </div>
            </div>
          )}
          <DialogFooter>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => selectedApplicant && handleStatusUpdate(selectedApplicant.id, 'rejected')}
                disabled={selectedApplicant?.status === 'rejected'}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
              <Button
                onClick={() => selectedApplicant && handleStatusUpdate(selectedApplicant.id, 'approved')}
                disabled={selectedApplicant?.status === 'approved'}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 