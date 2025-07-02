"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Heart, Compass, MessageSquare, Shield } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-muted py-16 w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-2">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Branding and Newsletter */}
          <div className="md:col-span-5 space-y-6">
            <Logo />
            <p className="text-muted-foreground max-w-sm">
              Guiding you through your journey of self-discovery, growth, and transformation.
            </p>
            
            <div className="space-y-3">
              <h4 className="font-medium">Join our mindful community</h4>
              <div className="flex gap-x-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="max-w-xs rounded-full"
                />
                <Button>Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Get weekly insights and inspiration. No spam, ever.
              </p>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <h4 className="font-medium text-sm uppercase tracking-wider text-muted-foreground">
                  Programs
                </h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link href="/programs" className="text-foreground/80 hover:text-primary transition-colors">
                      1-on-1 Mentorship
                    </Link>
                  </li>
                  <li>
                    <Link href="/programs" className="text-foreground/80 hover:text-primary transition-colors">
                      Group Coaching
                    </Link>
                  </li>
                  <li>
                    <Link href="/programs" className="text-foreground/80 hover:text-primary transition-colors">
                      Intensive Programs
                    </Link>
                  </li>
                  <li>
                    <Link href="/programs" className="text-foreground/80 hover:text-primary transition-colors">
                      Digital Courses
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-sm uppercase tracking-wider text-muted-foreground">
                  Resources
                </h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link href="/blog" className="text-foreground/80 hover:text-primary transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/assessment" className="text-foreground/80 hover:text-primary transition-colors">
                      Self-Assessment
                    </Link>
                  </li>
                  <li>
                    <Link href="/courses" className="text-foreground/80 hover:text-primary transition-colors">
                      Free Resources
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-foreground/80 hover:text-primary transition-colors">
                      Podcast
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-sm uppercase tracking-wider text-muted-foreground">
                  Company
                </h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link href="/about" className="text-foreground/80 hover:text-primary transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-foreground/80 hover:text-primary transition-colors">
                      Our Mission
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-foreground/80 hover:text-primary transition-colors">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-foreground/80 hover:text-primary transition-colors">
                      Testimonials
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-sm uppercase tracking-wider text-muted-foreground">
                  Legal
                </h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link href="/privacy" className="text-foreground/80 hover:text-primary transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-foreground/80 hover:text-primary transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/cookies" className="text-foreground/80 hover:text-primary transition-colors">
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8 border-t border-border">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Tiny Steps A Day Journey. All rights reserved.
            </span>
          </div>
          
          <div className="flex gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Mail className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Compass className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Shield className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
