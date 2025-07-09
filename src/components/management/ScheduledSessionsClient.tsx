"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Search,
  Calendar,
  Clock,
  User,
  Video,
  CheckCircle,
  XCircle,
  Play,
  Table
} from "lucide-react";
import { getAllScheduledSessions, type ScheduledSession } from "@/data/sessions";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table as TableUI,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

export function ScheduledSessionsClient() {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [sessions, setSessions] = useState<ScheduledSession[]>(getAllScheduledSessions());

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const handleStartSession = (sessionId: string) => {
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
          <div className="flex gap-1">
            <Button size="sm" onClick={() => handleStartSession(session.id)}>
              <Play className="mr-1 h-3 w-3" />
              Start
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleCancelSession(session.id)}
            >
              <XCircle className="mr-1 h-3 w-3" />
              Cancel
            </Button>
          </div>
        );
      case "in-progress":
        return (
          <Button size="sm" onClick={() => handleCompleteSession(session.id)}>
            <CheckCircle className="mr-1 h-3 w-3" />
            Complete
          </Button>
        );
      default:
        return null;
    }
  };

  const columns: ColumnDef<ScheduledSession>[] = [
    {
      accessorKey: "clientName",
      header: "Client",
      cell: ({ row }) => {
        const session = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{getInitials(session.clientName)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{session.clientName}</div>
              <div className="text-sm text-muted-foreground">{session.clientEmail}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Date & Time",
      cell: ({ row }) => {
        const session = row.original;
        return (
          <div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              <span className="text-sm">{format(new Date(session.date), "MMM dd, yyyy")}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className="text-sm">{session.time}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const session = row.original;
        return (
          <Badge className={typeColors[session.type]}>
            {session.type}
          </Badge>
        );
      },
    },
    {
      accessorKey: "duration",
      header: "Duration",
      cell: ({ row }) => {
        const session = row.original;
        return <span className="text-sm">{session.duration} min</span>;
      },
    },
    {
      accessorKey: "assignedToName",
      header: "Assigned To",
      cell: ({ row }) => {
        const session = row.original;
        return (
          <div className="flex items-center gap-2">
            <User className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm">{session.assignedToName}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const session = row.original;
        return (
          <Badge className={statusColors[session.status]}>
            {session.status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const session = row.original;
        return (
          <div className="flex items-center gap-2">
            {session.meetingLink && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(session.meetingLink, '_blank')}
              >
                <Video className="h-3 w-3" />
              </Button>
            )}
            {getSessionActions(session)}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: sessions,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

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
            <h1 className="text-2xl font-bold">Scheduled Sessions</h1>
            <p className="text-muted-foreground">
              View and manage all scheduled sessions
            </p>
          </div>
        </div>
        <Button variant="outline" onClick={() => router.push("/management/sessions/calendar")}>
          <Calendar className="mr-2 h-4 w-4" />
          Calendar View
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by client name, email, or team member..."
                  value={(table.getColumn("clientName")?.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                    table.getColumn("clientName")?.setFilterValue(event.target.value)
                  }
                  className="pl-10"
                />
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Table className="h-5 w-5" />
            Sessions Table
            <Badge variant="secondary">{table.getFilteredRowModel().rows.length} sessions</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <TableUI>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      <div className="text-center py-8">
                        <Table className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No sessions found</h3>
                        <p className="text-muted-foreground">
                          No scheduled sessions found
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </TableUI>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 