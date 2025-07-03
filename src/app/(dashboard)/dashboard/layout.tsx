"use client"

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/components/dashboard/UserProfile";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-muted/30 flex w-full">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 lg:w-72 bg-background flex-col border-r border-border h-screen sticky top-0">
        <div className="p-6">
          <Link href="/" className="text-xl font-bold gradient-text inline-block">
            Tiny Steps A Day
          </Link>
        </div>
        
        <UserProfile />
        <DashboardNav />
      </aside>
      
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`
          fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-200
          ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `} 
        onClick={toggleSidebar}
      />
      
      {/* Mobile Sidebar */}
      <aside className={`
        fixed left-0 top-0 z-50 h-screen w-72 bg-background md:hidden transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="p-6 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold gradient-text inline-block">
            Tiny Steps A Day
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <UserProfile />
        <DashboardNav onItemClick={toggleSidebar} />
      </aside>
      
      <main className="flex-grow">
        <DashboardHeader onToggleSidebar={toggleSidebar} />
        
        <div className="p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
