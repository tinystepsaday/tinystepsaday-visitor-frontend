"use client"

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu } from "lucide-react";
import Link from "next/link";

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
}

export function DashboardHeader({ onToggleSidebar }: DashboardHeaderProps) {
  return (
    <header className="md:hidden sticky top-0 z-30 bg-background border-b border-border p-4 flex items-center justify-between">
      <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
        <Menu className="h-5 w-5" />
      </Button>
      <Link href="/" className="text-xl font-bold gradient-text">
        Tiny Steps A Day Journey
      </Link>
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Sarah Johnson" />
        <AvatarFallback>SJ</AvatarFallback>
      </Avatar>
    </header>
  );
}
