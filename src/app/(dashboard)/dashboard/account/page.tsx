import AccountAndBilling from "@/components/dashboard/AccountAndBilling";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account & Billing | Tiny Steps A Day",
  description: "Manage your account settings, billing information, and subscription details.",
  keywords: "account settings, billing, subscription, account management",
  robots: "noindex, nofollow", // Dashboard pages should not be indexed
};

export default function AccountPage() {
  return <AccountAndBilling />;
}
