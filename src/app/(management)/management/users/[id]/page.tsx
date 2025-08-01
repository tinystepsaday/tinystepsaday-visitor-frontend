import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerUserById, requireRole } from "@/lib/auth/server";
import { UserDetailsClient } from "@/components/management/user-details/UserDetailsClient";

interface UserDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: UserDetailsPageProps): Promise<Metadata> {
  try {
    // Require admin role for accessing user details
    await requireRole('ADMIN');
    
    const { id } = await params;
    const user = await getServerUserById(id);

    if (!user) {
      return {
        title: "User Not Found | Tiny Steps A Day",
        description: "The requested user could not be found.",
        robots: "noindex, nofollow",
      };
    }

    const fullName = `${user.firstName} ${user.lastName}`;

    return {
      title: `${fullName} - User Details | Tiny Steps A Day`,
      description: `View detailed information about ${fullName}, including profile, activities, and engagement metrics.`,
      keywords: `user details, user profile, user management, ${fullName}, user analytics, user activities`,
      robots: "noindex, nofollow", // Management pages should not be indexed
    };
  } catch (error: unknown) {
    console.error("Error fetching user:", error);
    return {
      title: "User Details | Tiny Steps A Day",
      description: "View user details and management information.",
      robots: "noindex, nofollow",
    };
  }
}

export default async function UserDetailsPage({ params }: UserDetailsPageProps) {
  try {
    // Require admin role for accessing user details
    await requireRole('ADMIN');
    
    const { id } = await params;
    const user = await getServerUserById(id);

    if (!user) {
      notFound();
    }

    return <UserDetailsClient user={user} />;
  } catch (error) {
    console.error("Error fetching user:", error);
    notFound();
  }
}