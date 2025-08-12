import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, GraduationCap, Compass, ArrowRight } from "lucide-react";
import { SectionHeader } from "../ui/section-header";
import Link from "next/link";

const serviceItems = [
  {
    icon: Users,
    title: "1-on-1 Mentorship",
    description: "Personalized guidance tailored to your unique journey, challenges, and aspirations.",
    link: "/programs#mentorship"
  },
  {
    icon: Shield,
    title: "Mental Health Support",
    description: "Reduce stress, anxiety, and depression, and improve your overall mental health and well-being.",
    link: "/programs#mental-health"
  },
  {
    icon: GraduationCap,
    title: "Career Guidance & Direction",
    description: "Align your career with your purpose and discover fulfilling professional pathways.",
    link: "/programs#career"
  },
  {
    icon: Compass,
    title: "Life Direction",
    description: "Find clarity, purpose, and meaning in your life's journey through structured guidance.",
    link: "/programs#life-direction"
  }
];

const Services = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          title="Our Transformative Perks"
          subtitle="This platform and our team of experts are dedicated to provide you with comprehensive support for your personal and professional growth."
          centered={true}
          isPageHeader={false}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {serviceItems.map((service, index) => (
            <Card 
              key={service.title} 
              className="hover-scale border-2 border-muted h-full flex flex-col bg-card/50"
            >
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {index === 0 && (
                    <>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                        Personalized sessions
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                        Customized growth plans
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                        Ongoing support between sessions
                      </li>
                    </>
                  )}
                  {index === 1 && (
                    <>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                        Emotional resilience building
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                        Stress management techniques
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                        Holistic wellbeing practices
                      </li>
                    </>
                  )}
                  {index === 2 && (
                    <>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                        Skills assessment and development
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                        Career transition planning
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                        Professional identity alignment
                      </li>
                    </>
                  )}
                  {index === 3 && (
                    <>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                        Values and purpose clarification
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                        Decision-making frameworks
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                        Life vision development
                      </li>
                    </>
                  )}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" asChild className="w-full justify-start p-0 hover:bg-primary hover:text-primary-foreground">
                  <Link href={service.link} className="text-primary flex items-center">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Button size="lg" asChild className="rounded-full">
            <Link href="/programs">Explore All Programs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
