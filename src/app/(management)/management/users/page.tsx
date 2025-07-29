import { Metadata } from "next";
import { Suspense } from "react";
import { UsersClient } from "@/components/management/UsersClient";
import { ListPageLoader } from "@/components/ui/loaders";

export const metadata: Metadata = {
  title: "Users Management | Tiny Steps A Day",
  description: "Manage user accounts, permissions, and access controls. View, filter, and manage all registered users.",
  keywords: "users management, user accounts, permissions, access control, user administration, user roles",
  robots: "noindex, nofollow", // Management pages should not be indexed
};

export default function UsersPage() {
  return (
    <Suspense fallback={<ListPageLoader title="Loading Users..." subtitle="Please wait while we load the user data" />}>
      <UsersClient />
    </Suspense>
  );
}
