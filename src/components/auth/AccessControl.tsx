"use client";

import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Lock, Crown, AlertTriangle } from "lucide-react";
import Link from "next/link";

interface AccessControlProps {
  children: ReactNode;
  requiredPermission?: string;
  requiredSubscription?: 'starter' | 'transformation' | 'complete';
  requireActiveSubscription?: boolean;
  requireAdmin?: boolean;
  fallback?: ReactNode;
  showUpgradePrompt?: boolean;
}

export function AccessControl({
  children,
  requiredPermission,
  requiredSubscription,
  requireActiveSubscription = false,
  requireAdmin = false,
  fallback,
  showUpgradePrompt = true
}: AccessControlProps) {
  const { 
    isAuthenticated, 
    isAdminUser, 
    hasPermission, 
    hasSubscription, 
    isSubscriptionActive 
  } = useAuth();

  // Check if user is authenticated
  if (!isAuthenticated) {
    return fallback || (
      <Alert>
        <Lock className="h-4 w-4" />
        <AlertDescription>
          Please log in to access this content.
          <Button asChild variant="link" className="p-0 h-auto">
            <Link href="/auth/login">Login</Link>
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // Check admin requirement
  if (requireAdmin && !isAdminUser) {
    return fallback || (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Admin access required. Please contact support if you believe this is an error.
        </AlertDescription>
      </Alert>
    );
  }

  // Check permission requirement
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return fallback || (
      <Alert>
        <Lock className="h-4 w-4" />
        <AlertDescription>
          You don&apos;t have permission to access this content.
          {showUpgradePrompt && (
            <Button asChild variant="link" className="p-0 h-auto">
              <Link href="/pricing">Upgrade your account</Link>
            </Button>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  // Check subscription requirement
  if (requiredSubscription && !hasSubscription(requiredSubscription)) {
    return fallback || (
      <Alert>
        <Crown className="h-4 w-4" />
        <AlertDescription>
          This feature requires a {requiredSubscription} subscription.
          {showUpgradePrompt && (
            <Button asChild variant="link" className="p-0 h-auto">
              <Link href="/pricing">Upgrade now</Link>
            </Button>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  // Check if subscription is active
  if (requireActiveSubscription && !isSubscriptionActive()) {
    return fallback || (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Your subscription is not active. Please renew to access this content.
          {showUpgradePrompt && (
            <Button asChild variant="link" className="p-0 h-auto">
              <Link href="/account">Manage subscription</Link>
            </Button>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  // All checks passed, render children
  return <>{children}</>;
}

// Higher-order component for route protection
export function withAccessControl<P extends object>(
  Component: React.ComponentType<P>,
  accessControlProps: Omit<AccessControlProps, 'children'>
) {
  return function ProtectedComponent(props: P) {
    return (
      <AccessControl {...accessControlProps}>
        <Component {...props} />
      </AccessControl>
    );
  };
}

// Hook for conditional rendering based on access
export function useAccessControl() {
  const { 
    isAuthenticated, 
    isAdminUser, 
    hasPermission, 
    hasSubscription, 
    isSubscriptionActive 
  } = useAuth();

  return {
    isAuthenticated,
    isAdminUser,
    hasPermission,
    hasSubscription,
    isSubscriptionActive,
    
    // Helper methods for common checks
    canAccess: (permission?: string, subscription?: string, requireActive = false) => {
      if (!isAuthenticated) return false;
      if (permission && !hasPermission(permission)) return false;
      if (subscription && !hasSubscription(subscription)) return false;
      if (requireActive && !isSubscriptionActive()) return false;
      return true;
    },
    
    canAccessAdmin: () => isAuthenticated && isAdminUser,
    canAccessStarter: () => isAuthenticated && hasSubscription('starter'),
    canAccessTransformation: () => isAuthenticated && hasSubscription('transformation'),
    canAccessComplete: () => isAuthenticated && hasSubscription('complete'),
  };
} 