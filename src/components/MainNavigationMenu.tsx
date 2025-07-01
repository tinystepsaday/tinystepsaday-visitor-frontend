/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  BookOpen,
  Calendar,
  Heart,
  Lightbulb,
  MessagesSquare,
  Users,
  ArrowRight,
  Briefcase,
  UserRound
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface MainNavigationMenuProps {
  mainNavLinks: { name: string; path: string }[];
  resourcesDropdown: { name: string; path: string }[];
  exploreDropdown: { name: string; path: string }[];
  aboutDropdown: { name: string; path: string }[];
}

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  to?: string;
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  ListItemProps
>(({ className, title, href, children, ...props }, ref) => {
  return (
    <li>
      {href ? (
        <NavigationMenuLink asChild>
          <Link
            href={href}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      ) : (
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      )}
    </li>
  );
});
ListItem.displayName = "ListItem";

export function MainNavigationMenu({ mainNavLinks, resourcesDropdown, exploreDropdown, aboutDropdown }: MainNavigationMenuProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex justify-center">
        {mainNavLinks.map((link) => (
          <NavigationMenuItem key={link.name}>
            <Link href={link.path} className={navigationMenuTriggerStyle()}>
              {link.name}
            </Link>
          </NavigationMenuItem>
        ))}

        <NavigationMenuItem>
          <NavigationMenuTrigger>About</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-3 p-4 md:w-[500px]">
              <div className="flex items-center justify-center mb-3">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?fit=crop&w=500&q=80"
                  alt="Our Team"
                  width={500}
                  height={96}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">About InnerPath Journey</h3>
                <p className="text-sm text-muted-foreground">
                  Discover our mission, our team, and exciting career opportunities
                </p>
              </div>
              <ul className="grid gap-2">
                <li>
                  <Link href="/about" className="flex items-center gap-2 p-2 hover:bg-accent rounded transition-colors">
                    <UserRound className="h-5 w-5 text-primary" />
                    <div>
                      <span className="font-medium">About Us</span>
                      <p className="text-xs text-muted-foreground">Our mission and values</p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="flex items-center gap-2 p-2 hover:bg-accent rounded transition-colors">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <div>
                      <span className="font-medium">Careers</span>
                      <p className="text-xs text-muted-foreground">Join our growing team</p>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/programs"
                  >
                    <Lightbulb className="h-6 w-6 text-primary" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Transformative Programs
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Personalized guidance and support on your journey of growth
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <NavigationMenuItem>
                <ListItem href="/courses" title="Courses">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span>Self-paced learning for personal growth</span>
                  </div>
                </ListItem>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <ListItem href="/blog" title="Blog">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    <span>Insights and wisdom for your journey</span>
                  </div>
                </ListItem>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <ListItem href="/events" title="Events">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>Workshops, retreats, and gatherings</span>
                  </div>
                </ListItem>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <ListItem href="/streaks" title="Streaks">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-primary" />
                    <span>Build positive habits consistently</span>
                  </div>
                </ListItem>
              </NavigationMenuItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-2 lg:w-[700px]">
              <div className="rounded-lg bg-gradient-to-b from-muted/50 to-muted/80 p-4">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  Community
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Connect with others on similar growth journeys
                </p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/community" className="flex items-center justify-between hover:text-primary">
                      <span>Community Forums</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/gallery" className="flex items-center justify-between hover:text-primary">
                      <span>Inspiration Gallery</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/community" className="flex items-center justify-between hover:text-primary">
                      <span>Discussion Groups</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </li>
                </ul>
                <div className="mt-3 pt-3 border-t">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?fit=crop&w=500&q=80"
                    alt="Community"
                    width={500}
                    height={96}
                    className="w-full h-24 object-cover rounded"
                  />
                </div>
              </div>
              <div className="rounded-lg bg-gradient-to-b from-muted/50 to-muted/80 p-4">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <MessagesSquare className="h-5 w-5 mr-2 text-primary" />
                  Support
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Resources and assistance for your journey
                </p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/schedule" className="flex items-center justify-between hover:text-primary">
                      <span>Schedule a Session</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop" className="flex items-center justify-between hover:text-primary">
                      <span>Wellness Products</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="flex items-center justify-between hover:text-primary">
                      <span>Contact Support</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </li>
                </ul>
                <div className="mt-3 pt-3 border-t">
                  <Image
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?fit=crop&w=500&q=80"
                    alt="Support"
                    width={500}
                    height={96}
                    className="w-full h-24 object-cover rounded"
                  />
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}