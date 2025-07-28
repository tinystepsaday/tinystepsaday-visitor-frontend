import ScheduledConsultations from "@/components/dashboard/ScheduledConsultations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scheduled Consultations | Tiny Steps A Day",
  description: "View and manage your scheduled consultations with our expert instructors.",
  keywords: "consultations, expert guidance, scheduled sessions, learning support",
  robots: "noindex, nofollow", // Dashboard pages should not be indexed
};

export default function ConsultationsPage() {
  return <ScheduledConsultations />;
}
