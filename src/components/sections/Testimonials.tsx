"use client"

import { Star, Quote } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { testimonials } from "@/data/testimonials";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { SectionHeader } from "../ui/section-header";
import Image from "next/image";

const Testimonials = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: true })]);

  return (
    <section className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          title="Transformation Stories"
          subtitle="Hear from individuals who have experienced profound shifts through our programs"
          centered={true}
        />

        <div className="mt-16">
          <Carousel ref={emblaRef} className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id}>
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center bg-gradient-to-r from-background to-background/50 rounded-2xl p-8 md:p-12 shadow-sm">
                    <div className="lg:col-span-3 order-2 lg:order-1">
                      <div className="flex mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>

                      <blockquote className="text-xl md:text-2xl font-medium mb-8 italic relative">
                        <Quote className="absolute -top-8 -left-4 h-16 w-16 text-primary/10" />
                        &quot;{testimonial.quote}&quot;
                      </blockquote>

                      <div className="flex items-center">
                        <div>
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-muted-foreground">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-2 order-1 lg:order-2">
                      <div className="aspect-square max-w-xs mx-auto rounded-2xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-primary/10 mix-blend-overlay"></div>
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex" />
            <CarouselNext className="hidden lg:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
