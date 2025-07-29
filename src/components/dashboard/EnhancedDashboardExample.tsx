"use client";

import { useAuth } from "@/hooks/useAuth";
import { useAccessControl } from "@/components/auth/AccessControl";
import { AccessControl } from "@/components/auth/AccessControl";
import { UserDataSyncStatus } from "@/components/dashboard/UserDataSyncStatus";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Crown, Shield, User, Clock, RefreshCw } from "lucide-react";

export function EnhancedDashboardExample() {
  const { 
    user, 
    isAuthenticated, 
    isAdminUser, 
    isSubscriptionActive,
    isUserDataFresh,
    syncUserData,
    updateUserData
  } = useAuth();

  const { canAccess, canAccessStarter, canAccessTransformation, canAccessComplete, canAccessAdmin } = useAccessControl();

  const handleUpdateUserProfile = () => {
    // Example of updating user data locally
    updateUserData({
      firstName: "Updated",
      lastName: "Name"
    });
  };

  const handleSyncUserData = async () => {
    await syncUserData();
  };

  if (!isAuthenticated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Authentication Required</CardTitle>
          <CardDescription>Please log in to view your dashboard.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* User Data Sync Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Data Synchronization
          </CardTitle>
          <CardDescription>
            Monitor and control user data synchronization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserDataSyncStatus />
          <div className="mt-4 flex gap-2">
            <Button onClick={handleSyncUserData} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync Now
            </Button>
            <Button onClick={handleUpdateUserProfile} variant="outline" size="sm">
              Update Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* User Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Name</p>
              <p className="text-sm text-muted-foreground">
                {user?.firstName} {user?.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Role</p>
              <Badge variant={isAdminUser ? "default" : "secondary"}>
                {user?.role}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium">Subscription</p>
              <Badge variant={isSubscriptionActive() ? "default" : "destructive"}>
                {user?.subscriptionTier || 'free'}
              </Badge>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="text-sm text-muted-foreground">
              Data freshness: {isUserDataFresh ? "Fresh" : "Stale"}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Access Control Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Access Control Examples
          </CardTitle>
          <CardDescription>
            Different levels of access control
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Basic Access */}
          <div>
            <h4 className="font-medium mb-2">Basic Access (Authenticated Users)</h4>
            <AccessControl>
              <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                ✅ You have basic access to the platform
              </div>
            </AccessControl>
          </div>

          {/* Admin Access */}
          <div>
            <h4 className="font-medium mb-2">Admin Access</h4>
            <AccessControl requireAdmin>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                ✅ You have admin access to the platform
              </div>
            </AccessControl>
          </div>

          {/* Starter Subscription */}
          <div>
            <h4 className="font-medium mb-2">Starter Features</h4>
            <AccessControl requiredSubscription="starter">
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-md">
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4" />
                  ✅ You have access to starter features
                </div>
              </div>
            </AccessControl>
          </div>

          {/* Transformation Subscription */}
          <div>
            <h4 className="font-medium mb-2">Transformation Features</h4>
            <AccessControl requiredSubscription="transformation">
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-md">
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4" />
                  ✅ You have access to transformation features
                </div>
              </div>
            </AccessControl>
          </div>

          {/* Complete Subscription */}
          <div>
            <h4 className="font-medium mb-2">Complete Features</h4>
            <AccessControl requiredSubscription="complete">
              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-md">
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4" />
                  ✅ You have access to complete features
                </div>
              </div>
            </AccessControl>
          </div>

          {/* Custom Permission */}
          <div>
            <h4 className="font-medium mb-2">Custom Permission</h4>
            <AccessControl requiredPermission="manage_courses">
              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-md">
                ✅ You can manage courses
              </div>
            </AccessControl>
          </div>
        </CardContent>
      </Card>

      {/* Conditional Rendering Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Conditional Rendering</CardTitle>
          <CardDescription>
            Using the useAccessControl hook for conditional rendering
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {canAccessStarter() && (
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-md">
              🎉 Starter content is available to you!
            </div>
          )}

          {canAccessTransformation() && (
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-md">
              🚀 Transformation features are unlocked!
            </div>
          )}

          {canAccessComplete() && (
            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-md">
              🌟 Complete features are unlocked!
            </div>
          )}

          {canAccessAdmin() && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
              👑 Admin panel access granted!
            </div>
          )}

          {canAccess('manage_users') && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
              👥 User management permissions active!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 