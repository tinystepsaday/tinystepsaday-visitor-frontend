"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import type { ColumnDef } from "@tanstack/react-table";
import { Users, Filter, X, Mail, BookOpen, Calendar, CheckCircle, XCircle, Eye } from "lucide-react";
import { Subscriber, getSubscribers, getSubscriberStats, SubscribersQueryParams } from "@/lib/api/subscribers";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const subscriptionTypeConfig = {
  FOOTER: { label: "Footer", icon: Mail, variant: "default" as const },
  MODAL: { label: "Modal", icon: Eye, variant: "secondary" as const },
  BOOK_PUBLISH: { label: "Book Publish", icon: BookOpen, variant: "outline" as const },
};

export function SubscribersClient() {
  const searchParams = useSearchParams();

  // State
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    byType: {
      FOOTER: 0,
      MODAL: 0,
      BOOK_PUBLISH: 0,
    },
    recentSubscriptions: 0,
  });

  // Filter states
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [subscribingToFilter, setSubscribingToFilter] = useState(searchParams.get("subscribingTo") || "all");
  const [isActiveFilter, setIsActiveFilter] = useState(searchParams.get("isActive") || "all");
  const [dateRangeFilter, setDateRangeFilter] = useState(searchParams.get("dateRange") || "all");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "createdAt");
  const [sortOrder, setSortOrder] = useState(searchParams.get("sortOrder") || "desc");

  // Fetch subscribers
  const fetchSubscribers = useCallback(async () => {
    setIsLoading(true);
    try {
      const params: SubscribersQueryParams = {
        page: pagination.page,
        limit: pagination.limit,
        search: searchTerm || undefined,
        subscribingTo: subscribingToFilter !== "all" ? subscribingToFilter as "FOOTER" | "MODAL" | "BOOK_PUBLISH" : undefined,
        isActive: isActiveFilter !== "all" ? isActiveFilter === "true" : undefined,
        sortBy: sortBy as "createdAt" | "updatedAt" | "email" | "subscribingTo",
        sortOrder: sortOrder as "asc" | "desc",
      };

      // Add date range filter if needed
      if (dateRangeFilter !== "all") {
        params.dateRange = dateRangeFilter as "today" | "week" | "month" | "quarter" | "year";
      }

      const response = await getSubscribers(params);
      if (response) {
        setSubscribers(response.data.subscribers);
        setPagination({
          total: response.data.total,
          page: response.data.page,
          limit: response.data.limit,
          totalPages: response.data.totalPages,
        });
      }
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      toast.error("Failed to fetch subscribers");
    } finally {
      setIsLoading(false);
    }
  }, [pagination.page, pagination.limit, searchTerm, subscribingToFilter, isActiveFilter, dateRangeFilter, sortBy, sortOrder]);

  // Fetch stats
  const fetchStats = useCallback(async () => {
    try {
      const statsData = await getSubscriberStats();
      if (statsData) {
        setStats(statsData);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }, []);

  // Clear filters function
  const clearFilters = () => {
    setSearchTerm("");
    setSubscribingToFilter("all");
    setIsActiveFilter("all");
    setDateRangeFilter("all");
    setSortBy("createdAt");
    setSortOrder("desc");
  };

  // Load data on mount and when filters change
  useEffect(() => {
    fetchSubscribers();
    fetchStats();
  }, [fetchSubscribers, fetchStats]);

  // Table columns
  const columns: ColumnDef<Subscriber>[] = [
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "subscribingTo",
      header: "Subscription Type",
      cell: ({ row }) => {
        const type = row.getValue("subscribingTo") as keyof typeof subscriptionTypeConfig;
        const config = subscriptionTypeConfig[type];
        
        return (
          <Badge variant={config.variant}>
            {config.label}
          </Badge>
        );
      },
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => {
        const isActive = row.getValue("isActive") as boolean;
        return (
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Subscribed",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return (
          <div className="text-sm text-muted-foreground">
            {date.toLocaleDateString()}
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscribers</h1>
          <p className="text-muted-foreground">
            Manage newsletter subscribers and track subscription analytics.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => fetchSubscribers()}>
          <Users className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card className="flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>
        <Card className="flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Inactive</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.inactive}</div>
          </CardContent>
        </Card>
        <Card className="flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Recent (30 days)</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.recentSubscriptions}</div>
          </CardContent>
        </Card>
        <Card className="flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Footer</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.byType.FOOTER}</div>
          </CardContent>
        </Card>
        <Card className="flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Modal</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.byType.MODAL}</div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Advanced Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2 w-full">
              <Label htmlFor="search">Search Email</Label>
              <Input
                id="search"
                placeholder="Search by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="space-y-2 w-full">
              <Label htmlFor="subscribingTo">Subscription Type</Label>
              <Select value={subscribingToFilter} onValueChange={setSubscribingToFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  <SelectItem value="FOOTER">Footer</SelectItem>
                  <SelectItem value="MODAL">Modal</SelectItem>
                  <SelectItem value="BOOK_PUBLISH">Book Publish</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 w-full">
              <Label htmlFor="status">Status</Label>
              <Select value={isActiveFilter} onValueChange={setIsActiveFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 w-full">
              <Label htmlFor="dateRange">Date Range</Label>
              <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This week</SelectItem>
                  <SelectItem value="month">This month</SelectItem>
                  <SelectItem value="quarter">This quarter</SelectItem>
                  <SelectItem value="year">This year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-start md:justify-between items-center mt-4 gap-2 md:gap-0">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <X className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </div>
            <div className="flex gap-2">
              <Label htmlFor="sort">Sort by:</Label>
              <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
                const [newSortBy, newSortOrder] = value.split("-");
                setSortBy(newSortBy);
                setSortOrder(newSortOrder as "asc" | "desc");
              }}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt-desc">Newest first</SelectItem>
                  <SelectItem value="createdAt-asc">Oldest first</SelectItem>
                  <SelectItem value="email-asc">Email A-Z</SelectItem>
                  <SelectItem value="email-desc">Email Z-A</SelectItem>
                  <SelectItem value="subscribingTo-asc">Type A-Z</SelectItem>
                  <SelectItem value="subscribingTo-desc">Type Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={subscribers}
        searchKey="email"
        searchPlaceholder="Search subscribers..."
        pageSize={pagination.limit}
        totalRows={pagination.total}
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        isLoading={isLoading}
      />
    </div>
  );
} 