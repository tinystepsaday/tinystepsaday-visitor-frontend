"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { hasManagementAccess, UserRole } from "@/utils/redirectUtils";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireManagementAccess?: boolean;
  fallback?: React.ReactNode;
}

export default function AuthGuard({
  children,
  requireAuth = true,
  requireManagementAccess = false,
  fallback = null,
}: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const router = useRouter();
  const { user, isLoggedIn, isLoading: authLoading, initializeAuth } = useAuthStore();

  // Initialize auth state on mount
  useEffect(() => {
    console.log("AuthGuard: Initializing auth state");
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    console.log("AuthGuard useEffect - State:", {
      isLoggedIn,
      user: user ? { id: user.id, role: user.role } : null,
      authLoading,
      requireAuth,
      requireManagementAccess
    });

    // Add a small delay to ensure auth state is properly loaded
    const timer = setTimeout(() => {
      if (authLoading) {
        console.log("AuthGuard: Still loading auth state");
        return;
      }

      if (!requireAuth) {
        console.log("AuthGuard: No auth required, allowing access");
        setHasAccess(true);
        setIsLoading(false);
        return;
      }

      if (!isLoggedIn || !user) {
        console.log("AuthGuard: User not authenticated, redirecting to login");
        router.push("/auth/login");
        return;
      }

      if (requireManagementAccess && !hasManagementAccess(user.role as UserRole)) {
        console.log("AuthGuard: User doesn't have management access, redirecting to dashboard");
        router.push("/dashboard");
        return;
      }

      console.log("AuthGuard: User authenticated and authorized, allowing access");
      setHasAccess(true);
      setIsLoading(false);
    }, 100); // Small delay to ensure proper hydration

    return () => clearTimeout(timer);
  }, [isLoggedIn, user, authLoading, requireAuth, requireManagementAccess, router]);

  if (isLoading || authLoading) {
    console.log("AuthGuard: Showing loading state");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    console.log("AuthGuard: No access, showing fallback");
    return fallback;
  }

  console.log("AuthGuard: Rendering children");
  return <>{children}</>;
} 