"use client"

import { dashboardNavItems } from "@/config/dashboard-nav";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

interface DashboardNavProps {
  onItemClick?: () => void;
}

export function DashboardNav({ onItemClick }: DashboardNavProps) {
  const router = usePathname();
  const navigation = useRouter();
  const { logout } = useAuthStore();
  
  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return router === "/dashboard";
    }
    return router.startsWith(path);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast("Logged out successfully");
      navigation.push("/");
    } catch {
      toast("Error logging out");
    }
  };

  return (
    <>
      <nav className="flex-grow p-4">
        <ul className="space-y-1">
          {dashboardNavItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                onClick={onItemClick}
                className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm transition-colors ${
                  isActive(item.path)
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 mt-auto">
        <Button 
          variant="outline" 
          className="w-full justify-start text-muted-foreground hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Button>
      </div>
    </>
  );
}
