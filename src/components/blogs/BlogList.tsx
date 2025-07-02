"use client";

import { useState } from "react";
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
  Link
} from "lucide-react";
import Image from "next/image";
import { BlogPost, categories, searchBlogPosts, getBlogPostsByCategory } from "@/data/blogs";

interface BlogListProps {
  initialPosts: BlogPost[];
}

const BlogList = ({ initialPosts }: BlogListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  
  // Filter posts based on search query and category
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    let filteredPosts: BlogPost[];
    
    if (query.trim()) {
      filteredPosts = searchBlogPosts(query);
    } else {
      filteredPosts = getBlogPostsByCategory(selectedCategory);
    }
    
    setPosts(filteredPosts);
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery("");
    
    if (category === "All Categories") {
      setPosts(initialPosts);
    } else {
      setPosts(getBlogPostsByCategory(category));
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-16">
      <SectionHeader 
        title="InnerPath Blog" 
        subtitle="Insights and guidance for your personal growth journey"
        centered
      />
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-12 mt-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search articles..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Featured Post */}
      {posts.length > 0 && (
        <div className="mb-16">
          <Link href={`/blog/${posts[0].slug}`} className="group">
            <div className="rounded-2xl overflow-hidden bg-card shadow-md hover:shadow-lg transition-shadow">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="h-64 overflow-hidden">
                  <Image 
                    src={posts[0].image} 
                    alt={posts[0].title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    width={800}
                    height={400}
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                        {posts[0].category}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {posts[0].readTime}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {posts[0].title}
                    </h2>
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {posts[0].excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={posts[0].author.avatar} alt={posts[0].author.name} />
                        <AvatarFallback>{posts[0].author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{posts[0].author.name}</p>
                        <p className="text-xs text-muted-foreground">{posts[0].date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{posts[0].comments.length}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>{posts[0].likes}</span>
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
      {posts.length > 1 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(1).map((post) => (
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
                  <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
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
      
      {/* No Results */}
      {posts.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold mb-2">No articles found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search terms or browse all categories
          </p>
          <Button onClick={() => handleCategoryChange("All Categories")}>
            View All Articles
          </Button>
        </div>
      )}
    </div>
  );
};

export default BlogList; 