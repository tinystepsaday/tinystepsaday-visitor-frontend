import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto py-20 px-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
      <p className="mb-6">The event you&apos;re looking for doesn&apos;t exist or has been removed.</p>
      <Button asChild>
        <Link href="/events">Back to Events</Link>
      </Button>
    </div>
  );
} 