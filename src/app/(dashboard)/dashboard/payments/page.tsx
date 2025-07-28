import PaymentHistory from "@/components/dashboard/PaymentHistory";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment History | Tiny Steps A Day",
  description: "View your payment history, invoices, and manage your billing information.",
  keywords: "payment history, billing, invoices, subscription management",
  robots: "noindex, nofollow", // Dashboard pages should not be indexed
};

export default function PaymentsPage() {
  return <PaymentHistory />;
}
