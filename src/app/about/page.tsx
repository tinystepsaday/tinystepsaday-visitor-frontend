import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Sparkles, Compass, Users, Globe, MessageCircle, Zap, Lightbulb } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TeamMembers from "@/components/sections/TeamMembers";

export const metadata = {
  title: "About | Tiny Steps A Day Journey",
  description: "Learn more about Tiny Steps A Day Journey and the people behind it.",
  keywords: ["tiny steps a day", "tiny steps", "a day", "actionable steps", "improve your life", "personal growth", "self improvement", "daily habits", "tips", "strategies", "small changes", "big improvements", "start your journey to a better you today", "personal growth", "self improvement", "daily habits", "tips", "strategies", "meditation", "mindfulness", "mindfulness meditation", "mindfulness practice", "mindfulness exercises", "mindfulness techniques", "mindfulness tips", "mindfulness strategies", "spirituality", "career guidance", "career development", "career advice", "career tips", "career strategies", "career planning", "love", "the law of one", "the law of attraction", "the law of abundance", "the law of prosperity", "the law of success", "mental health", "life direction", "purpose", "mentorship"],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "About | Tiny Steps A Day Journey",
    description: "Learn more about Tiny Steps A Day Journey and the people behind it.",
    images: ["https://www.tinystepsaday.com/banner-image.jpg"],
    url: "https://www.tinystepsaday.com",
    siteName: "Tiny Steps A Day Journey",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Tiny Steps A Day Journey",
    description: "Learn more about Tiny Steps A Day Journey and the people behind it.",
    images: ["https://www.tinystepsaday.com/banner-image.jpg"],
  },
  alternates: {
    canonical: "https://www.tinystepsaday.com/about",
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

// Team member data
const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    bio: "With over 15 years of experience in mindfulness coaching and organizational psychology, Sarah founded Tiny Steps A Day Journey to help people discover their authentic selves and live with greater purpose.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Michael Chen",
    role: "Chief Product Officer",
    bio: "Michael brings his background in UX design and behavioral science to create transformative digital experiences that make personal growth accessible and engaging for everyone.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Aisha Patel",
    role: "Head of Coaching",
    bio: "A certified mindfulness instructor and therapist, Aisha oversees our coaching programs and ensures they meet the highest standards of practice and care.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "David Rodriguez",
    role: "Chief Technology Officer",
    bio: "David leverages his expertise in software engineering and AI to build the technological foundation that supports our users' personal growth journeys.",
    image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Emily Wong",
    role: "Content Director",
    bio: "As an author and meditation teacher, Emily creates and curates our educational content, ensuring it's both scientifically grounded and accessible.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "James Wilson",
    role: "Community Manager",
    bio: "James fosters connections within our community, creating spaces for sharing, support, and collective growth among our members.",
    image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Olivia Martinez",
    role: "Research Lead",
    bio: "With a PhD in positive psychology, Olivia keeps our approaches aligned with the latest research in wellbeing, habit formation, and personal growth.",
    image: "https://images.unsplash.com/photo-1598550874175-4d0ef131c1b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Nathan Lee",
    role: "Operations Director",
    bio: "Nathan ensures our organization runs smoothly and sustainably, allowing us to focus on our mission of helping people transform their lives.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Tiny Steps A Day Journey",
  "url": "https://www.tinystepsaday.com",
  "description": "Learn more about Tiny Steps A Day Journey and the people behind it.",
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
    "url": "https://www.tinystepsaday.com/about",
  },
};

