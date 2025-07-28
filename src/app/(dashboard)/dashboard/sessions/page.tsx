import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentorship Sessions | Tiny Steps A Day",
  description: "Schedule and manage your mentorship sessions with our expert instructors.",
  keywords: "mentorship sessions, expert guidance, learning support, one-on-one coaching",
  robots: "noindex, nofollow", // Dashboard pages should not be indexed
};

const ComingSoon = ({ title }: { title: string }) => (
  <div className="text-center py-16">
    <h2 className="text-2xl font-bold mb-4">{title} - Coming Soon</h2>
    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
      We&apos;re currently working on this feature. It will be available soon!
    </p>
    <Button asChild>
      <Link href="/dashboard">Return to Dashboard</Link>
    </Button>
  </div>
);

export default function SessionsPage() {
  return <ComingSoon title="Mentorship Sessions" />;
}
