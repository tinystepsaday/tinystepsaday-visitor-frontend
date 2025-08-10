"use client"

import { cn } from "@/lib/utils";
import { SectionHeader } from "../ui/section-header";

const steps = [
  {
    number: "01",
    title: "Take the Self-Assessment",
    description: "Begin with a comprehensive assessment to understand your current state, challenges, and goals. This will help us understand your needs and goals.",
    color: "from-innerpath-primary/20 to-innerpath-primary/5"
  },
  {
    number: "02",
    title: "Discover Your Path",
    description: "Receive personalized recommendations based on your assessment results and unique needs. This will help you understand your path and how to achieve your goals.",
    color: "from-innerpath-light/20 to-innerpath-light/5"
  },
  {
    number: "03",
    title: "Start Exploring",
    description: "Explore from a plethora of resources, content, insights, streaks, courses, and other helpful products to help you on your journey. With the recommendations, you can start your journey with Tiny Steps A Day.",
    color: "from-innerpath-secondary/20 to-innerpath-secondary/5"
  },
  {
    number: "04",
    title: "Do you want to connect with a mentor?",
    description: "You can do so by requesting a session, we will connect you with one of our mentors. You can also explore our availble subscription options to get access to our resources and support on a better price.",
    color: "from-innerpath-blue/20 to-innerpath-blue/5"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-background w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          title="Your Journey With Tiny Steps A Day"
          subtitle="A simple, structured process designed to guide you towards meaningful transformation"
          centered={true}
          isPageHeader={false}
        />
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              {/* Connect steps with line (except last one) */}
              {/* {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[calc(100%-10px)] w-full h-0.5 bg-muted z-0"></div>
              )} */}
              
              <div className="relative z-10 space-y-6">
                <div className={cn(
                  "w-32 h-32 rounded-3xl flex items-center justify-center bg-gradient-to-br mx-auto lg:mx-0",
                  step.color
                )}>
                  <span className="text-5xl font-bold gradient-text">{step.number}</span>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
