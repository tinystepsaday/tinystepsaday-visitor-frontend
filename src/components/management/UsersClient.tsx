"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Plus, Edit, Trash2, Shield, ShieldCheck, Eye, Users, BookOpen, Mail, Filter, X, CheckSquare } from "lucide-react";
import { User, getUsers, UsersQueryParams, createUser, bulkUserOperations } from "@/lib/api/users";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import Link from "next/link";

const roleConfig = {
  ADMIN: { label: "Admin", icon: ShieldCheck, variant: "destructive" as const },
  USER: { label: "User", icon: Shield, variant: "default" as const },
  MODERATOR: { label: "Moderator", icon: Shield, variant: "secondary" as const },
  INSTRUCTOR: { label: "Instructor", icon: BookOpen, variant: "outline" as const },
  SUPER_ADMIN: { label: "Super Admin", icon: ShieldCheck, variant: "destructive" as const },
};

export function UsersClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    verifiedUsers: 0,
    unverifiedUsers: 0,
    admins: 0,
    moderators: 0,
    instructors: 0,
    superAdmins: 0,
    regularUsers: 0,
  });

  // Bulk operations state
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isBulkDialogOpen, setIsBulkDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [bulkOperation, setBulkOperation] = useState<{
    operation: 'activate' | 'deactivate' | 'delete' | 'verify' | 'unverify';
    reason: string;
  }>({
    operation: 'activate',
    reason: '',
  });
  const [isPerformingOperation, setIsPerformingOperation] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [roleFilter, setRoleFilter] = useState(searchParams.get("role") || "all");
  const [isActiveFilter, setIsActiveFilter] = useState(searchParams.get("isActive") || "all");
  const [isEmailVerifiedFilter, setIsEmailVerifiedFilter] = useState(searchParams.get("isEmailVerified") || "all");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "createdAt");
  const [sortOrder, setSortOrder] = useState(searchParams.get("sortOrder") || "desc");

  // New user form state
  const [newUser, setNewUser] = useState<{ 
    firstName: string; 
    lastName: string; 
    email: string; 
    username: string;
    password: string;
    role: User['role'];
  }>({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    role: "USER",
  });

  // Generate username from firstName and lastName
  const generateUsername = (firstName: string, lastName: string) => {
    if (!firstName && !lastName) return "";
    
    const first = firstName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const last = lastName.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    if (first && last) {
      return `${first}${last}`;
    } else if (first) {
      return first;
    } else if (last) {
      return last;
    }
    return "";
  };

  // Update username when firstName or lastName changes
  const handleNameChange = (field: 'firstName' | 'lastName', value: string) => {
    const updatedUser = { ...newUser, [field]: value };
    const generatedUsername = generateUsername(
      field === 'firstName' ? value : newUser.firstName,
      field === 'lastName' ? value : newUser.lastName
    );
    updatedUser.username = generatedUsername;
    setNewUser(updatedUser);
  };

  // Fetch users function
  const fetchUsers = useCallback(async (params: UsersQueryParams = {}) => {
    try {
      setIsLoading(true);

      // Build query params from current state
      const queryParams: UsersQueryParams = {
        page: parseInt(searchParams.get("page") || "1"),
        limit: parseInt(searchParams.get("limit") || "10"),
        search: searchParams.get("search") || "",
        role: (() => {
          const roleParam = searchParams.get("role");
          return roleParam && roleParam !== "" ? (roleParam as "USER" | "ADMIN" | "MODERATOR" | "INSTRUCTOR" | "SUPER_ADMIN" | "all") : undefined;
        })(),
        isActive: (() => {
          const isActiveParam = searchParams.get("isActive");
          if (isActiveParam === "true") return true;
          if (isActiveParam === "false") return false;
          if (isActiveParam === "all") return "all";
          return undefined;
        })(),
        isEmailVerified: (() => {
          const isEmailVerifiedParam = searchParams.get("isEmailVerified");
          if (isEmailVerifiedParam === "true") return true;
          if (isEmailVerifiedParam === "false") return false;
          if (isEmailVerifiedParam === "all") return "all";
          return undefined;
        })(),
        sortBy: (searchParams.get("sortBy") as UsersQueryParams['sortBy']) || "createdAt",
        sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
        ...params,
      };

      const response = await getUsers(queryParams);

      if (response) {
        setUsers(response.data);
        setPagination(response.pagination);
        setAnalytics(response.analytics);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("An error occurred while fetching users");
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  // Update URL search params
  const updateSearchParams = (params: Record<string, string>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    });

    router.push(`?${newSearchParams.toString()}`);
  };

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    updateSearchParams({ search: value, page: "1" });
  };

  // Handle role filter
  const handleRoleFilter = (value: string) => {
    setRoleFilter(value);
    updateSearchParams({ role: value, page: "1" });
  };

  // Handle active filter
  const handleActiveFilter = (value: string) => {
    setIsActiveFilter(value);
    updateSearchParams({ isActive: value, page: "1" });
  };

  // Handle email verified filter
  const handleEmailVerifiedFilter = (value: string) => {
    setIsEmailVerifiedFilter(value);
    updateSearchParams({ isEmailVerified: value, page: "1" });
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    updateSearchParams({ page: page.toString() });
  };

  // Handle page size change
  const handlePageSizeChange = (limit: number) => {
    updateSearchParams({ limit: limit.toString(), page: "1" });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setRoleFilter("all");
    setIsActiveFilter("all");
    setIsEmailVerifiedFilter("all");
    setSortBy("createdAt");
    setSortOrder("desc");
    router.push("/management/users");
  };

  // Check if any filters are active
  const hasActiveFilters = searchTerm || roleFilter !== "all" || isActiveFilter !== "all" || isEmailVerifiedFilter !== "all" || sortBy !== "createdAt" || sortOrder !== "desc";

  // Handle create user
  const handleCreateUser = async () => {
    try {
      const response = await createUser(newUser);
      if (response) {
        toast.success("User created successfully");
        setIsDialogOpen(false);
        setNewUser({
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          password: "",
          role: "USER",
        });
        fetchUsers(); // Refresh users after creation
      } else {
        toast.error("Failed to create user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("An error occurred while creating user");
    }
  };

  // Handle bulk operations
  const handleBulkOperation = async () => {
    if (selectedUsers.length === 0) {
      toast.error("Please select users to perform bulk operation");
      return;
    }

    setIsPerformingOperation(true);
    try {
      await bulkUserOperations({
        userIds: selectedUsers,
        operation: bulkOperation.operation,
        reason: bulkOperation.reason,
      });
      
      toast.success(`Bulk operation '${bulkOperation.operation}' completed successfully`);
      setSelectedUsers([]);
      setIsBulkDialogOpen(false);
      fetchUsers(); // Refresh the list
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to perform bulk operation");
    } finally {
      setIsPerformingOperation(false);
    }
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(user => user.id));
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  // Fetch users on component mount and when search params change
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Table columns
  const columns: ColumnDef<User>[] = [
    {
      id: "select",
      header: () => (
        <Checkbox
          checked={selectedUsers.length === users.length && users.length > 0}
          onCheckedChange={handleSelectAll}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={selectedUsers.includes(row.original.id)}
          onCheckedChange={() => handleSelectUser(row.original.id)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "firstName",
      header: "User",
      cell: ({ row }) => {
        const user = row.original;
        const fullName = `${user.firstName} ${user.lastName}`;
        return (
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                {fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{fullName}</div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "username",
      header: "Username",
      cell: ({ row }) => {
        return <div className="font-medium">{row.getValue("username")}</div>;
      },
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.getValue("role") as string;
        const config = roleConfig[role as keyof typeof roleConfig];

        return (
          <Badge variant={config.variant} className="flex items-center gap-1 w-fit">
            <config.icon className="h-3 w-3" />
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
        return <Badge variant={isActive ? "default" : "secondary"}>{isActive ? "Active" : "Inactive"}</Badge>;
      },
    },
    {
      accessorKey: "isEmailVerified",
      header: "Email Verified",
      cell: ({ row }) => {
        const isEmailVerified = row.getValue("isEmailVerified") as boolean;
        return <Badge variant={isEmailVerified ? "default" : "secondary"}>{isEmailVerified ? "Verified" : "Unverified"}</Badge>;
      },
    },
    {
      accessorKey: "lastLogin",
      header: "Last Login",
      cell: ({ row }) => {
        const lastLogin = row.getValue("lastLogin") as string | undefined;
        return <div>{lastLogin ? new Date(lastLogin).toLocaleDateString() : "Never"}</div>;
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => {
        const date = row.getValue("createdAt") as string;
        return <div>{new Date(date).toLocaleDateString()}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;
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
                <Link href={`/management/users/${user.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/management/users/${user.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit User
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" asChild>
                <Link href={`/management/users/${user.id}/delete`}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete User
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage user accounts and permissions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account with appropriate permissions.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="firstName" className="text-right">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  value={newUser.firstName}
                  onChange={(e) => handleNameChange('firstName', e.target.value)}
                  className="col-span-3"
                  placeholder="John"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lastName" className="text-right">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  value={newUser.lastName}
                  onChange={(e) => handleNameChange('lastName', e.target.value)}
                  className="col-span-3"
                  placeholder="Doe"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
                  className="col-span-3"
                  placeholder="user@example.com"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  value={newUser.username}
                  onChange={(e) => setNewUser((prev) => ({ ...prev, username: e.target.value }))}
                  className="col-span-3"
                  placeholder="johndoe"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser((prev) => ({ ...prev, password: e.target.value }))}
                  className="col-span-3"
                  placeholder="Password"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value: User['role']) =>
                    setNewUser((prev) => ({ ...prev, role: value }))
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All roles</SelectItem>
                    <SelectItem value="USER">User</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="MODERATOR">Moderator</SelectItem>
                    <SelectItem value="INSTRUCTOR">Instructor</SelectItem>
                    <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleCreateUser}>
                Create User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalUsers}</div>
            <p className="text-xs text-muted-foreground">All registered users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.totalUsers > 0 ? Math.round((analytics.activeUsers / analytics.totalUsers) * 100) : 0}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Learners</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.regularUsers}</div>
            <p className="text-xs text-muted-foreground">Active learners</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.admins + analytics.superAdmins}</div>
            <p className="text-xs text-muted-foreground">System administrators</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </div>
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <X className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Search</Label>
              <Input
                placeholder="Search by name, email, username..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Role</Label>
              <Select value={roleFilter} onValueChange={handleRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All roles</SelectItem>
                  <SelectItem value="USER">User</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="MODERATOR">Moderator</SelectItem>
                  <SelectItem value="INSTRUCTOR">Instructor</SelectItem>
                  <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Status</Label>
              <Select value={isActiveFilter} onValueChange={handleActiveFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Email Verification</Label>
              <Select value={isEmailVerifiedFilter} onValueChange={handleEmailVerifiedFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All verification statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All verification statuses</SelectItem>
                  <SelectItem value="true">Verified</SelectItem>
                  <SelectItem value="false">Unverified</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Operations Bar */}
      {selectedUsers.length > 0 && (
        <div className="border-blue-200 bg-blue-50 rounded-md p-2 dark:bg-blue-950 dark:border-blue-800">
          <div className="p-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckSquare className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setIsBulkDialogOpen(true)}
                >
                  Bulk Actions
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setSelectedUsers([])}
                >
                  Clear Selection
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={users}
            searchKey="firstName"
            searchPlaceholder="Search users..."
            pageSize={pagination.limit}
            onPageSizeChange={handlePageSizeChange}
            totalRows={pagination.total}
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      {/* Bulk Operations Dialog */}
      <Dialog open={isBulkDialogOpen} onOpenChange={setIsBulkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk User Operations</DialogTitle>
            <DialogDescription>
              Perform operations on {selectedUsers.length} selected user{selectedUsers.length !== 1 ? 's' : ''}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="operation">Operation</Label>
              <Select
                value={bulkOperation.operation}
                onValueChange={(value) => setBulkOperation(prev => ({ 
                  ...prev, 
                  operation: value as 'activate' | 'deactivate' | 'delete' | 'verify' | 'unverify' 
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select operation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="activate">Activate Users</SelectItem>
                  <SelectItem value="deactivate">Deactivate Users</SelectItem>
                  <SelectItem value="delete">Delete Users</SelectItem>
                  <SelectItem value="verify">Verify Email</SelectItem>
                  <SelectItem value="unverify">Unverify Email</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason</Label>
              <Textarea
                id="reason"
                value={bulkOperation.reason}
                onChange={(e) => setBulkOperation(prev => ({ ...prev, reason: e.target.value }))}
                placeholder="Enter reason for bulk operation"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBulkDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleBulkOperation} 
              disabled={isPerformingOperation || !bulkOperation.reason}
              variant={bulkOperation.operation === 'delete' ? 'destructive' : 'default'}
            >
              {isPerformingOperation ? "Processing..." : `Perform ${bulkOperation.operation}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Users</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleBulkOperation} 
              className="bg-destructive text-destructive-foreground"
              disabled={isPerformingOperation}
            >
              {isPerformingOperation ? "Deleting..." : "Delete Users"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 