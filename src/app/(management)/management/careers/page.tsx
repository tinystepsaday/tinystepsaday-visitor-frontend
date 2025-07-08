"use client";

import React, { useState } from 'react';
import { Plus, MoreHorizontal, Eye, Edit, Trash2, Users, Calendar, MapPin, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { getAllCareers, Career } from '@/data/careers';
import { DataTable } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

const statusColors = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  closed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  archived: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
};

export default function CareersManagementPage() {
  const [careers, setCareers] = useState<Career[]>(getAllCareers());

  const handleStatusChange = (careerId: string, newStatus: Career['status']) => {
    setCareers(prev => prev.map(career => 
      career.id === careerId 
        ? { ...career, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }
        : career
    ));
  };

  const handleDeleteCareer = (careerId: string) => {
    setCareers(prev => prev.filter(career => career.id !== careerId));
  };

  const getStatusCount = (status: Career['status']) => {
    return careers.filter(career => career.status === status).length;
  };

  const totalApplications = careers.reduce((sum, career) => sum + career.applicationsCount, 0);

  // Define columns for the data table
  const columns: ColumnDef<Career>[] = [
    {
      accessorKey: "title",
      header: "Position",
      cell: ({ row }) => {
        const career = row.original;
        return (
          <div className="space-y-1">
            <div className="font-medium">{career.title}</div>
            <div className="text-sm text-muted-foreground">{career.department}</div>
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
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "salary",
      header: "Salary",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <DollarSign className="h-3 w-3 text-muted-foreground" />
          {row.getValue("salary")}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge className={statusColors[status as keyof typeof statusColors]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "applicationsCount",
      header: "Applications",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3 text-muted-foreground" />
          {row.getValue("applicationsCount")}
        </div>
      ),
    },
    {
      accessorKey: "postedDate",
      header: "Posted",
      cell: ({ row }) => {
        const date = new Date(row.getValue("postedDate"));
        return date.toLocaleDateString();
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const career = row.original;
        
        return (
          <div className="flex items-center gap-2">
            <Link href={`/management/careers/${career.id}/applications`}>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-1" />
                Applications
              </Button>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/careers/${career.id}`} className="flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    View Public Page
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/management/careers/${career.id}/edit`} className="flex items-center">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Position
                  </Link>
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem 
                  onClick={() => handleStatusChange(career.id, 'active')}
                  disabled={career.status === 'active'}
                >
                  Activate
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleStatusChange(career.id, 'draft')}
                  disabled={career.status === 'draft'}
                >
                  Mark as Draft
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleStatusChange(career.id, 'closed')}
                  disabled={career.status === 'closed'}
                >
                  Close Position
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleStatusChange(career.id, 'archived')}
                  disabled={career.status === 'archived'}
                >
                  Archive
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem 
                  onClick={() => handleDeleteCareer(career.id)}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Position
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Careers Management</h1>
          <p className="text-muted-foreground">
            Manage job positions, applications, and recruitment processes
          </p>
        </div>
        <Link href="/management/careers/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Position
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Positions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{careers.length}</div>
            <p className="text-xs text-muted-foreground">
              {getStatusCount('active')} active, {getStatusCount('draft')} draft
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApplications}</div>
            <p className="text-xs text-muted-foreground">
              Across all positions
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Positions</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStatusCount('active')}</div>
            <p className="text-xs text-muted-foreground">
              Currently accepting applications
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Closed Positions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStatusCount('closed')}</div>
            <p className="text-xs text-muted-foreground">
              No longer accepting applications
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Job Positions</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={careers}
            searchKey="title"
            searchPlaceholder="Search positions..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
