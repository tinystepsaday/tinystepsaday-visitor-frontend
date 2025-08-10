"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BlogPostNavigation } from "@/lib/types";

interface BlogNavigationProps {
  navigation: BlogPostNavigation;
}

const BlogNavigation = ({ navigation }: BlogNavigationProps) => {
  const { previous, next } = navigation;

  if (!previous && !next) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Next Post */}
        {next && (
          <div className="group hover:shadow-lg transition-all duration-300 border-r-4 border-r-primary p-4 border border-border">
            <div className="">
              <Link href={`/blog/${next.slug}`} className="block">
                <div className="flex items-center justify-end gap-3 mb-3">
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Next Post
                  </span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors text-right">
                  {next.title}
                </h4>
              </Link>
            </div>
          </div>
        )}
        
        {/* Previous Post */}
        {previous && (
          <div className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary p-4 border border-border">
            <div className="">
              <Link href={`/blog/${previous.slug}`} className="block">
                <div className="flex items-center gap-3 mb-3">
                  <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Previous Post
                  </span>
                </div>
                <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {previous.title}
                </h4>                
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogNavigation;
