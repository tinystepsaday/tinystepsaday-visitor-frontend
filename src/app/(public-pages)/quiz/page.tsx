import { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import {
  Timer,
  Book,
  User,
  Search,
  Activity,
  Target,
  Heart,
  Briefcase,
  Users,
  TrendingUp,
  Brain,
  DollarSign,
  Home,
  Globe,
  Sparkles,
  Crown,
  Rocket,
  Megaphone,
  ShoppingCart,
  Monitor,
  Palette,
  PenTool,
  BookOpen,
  Headphones,
  Mic,
  Plane,
  Utensils,
  Scissors,
  Brush,
  Music,
  Film,
  Tv,
  Gamepad2,
  Dumbbell,
  Moon,
  Zap,
  Flower,
  Filter,
} from "lucide-react";
import Link from "next/link";
import { quizAPI, transformBackendQuiz } from "@/integration/quiz";
import { sharedMetadata } from "../../shared-metadata";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Suspense } from "react";
import QuizPageSkeleton from "@/components/QuizPageSkeleton";

export const dynamic = 'force-dynamic';

const categoryColorMap = {
  // Personal Development & Growth
  "personal development": { bg: "bg-blue-50 dark:bg-blue-950", text: "text-blue-700 dark:text-blue-300", border: "border-blue-200 dark:border-blue-800", accent: "bg-blue-100 dark:bg-blue-900" },
  "personal growth": { bg: "bg-indigo-50 dark:bg-indigo-950", text: "text-indigo-700 dark:text-indigo-300", border: "border-indigo-200 dark:border-indigo-800", accent: "bg-indigo-100 dark:bg-indigo-900" },
  "self-improvement": { bg: "bg-cyan-50 dark:bg-cyan-950", text: "text-cyan-700 dark:text-cyan-300", border: "border-cyan-200 dark:border-cyan-800", accent: "bg-cyan-100 dark:bg-cyan-900" },

  // Mental Health & Wellness
  "mental health": { bg: "bg-rose-50 dark:bg-rose-950", text: "text-rose-700 dark:text-rose-300", border: "border-rose-200 dark:border-rose-800", accent: "bg-rose-100 dark:bg-rose-900" },
  "wellness": { bg: "bg-emerald-50 dark:bg-emerald-950", text: "text-emerald-700 dark:text-emerald-300", border: "border-emerald-200 dark:border-emerald-800", accent: "bg-emerald-100 dark:bg-emerald-900" },
  "mindfulness": { bg: "bg-amber-50 dark:bg-amber-950", text: "text-amber-700 dark:text-amber-300", border: "border-amber-200 dark:border-amber-800", accent: "bg-amber-100 dark:bg-amber-900" },
  "meditation": { bg: "bg-violet-50 dark:bg-violet-950", text: "text-violet-700 dark:text-violet-300", border: "border-violet-200 dark:border-violet-800", accent: "bg-violet-100 dark:bg-violet-900" },
  "yoga": { bg: "bg-teal-50 dark:bg-teal-950", text: "text-teal-700 dark:text-teal-300", border: "border-teal-200 dark:border-teal-800", accent: "bg-teal-100 dark:bg-teal-900" },

  // Life & Purpose
  "life purpose": { bg: "bg-purple-50 dark:bg-purple-950", text: "text-purple-700 dark:text-purple-300", border: "border-purple-200 dark:border-purple-800", accent: "bg-purple-100 dark:bg-purple-900" },
  "spirituality": { bg: "bg-fuchsia-50 dark:bg-fuchsia-950", text: "text-fuchsia-700 dark:text-fuchsia-300", border: "border-fuchsia-200 dark:border-fuchsia-800", accent: "bg-fuchsia-100 dark:bg-fuchsia-900" },

  // Career & Business
  "career": { bg: "bg-slate-50 dark:bg-slate-950", text: "text-slate-700 dark:text-slate-300", border: "border-slate-200 dark:border-slate-800", accent: "bg-slate-100 dark:bg-slate-900" },
  "leadership": { bg: "bg-orange-50 dark:bg-orange-950", text: "text-orange-700 dark:text-orange-300", border: "border-orange-200 dark:border-orange-800", accent: "bg-orange-100 dark:bg-orange-900" },
  "entrepreneurship": { bg: "bg-red-50 dark:bg-red-950", text: "text-red-700 dark:text-red-300", border: "border-red-200 dark:border-red-800", accent: "bg-red-100 dark:bg-red-900" },
  "marketing": { bg: "bg-pink-50 dark:bg-pink-950", text: "text-pink-700 dark:text-pink-300", border: "border-pink-200 dark:border-pink-800", accent: "bg-pink-100 dark:bg-pink-900" },
  "sales": { bg: "bg-rose-50 dark:bg-rose-950", text: "text-rose-700 dark:text-rose-300", border: "border-rose-200 dark:border-rose-800", accent: "bg-rose-100 dark:bg-rose-900" },

  // Technology & Creative
  "technology": { bg: "bg-blue-50 dark:bg-blue-950", text: "text-blue-700 dark:text-blue-300", border: "border-blue-200 dark:border-blue-800", accent: "bg-blue-100 dark:bg-blue-900" },
  "design": { bg: "bg-purple-50 dark:bg-purple-950", text: "text-purple-700 dark:text-purple-300", border: "border-purple-200 dark:border-purple-800", accent: "bg-purple-100 dark:bg-purple-900" },
  "art": { bg: "bg-pink-50 dark:bg-pink-950", text: "text-pink-700 dark:text-pink-300", border: "border-pink-200 dark:border-pink-800", accent: "bg-pink-100 dark:bg-pink-900" },

  // Communication & Learning
  "writing": { bg: "bg-emerald-50 dark:bg-emerald-950", text: "text-emerald-700 dark:text-emerald-300", border: "border-emerald-200 dark:border-emerald-800", accent: "bg-emerald-100 dark:bg-emerald-900" },
  "reading": { bg: "bg-teal-50 dark:bg-teal-950", text: "text-teal-700 dark:text-teal-300", border: "border-teal-200 dark:border-teal-800", accent: "bg-teal-100 dark:bg-teal-900" },
  "listening": { bg: "bg-cyan-50 dark:bg-cyan-950", text: "text-cyan-700 dark:text-cyan-300", border: "border-cyan-200 dark:border-cyan-800", accent: "bg-cyan-100 dark:bg-cyan-900" },
  "speaking": { bg: "bg-orange-50 dark:bg-orange-950", text: "text-orange-700 dark:text-orange-300", border: "border-orange-200 dark:border-orange-800", accent: "bg-orange-100 dark:bg-orange-900" },

  // Lifestyle & Entertainment
  "travel": { bg: "bg-sky-50 dark:bg-sky-950", text: "text-sky-700 dark:text-sky-300", border: "border-sky-200 dark:border-sky-800", accent: "bg-sky-100 dark:bg-sky-900" },
  "food": { bg: "bg-amber-50 dark:bg-amber-950", text: "text-amber-700 dark:text-amber-300", border: "border-amber-200 dark:border-amber-800", accent: "bg-amber-100 dark:bg-amber-900" },
  "fashion": { bg: "bg-fuchsia-50 dark:bg-fuchsia-950", text: "text-fuchsia-700 dark:text-fuchsia-300", border: "border-fuchsia-200 dark:border-fuchsia-800", accent: "bg-fuchsia-100 dark:bg-fuchsia-900" },
  "music": { bg: "bg-violet-50 dark:bg-violet-950", text: "text-violet-700 dark:text-violet-300", border: "border-violet-200 dark:border-violet-800", accent: "bg-violet-100 dark:bg-violet-900" },
  "movies": { bg: "bg-red-50 dark:bg-red-950", text: "text-red-700 dark:text-red-300", border: "border-red-200 dark:border-red-800", accent: "bg-red-100 dark:bg-red-900" },
  "tv": { bg: "bg-pink-50 dark:bg-pink-950", text: "text-pink-700 dark:text-pink-300", border: "border-pink-200 dark:border-pink-800", accent: "bg-pink-100 dark:bg-pink-900" },
  "books": { bg: "bg-emerald-50 dark:bg-emerald-950", text: "text-emerald-700 dark:text-emerald-300", border: "border-emerald-200 dark:border-emerald-800", accent: "bg-emerald-100 dark:bg-emerald-900" },
  "podcasts": { bg: "bg-indigo-50 dark:bg-indigo-950", text: "text-indigo-700 dark:text-indigo-300", border: "border-indigo-200 dark:border-indigo-800", accent: "bg-indigo-100 dark:bg-indigo-900" },
  "gaming": { bg: "bg-purple-50 dark:bg-purple-950", text: "text-purple-700 dark:text-purple-300", border: "border-purple-200 dark:border-purple-800", accent: "bg-purple-100 dark:bg-purple-900" },

  // Health & Fitness
  "health": { bg: "bg-green-50 dark:bg-green-950", text: "text-green-700 dark:text-green-300", border: "border-green-200 dark:border-green-800", accent: "bg-green-100 dark:bg-green-900" },
  "fitness": { bg: "bg-emerald-50 dark:bg-emerald-950", text: "text-emerald-700 dark:text-emerald-300", border: "border-emerald-200 dark:border-emerald-800", accent: "bg-emerald-100 dark:bg-emerald-900" },
  "sleep": { bg: "bg-slate-50 dark:bg-slate-950", text: "text-slate-700 dark:text-slate-300", border: "border-slate-200 dark:border-slate-800", accent: "bg-slate-100 dark:bg-slate-900" },

  // Relationships & Social
  "relationships": { bg: "bg-rose-50 dark:bg-rose-950", text: "text-rose-700 dark:text-rose-300", border: "border-rose-200 dark:border-rose-800", accent: "bg-rose-100 dark:bg-rose-900" },
  "family": { bg: "bg-pink-50 dark:bg-pink-950", text: "text-pink-700 dark:text-pink-300", border: "border-pink-200 dark:border-pink-800", accent: "bg-pink-100 dark:bg-pink-900" },
  "social": { bg: "bg-blue-50 dark:bg-blue-950", text: "text-blue-700 dark:text-blue-300", border: "border-blue-200 dark:border-blue-800", accent: "bg-blue-100 dark:bg-blue-900" },

  // Productivity & Skills
  "productivity": { bg: "bg-cyan-50 dark:bg-cyan-950", text: "text-cyan-700 dark:text-cyan-300", border: "border-cyan-200 dark:border-cyan-800", accent: "bg-cyan-100 dark:bg-cyan-900" },
  "time management": { bg: "bg-sky-50 dark:bg-sky-950", text: "text-sky-700 dark:text-sky-300", border: "border-sky-200 dark:border-sky-800", accent: "bg-sky-100 dark:bg-sky-900" },
  "goal setting": { bg: "bg-orange-50 dark:bg-orange-950", text: "text-orange-700 dark:text-orange-300", border: "border-orange-200 dark:border-orange-800", accent: "bg-orange-100 dark:bg-orange-900" },
  "habit building": { bg: "bg-teal-50 dark:bg-teal-950", text: "text-teal-700 dark:text-teal-300", border: "border-teal-200 dark:border-teal-800", accent: "bg-teal-100 dark:bg-teal-900" },

  // Finance
  "finance": { bg: "bg-green-50 dark:bg-green-950", text: "text-green-700 dark:text-green-300", border: "border-green-200 dark:border-green-800", accent: "bg-green-100 dark:bg-green-900" },

  // Onboarding
  "onboarding": { bg: "bg-indigo-50 dark:bg-indigo-950", text: "text-indigo-700 dark:text-indigo-300", border: "border-indigo-200 dark:border-indigo-800", accent: "bg-indigo-100 dark:bg-indigo-900" },
} as const;

