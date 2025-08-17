"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface QuizSortControlsClientProps {
  currentSortBy: string;
  currentSortOrder: string;
}

export default function QuizSortControlsClient({
  currentSortBy,
  currentSortOrder,
}: QuizSortControlsClientProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground text-nowrap">Sort by:</span>
      <Select 
        value={currentSortBy} 
        onValueChange={(value) => {
          const hiddenInput = document.querySelector('input[name="sortBy"]') as HTMLInputElement;
          if (hiddenInput) hiddenInput.value = value;
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="createdAt">Latest</SelectItem>
          <SelectItem value="title">Title</SelectItem>
          <SelectItem value="totalAttempts">Popular</SelectItem>
          <SelectItem value="averageScore">Rating</SelectItem>
        </SelectContent>
      </Select>
      
      <Select 
        value={currentSortOrder} 
        onValueChange={(value) => {
          const hiddenInput = document.querySelector('input[name="sortOrder"]') as HTMLInputElement;
          if (hiddenInput) hiddenInput.value = value;
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Order" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="desc">Descending</SelectItem>
          <SelectItem value="asc">Ascending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
