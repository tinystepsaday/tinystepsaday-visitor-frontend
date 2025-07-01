"use client"

import { SectionHeader } from "@/components/ui/section-header";
import Image from "next/image";

const TrustedBy = () => {
  // Create 20 logoipsum logos with different numbers
  const logos = Array.from({ length: 6 }, (_, i) => {
    const logoNum = i + 1;
    return {
      src: `https://logoipsum.com/artwork/${logoNum}`,
      alt: `Partner ${logoNum}`,
    };
  });

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          title="Trusted and Used By"
          subtitle="Organizations where people use our app and those that endorse our transformational approach"
          centered={true}
        />

        <div className="mt-12 text-center">
          <p className="text-muted-foreground max-w-3xl mx-auto mb-12">
            InnerPath Journey is trusted by professionals and organizations worldwide who are committed to personal growth and authentic leadership.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12">
            {logos.map((logo, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={40}
                  className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              </div>
            ))}
          </div>

          <div className="mt-16 max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-bold mb-4">Join these organizations in their transformational journey</h3>
            <p className="text-muted-foreground">
              Our platform is used by leading businesses, educational institutions, healthcare providers, and non-profit organizations committed to fostering well-being and growth among their people.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
