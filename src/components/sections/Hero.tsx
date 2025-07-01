"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Compass, Lightbulb } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background to-muted pt-32 pb-24">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/30 rounded-full filter blur-3xl opacity-60 animate-pulse-subtle"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200/20 rounded-full filter blur-3xl opacity-60 animate-pulse-subtle"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Hero Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Begin Your Transformative Journey
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Discover Your <span className="gradient-text">Inner Path</span> to Growth and Fulfillment
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-xl">
              Personalized mentorship, guidance, and support to help you navigate life&apos;s challenges and embrace your true potential.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" asChild className="rounded-full">
                <Link href="/assessment">
                  Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild className="rounded-full">
                <Link href="/programs">
                  Explore Programs
                </Link>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">Trusted by seekers and professionals worldwide</p>
              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-primary mr-2" />
                  <span className="text-sm">Safe Space</span>
                </div>
                <div className="flex items-center">
                  <Compass className="h-5 w-5 text-primary mr-2" />
                  <span className="text-sm">Guided Process</span>
                </div>
                <div className="flex items-center">
                  <Lightbulb className="h-5 w-5 text-primary mr-2" />
                  <span className="text-sm">Transformative Results</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Hero Image - Stylized */}
          <div className="relative animate-fade-in">
            <div className="relative z-10 aspect-square max-w-md mx-auto lg:mx-0 lg:ml-auto overflow-hidden rounded-2xl shadow-xl">
              {/* This would be replaced with an actual image in production */}
              {/* <div className="absolute inset-0 bg-gradient-to-br from-innerpath-primary/30 via-innerpath-light/40 to-innerpath-blue/20"></div> */}
              {/* <img src="https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Lorem ipsum" /> */}
              <div className="aspect-square bg-muted flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <Compass className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-medium mb-2">Start Your Journey</h3>
                  <p className="text-muted-foreground">
                    Take our assessment to discover where you are on your path
                  </p>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="hidden lg:block absolute -top-6 -left-12 w-28 h-28 rounded-lg bg-innerpath-green rotate-12"></div>
            <div className="hidden lg:block absolute -bottom-8 right-1/2 w-20 h-20 rounded-full bg-innerpath-peach"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
