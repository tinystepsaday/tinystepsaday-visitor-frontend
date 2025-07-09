"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  bgClass?: string;
}

const CTASection = ({
  title = "Ready to Begin Your Transformative Journey?",
  subtitle = "Take the first step towards personal growth, clarity, and authentic living.",
  buttonText = "Start Your Journey",
  buttonLink = "/quiz",
  bgClass = "bg-gradient-to-r from-innerpath-primary/20 to-innerpath-blue/20"
}: CTASectionProps) => {
  return (
    <section className={`py-24 ${bgClass} w-full`}>
      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
          {subtitle}
        </p>
        
        <Button size="lg" asChild className="rounded-full">
          <Link href={buttonLink}>
            {buttonText} <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
