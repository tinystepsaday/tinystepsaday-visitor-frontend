"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Hide footer on course learning pages
  const isCourseLearningPage = pathname?.includes("/courses/") && pathname?.includes("/learning");
  
  if (isCourseLearningPage) {
    return null;
  }
  
  if (pathname?.includes("")) {
    return null;
  }

  return <Footer />;
} 