"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Calendar, 
  Heart,
  MessageSquare,
  Share2
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { sanitizeHtml } from "@/lib/html-sanitizer";
import type { BlogPost } from "@/lib/types";

// Schema for comment form
const commentSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  comment: z.string().min(5, { message: "Comment must be at least 5 characters" })
});

type CommentFormValues = z.infer<typeof commentSchema>;

interface BlogPostClientProps {
  post: BlogPost;
}

const BlogPostClient = ({ post }: BlogPostClientProps) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);

  // Form setup for comments
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      name: "",
      email: "",
      comment: ""
    }
  });

  // Handle like action
  const handleLike = () => {
    if (!liked) {
      setLikesCount(prevCount => prevCount + 1);
      setLiked(true);
      toast("Thanks for your support!");
    } else {
      setLikesCount(prevCount => prevCount - 1);
      setLiked(false);
    }
  };

  // Handle share to social media
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    
    let shareUrl = "";
    
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}`;
        break;
      default:
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }
  };

  // Handle native sharing
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${post.title} at Tiny Steps A Day`,
          text: `Check out this article: ${post.title} at Tiny Steps A Day`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copy link
      navigator.clipboard.writeText(window.location.href);
      toast("Link copied to clipboard!");
    }
  };

  // Handle comment submission
  const onSubmit = (data: CommentFormValues) => {
    console.log("Comment submitted:", data);
    toast("Comment submitted! It will be reviewed and posted soon.");
    form.reset();
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      {/* Article Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-12">
          ← Back to Blog
        </Link>
        <div className="flex items-center gap-2 mb-4">
          {post.category && (
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
              {post.category.name}
            </span>
          )}
          <span className="text-sm text-muted-foreground">
            {post.readTime || 5} min read
          </span>
        </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          {post.title}
        </h1>
        
        {post.excerpt && (
          <p className="text-xl text-muted-foreground mb-8">
            {post.excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between md:flex-row flex-col">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.author.name}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="max-w-4xl mx-auto mb-12">
          <div className="rounded-2xl overflow-hidden">
            <Image 
              src={post.featuredImage} 
              alt={post.title} 
              className="w-full h-auto"
              width={1200}
              height={600}
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <div className="max-w-3xl mx-auto mb-12">
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
        />
      </div>

      {/* Article Footer */}
      <div className="max-w-4xl mx-auto mb-12">
        <Separator className="mb-8" />
        
        <div className="flex items-center justify-between md:flex-row flex-col">
          <div className="flex items-center gap-6">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLike}
              className={liked ? "text-red-500 border-red-500" : ""}
            >
              <Heart className={`mr-2 h-4 w-4 ${liked ? "fill-current" : ""}`} />
              {likesCount} {likesCount === 1 ? 'like' : 'likes'}
            </Button>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageSquare className="h-4 w-4" />
              <span>{post.commentsCount || 0} comments</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:flex-row flex-col">
            <Button variant="outline" size="sm" onClick={handleNativeShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => handleShare("twitter")}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare("facebook")}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare("linkedin")}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare("email")}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <h3 className="text-2xl font-semibold mb-6">Comments ({post.commentsCount || 0})</h3>
        
        {/* Comment Form */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comment</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Share your thoughts..." 
                          {...field} 
                          className="min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Post Comment</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {/* Existing Comments - This would be populated by API */}
        <div className="space-y-6">
          <p className="text-center text-muted-foreground py-8">
            Be the first to comment on this article!
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPostClient; 