const About = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Our Mission</h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6">
                At Tiny Steps A Day Journey, we&apos;re dedicated to helping people discover their authentic selves and live with greater purpose, joy, and connection.
              </p>
              <p className="text-lg mb-8">
                Through evidence-based programs, expert guidance, and supportive community, we empower individuals to transform their lives from the inside out.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <Link href="/programs">
                    Explore Our Programs <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">
                    Get in Touch
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="Our team collaborating"
                width={500}
                height={400}
                className="rounded-lg shadow-lg w-full h-[400px] object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg">
                <p className="text-sm font-medium">Founded in 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-6 md:px-12 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Our Story"
            subtitle="How Tiny Steps A Day Journey was born from a personal transformation"
            centered={true}
            isPageHeader={false}
          />

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="col-span-1">
              <div className="aspect-square rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1620228885847-9eab2a1adddc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80"
                  alt="Founder's journey"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-2 space-y-6">
              <p className="text-lg">
                Tiny Steps A Day Journey began in 2020 when our founder, Sarah Johnson, experienced her own transformative journey through mindfulness and personal development practices after a period of burnout and disconnection.
              </p>
              <p className="text-lg">
                After 15 years in corporate consulting, Sarah realized that many people were struggling with the same challenges: feeling disconnected from their purpose, overwhelmed by the pace of modern life, and unsure how to create meaningful change.
              </p>
              <p className="text-lg">
                Drawing on her background in organizational psychology and her training in mindfulness practices, Sarah assembled a team of experts to create accessible, science-backed programs that would help people navigate their own inner paths to growth and fulfillment.
              </p>
              <p className="text-lg">
                Today, Tiny Steps A Day Journey has grown from a small startup to a global community, but our mission remains the same: to guide people toward lives of greater authenticity, purpose, and connection.
              </p>

              <div className="pt-6">
                <Button asChild variant="outline">
                  <Link href="/blog">
                    Read Sarah&apos;s Story on Our Blog
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Our Values"
            subtitle="The core principles that guide everything we do"
            centered={true}
            isPageHeader={false}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-card shadow-sm p-6 rounded-lg border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Compassion</h3>
              <p className="text-muted-foreground">
                We approach every interaction with kindness, understanding, and care for the whole person.
              </p>
            </div>

            <div className="bg-card shadow-sm p-6 rounded-lg border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Compass className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Authenticity</h3>
              <p className="text-muted-foreground">
                We champion honesty, transparency, and the courage to be truly ourselves in all we do.
              </p>
            </div>

            <div className="bg-card shadow-sm p-6 rounded-lg border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Growth</h3>
              <p className="text-muted-foreground">
                We embrace continuous learning and evolution, both for ourselves and those we serve.
              </p>
            </div>

            <div className="bg-card shadow-sm p-6 rounded-lg border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-muted-foreground">
                We believe in the power of connection and creating supportive environments for shared growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 px-6 md:px-12 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Our Approach"
            subtitle="How we help you transform your life"
            centered={true}
            isPageHeader={false}
          />

          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <div>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-primary" />
                  Evidence-Based
                </h3>
                <p className="text-muted-foreground">
                  Our programs combine the wisdom of ancient practices with the latest research in psychology, neuroscience, and behavioral change. We&apos;re committed to approaches that have been shown to create lasting transformation.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-primary" />
                  Personalized
                </h3>
                <p className="text-muted-foreground">
                  We recognize that each person&apos;s journey is unique. Our programs adapt to your specific needs, challenges, and goals, offering customized guidance rather than one-size-fits-all solutions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-primary" />
                  Holistic
                </h3>
                <p className="text-muted-foreground">
                  We address the whole person—mind, body, heart, and spirit—recognizing that true growth and well-being come from integrating all aspects of ourselves into a coherent, purposeful life.
                </p>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-6">
                <Image
                  src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80"
                  alt="Mindfulness practice"
                  width={300}
                  height={200}
                  className="rounded-lg h-full w-full object-cover"
                />
                <Image
                  src="https://images.unsplash.com/photo-1472162072942-cd5147eb3902?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80"
                  alt="Personal growth"
                  width={300}
                  height={200}
                  className="rounded-lg h-full w-full object-cover"
                />
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80"
                  alt="Community support"
                  width={300}
                  height={200}
                  className="rounded-lg h-full w-full object-cover"
                />
                <Image
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80"
                  alt="Personal coaching"
                  width={300}
                  height={200}
                  className="rounded-lg h-full w-full object-cover"
                />
              </div>

              <div className="mt-8">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-primary" />
                    Practical & Actionable
                  </h3>
                  <p className="text-muted-foreground">
                    We focus on practical tools and practices that you can integrate into your daily life, creating sustainable habits that lead to lasting change and growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Meet Our Team"
            subtitle="The passionate individuals behind Tiny Steps A Day Journey"
            centered={true}
            isPageHeader={false}
          />

          <TeamMembers teamMembers={teamMembers} />

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold mb-4">Join Our Team</h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
              We&rsquo;re always looking for talented individuals who are passionate about our mission.
              Check out our open positions and become part of our journey.
            </p>
            <Button size="lg" asChild>
              <Link href="/careers">
                View Open Positions <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