const generateFallbackColors = (category: string) => {
  const hash = category.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colorPalettes = [
    { bg: "bg-slate-50 dark:bg-slate-950", text: "text-slate-700 dark:text-slate-300", border: "border-slate-200 dark:border-slate-800", accent: "bg-slate-100 dark:bg-slate-900" },
    { bg: "bg-zinc-50 dark:bg-zinc-950", text: "text-zinc-700 dark:text-zinc-300", border: "border-zinc-200 dark:border-zinc-800", accent: "bg-zinc-100 dark:bg-zinc-900" },
    { bg: "bg-neutral-50 dark:bg-neutral-950", text: "text-neutral-700 dark:text-neutral-300", border: "border-neutral-200 dark:border-neutral-800", accent: "bg-neutral-100 dark:bg-neutral-900" },
    { bg: "bg-stone-50 dark:bg-stone-950", text: "text-stone-700 dark:text-stone-300", border: "border-stone-200 dark:border-stone-800", accent: "bg-stone-100 dark:bg-stone-900" },
  ];

  return colorPalettes[hash % colorPalettes.length];
};

// Comprehensive icon mapping for all categories
const categoryIconMap = {
  "personal development": <User className="h-6 w-6" />,
  "personal growth": <TrendingUp className="h-6 w-6" />,
  "self-improvement": <Target className="h-6 w-6" />,
  "mental health": <Brain className="h-6 w-6" />,
  "wellness": <Heart className="h-6 w-6" />,
  "mindfulness": <Zap className="h-6 w-6" />,
  "meditation": <Flower className="h-6 w-6" />,
  "yoga": <Activity className="h-6 w-6" />,
  "life purpose": <Search className="h-6 w-6" />,
  "spirituality": <Sparkles className="h-6 w-6" />,
  "career": <Briefcase className="h-6 w-6" />,
  "leadership": <Crown className="h-6 w-6" />,
  "entrepreneurship": <Rocket className="h-6 w-6" />,
  "marketing": <Megaphone className="h-6 w-6" />,
  "sales": <ShoppingCart className="h-6 w-6" />,
  "technology": <Monitor className="h-6 w-6" />,
  "design": <Palette className="h-6 w-6" />,
  "art": <Brush className="h-6 w-6" />,
  "writing": <PenTool className="h-6 w-6" />,
  "reading": <BookOpen className="h-6 w-6" />,
  "listening": <Headphones className="h-6 w-6" />,
  "speaking": <Mic className="h-6 w-6" />,
  "travel": <Plane className="h-6 w-6" />,
  "food": <Utensils className="h-6 w-6" />,
  "fashion": <Scissors className="h-6 w-6" />,
  "music": <Music className="h-6 w-6" />,
  "movies": <Film className="h-6 w-6" />,
  "tv": <Tv className="h-6 w-6" />,
  "books": <Book className="h-6 w-6" />,
  "podcasts": <Mic className="h-6 w-6" />,
  "gaming": <Gamepad2 className="h-6 w-6" />,
  "health": <Heart className="h-6 w-6" />,
  "fitness": <Dumbbell className="h-6 w-6" />,
  "sleep": <Moon className="h-6 w-6" />,
  "relationships": <Users className="h-6 w-6" />,
  "family": <Home className="h-6 w-6" />,
  "social": <Globe className="h-6 w-6" />,
  "productivity": <TrendingUp className="h-6 w-6" />,
  "time management": <Timer className="h-6 w-6" />,
  "goal setting": <Target className="h-6 w-6" />,
  "habit building": <Activity className="h-6 w-6" />,
  "finance": <DollarSign className="h-6 w-6" />,
  "onboarding": <User className="h-6 w-6" />,
} as const;

