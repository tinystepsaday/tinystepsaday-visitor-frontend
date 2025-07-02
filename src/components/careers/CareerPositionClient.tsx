"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Clock, Building, Calendar, Share2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Career } from "@/data/careers";

interface CareerPositionClientProps {
  career: Career;
  careerId: string;
}

export default function CareerPositionClient({ career, careerId }: CareerPositionClientProps) {
  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: `${career.title} at Tiny Steps A Day Journey`,
        text: `Check out this job opportunity: ${career.title} at Tiny Steps A Day Journey`,
        url: window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast("Link copied to clipboard");
    }
  };

  return (
    <div className="py-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/careers" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to all positions
          </Link>

          <h1 className="text-3xl font-bold mb-4">{career.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
            <div className="flex items-center">
              <Building className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{career.department}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{career.location}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{career.type}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>Posted {new Date(career.postedDate).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button size="lg" asChild>
              <Link href={`/careers/${careerId}/apply`}>
                Apply Now
              </Link>
            </Button>
            <Button size="lg" variant="outline" onClick={handleShareClick}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          <div className="bg-muted/20 text-lg font-medium p-4 rounded-lg">
            Salary range: {career.salary}
          </div>
        </div>

        <Separator className="my-8" />

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Position Overview</h2>
            <p className="text-lg">{career.description}</p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">Responsibilities</h2>
            <ul className="space-y-3 list-disc pl-5">
              {career.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
            <ul className="space-y-3 list-disc pl-5">
              {career.requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">Nice to Have</h2>
            <ul className="space-y-3 list-disc pl-5">
              {career.preferred.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">About Tiny Steps A Day Journey</h2>
            <p className="mb-4">
              Tiny Steps A Day Journey is dedicated to helping people transform their lives through mindfulness and personal growth. 
              Our platform offers courses, coaching, and community support for individuals seeking greater purpose, joy, and connection.
            </p>
            <p>
              We are committed to creating a diverse, equitable, and inclusive workplace. We encourage applications from all qualified individuals, 
              regardless of race, color, religion, gender, sexual orientation, gender identity or expression, age, national origin, disability status, 
              or any other characteristic protected by law.
            </p>
          </section>

          <div className="bg-primary/5 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Ready to Apply?</h2>
            <p className="mb-6">We&apos;d love to hear from you! Click the button below to start your application process.</p>
            <Button size="lg" asChild>
              <Link href={`/careers/${careerId}/apply`}>
                Apply for this Position
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 