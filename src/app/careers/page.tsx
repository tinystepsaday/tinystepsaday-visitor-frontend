import { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import Image from "next/image";
import { Heart, Sparkles, Globe, Users, Lightbulb, Coffee } from "lucide-react";
import CareerList from "@/components/careers/CareerList";

export const metadata: Metadata = {
  title: "Careers | Tiny Steps A Day Journey",
  description: "Join our team of mindfulness coaches, content creators, and product designers to create transformative experiences that empower people to live with greater purpose, joy, and connection.",
  keywords: ["tiny steps a day", "tiny steps", "a day", "actionable steps", "improve your life", "personal growth", "self improvement", "daily habits", "tips", "strategies", "small changes", "big improvements", "start your journey to a better you today", "personal growth", "self improvement", "daily habits", "tips", "strategies", "meditation", "mindfulness", "mindfulness meditation", "mindfulness practice", "mindfulness exercises", "mindfulness techniques", "mindfulness tips", "mindfulness strategies", "spirituality", "career guidance", "career development", "career advice", "career tips", "career strategies", "career planning", "love", "the law of one", "the law of attraction", "the law of abundance", "the law of prosperity", "the law of success", "mental health", "life direction", "purpose", "mentorship"],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Careers | Tiny Steps A Day Journey",
    description: "Join our team of mindfulness coaches, content creators, and product designers to create transformative experiences that empower people to live with greater purpose, joy, and connection.",
    images: ["https://www.tinystepsaday.com/banner-image.jpg"],
    url: "https://www.tinystepsaday.com",
    siteName: "Tiny Steps A Day Journey",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers | Tiny Steps A Day Journey",
    description: "Join our team of mindfulness coaches, content creators, and product designers to create transformative experiences that empower people to live with greater purpose, joy, and connection.",
    images: ["https://www.tinystepsaday.com/banner-image.jpg"],
  },
  alternates: {
    canonical: "https://www.tinystepsaday.com/careers",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,  
      follow: true,
    },
  },
  metadataBase: new URL("https://www.tinystepsaday.com"),
};

const careersData = [
  {
    id: "mindfulness-coach",
    title: "Mindfulness Coach",
    department: "Coaching",
    location: "Remote",
    type: "Full-time",
    postedDate: "2025-04-01",
    summary: "Guide clients through our mindfulness programs and provide personalized support on their journey."
  },
  {
    id: "content-writer",
    title: "Content Writer",
    department: "Content",
    location: "Remote",
    type: "Full-time",
    postedDate: "2025-04-05",
    summary: "Create engaging and insightful content for our blog, courses, and programs."
  },
  {
    id: "ux-designer",
    title: "UX Designer",
    department: "Product",
    location: "Hybrid (San Francisco)",
    type: "Full-time",
    postedDate: "2025-04-10",
    summary: "Design intuitive and engaging user experiences for our web and mobile applications."
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    postedDate: "2025-04-15",
    summary: "Build beautiful, responsive, and accessible user interfaces for our platform."
  },
  {
    id: "community-manager",
    title: "Community Manager",
    department: "Community",
    location: "Remote",
    type: "Full-time",
    postedDate: "2025-04-18",
    summary: "Nurture and grow our community of users, facilitating connections and engagement."
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Tiny Steps A Day Journey",
  "url": "https://www.tinystepsaday.com",
  "description": "Join our team of mindfulness coaches, content creators, and product designers to create transformative experiences that empower people to live with greater purpose, joy, and connection.",
  "image": "https://www.tinystepsaday.com/banner-image.jpg",
  "sameAs": [
    "https://x.com/tiny_steps_aday",
    "https://www.instagram.com/tiny_steps_aday/",
    "https://www.facebook.com/tiny_steps_aday/",
    "https://www.youtube.com/@tiny_steps_aday/",
  ],
  "author": {
    "@type": "Person",
    "name": "Tiny Steps A Day Journey",
    "url": "https://www.tinystepsaday.com",
  },
  "publisher": {
    "@type": "Organization",
    "name": "Tiny Steps A Day Journey",
    "url": "https://www.tinystepsaday.com",
  },
  "isPartOf": {
    "@type": "WebSite",
    "name": "Tiny Steps A Day Journey",
    "url": "https://www.tinystepsaday.com",
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "url": "https://www.tinystepsaday.com/careers",
  },
};

const Careers = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="py-16 md:py-20 px-6 md:px-12 w-full">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Join Our Team"
            subtitle="Help us create transformative experiences that empower people to live with greater purpose, joy, and connection."
            centered={true}
          />

          {/* Hero Image */}
          <div className="relative h-80 md:h-96 w-full mb-16 rounded-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="Our team collaborating"
              width={1440}
              height={600}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end">
              <div className="p-8">
                <p className="text-xl md:text-2xl font-medium text-white">
                  We&apos;re on a mission to help people transform their lives through mindfulness and personal growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30 w-full">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Why Join Tiny Steps A Day Journey"
            subtitle="Work with purpose and passion in a supportive, innovative environment"
            centered={true}
            isSectionHeader={false}
            className="text-primary"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Meaningful Work</h3>
              <p className="text-muted-foreground">
                Make a positive impact on people&apos;s lives through our transformative programs and products.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Growth Oriented</h3>
              <p className="text-muted-foreground">
                Continuous learning opportunities with mentorship programs and education stipends.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Remote First</h3>
              <p className="text-muted-foreground">
                Work from anywhere with flexible hours and a focus on work-life balance.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Inclusive Culture</h3>
              <p className="text-muted-foreground">
                A diverse and supportive team that values every individual&apos;s unique perspective.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 w-full">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Benefits & Perks"
            subtitle="We take care of our team so they can take care of themselves and our users"
            centered={true}
            isSectionHeader={false}
          />

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-muted/20 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Lightbulb className="h-6 w-6 mr-2 text-primary" />
                Health & Wellness
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mr-3 mt-1">•</span>
                  <span>Comprehensive health, dental, and vision insurance</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mr-3 mt-1">•</span>
                  <span>Mental health benefits and resources</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mr-3 mt-1">•</span>
                  <span>Monthly wellness stipend for gym memberships, massages, etc.</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mr-3 mt-1">•</span>
                  <span>Generous paid time off and sick leave</span>
                </li>
              </ul>
            </div>

            <div className="bg-muted/20 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Coffee className="h-6 w-6 mr-2 text-primary" />
                Work & Life
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mr-3 mt-1">•</span>
                  <span>Flexible work hours and remote-first environment</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mr-3 mt-1">•</span>
                  <span>Home office stipend for comfortable remote work setup</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mr-3 mt-1">•</span>
                  <span>Professional development budget for courses and conferences</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mr-3 mt-1">•</span>
                  <span>Quarterly team retreats for connection and collaboration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 bg-muted/30 w-full">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Open Positions"
            subtitle="We're always looking for talented individuals who are passionate about our mission."
            centered={true}
            isSectionHeader={false}
          />
          <CareerList careersData={careersData} />
        </div>
      </section>
    </>
  );
};

export default Careers;
