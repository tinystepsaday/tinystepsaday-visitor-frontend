import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/ui/section-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Heart,
  Search,
  BookOpen,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { 
  getAllBlogPosts, 
  getBlogPostsByCategory, 
  searchBlogPosts, 
  categories,
  type BlogPost 
} from "@/data/blogs";

interface BlogPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    page?: string;
  }>;
}

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const { search, category } = await searchParams;
  const baseTitle = "Blog | Tiny Steps A Day";
  const baseDescription = "Discover insights and guidance for your personal growth journey. Read articles on mindfulness, meditation, career development, relationships, and more.";

  let dynamicTitle = baseTitle;
  let dynamicDescription = baseDescription;

  if (search) {
    dynamicTitle = `Search: ${search} | Tiny Steps A Day`;
    dynamicDescription = `Search results for "${search}" on Tiny Steps A Day. Explore articles on personal growth and more.`;
  } else if (category && category !== "All Categories") {
    dynamicTitle = `${category} Articles | Tiny Steps A Day`;
    dynamicDescription = `Explore ${category} articles on Tiny Steps A Day for insights on personal growth and well-being.`;
  }

  return {
    title: dynamicTitle,
    description: dynamicDescription,
    keywords: [
      "blog",
      "personal growth",
      "mindfulness",
      "meditation",
      "career development",
      "relationships",
      "mental health",
      "spirituality",
      "self-improvement",
      "tiny steps a day",
      ...(category && category !== "All Categories" ? [category.toLowerCase()] : []),
      ...(search ? [search.toLowerCase()] : []),
    ],
    openGraph: {
      title: dynamicTitle,
      description: dynamicDescription,
      url: `https://www.tinystepsaday.com/blog${search || category ? `?${new URLSearchParams({ search: search || "", category: category || "" }).toString()}` : ""}`,
      siteName: "Tiny Steps A Day",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "https://www.tinystepsaday.com/cover-image.jpg",
          width: 1200,
          height: 630,
          alt: "Tiny Steps A Day Blog",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dynamicTitle,
      description: dynamicDescription,
      images: ["https://www.tinystepsaday.com/cover-image.jpg"],
    },
    alternates: {
      canonical: `https://www.tinystepsaday.com/blog${search || category ? `?${new URLSearchParams({ search: search || "", category: category || "" }).toString()}` : ""}`,
    },
  };
}

const POSTS_PER_PAGE = 6;

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { search, category, page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10)) || 1;
  const selectedCategory = category || "All Categories";
  const searchQuery = search || "";

  // Get filtered posts based on search and category
  let filteredPosts: BlogPost[];
  
  if (searchQuery.trim()) {
    filteredPosts = await searchBlogPosts(searchQuery);
  } else if (selectedCategory !== "All Categories") {
    filteredPosts = await getBlogPostsByCategory(selectedCategory);
  } else {
    filteredPosts = await getAllBlogPosts();
  }

  // Calculate pagination
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = Math.min(startIndex + POSTS_PER_PAGE, totalPosts);
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  // Redirect to page 1 if currentPage is invalid or exceeds totalPages
  if (currentPage > totalPages && totalPages > 0) {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedCategory !== "All Categories") params.set("category", selectedCategory);
    params.set("page", "1");
    return notFound(); // Or redirect to page 1
  }

  // Helper function to build URL with search params
  const buildUrl = (newParams: Record<string, string>) => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedCategory !== "All Categories") params.set("category", selectedCategory);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    return `/blog${params.toString() ? `?${params.toString()}` : ""}`;
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <SectionHeader 
        title="Tiny Steps A Day Blog" 
        subtitle="Insights and guidance for your personal growth journey"
        centered
      />
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-12 mt-8">
        <form className="relative flex-grow" method="GET" action="/blog">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            name="search"
            placeholder="Search articles..."
            className="pl-10"
            defaultValue={searchQuery}
          />
          {selectedCategory !== "All Categories" && (
            <input type="hidden" name="category" value={selectedCategory} />
          )}
          <input type="hidden" name="page" value="1" />
        </form>
        
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              asChild
              className="whitespace-nowrap"
            >
              <Link href={buildUrl({ category: cat === "All Categories" ? "" : cat, page: "1" })}>
                {cat}
              </Link>
            </Button>
          ))}
        </div>
      </div>
      
      {/* Featured Post */}
      {paginatedPosts.length > 0 && (
        <div className="mb-16">
          <Link href={`/blog/${paginatedPosts[0].slug}`} className="group">
            <div className="rounded-2xl overflow-hidden bg-card shadow-md hover:shadow-lg transition-shadow">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="h-64 overflow-hidden">
                  <Image 
                    src={paginatedPosts[0].image} 
                    alt={paginatedPosts[0].title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    width={800}
                    height={400}
                    priority
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                        {paginatedPosts[0].category}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {paginatedPosts[0].readTime}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {paginatedPosts[0].title}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {paginatedPosts[0].excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={paginatedPosts[0].author.avatar} alt={paginatedPosts[0].author.name} />
                        <AvatarFallback>{paginatedPosts[0].author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{paginatedPosts[0].author.name}</p>
                        <p className="text-xs text-muted-foreground">{paginatedPosts[0].date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{paginatedPosts[0].comments.length}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>{paginatedPosts[0].likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}
      
      {/* Blog Posts Grid */}
      {paginatedPosts.length > 1 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPosts.slice(1).map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    width={400}
                    height={200}
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback className="text-xs">{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{post.author.name}</p>
                      <p className="text-xs text-muted-foreground">{post.date}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground w-full">
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.comments.length}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 ml-auto">
                      <BookOpen className="h-4 w-4" />
                      <span>Read more</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
      
      {/* Pagination */}
      {totalPages > 1 && paginatedPosts.length > 0 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          {currentPage > 1 && (
            <Button variant="outline" size="sm" asChild>
              <Link href={buildUrl({ page: (currentPage - 1).toString() })}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Link>
            </Button>
          )}
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <Button
                key={pageNum}
                variant={pageNum === currentPage ? "default" : "outline"}
                size="sm"
                asChild
                className="w-10 h-10"
              >
                <Link href={buildUrl({ page: pageNum.toString() })}>
                  {pageNum}
                </Link>
              </Button>
            ))}
          </div>
          
          {currentPage < totalPages && (
            <Button variant="outline" size="sm" asChild>
              <Link href={buildUrl({ page: (currentPage + 1).toString() })}>
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          )}
        </div>
      )}
      
      {/* No Results */}
      {paginatedPosts.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold mb-2">No articles found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search terms or browse all categories
          </p>
          <Button asChild>
            <Link href="/blog">
              View All Articles
            </Link>
          </Button>
        </div>
      )}
      
      {/* Results Summary */}
      {totalPosts > 0 && (
        <div className="text-center mt-8 text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(endIndex, totalPosts)} of {totalPosts} articles
          {(searchQuery || selectedCategory !== "All Categories") && (
            <span>
              {" "}for {searchQuery ? `"${searchQuery}"` : selectedCategory}
            </span>
          )}
        </div>
      )}
    </div>
  );
}