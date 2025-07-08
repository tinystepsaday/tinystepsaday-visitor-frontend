import StreakAnalyticsManagementClient from "@/components/management/StreakAnalyticsManagementClient";

export const metadata = {
  title: "Streak Analytics | Management Dashboard",
  description: "View detailed analytics and insights for this streak",
};

export default async function StreakAnalyticsManagementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <StreakAnalyticsManagementClient streakId={id} />;
} 