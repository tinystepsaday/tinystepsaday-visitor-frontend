"use client"

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";

interface QuizLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export function QuizLayout({
  children,
  title,
  subtitle,
  showBackButton = false,
  onBackClick
}: QuizLayoutProps) {
  return (
    <div className="min-h-screen bg-muted/30 w-full">
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <Link href="/quiz" className="text-primary hover:underline text-sm flex items-center">
              <ChevronDown className="h-4 w-4 rotate-90 mr-1" />
              Back to quizzes
            </Link>
            <h1 className="text-xl font-bold mt-1">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          <ThemeToggle />
          {showBackButton && (
            <Button
              variant="outline"
              onClick={onBackClick}
              className="text-sm px-3"
            >
              Back
            </Button>
          )}
        </div>
      </header>
      
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="bg-background rounded-xl border shadow-sm p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