// Fallback icon generator for new categories
const generateFallbackIcon = (category: string) => {
  // Generate consistent icon based on category name
  const categoryLower = category.toLowerCase();

  if (categoryLower.includes('health') || categoryLower.includes('medical')) return <Heart className="h-6 w-6" />;
  if (categoryLower.includes('tech') || categoryLower.includes('digital')) return <Monitor className="h-6 w-6" />;
  if (categoryLower.includes('creative') || categoryLower.includes('art')) return <Brush className="h-6 w-6" />;
  if (categoryLower.includes('business') || categoryLower.includes('work')) return <Briefcase className="h-6 w-6" />;
  if (categoryLower.includes('learning') || categoryLower.includes('education')) return <BookOpen className="h-6 w-6" />;
  if (categoryLower.includes('lifestyle') || categoryLower.includes('life')) return <User className="h-6 w-6" />;
  if (categoryLower.includes('fitness') || categoryLower.includes('sport')) return <Activity className="h-6 w-6" />;
  if (categoryLower.includes('finance') || categoryLower.includes('money')) return <DollarSign className="h-6 w-6" />;
  if (categoryLower.includes('social') || categoryLower.includes('community')) return <Users className="h-6 w-6" />;

  // Default fallback
  return <Target className="h-6 w-6" />;
};

