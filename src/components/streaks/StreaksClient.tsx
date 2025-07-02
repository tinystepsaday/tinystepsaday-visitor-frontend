"use client";
import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Streak } from "@/data/streaks";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "@/components/ui/pagination";

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
      {streaks.map((streak) => (
        <div key={streak.slug} className="h-full">
          <div className="bg-card shadow-sm p-6 rounded-lg border flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{streak.icon}</span>
              <div>
                <h3 className="text-xl font-semibold mb-1">{streak.title}</h3>
                <p className="text-muted-foreground text-sm">{streak.description}</p>
              </div>
            </div>
            <div className="flex-1" />
            <div className="flex justify-between items-end mt-4">
              <span className="text-sm text-muted-foreground">{streak.enrolledCount} enrolled</span>
              <a href={`/streaks/${streak.slug}`} className="text-primary font-medium hover:underline">View Details</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  const renderListView = () => (
    <div className="divide-y rounded-lg border bg-card">
      {streaks.map((streak) => (
        <div key={streak.slug} className="flex items-center gap-4 px-6 py-4">
          <span className="text-2xl">{streak.icon}</span>
          <div className="flex-1">
            <h3 className="font-semibold">{streak.title}</h3>
            <p className="text-muted-foreground text-sm">{streak.description}</p>
          </div>
          <span className="text-sm text-muted-foreground mr-4">{streak.enrolledCount} enrolled</span>
          <a href={`/streaks/${streak.slug}`} className="text-primary font-medium hover:underline">View</a>
        </div>
      ))}
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