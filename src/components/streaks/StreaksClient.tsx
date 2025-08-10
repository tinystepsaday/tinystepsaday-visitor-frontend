"use client";
import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Streak, userStreakProgress } from "@/data/streaks";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, Star } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

interface StreaksClientProps {
  streaks: Streak[];
  currentPage: number;
  totalPages: number;
  sort: string;
  filter: string;
}

export default function StreaksClient({ streaks, currentPage, totalPages, sort, filter }: StreaksClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const { isLoggedIn } = useAuthStore();

  // Mock user ID - in real app this would come from auth
  const mockUserId = "user1";

  const getUserProgress = (streakId: string) => {
    return userStreakProgress.find(progress => 
      progress.streakId === streakId && progress.userId === mockUserId
    );
  };

  // Handlers for changing sort and filter
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("filter", e.target.value);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };
  const handlePageChange = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  }, [router, searchParams]);

  // Card/List view renderers
  const renderCardView = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {streaks.map((streak) => {
        const userProgress = getUserProgress(streak.id);
        const isEnrolled = userProgress?.isActive;
        
        return (
          <div key={streak.slug} className="h-full">
            <div className="bg-card shadow-sm p-6 rounded-lg border flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{streak.icon}</span>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{streak.title}</h3>
                  <p className="text-muted-foreground text-sm">{streak.description}</p>
                </div>
              </div>
              
              {/* Streak stats */}
              <div className="flex items-center gap-4 mb-4 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{streak.enrolledCount}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-muted-foreground">{streak.rating}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {streak.difficulty}
                </Badge>
              </div>

              {/* User progress if enrolled */}
              {isEnrolled && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm font-medium text-green-800">You&apos;re enrolled!</div>
                  <div className="text-xs text-green-600">Current streak: {userProgress.currentStreak} days</div>
                </div>
              )}

              <div className="flex-1" />
              
              <div className="flex justify-between items-end mt-4">
                <div className="text-sm text-muted-foreground">
                  {streak.checkInFrequency.replace('-', ' ')} • {streak.durationGoal} days
                </div>
                {isEnrolled ? (
                  <a href={`/streaks/${streak.slug}/checkin`} className="text-primary font-medium hover:underline">
                    Check In
                  </a>
                ) : (
                  <a href={`/streaks/${streak.slug}`} className="text-primary font-medium hover:underline">
                    View Details
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
  const renderListView = () => (
    <div className="divide-y rounded-lg border bg-card">
      {streaks.map((streak) => {
        const userProgress = getUserProgress(streak.id);
        const isEnrolled = userProgress?.isActive;
        
        return (
          <div key={streak.slug} className="flex items-center gap-4 px-6 py-4">
            <span className="text-2xl">{streak.icon}</span>
            <div className="flex-1">
              <h3 className="font-semibold">{streak.title}</h3>
              <p className="text-muted-foreground text-sm">{streak.description}</p>
              <div className="flex items-center gap-4 mt-1 text-sm">
                <span className="text-muted-foreground">{streak.enrolledCount} enrolled</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{streak.checkInFrequency.replace('-', ' ')}</span>
                <span className="text-muted-foreground">•</span>
                <Badge variant="outline" className="text-xs">
                  {streak.difficulty}
                </Badge>
              </div>
            </div>
            {isEnrolled && (
              <div className="text-sm text-green-600 mr-4">
                Enrolled ({userProgress.currentStreak} days)
              </div>
            )}
            {isEnrolled ? (
              <a href={`/streaks/${streak.slug}/checkin`} className="text-primary font-medium hover:underline">
                Check In
              </a>
            ) : (
              <a href={`/streaks/${streak.slug}`} className="text-primary font-medium hover:underline">
                View Details
              </a>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      <div className="flex flex-wrap gap-4 items-center mb-8">
        <input
          type="text"
          placeholder="Search streaks..."
          defaultValue={filter}
          onBlur={handleFilterChange}
          className="border rounded px-3 py-2 text-sm"
        />
        <select value={sort} onChange={handleSortChange} className="border rounded px-3 py-2 text-sm" aria-label="Sort streaks">
          <option value="popular">Most Popular</option>
          <option value="recent">Most Recent</option>
          <option value="alphabetical">A-Z</option>
        </select>
        <div className="ml-auto flex gap-2">
          <button
            className={`px-3 py-2 rounded ${viewMode === "card" ? "bg-primary text-white" : "bg-muted"}`}
            onClick={() => setViewMode("card")}
            type="button"
          >
            Card View
          </button>
          <button
            className={`px-3 py-2 rounded ${viewMode === "list" ? "bg-primary text-white" : "bg-muted"}`}
            onClick={() => setViewMode("list")}
            type="button"
          >
            List View
          </button>
        </div>
      </div>

      {/* Create Streak Button */}
      <div className="flex justify-end mb-6">
        <Button 
          onClick={() => {
            if (!isLoggedIn) {
              if (typeof window !== 'undefined') {
                window.location.href = '/auth/login?redirect=' + encodeURIComponent('/streaks/create');
              }
            } else {
              router.push('/streaks/create');
            }
          }}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Your Own Streak
        </Button>
      </div>
      {viewMode === "card" ? renderCardView() : renderListView()}
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={e => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={e => {
                    e.preventDefault();
                    handlePageChange(i + 1);
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={e => {
                  e.preventDefault();
                  if (currentPage < totalPages) handlePageChange(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
} 