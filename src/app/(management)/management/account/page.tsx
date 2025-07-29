import { Metadata } from "next";
import { ManagementAccountClient } from "@/components/management/ManagementAccountClient";

export const metadata: Metadata = {
  title: "Account Management | Tiny Steps A Day",
  description: "Manage your account information, preferences, and security settings.",
  keywords: "account management, profile settings, security, password change, account deactivation",
  robots: "noindex, nofollow", // Management pages should not be indexed
};

export default function ManagementAccountPage() {
  return (
    <div className="space-y-6">
      {/* Header - Following management page pattern */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Account Management</h1>
          <p className="text-muted-foreground">
            Manage your account information, preferences, and security settings
          </p>
        </div>
      </div>

      {/* Main Content */}
      <ManagementAccountClient />
    </div>
  );
}