export async function generateMetadata({ searchParams }: QuizPageProps): Promise<Metadata> {
  const { search, category } = await searchParams;

  const baseTitle = "Self-Improvement Quiz";
  const baseDescription = "Take our self-improvement quiz to discover your personal development path and find the right resources for your journey.";

  let dynamicTitle = baseTitle;
  let dynamicDescription = baseDescription;

  if (search) {
    dynamicTitle = `Search: ${search} - Self-Improvement Quiz`;
    dynamicDescription = `Search results for "${search}" on our self-improvement quiz platform.`;
  } else if (category && category !== "all") {
    dynamicTitle = `${category} Quiz - Self-Improvement`;
    dynamicDescription = `Take our ${category.toLowerCase()} quiz to discover your personal development path.`;
  }

  return {
    title: dynamicTitle,
    description: dynamicDescription,
    keywords: [
      "self-improvement quiz",
      "personal development",
      "self-assessment",
      "self-improvement",
      "online quiz",
      "quiz",
      "personal development path",
      "tiny steps a day",
      "tiny steps",
      "a day",
      "actionable steps",
      "daily habits",
      "tips",
      ...(category && category !== "all" ? [category.toLowerCase()] : []),
      ...(search ? [search.toLowerCase()] : []),
    ],
    openGraph: {
      title: `${dynamicTitle} | Tiny Steps A Day`,
      description: dynamicDescription,
      url: `${sharedMetadata.metadataBase}/quiz`,
      images: [sharedMetadata.openGraph.images[0]],
      siteName: sharedMetadata.openGraph.siteName,
      locale: sharedMetadata.openGraph.locale,
      type: "website",
    },
    twitter: {
      title: `${dynamicTitle} | Tiny Steps A Day`,
      description: dynamicDescription,
      images: [sharedMetadata.twitter.images[0]],
      card: "summary_large_image" as const,
    },
    alternates: {
      canonical: `${sharedMetadata.metadataBase}/quiz`,
    },
    robots: sharedMetadata.robots,
  };
}

