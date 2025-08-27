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
} from "lucide-react";
import Link from "next/link";
import { quizAPI, transformBackendQuiz } from "@/integration/quiz";
import { sharedMetadata } from "../../shared-metadata";
import { Suspense } from "react";
import QuizPageSkeleton from "@/components/QuizPageSkeleton";
import QuizFiltersClient from "@/components/quiz/QuizFiltersClient";
import QuizSortControlsClient from "@/components/quiz/QuizSortControlsClient";
import { quizCategoryColorMap, generateFallbackColors } from "@/lib/utils";
import Image from "next/image";

export const dynamic = 'force-dynamic';

const quizCategoryIconMap = {
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

const generateFallbackIcon = (category: string) => {
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
    const { search, category, page, limit, sortBy, sortOrder } = await searchParams;

    const currentPage = parseInt(page || '1', 10);
    const currentLimit = parseInt(limit || '12', 10);
    const searchQuery = search || '';
    const selectedCategory = category || 'all';
    const currentSortBy = sortBy || 'createdAt';
    const currentSortOrder = sortOrder || 'desc';

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

    if (currentPage > totalPages && totalPages > 0) {
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
        <QuizFiltersClient
          search={search}
          selectedCategory={selectedCategory}
          currentSortBy={currentSortBy}
          currentSortOrder={currentSortOrder}
        />

        {/* Results Summary */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-12">
          <p className="text-sm text-muted-foreground">
            Showing {publicQuizzes.length} of {total} quizzes
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </p>

          {total > 0 && (
            <QuizSortControlsClient
              currentSortBy={currentSortBy}
              currentSortOrder={currentSortOrder}
            />
          )}
        </div>

        {publicQuizzes.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {publicQuizzes.map((quiz, index) => {
              const normalizedCategory = quiz.category.toLowerCase() as keyof typeof quizCategoryColorMap;
              const colors = quizCategoryColorMap[normalizedCategory] || generateFallbackColors(quiz.category);

              const icon = quizCategoryIconMap[normalizedCategory] || generateFallbackIcon(quiz.category);

              return (
                <div
                  key={quiz.id}
                  className={`group overflow-hidden transition-all hover:shadow-xl hover:scale-105 duration-300 ${colors.border} border-2 bg-white dark:bg-gray-900 animate-in fade-in-0 slide-in-from-bottom-4 rounded-lg`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  {/* Cover Image */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                    {quiz.coverImage ? (
                      <Image
                        src={quiz.coverImage}
                        alt={quiz.title}
                        width={1000}
                        height={1000}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20 dark:from-primary/20 dark:to-primary/30">
                        <div className={`p-4 rounded-xl ${colors.accent} ${colors.text} shadow-lg mb-3`}>
                          {icon}
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium text-muted-foreground dark:text-muted-foreground">
                            {quiz.category}
                          </div>
                          <div className="text-xs text-muted-foreground/70 dark:text-muted-foreground/70 mt-1">
                            No cover image
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Overlay with quiz info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-sm bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/30">
                          <Timer className="h-4 w-4" />
                          <span className="font-medium">{quiz.estimatedTime}</span>
                          <span className="mx-1">•</span>
                          <span className="font-medium">{quiz.questions.length} questions</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold leading-tight">{quiz.title}</h3>
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
