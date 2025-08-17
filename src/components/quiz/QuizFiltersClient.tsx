"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface QuizFiltersClientProps {
  search?: string;
  selectedCategory: string;
  currentSortBy: string;
  currentSortOrder: string;
}

export default function QuizFiltersClient({
  search,
  selectedCategory,
  currentSortBy,
  currentSortOrder,
}: QuizFiltersClientProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchValue = formData.get('search') as string;
    const category = formData.get('category') as string;
    const sortBy = formData.get('sortBy') as string;
    const sortOrder = formData.get('sortOrder') as string;
    
    const params = new URLSearchParams();
    if (searchValue) params.set('search', searchValue);
    if (category && category !== 'all') params.set('category', category);
    if (sortBy && sortBy !== 'createdAt') params.set('sortBy', sortBy);
    if (sortOrder && sortOrder !== 'desc') params.set('sortOrder', sortOrder);
    
    window.location.href = `/quiz?${params.toString()}`;
  };

  return (
    <div className="mb-8 max-w-4xl mx-auto">
      <form 
        className="flex flex-col sm:flex-row gap-4"
        onSubmit={handleSubmit}
      >
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              name="search"
              placeholder="Search quizzes by title, description, or category..."
              defaultValue={search}
              className="w-full px-3 py-2 pl-10 border border-input bg-background rounded-md text-sm"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Select 
            value={selectedCategory} 
            onValueChange={(value) => {
              const hiddenInput = document.querySelector('input[name="category"]') as HTMLInputElement;
              if (hiddenInput) hiddenInput.value = value;
            }}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Art">Art</SelectItem>
              <SelectItem value="Books">Books</SelectItem>
              <SelectItem value="Career">Career</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Entrepreneurship">Entrepreneurship</SelectItem>
              <SelectItem value="Family">Family</SelectItem>
              <SelectItem value="Fashion">Fashion</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Fitness">Fitness</SelectItem>
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Gaming">Gaming</SelectItem>
              <SelectItem value="Goal Setting">Goal Setting</SelectItem>
              <SelectItem value="Habit Building">Habit Building</SelectItem>
              <SelectItem value="Health">Health</SelectItem>
              <SelectItem value="Leadership">Leadership</SelectItem>
              <SelectItem value="Life Purpose">Life Purpose</SelectItem>
              <SelectItem value="Listening">Listening</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Mental Health">Mental Health</SelectItem>
              <SelectItem value="Meditation">Meditation</SelectItem>
              <SelectItem value="Mindfulness">Mindfulness</SelectItem>
              <SelectItem value="Movies">Movies</SelectItem>
              <SelectItem value="Music">Music</SelectItem>
              <SelectItem value="Onboarding">Onboarding</SelectItem>
              <SelectItem value="Personal Development">Personal Development</SelectItem>
              <SelectItem value="Personal Growth">Personal Growth</SelectItem>
              <SelectItem value="Podcasts">Podcasts</SelectItem>
              <SelectItem value="Productivity">Productivity</SelectItem>
              <SelectItem value="Reading">Reading</SelectItem>
              <SelectItem value="Relationships">Relationships</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="Self-Improvement">Self-Improvement</SelectItem>
              <SelectItem value="Sleep">Sleep</SelectItem>
              <SelectItem value="Social">Social</SelectItem>
              <SelectItem value="Speaking">Speaking</SelectItem>
              <SelectItem value="Spirituality">Spirituality</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Time Management">Time Management</SelectItem>
              <SelectItem value="Travel">Travel</SelectItem>
              <SelectItem value="TV">TV</SelectItem>
              <SelectItem value="Wellness">Wellness</SelectItem>
              <SelectItem value="Writing">Writing</SelectItem>
              <SelectItem value="Yoga">Yoga</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit" className="px-6">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        
        {/* Hidden inputs for Select components */}
        <input type="hidden" name="category" value={selectedCategory} />
        <input type="hidden" name="sortBy" value={currentSortBy} />
        <input type="hidden" name="sortOrder" value={currentSortOrder} />
      </form>
    </div>
  );
}