interface QuizPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}

export default async function QuizPage({ searchParams }: QuizPageProps) {
  return (
    <Suspense fallback={<QuizPageSkeleton />}>
      <QuizPageContent searchParams={searchParams} />
    </Suspense>
  );
}

const QuizPageContent = async ({ searchParams }: QuizPageProps) => {
  try {
    // Await searchParams for Next.js 15 compatibility
    const { search, category, page, limit, sortBy, sortOrder } = await searchParams;

    // Parse search parameters
    const currentPage = parseInt(page || '1', 10);
    const currentLimit = parseInt(limit || '12', 10);
    const searchQuery = search || '';
    const selectedCategory = category || 'all';
    const currentSortBy = sortBy || 'createdAt';
    const currentSortOrder = sortOrder || 'desc';

    // Fetch quizzes with filters
    const response = await quizAPI.getPublicQuizzes({
      page: currentPage,
      limit: currentLimit,
      search: searchQuery || undefined,
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      sortBy: currentSortBy as 'createdAt' | 'updatedAt' | 'title' | 'totalAttempts' | 'averageScore',
      sortOrder: currentSortOrder as 'asc' | 'desc'
    });

    const { quizzes, total, totalPages } = response;
    const publicQuizzes = quizzes.map(transformBackendQuiz);

    // Validate page number
    if (currentPage > totalPages && totalPages > 0) {
      // Redirect to page 1 if current page is invalid
      const params = new URLSearchParams();
      if (searchQuery) params.set("search", searchQuery);
      if (selectedCategory !== "all") params.set("category", selectedCategory);
      if (currentSortBy !== "createdAt") params.set("sortBy", currentSortBy);
      if (currentSortOrder !== "desc") params.set("sortOrder", currentSortOrder);
      params.set("page", "1");

      // For now, just show page 1 results instead of redirecting
      // In a real app, you might want to use redirect() here
    }

    return (
      <div className="container max-w-7xl mx-auto px-4 py-12 md:py-16 w-full">
        <SectionHeader
          title="Self-Discovery Quizzes"
          subtitle="Take a quick assessment to receive personalized recommendations tailored to your unique journey"
          centered={true}
          isPageHeader={true}
        />

        {/* Search and Filters */}
        <div className="mb-8 max-w-4xl mx-auto">
          <form
            className="flex flex-col sm:flex-row gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const search = formData.get('search') as string;
              const category = formData.get('category') as string;
              const sortBy = formData.get('sortBy') as string;
              const sortOrder = formData.get('sortOrder') as string;

              const params = new URLSearchParams();
              if (search) params.set('search', search);
              if (category && category !== 'all') params.set('category', category);
              if (sortBy && sortBy !== 'createdAt') params.set('sortBy', sortBy);
              if (sortOrder && sortOrder !== 'desc') params.set('sortOrder', sortOrder);

              window.location.href = `/quiz?${params.toString()}`;
            }}
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
              <Select value={selectedCategory} onValueChange={(value) => {
                const hiddenInput = document.querySelector('input[name="category"]') as HTMLInputElement;
                if (hiddenInput) hiddenInput.value = value;
              }}>
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

        {/* Results Summary */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {publicQuizzes.length} of {total} quizzes
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </p>

          {total > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Select value={currentSortBy} onValueChange={(value) => {
                const hiddenInput = document.querySelector('input[name="sortBy"]') as HTMLInputElement;
                if (hiddenInput) hiddenInput.value = value;
              }}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Latest</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="totalAttempts">Popular</SelectItem>
                  <SelectItem value="averageScore">Rating</SelectItem>
                </SelectContent>
              </Select>

              <Select value={currentSortOrder} onValueChange={(value) => {
                const hiddenInput = document.querySelector('input[name="sortOrder"]') as HTMLInputElement;
                if (hiddenInput) hiddenInput.value = value;
              }}>
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Descending</SelectItem>
                  <SelectItem value="asc">Ascending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {publicQuizzes.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {publicQuizzes.map((quiz, index) => {
              const normalizedCategory = quiz.category.toLowerCase() as keyof typeof categoryColorMap;
              const colors = categoryColorMap[normalizedCategory] || generateFallbackColors(quiz.category);

              const icon = categoryIconMap[normalizedCategory] || generateFallbackIcon(quiz.category);

              return (
                <div
                  key={quiz.id}
                  className={`group overflow-hidden transition-all hover:shadow-xl hover:scale-105 duration-300 ${colors.border} border-2 bg-white dark:bg-gray-900 animate-in fade-in-0 slide-in-from-bottom-4 rounded-lg`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <div className={`${colors.bg} py-6 ${colors.text} relative overflow-hidden p-4`}>
                    {/* Decorative background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-current transform translate-x-8 -translate-y-8"></div>
                      <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-current transform -translate-x-6 translate-y-6"></div>
                    </div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 dark:to-white/5"></div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-3 rounded-xl ${colors.accent} ${colors.text} shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                          {icon}
                        </div>
                        <div className="flex items-center gap-2 text-sm bg-white/30 dark:bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20 dark:border-black/20">
                          <Timer className="h-4 w-4" />
                          <span className="font-medium">{quiz.estimatedTime}</span>
                          <span className="mx-1">•</span>
                          <span className="font-medium">{quiz.questions.length} questions</span>
                        </div>
                      </div>
                      <div className="text-xl font-bold leading-tight">{quiz.title}</div>
                    </div>
                  </div>

                  <div className="py-4 px-4">
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {quiz.subtitle}
                      </p>

                      {/* Category badge and difficulty */}
                      <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colors.accent} ${colors.text}`}>
                          {quiz.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="py-4 px-4">
                    <Button asChild className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-lg group-hover:shadow-xl">
                      <Link href={`/quiz/${quiz.id}`}>
                        <Activity className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                        Start Quiz
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 mb-6">
              <Target className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-foreground">No Quizzes Available</h3>
            <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
              We&apos;re currently preparing some amazing quizzes for you. Check back soon for personalized assessments!
            </p>
            <div className="mt-6">
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span>New quizzes coming soon</span>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2">
              {currentPage > 1 && (
                <Link
                  href={`/quiz?${new URLSearchParams({
                    ...(searchQuery && { search: searchQuery }),
                    ...(selectedCategory !== 'all' && { category: selectedCategory }),
                    ...(currentSortBy !== 'createdAt' && { sortBy: currentSortBy }),
                    ...(currentSortOrder !== 'desc' && { sortOrder: currentSortOrder }),
                    page: (currentPage - 1).toString()
                  }).toString()}`}
                  className="px-3 py-2 border border-input bg-background rounded-md text-sm hover:bg-accent transition-colors"
                >
                  Previous
                </Link>
              )}

              <span className="px-3 py-2 text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>

              {currentPage < totalPages && (
                <Link
                  href={`/quiz?${new URLSearchParams({
                    ...(searchQuery && { search: searchQuery }),
                    ...(selectedCategory !== 'all' && { category: selectedCategory }),
                    ...(currentSortBy !== 'createdAt' && { sortBy: currentSortBy }),
                    ...(currentSortOrder !== 'desc' && { sortOrder: currentSortOrder }),
                    page: (currentPage + 1).toString()
                  }).toString()}`}
                  className="px-3 py-2 border border-input bg-background rounded-md text-sm hover:bg-accent transition-colors"
                >
                  Next
                </Link>
              )}
            </div>
          </div>
        )}

        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Why Take Our Quizzes?
          </h3>
          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            <div className="group p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 mb-6 group-hover:scale-110 transition-transform duration-200">
                <User className="h-8 w-8" />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100">Personalized Guidance</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">Get recommendations tailored specifically to your unique needs and goals.</p>
            </div>
            <div className="group p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-300 mb-6 group-hover:scale-110 transition-transform duration-200">
                <Timer className="h-8 w-8" />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-green-900 dark:text-green-100">Quick & Effective</h4>
              <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">Just 3-5 minutes to complete, delivering immediate actionable insights.</p>
            </div>
            <div className="group p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-300 mb-6 group-hover:scale-110 transition-transform duration-200">
                <Book className="h-8 w-8" />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-purple-900 dark:text-purple-100">Science-Based</h4>
              <p className="text-sm text-purple-700 dark:text-purple-300 leading-relaxed">Our assessments are grounded in proven psychological frameworks and research.</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching quizzes:', error);

    // Fallback to empty state with better error handling
    return (
      <div className="container max-w-7xl mx-auto px-4 py-12 md:py-16 w-full">
        <SectionHeader
          title="Self-Discovery Quizzes"
          subtitle="Take a quick assessment to receive personalized recommendations tailored to your unique journey"
          centered={true}
          isPageHeader={true}
        />

        <div className="text-center py-16">
          <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900 dark:to-red-950 mb-6">
            <Target className="h-10 w-10 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-foreground">Unable to Load Quizzes</h3>
          <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
            We&apos;re experiencing some technical difficulties. Please try again later.
          </p>
          <div className="mt-6">
            <Link href="/quiz">
              <Button variant="outline">
                <Activity className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};
