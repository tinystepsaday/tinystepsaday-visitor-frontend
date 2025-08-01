import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerUserById, requireRole } from "@/lib/auth/server";
import { EditUserClient } from "@/components/management/user-details/EditUserClient";

interface EditUserPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: EditUserPageProps): Promise<Metadata> {
  try {
    // Require admin role for accessing user edit
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
      title: `Edit ${fullName} | Tiny Steps A Day`,
      description: `Edit user information for ${fullName}. Update profile details, permissions, and account settings.`,
      keywords: `edit user, user management, user administration, ${fullName}, user profile, user settings`,
      robots: "noindex, nofollow", // Management pages should not be indexed
    };
  } catch (error: unknown) {
    console.error("Error fetching user:", error);
    return {
      title: "Edit User | Tiny Steps A Day",
      description: "Edit user information and settings.",
      robots: "noindex, nofollow",
    };
  }
}

export default async function EditUserPage({ params }: EditUserPageProps) {
  try {
    // Require admin role for accessing user edit
    await requireRole('ADMIN');
    
    const { id } = await params;
    const user = await getServerUserById(id);

    if (!user) {
      notFound();
    }

    return <EditUserClient user={user} />;
  } catch (error) {
    console.error("Error fetching user:", error);
    notFound();
  }
}