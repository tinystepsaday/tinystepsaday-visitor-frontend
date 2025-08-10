"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Heart,
  MessageSquare,
  Share2,
  Facebook,
  Linkedin,
  Mail,
  Twitter,
  MessageCircle,
  Bookmark,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { sanitizeHtml } from "@/lib/html-sanitizer";
import type { BlogPost, BlogComment } from "@/lib/types";
import { BlogCommentList } from "./BlogCommentList";
import { BlogCommentForm } from "./BlogCommentForm";
import BlogNavigation from "./BlogNavigation";
import RelatedPosts from "./RelatedPosts";
import {
  usePublicBlogComments,
  useCreateBlogComment,
  useToggleBlogLike,
  useCheckBlogLike
} from "@/lib/api/blog";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BlogPostClientProps {
  post: BlogPost;
}

const BlogPostClient = ({ post }: BlogPostClientProps) => {
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState<{ id: string; email: string; firstName: string; lastName: string; avatar?: string } | null>(null);
  const queryClient = useQueryClient();
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);

  // Ensure component only runs on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only call useAuth when component is fully loaded on client side
  const auth = useAuth();
  
  // Update user state when auth changes
  useEffect(() => {
    if (isClient && auth.user) {
      setUser(auth.user);
    }
  }, [isClient, auth.user]);

  // Always call hooks but handle the data conditionally
  const { data: commentsData, isLoading: apiCommentsLoading } = usePublicBlogComments({
    postId: post.id,
    isApproved: true
  });
  const createCommentMutation = useCreateBlogComment();
  const toggleLikeMutation = useToggleBlogLike();
  const { data: likeData } = useCheckBlogLike(post.id);

  // Update comments when API data changes
  useEffect(() => {
    if (isClient && commentsData) {
      setComments(commentsData.comments || []);
      setCommentsLoading(apiCommentsLoading);
    }
  }, [isClient, commentsData, apiCommentsLoading]);

  // Update likes count when post data changes
  useEffect(() => {
    setLikesCount(post.likesCount || 0);
  }, [post.likesCount]);

  // Update liked state when API data changes
  useEffect(() => {
    if (likeData) {
      setLiked(likeData.liked);
    }
  }, [likeData]);

  // Handle like action
  const handleLike = async () => {
    if (!user) {
      toast("Please log in to like posts");
      return;
    }

    try {
      await toggleLikeMutation.mutateAsync({ postId: post.id });

      // Optimistically update UI
      if (liked) {
        setLikesCount(prev => Math.max(0, prev - 1));
        setLiked(false);
      } else {
        setLikesCount(prev => prev + 1);
        setLiked(true);
      }

      toast(liked ? "Like removed" : "Thanks for your support!");
    } catch {
      toast("Failed to update like. Please try again.");
    }
  };

  // Handle comment submission
  const handleCommentSubmit = async (content: string, parentId?: string) => {
    if (!user) {
      toast("Please log in to comment");
      return;
    }

    try {
      await createCommentMutation.mutateAsync({
        content,
        postId: post.id,
        parentId
      });

      toast(parentId ? "Reply posted successfully!" : "Comment posted successfully!");
      
      // Refresh comments after successful submission
      queryClient.invalidateQueries({ queryKey: ['blogComments', post.id] });
    } catch {
      toast("Failed to post comment. Please try again.");
    }
  };

  // Handle share to social media with enhanced content
  const handleShare = (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const title = post.title;
    const excerpt = post.excerpt || `Check out this article: ${post.title}`;
    const author = post.author.name;

    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`${title} by ${author} - ${excerpt}`)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(`${title} by ${author}`)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(excerpt)}&source=${encodeURIComponent("Tiny Steps A Day")}`;
        break;
      case "whatsapp":
        const whatsappText = `${title} by ${author}\n\n${excerpt}\n\nRead more: ${url}`;
        shareUrl = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;
        break;
      case "pinterest":
        const pinterestDescription = `${title} by ${author} - ${excerpt}`;
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(pinterestDescription)}&media=${encodeURIComponent(post.featuredImage || '')}`;
        break;
      case "email":
        const emailBody = `${title}\n\n${excerpt}\n\nRead more: ${url}\n\nShared from Tiny Steps A Day`;
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(emailBody)}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  // Handle native sharing with enhanced content
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${post.title} at Tiny Steps A Day`,
          text: `${post.excerpt || post.title} by ${post.author.name}. Read more at Tiny Steps A Day.`,
          url: typeof window !== 'undefined' ? window.location.href : '',
        });
      } catch {
        // Fallback to copy link
        handleCopyLink();
      }
    } else {
      // Fallback to copy link
      handleCopyLink();
    }
  };

  // Enhanced share with platform detection
  const handleSmartShare = () => {
    // Check if it's mobile and has native sharing
    if (typeof navigator !== 'undefined' && typeof navigator.share !== 'undefined' && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      handleNativeShare();
    } else {
      // Show social media options for desktop
      // You could add a dropdown or modal here
      handleCopyLink();
    }
  };

  // Copy link to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(typeof window !== 'undefined' ? window.location.href : '');
      toast("Link copied to clipboard!");
    } catch {
      toast("Failed to copy link");
    }
  };

  // Scroll to comments section
  const scrollToComments = () => {
    const commentsSection = document.getElementById('comments-section');
    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: 'smooth' });
    }
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

      {/* Blog Navigation */}
      {post.navigation && (
        <BlogNavigation navigation={post.navigation} />
      )}

      {/* Article Footer */}
      <div className="max-w-4xl mx-auto mb-12">
        <Separator className="mb-8" />

        {isClient ? (
          <div className="flex items-center justify-between md:flex-row flex-col">
            <div className="flex items-center gap-6 mb-4 md:mb-0">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLike}
                    disabled={!isClient || toggleLikeMutation.isPending}
                    className={liked ? "text-red-500 border-red-500" : ""}
                  >
                    <Heart className={`mr-2 h-4 w-4 ${liked ? "fill-current" : ""}`} />
                    {likesCount} {likesCount === 1 ? 'like' : 'likes'}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{liked ? 'Unlike this post' : 'Like this post'}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 text-muted-foreground cursor-pointer" onClick={scrollToComments}>
                    <MessageSquare className="h-4 w-4" />
                    <span>{comments.length} {comments.length === 1 ? 'comment' : 'comments'}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View comments</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center gap-2 md:flex-row flex-col">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={handleSmartShare}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share this article</p>
                </TooltipContent>
              </Tooltip>

              <TooltipProvider>
                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => handleShare("twitter")}>
                        <Twitter className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share on Twitter</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => handleShare("facebook")}>
                        <Facebook className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share on Facebook</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => handleShare("linkedin")}>
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share on LinkedIn</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => handleShare("whatsapp")}>
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share on WhatsApp</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => handleShare("pinterest")}>
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share on Pinterest</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => handleShare("email")}>
                        <Mail className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share via Email</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between md:flex-row flex-col">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Heart className="h-4 w-4" />
                <span>{post.likesCount || 0} {(post.likesCount || 0) === 1 ? 'like' : 'likes'}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                <span>{post.commentsCount || 0} {(post.commentsCount || 0) === 1 ? 'comment' : 'comments'}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Comments Section */}
      <div id="comments-section" className="max-w-4xl mx-auto mb-12">
        <h3 className="text-2xl font-semibold mb-6">Comments ({isClient ? comments.length : (post.commentsCount || 0)})</h3>

        {isClient ? (
          <>
            {/* Comment Form */}
            <BlogCommentForm
              onSubmit={handleCommentSubmit}
            />

            {/* Comments List */}
            {commentsLoading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading comments...</p>
              </div>
            ) : (
              <BlogCommentList
                comments={comments}
                postId={post.id}
                onCommentAdded={() => {
                  // Refresh comments by triggering a refetch
                  queryClient.invalidateQueries({ queryKey: ['blogComments', post.id] });
                }}
              />
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading interactive features...</p>
          </div>
        )}
      </div>

      {/* Related Posts */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <RelatedPosts posts={post.relatedPosts} currentPostId={post.id} />
      )}
    </div>
  );
};

export default BlogPostClient;