import DashboardOverview from "@/components/dashboard/DashboardOverview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Tiny Steps A Day",
  description: "Your personal learning dashboard. Track your progress, view courses, and manage your account.",
  keywords: "dashboard, learning progress, courses, account management",
  robots: "noindex, nofollow", // Dashboard pages should not be indexed
};

export default function DashboardPage() {
  return <DashboardOverview />;
}
