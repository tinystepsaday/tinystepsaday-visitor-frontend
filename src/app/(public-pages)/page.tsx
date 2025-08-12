import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import { QuizSection } from "@/components/sections/QuizSection";
import HowItWorks from "@/components/sections/HowItWorks";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import Testimonials from "@/components/sections/Testimonials";
// import TrustedBy from "@/components/sections/TrustedBy";
import CTASection from "@/components/sections/CTASection";
import LatestBlogPosts from "@/components/home/LatestBlogPosts";
import { featuredProducts } from "@/data/featuredProducts";
import { featuredCourses } from "@/data/featuredCourses";

export const metadata: Metadata = {
  title: "Tiny Steps A Day | Actionable steps and daily habits to improve your life",
  description: "Tiny Steps A Day is a source of actionable steps and daily habits to improve your life. Discover daily habits, tips, and strategies to make small changes that lead to big improvements. Start your journey to a better you today.",
  keywords: ["tiny steps a day", "tiny steps", "a day", "actionable steps", "improve your life", "personal growth", "self improvement", "daily habits", "tips", "strategies", "small changes", "big improvements", "start your journey to a better you today", "personal growth", "self improvement", "daily habits", "tips", "strategies", "meditation", "mindfulness", "mindfulness meditation", "mindfulness practice", "mindfulness exercises", "mindfulness techniques", "mindfulness tips", "mindfulness strategies", "spirituality", "career guidance", "career development", "career advice", "career tips", "career strategies", "career planning", "love", "the law of one", "the law of attraction", "the law of abundance", "the law of prosperity", "the law of success", "mental health", "life direction", "purpose", "mentorship"],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Tiny Steps A Day | Actionable steps and daily habits to improve your life",
    description: "Tiny Steps A Day is a source of actionable steps and daily habits to improve your life. Discover daily habits, tips, and strategies to make small changes that lead to big improvements. Start your journey to a better you today.",
    images: ["https://www.tinystepsaday.com/banner-image.jpg"],
    url: "https://www.tinystepsaday.com",
    siteName: "Tiny Steps A Day",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tiny Steps A Day | Actionable steps and daily habits to improve your life",
    description: "Tiny Steps A Day is a source of actionable steps and daily habits to improve your life. Discover daily habits, tips, and strategies to make small changes that lead to big improvements. Start your journey to a better you today.",
    images: ["https://www.tinystepsaday.com/banner-image.jpg"],
  },
  alternates: {
    canonical: "https://www.tinystepsaday.com",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Tiny Steps A Day",
  url: "https://www.tinystepsaday.com",
  description: "Tiny Steps A Day is a source of actionable steps and daily habits to improve your life. Discover daily habits, tips, and strategies to make small changes that lead to big improvements. Start your journey to a better you today.",
  image: "https://www.tinystepsaday.com/banner-image.jpg",
  sameAs: [
    "https://x.com/tiny_steps_aday",
    "https://www.instagram.com/tiny_steps_aday/",
    "https://www.facebook.com/tiny_steps_aday/",
    "https://www.youtube.com/@tiny_steps_aday/",
  ],
  author: {
    "@type": "Person",
    name: "Tiny Steps A Day",
    url: "https://www.tinystepsaday.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Tiny Steps A Day",
    url: "https://www.tinystepsaday.com",
  },
  isPartOf: {
    "@type": "WebSite",
    name: "Tiny Steps A Day",
    url: "https://www.tinystepsaday.com",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    url: "https://www.tinystepsaday.com",
  },
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Services />

      {/* Services Inspiration Section */}
      {/* <section className="py-20 bg-gradient-to-b from-purple-50/50 to-transparent dark:from-purple-900/10 w-full">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">Transform Your Journey</h2>
          <div className="prose dark:prose-invert mx-auto text-left space-y-6">
            <p>
              Tiny Steps A Day was born from a profound personal realization that true transformation doesn&apos;t happen through grand gestures or overnight changes, but through the consistent practice of small, intentional habits that compound over time into profound character shifts and ultimately, a completely new way of life. My journey began during a period of intense burnout and disconnection since my childhood through my adulthood and while working as a software developer, where the relentless pace of modern life left little room for self-reflection and authentic growth.
            </p>

            <p>
              Through personal experimentation and deep introspection, I discovered that the most overlooked habits, those tiny, seemingly insignificant daily practices were actually the keys to unlocking lasting change. Rather than trying to overhaul my entire life at once, I began creating small tools and systems that supported my growth while allowing me to continue my daily responsibilities. This approach of working with the grain of life, rather than against it, became the foundation of our platform.
            </p>

            <p>
              Our philosophy centers on accessing the deep root causes of our current situations, our behaviors, fears, insecurities, and limiting beliefs and then working with tiny but decisive steps toward transformation. We believe that by understanding the &ldquo;why&rdquo; behind our patterns, we can create sustainable change through consistent micro-actions. This is where our innovative streak system comes into play, providing a structured way to build positive habits through daily check-ins, progress tracking, and community support.
            </p>

            <p>
              The platform offers a comprehensive ecosystem of growth resources including insightful blog posts that explore the psychology of change, practical e-books that provide actionable frameworks, downloadable cheatsheets for quick reference, and immersive audio-books for learning on-the-go. These resources work together synergistically to provide a wholesome growth support experience that addresses the mind, body, and spirit. Whether you&apos;re looking to build mindfulness practices, improve relationships, navigate career transitions, or develop emotional intelligence, our approach ensures that every step, no matter how small, moves you closer to your authentic self and the life you truly desire.
            </p>
            <div className="flex justify-end">
              <em className="text-lg text-muted-foreground"><span className="font-bold">Jean Eric Hirwa</span>, the founder of Tiny Steps A Day</em>
            </div>
          </div>
        </div>
      </section> */}

      <QuizSection />
      <HowItWorks />

      {/* Featured Courses Section */}
      {featuredCourses.length > 0 && <section className="py-20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-2">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Courses</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Embark on a transformative learning journey with our most popular courses
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg border bg-background shadow-md transition-all hover:shadow-lg">
                <div className="aspect-video w-full overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={400}
                    height={250}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold mb-2">{course.title}</h3>
                  <p className="text-muted-foreground mb-4">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{course.price}</span>
                    <span className="text-sm text-muted-foreground">{course.duration}</span>
                  </div>
                </div>
                <Link
                  href="/courses"
                  className="absolute inset-0"
                  aria-label={`Learn more about ${course.title}`}
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/courses">
                Explore All Courses
              </Link>
            </Button>
          </div>
        </div>
      </section>}

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && <section className="py-20 bg-muted/30 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enhance your journey with our carefully selected tools and resources
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg border bg-background">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    height={100}
                    width={100}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2">{product.title}</h3>
                  <p className="font-semibold">{product.price}</p>
                </div>
                <Link
                  href="/shop"
                  className="absolute inset-0"
                  aria-label={`View ${product.title}`}
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/shop">
                Visit Shop
              </Link>
            </Button>
          </div>
        </div>
      </section>}

      {/* Latest Blog Posts Section */}
      <LatestBlogPosts />

      {/* Book Waitlist Section */}
      {/* <section className="py-20 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Coming Soon: &quot;The Tiny Steps A Day to Authentic Living&quot;
                </h2>
                <p className="text-muted-foreground mb-6">
                  A transformative guide to discovering your true self and living with purpose. This groundbreaking book combines ancient wisdom with practical exercises to help you navigate life&apos;s challenges and unlock your full potential.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2" />
                    Practical mindfulness techniques
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2" />
                    Personal transformation exercises
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2" />
                    Real-life success stories
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2" />
                    Guided self-discovery journeys
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="max-w-sm"
                  />
                  <Button size="lg">
                    Join Waitlist
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Be the first to know when the book launches and receive exclusive pre-order bonuses.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-lg transform rotate-3" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg transform -rotate-3" />
                <Image
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?fit=crop&w=800&q=80"
                  alt="Book preview"
                  width={500}
                  height={200}
                  className="relative rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <Testimonials />
      {/* <TrustedBy /> */}
      <CTASection />
    </>
  )
}