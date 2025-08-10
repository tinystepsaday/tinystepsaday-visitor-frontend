"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {  
  Menu,
  Moon,
  Sun,
  LayoutDashboard,
  X,
  ShoppingBag,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Calendar,
  Heart,
  Lightbulb,
  MessagesSquare,
  Users,
  ArrowRight,
  Briefcase,
  UserRound,
  Home,
  Zap,
  // DollarSign
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import CartDropdown from "./cart/CartDropdown";
import { MainNavigationMenu } from "./MainNavigationMenu";
import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const pathname = usePathname();

  const { isLoggedIn } = useAuthStore();
  const { totalItems } = useCartStore();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setExpandedSections([]);
  }, [pathname]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const mainNavLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Quiz", path: "/quiz", icon: Zap },
    // { name: "Pricing", path: "/pricing", icon: DollarSign }
  ];

  const resourcesDropdown = [
    { name: "Programs", path: "/programs", icon: Lightbulb, description: "Personalized guidance and support" },
    { name: "Courses", path: "/courses", icon: BookOpen, description: "Self-paced learning for personal growth" },
    { name: "Blog", path: "/blog", icon: Lightbulb, description: "Insights and wisdom for your journey" },
    { name: "Events", path: "/events", icon: Calendar, description: "Workshops, retreats, and gatherings" },
    { name: "Streaks", path: "/streaks", icon: Heart, description: "Build positive habits consistently" },
  ];

  const exploreDropdown = [
    { name: "Gallery", path: "/gallery", icon: Users, description: "Inspiration and visual content" },
    { name: "Shop", path: "/shop", icon: ShoppingBag, description: "Wellness products and resources" },
    { name: "Schedule", path: "/schedule", icon: Calendar, description: "Book sessions and consultations" },
    { name: "Community", path: "/community", icon: Users, description: "Connect with like-minded individuals" },
    { name: "Contact", path: "/contact", icon: MessagesSquare, description: "Get in touch with our team" },
  ];

  const aboutDropdown = [
    { name: "About Us", path: "/about", icon: UserRound, description: "Our mission and values" },
    { name: "Careers", path: "/careers", icon: Briefcase, description: "Join our growing team" },
  ];

  const renderMobileMenuItem = (item: { name: string; path: string; icon?: React.ComponentType<{ className?: string }>; description?: string }) => {
    const IconComponent = item.icon;
    return (
      <li key={item.name} className="list-none">
        <Link
          href={item.path}
          className="flex items-center gap-3 p-3 text-foreground/80 hover:text-primary hover:bg-accent/50 rounded-lg transition-colors"
          onClick={() => setIsOpen(false)}
        >
          {IconComponent && <IconComponent className="h-5 w-5 flex-shrink-0" />}
          <div className="flex-1">
            <span className="font-medium">{item.name}</span>
            {item.description && (
              <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
            )}
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
        </Link>
      </li>
    );
  };

  const renderMobileDropdownSection = (
    title: string,
    items: { name: string; path: string; icon?: React.ComponentType<{ className?: string }>; description?: string }[],
    sectionKey: string
  ) => {
    const isExpanded = expandedSections.includes(sectionKey);
    
    return (
      <li key={sectionKey} className="list-none">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="flex items-center justify-between w-full p-3 text-left font-semibold text-foreground hover:bg-accent/50 rounded-lg transition-colors"
        >
          <span>{title}</span>
          {isExpanded ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </button>
        {isExpanded && (
          <ul className="ml-4 mt-2 space-y-1 border-l-2 border-muted pl-4 list-none">
            {items.map(renderMobileMenuItem)}
          </ul>
        )}
      </li>
    );
  };

  return (
    <nav
      className={cn(`${pathname === "/courses/[slug]/learning" ? "hidden" : ""} fixed top-0 w-full z-50 transition-all duration-300 py-4 px-6 md:px-10 ${isScrolled
          ? "bg-background/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
        }`)}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Logo />

        <div className="hidden md:flex items-center justify-center flex-1">
          <MainNavigationMenu
            mainNavLinks={mainNavLinks}
            resourcesDropdown={resourcesDropdown}
            exploreDropdown={exploreDropdown}
            aboutDropdown={aboutDropdown}
          />
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="rounded-full w-9 p-0"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="rounded-full relative"
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping cart"
          >
            <ShoppingBag className="h-4 w-4" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>

          {isLoggedIn ? (
            <Button asChild className="rounded-full">
              <Link href="/dashboard">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            </Button>
          ) : (
            <Button asChild className="rounded-full">
              <Link href="/auth/login">
                Sign In
              </Link>
            </Button>
          )}
        </div>

        <div className="md:hidden flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="rounded-full w-9 p-0"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="rounded-full relative"
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping cart"
          >
            <ShoppingBag className="h-4 w-4" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-sm z-40">
          <div className="h-full overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Main Navigation Links */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Main Navigation
                </h3>
                <ul className="space-y-1 list-none">
                  {mainNavLinks.map(renderMobileMenuItem)}
                </ul>
              </div>

              {/* About Section */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  About
                </h3>
                <ul className="space-y-1 list-none">
                  {aboutDropdown.map(renderMobileMenuItem)}
                </ul>
              </div>

              {/* Resources Section */}
              {renderMobileDropdownSection("Resources", resourcesDropdown, "resources")}

              {/* Explore Section */}
              {renderMobileDropdownSection("Explore", exploreDropdown, "explore")}

              {/* Action Buttons */}
              <div className="pt-6 border-t space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Theme</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleTheme}
                    className="flex items-center gap-2"
                  >
                    {isDark ? (
                      <>
                        <Sun className="h-4 w-4" /> Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="h-4 w-4" /> Dark Mode
                      </>
                    )}
                  </Button>
                </div>

                {isLoggedIn ? (
                  <Button asChild className="w-full rounded-full">
                    <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </Button>
                ) : (
                  <Button asChild className="w-full rounded-full">
                    <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <CartDropdown open={isCartOpen} onOpenChange={setIsCartOpen} />
    </nav>
  );
};

export default Navbar;
