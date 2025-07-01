"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  BookOpen,
  Calendar,
  Heart,
  Trash2,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock data
const savedItems = [
  {
    id: 1,
    type: "article",
    title: "Finding Inner Peace in a Chaotic World",
    description: "Discover practical methods to maintain calm and balance in today's fast-paced environment.",
    date: "April 15, 2025",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    author: "Sarah Johnson",
    category: "Mindfulness",
    readTime: "5 min read",
    isFavorite: true,
    slug: "finding-inner-peace"
  },
  {
    id: 2,
    type: "article",
    title: "5 Mindful Meditation Techniques for Beginners",
    description: "Start your meditation journey with these simple yet powerful techniques anyone can master.",
    date: "April 10, 2025",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    author: "Michael Chen",
    category: "Meditation",
    readTime: "7 min read",
    isFavorite: false,
    slug: "mindful-meditation-techniques"
  },
  {
    id: 3,
    type: "article",
    title: "Navigating a Successful Career Transition at Any Age",
    description: "Learn how to make a smooth career change regardless of your life stage or background.",
    date: "April 5, 2025",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    author: "Lisa Rodriguez",
    category: "Career",
    readTime: "10 min read",
    isFavorite: true,
    slug: "career-transition-guidance"
  },
  {
    id: 4,
    type: "resource",
    title: "Mindfulness Meditation Guide",
    description: "A comprehensive guide to establishing a daily mindfulness practice with guided audio sessions.",
    date: "March 28, 2025",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    author: "Tiny Steps A Day Team",
    category: "Mindfulness",
    fileType: "PDF",
    fileSize: "2.4 MB",
    isFavorite: false,
    slug: "mindfulness-meditation-guide"
  },
  {
    id: 5,
    type: "article",
    title: "Practical Anxiety Management in High-Pressure Situations",
    description: "Discover effective techniques to manage anxiety when facing high-stakes scenarios.",
    date: "March 20, 2025",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    author: "Jennifer Wright",
    category: "Mental Health",
    readTime: "6 min read",
    isFavorite: true,
    slug: "anxiety-management"
  },
  {
    id: 6,
    type: "resource",
    title: "Career Transition Workbook",
    description: "Interactive workbook with exercises to help you identify your skills, passions, and potential career paths.",
    date: "March 15, 2025",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    author: "Tiny Steps A Day Team",
    category: "Career",
    fileType: "PDF",
    fileSize: "3.7 MB",
    isFavorite: false,
    slug: "career-transition-workbook"
  },
  {
    id: 7,
    type: "article",
    title: "Building Emotional Intelligence for Better Relationships",
    description: "Enhance your emotional intelligence and transform the quality of your personal and professional relationships.",
    date: "March 10, 2025",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    author: "David Wilson",
    category: "Relationships",
    readTime: "8 min read",
    isFavorite: false,
    slug: "emotional-intelligence"
  }
];

const ReadingList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(savedItems);
  const [activeTab, setActiveTab] = useState("all");

  // Filter items based on search and tab
  const filterItems = (query: string, tab: string) => {
    let filteredItems = savedItems;

    // Apply type filter if not "all"
    if (tab === "articles") {
      filteredItems = filteredItems.filter(item => item.type === "article");
    } else if (tab === "resources") {
      filteredItems = filteredItems.filter(item => item.type === "resource");
    } else if (tab === "favorites") {
      filteredItems = filteredItems.filter(item => item.isFavorite);
    }

    // Apply search filter
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filteredItems = filteredItems.filter(item =>
        item.title.toLowerCase().includes(lowercaseQuery) ||
        item.description.toLowerCase().includes(lowercaseQuery) ||
        item.category.toLowerCase().includes(lowercaseQuery) ||
        (item.author && item.author.toLowerCase().includes(lowercaseQuery))
      );
    }

    setItems(filteredItems);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterItems(query, activeTab);
  };

  // Tab change handler
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    filterItems(searchQuery, value);
  };

  // Toggle favorite status
  const toggleFavorite = (id: number) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    setItems(updatedItems);
  };

  // Remove item from reading list
  const removeItem = (id: number) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Reading List</h1>
        <p className="text-muted-foreground">
          Articles and resources you&apos;ve saved for later.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search saved items..."
            className="pl-10"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" onValueChange={handleTabChange}>
        <TabsList className="mb-8">
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <ReadingListItems
            items={items}
            toggleFavorite={toggleFavorite}
            removeItem={removeItem}
          />
        </TabsContent>

        <TabsContent value="articles" className="mt-0">
          <ReadingListItems
            items={items}
            toggleFavorite={toggleFavorite}
            removeItem={removeItem}
          />
        </TabsContent>

        <TabsContent value="resources" className="mt-0">
          <ReadingListItems
            items={items}
            toggleFavorite={toggleFavorite}
            removeItem={removeItem}
          />
        </TabsContent>

        <TabsContent value="favorites" className="mt-0">
          <ReadingListItems
            items={items}
            toggleFavorite={toggleFavorite}
            removeItem={removeItem}
          />
        </TabsContent>
      </Tabs>

      {/* Explore More Content */}
      <div className="mt-16 bg-muted/30 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Discover More Content</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Explore our blog for more articles on mindfulness, career guidance, and personal growth.
        </p>
        <Button size="lg" asChild>
          <Link href="/blog">Visit Our Blog</Link>
        </Button>
      </div>
    </div>
  );
};

// Reading List Items Component
const ReadingListItems = ({
  items,
  toggleFavorite,
  removeItem
}: {
  items: typeof savedItems;
  toggleFavorite: (id: number) => void;
  removeItem: (id: number) => void;
}) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-16 bg-muted/30 rounded-xl">
        <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">No items found</h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your search or explore our blog for interesting content.
        </p>
        <Button asChild>
          <Link href="/blog">Browse Articles</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 h-40 md:h-auto">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:w-3/4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {item.category}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(item.id)}
                        className={item.isFavorite ? "text-rose-500 hover:text-rose-600" : "text-muted-foreground hover:text-rose-500"}
                      >
                        <Heart className={`h-5 w-5 ${item.isFavorite ? "fill-rose-500" : ""}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{item.date}</span>
                    <span className="mx-2">•</span>
                    {item.type === "article" ? (
                      <span>{item.readTime}</span>
                    ) : (
                      <span>{item.fileType} • {item.fileSize}</span>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 sm:mt-0"
                    asChild
                  >
                    {item.type === "article" ? (
                      <Link href={`/blog/${item.slug}`}>
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    ) : (
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        Download
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReadingList;
