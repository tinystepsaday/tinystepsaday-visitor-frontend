"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { RefreshCw, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export function UserDataSyncStatus() {
  const { 
    isSyncingUser, 
    isUserDataFresh, 
    timeSinceLastSync, 
    syncUserData 
  } = useAuth();

  const handleManualSync = async () => {
    try {
      const success = await syncUserData();
      if (success) {
        toast.success("User data synchronized successfully");
      } else {
        toast.error("Failed to sync user data");
      }
    } catch {
      toast.error("Error syncing user data");
    }
  };

  const formatTimeAgo = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      {isSyncingUser ? (
        <div className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
          <span className="text-muted-foreground">Syncing...</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {isUserDataFresh ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          )}
          
          <span className="text-muted-foreground">
            {timeSinceLastSync ? formatTimeAgo(timeSinceLastSync) : "Never synced"}
          </span>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleManualSync}
            disabled={isSyncingUser}
            className="h-6 px-2"
          >
            <RefreshCw className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
} 