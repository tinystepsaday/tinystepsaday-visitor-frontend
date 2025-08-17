"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  MoreHorizontal, 
  Plus, 
  Search, 
  Users, 
  Calendar, 
  Target,
  Eye,
  Edit,
  Trash2,
  Pause,
  BarChart3
} from "lucide-react";
import { streaks } from "@/data/streaks";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { Select } from "@/components/ui/select";
import { SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectContent, SelectItem } from "@/components/ui/select";

export default function StreaksManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredStreaks = streaks.filter(streak => {
    const matchesSearch = streak.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         streak.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         streak.creatorName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "active" && new Date(streak.endDate) > new Date()) ||
                         (statusFilter === "ended" && new Date(streak.endDate) <= new Date());

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (streak: typeof streaks[0]) => {
    const isActive = new Date(streak.endDate) > new Date();
    return (
      <Badge variant={isActive ? "default" : "secondary"}>
        {isActive ? "Active" : "Ended"}
      </Badge>
    );
  };

  const getDifficultyBadge = (difficulty: string) => {
    const variants = {
      beginner: "default",
      intermediate: "secondary", 
      advanced: "destructive"
    } as const;
    
    return (
      <Badge variant={variants[difficulty as keyof typeof variants]}>
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Streaks Management</h2>
          <p className="text-muted-foreground">
            Manage all streak challenges and their settings
          </p>
        </div>
        <Button asChild>
          <Link href="/management/streaks/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Streak
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Streaks</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{streaks.length}</div>
            <p className="text-xs text-muted-foreground">
              {streaks.filter(s => new Date(s.endDate) > new Date()).length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {streaks.reduce((sum, streak) => sum + streak.enrolledCount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all streaks
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(streaks.reduce((sum, streak) => sum + streak.rating, 0) / streaks.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              Out of 5 stars
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Public Streaks</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {streaks.filter(s => s.isPublic).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Available to join
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>All Streaks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search streaks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="ended">Ended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Streak</TableHead>
                <TableHead>Creator</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStreaks.map((streak) => (
                <TableRow key={streak.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{streak.icon}</span>
                      <div>
                        <div className="font-medium">{streak.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {streak.description.substring(0, 50)}...
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{streak.creatorName}</div>
                      <div className="text-muted-foreground">
                        {format(parseISO(streak.startDate), 'MMM dd, yyyy')}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{streak.enrolledCount.toLocaleString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{streak.durationGoal} days</div>
                      <div className="text-muted-foreground">
                        {streak.checkInFrequency.replace('-', ' ')}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getDifficultyBadge(streak.difficulty)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(streak)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">{streak.rating}</span>
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-sm text-muted-foreground">
                        ({streak.reviewCount})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/management/streaks/${streak.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/management/streaks/${streak.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Streak
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/management/streaks/${streak.id}/analytics`}>
                            <BarChart3 className="mr-2 h-4 w-4" />
                            Analytics
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pause className="mr-2 h-4 w-4" />
                          Suspend
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
