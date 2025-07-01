"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProfileProps {
  className?: string;
}

export function UserProfile({ className }: UserProfileProps) {
  return (
    <div className={`px-4 py-6 flex items-center gap-3 border-b border-border mx-4 ${className}`}>
      <Avatar className="h-10 w-10">
        <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Sarah Johnson" />
        <AvatarFallback>SJ</AvatarFallback>
      </Avatar>
      <div>
        <div className="font-medium">Sarah Johnson</div>
        <div className="text-sm text-muted-foreground">sarah@example.com</div>
      </div>
    </div>
  );
}
