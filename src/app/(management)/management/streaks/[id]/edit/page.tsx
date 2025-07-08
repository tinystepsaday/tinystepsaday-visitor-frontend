import StreakEditManagementClient from "@/components/management/StreakEditManagementClient";

export const metadata = {
  title: "Edit Streak | Management Dashboard",
  description: "Edit streak details and settings",
};

export default async function EditStreakManagementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <StreakEditManagementClient streakId={id} />;
} 