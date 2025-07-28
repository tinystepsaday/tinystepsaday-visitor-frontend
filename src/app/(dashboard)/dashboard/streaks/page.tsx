import DashboardStreaksClient from "@/components/dashboard/DashboardStreaksClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Streaks | Tiny Steps A Day",
  description: "Track and manage your learning streaks and daily progress challenges.",
  keywords: "streaks, daily progress, learning challenges, habit tracking",
  robots: "noindex, nofollow", // Dashboard pages should not be indexed
};

export default function DashboardStreaksPage() {
  return <DashboardStreaksClient />;
}
