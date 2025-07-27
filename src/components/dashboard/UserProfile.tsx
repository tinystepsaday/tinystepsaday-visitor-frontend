"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/authStore";

interface UserProfileProps {
  className?: string;
}

export function UserProfile({ className }: UserProfileProps) {
  const { user } = useAuthStore();
  return (
    <div className={`px-4 py-6 flex items-center gap-3 border-b border-border mx-4 ${className}`}>
      <Avatar className="h-10 w-10">
        <AvatarImage src={user?.avatar} alt={user?.username} />
        <AvatarFallback>{user?.username?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
         <div className="font-medium">{user?.username}</div>
        <div className="text-sm text-muted-foreground">{user?.email}</div>
      </div>
    </div>
  );
}
