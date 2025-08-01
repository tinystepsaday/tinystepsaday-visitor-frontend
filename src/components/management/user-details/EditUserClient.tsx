'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, updateUser, deleteUser, changeUserRole, toggleUserStatus } from "@/lib/api/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { ArrowLeft, Save, Trash2, Shield, UserCheck, UserX } from "lucide-react";
import Link from "next/link";

interface EditUserClientProps {
  user: User;
}

const roleConfig = {
  USER: { label: "User", icon: Shield, variant: "default" as const },
  MODERATOR: { label: "Moderator", icon: Shield, variant: "secondary" as const },
  INSTRUCTOR: { label: "Instructor", icon: Shield, variant: "outline" as const },
  ADMIN: { label: "Admin", icon: Shield, variant: "destructive" as const },
  SUPER_ADMIN: { label: "Super Admin", icon: Shield, variant: "destructive" as const },
};

export function EditUserClient({ user }: EditUserClientProps) {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    isActive: user.isActive,
  });

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [operationData, setOperationData] = useState({
    role: user.role,
    reason: "",
  });

  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateUser(user.id, formData);
      toast.success("User updated successfully");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update user");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    setIsLoading(true);
    try {
      await deleteUser(user.id);
      toast.success("User deleted successfully");
      router.push("/management/users");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete user");
    } finally {
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleRoleChange = async () => {
    setIsLoading(true);
    try {
      await changeUserRole(user.id, {
        role: operationData.role,
        reason: operationData.reason,
      });
      toast.success("User role updated successfully");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to change user role");
    } finally {
      setIsLoading(false);
      setIsRoleDialogOpen(false);
      setOperationData({ role: user.role, reason: "" });
    }
  };

  const handleStatusToggle = async () => {
    setIsLoading(true);
    try {
      await toggleUserStatus(user.id, {
        isActive: !user.isActive,
        reason: operationData.reason,
      });
      toast.success(`User ${user.isActive ? 'deactivated' : 'activated'} successfully`);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to toggle user status");
    } finally {
      setIsLoading(false);
      setIsStatusDialogOpen(false);
      setOperationData({ role: user.role, reason: "" });
    }
  };

  const fullName = `${user.firstName} ${user.lastName}`;
  const roleInfo = roleConfig[user.role];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-col space-y-2 justify-start items-start">
          <div className="flex items-center space-x-2">
            <Link href="/management/users">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Users
              </Button>
            </Link>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Edit User</h1>
            <p className="text-muted-foreground">Update user information and settings</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback>{fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{fullName}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant={roleInfo.variant}>
                    <roleInfo.icon className="h-3 w-3 mr-1" />
                    {roleInfo.label}
                  </Badge>
                  <Badge variant={user.isActive ? "default" : "secondary"}>
                    {user.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Edit User Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => handleInputChange('isActive', checked)}
                />
                <Label htmlFor="isActive">Account Active</Label>
              </div>

              <Button type="submit" disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => setIsRoleDialogOpen(true)}
              disabled={isLoading}
            >
              <Shield className="h-4 w-4 mr-2" />
              Change Role
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setIsStatusDialogOpen(true)}
              disabled={isLoading}
            >
              {user.isActive ? (
                <>
                  <UserX className="h-4 w-4 mr-2" />
                  Deactivate
                </>
              ) : (
                <>
                  <UserCheck className="h-4 w-4 mr-2" />
                  Activate
                </>
              )}
            </Button>

            <Button
              variant="destructive"
              onClick={() => setIsDeleteDialogOpen(true)}
              disabled={isLoading}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete User
            </Button>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {fullName}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-destructive text-destructive-foreground">
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User Role</DialogTitle>
            <DialogDescription>
              Change the role for {fullName}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">New Role</Label>
              <Select
                value={operationData.role}
                onValueChange={(value) => setOperationData(prev => ({ ...prev, role: value as User['role'] }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(roleConfig).map(([role, config]) => (
                    <SelectItem key={role} value={role}>
                      <div className="flex items-center">
                        <config.icon className="h-4 w-4 mr-2" />
                        {config.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason</Label>
              <Textarea
                id="reason"
                value={operationData.reason}
                onChange={(e) => setOperationData(prev => ({ ...prev, reason: e.target.value }))}
                placeholder="Enter reason for role change"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRoleChange} disabled={isLoading || !operationData.reason}>
              {isLoading ? "Updating..." : "Update Role"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{user.isActive ? 'Deactivate' : 'Activate'} User</DialogTitle>
            <DialogDescription>
              {user.isActive 
                ? `Are you sure you want to deactivate ${fullName}?`
                : `Are you sure you want to activate ${fullName}?`
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="status-reason">Reason</Label>
              <Textarea
                id="status-reason"
                value={operationData.reason}
                onChange={(e) => setOperationData(prev => ({ ...prev, reason: e.target.value }))}
                placeholder={`Enter reason for ${user.isActive ? 'deactivation' : 'activation'}`}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStatusDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleStatusToggle} 
              disabled={isLoading || !operationData.reason}
              variant={user.isActive ? "destructive" : "default"}
            >
              {isLoading ? "Updating..." : (user.isActive ? "Deactivate" : "Activate")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 