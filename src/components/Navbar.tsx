"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  Moon,
  Sun,
  LayoutDashboard,
  X,
  ShoppingBag,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import CartDropdown from "./cart/CartDropdown";
import { MainNavigationMenu } from "./MainNavigationMenu";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
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

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const mainNavLinks = [
    { name: "Home", path: "/" },
    { name: "Quiz", path: "/quiz" },
    { name: "Pricing", path: "/pricing" }
  ];

  const resourcesDropdown = [
    { name: "Programs", path: "/programs" },
    { name: "Courses", path: "/courses" },
    { name: "Blog", path: "/blog" },
    { name: "Events", path: "/events" },
    { name: "Streaks", path: "/streaks" },
  ];

  const exploreDropdown = [
    { name: "Gallery", path: "/gallery" },
    { name: "Shop", path: "/shop" },
    { name: "Schedule", path: "/schedule" },
    { name: "Community", path: "/community" },
    { name: "Contact", path: "/contact" },
  ];

  const aboutDropdown = [
    { name: "About Us", path: "/about" },
    { name: "Careers", path: "/careers" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 py-4 px-6 md:px-12 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          href="/" 
          className="text-xl md:text-2xl font-bold gradient-text"
        >
          Tiny Steps A Day
        </Link>

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
              <Link href="/login">
                Sign In
              </Link>
            </Button>
          )}
        </div>

        <div className="md:hidden flex items-center space-x-4">
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
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background shadow-md p-4 border-t animate-fade-in">
          <ul className="flex flex-col space-y-4">
            {mainNavLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className="text-foreground/80 hover:text-primary transition-colors block py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            
            <li className="py-2 font-semibold">About</li>
            {aboutDropdown.map((item) => (
              <li key={item.name} className="pl-4">
                <Link
                  href={item.path}
                  className="text-foreground/80 hover:text-primary transition-colors block py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            
            <li className="py-2 font-semibold">Resources</li>
            {resourcesDropdown.map((item) => (
              <li key={item.name} className="pl-4">
                <Link
                  href={item.path}
                  className="text-foreground/80 hover:text-primary transition-colors block py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            
            <li className="py-2 font-semibold">Explore</li>
            {exploreDropdown.map((item) => (
              <li key={item.name} className="pl-4">
                <Link
                  href={item.path}
                  className="text-foreground/80 hover:text-primary transition-colors block py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            <li className="pt-2 border-t">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleTheme}
                className="w-full flex justify-center items-center py-2 mb-2"
              >
                {isDark ? (
                  <>
                    <Sun className="h-4 w-4 mr-2" /> Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4 mr-2" /> Dark Mode
                  </>
                )}
              </Button>
              
              {isLoggedIn ? (
                <Button asChild className="w-full rounded-full">
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
              ) : (
                <Button asChild className="w-full rounded-full">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    Sign In
                  </Link>
                </Button>
              )}
            </li>
          </ul>
        </div>
      )}
      
      <CartDropdown open={isCartOpen} onOpenChange={setIsCartOpen} />
    </nav>
  );
};

export default Navbar;
