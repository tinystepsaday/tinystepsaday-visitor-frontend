import ReadingList from "@/components/dashboard/ReadingList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading List | Tiny Steps A Day",
  description: "Access your personalized reading list and track your reading progress across all materials.",
  keywords: "reading list, learning materials, reading progress, educational content",
  robots: "noindex, nofollow", // Dashboard pages should not be indexed
};

export default function ReadingListPage() {
  return <ReadingList />;
}
