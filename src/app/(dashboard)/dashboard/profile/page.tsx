import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | Tiny Steps A Day",
  description: "Manage your profile information, preferences, and account settings.",
  keywords: "profile, account settings, user preferences, personal information",
  robots: "noindex, nofollow", // Dashboard pages should not be indexed
};

export default function ProfilePage() {
  return (
    <div>
      <DashboardPageHeader title="Profile" subtitle="Manage your profile information, preferences, and account settings." />
    </div>
  );
}