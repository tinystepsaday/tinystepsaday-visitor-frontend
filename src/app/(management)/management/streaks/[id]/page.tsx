import StreakDetailsManagementClient from "@/components/management/StreakDetailsManagementClient";

export const metadata = {
  title: "Streak Details | Management Dashboard",
  description: "View detailed information about a streak",
};

export default async function StreakDetailsManagementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <StreakDetailsManagementClient streakId={id} />;
} 