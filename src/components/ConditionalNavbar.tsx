"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  // Hide navbar on course learning pages
  const isCourseLearningPage = pathname?.includes("/courses/") && pathname?.includes("/learning");


  if (isCourseLearningPage) {
    return null;
  }

  if (pathname?.includes("answering")) {
    return null;
  }

  if (pathname?.includes("maintenance")) {
    return null;
  }

  return <Navbar />;
} 