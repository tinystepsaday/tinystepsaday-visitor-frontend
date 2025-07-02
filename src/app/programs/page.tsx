import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
    title: "Programs | Tiny Steps A Day",
    description: "Explore our comprehensive programs offering personalized mentorship, career guidance, mental health support, and life direction services.",
    keywords: ["mentorship programs", "career guidance services", "mental health support", "life coaching", "personal growth programs"],
    openGraph: {
        title: "Programs | Tiny Steps A Day",
        description: "Explore our comprehensive programs offering personalized mentorship, career guidance, mental health support, and life direction services.",
        images: ["/images/programs.png"],
    },
    twitter: {
        title: "Programs | Tiny Steps A Day",
        description: "Explore our comprehensive programs offering personalized mentorship, career guidance, mental health support, and life direction services.",
        images: ["/images/programs.png"],
    },
    alternates: {
        canonical: "/programs",
    },
};

export default function ProgramsPage() {

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Programs | Tiny Steps A Day",
        "description": "Explore our comprehensive programs offering personalized mentorship, career guidance, mental health support, and life direction services.",
        "url": "https://www.tinystepsaday.com/programs",
        "image": "https://www.tinystepsaday.com/images/programs.png",
        "author": {
            "@type": "Person",
            "name": "Tiny Steps A Day",
            "url": "https://www.tinystepsaday.com"
        },
        "publisher": {
            "@type": "Company",
            "name": "Tiny Steps A Day",
            "url": "https://www.tinystepsaday.com",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.tinystepsaday.com/images/programs.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://www.tinystepsaday.com/programs"
        }
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-b from-background to-muted w-full">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Transformative Programs</h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Personalized guidance and support on your journey of growth and transformation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mentorship Program */}
            <section id="mentorship" className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                                1-on-1 Support
                            </div>

                            <SectionHeader
                                title="Personalized Mentorship"
                                subtitle="Dedicated guidance tailored to your unique journey, challenges, and aspirations"
                                isPageHeader={false}
                            />

                            <div className="space-y-6">
                                <p className="text-lg">
                                    Our personalized mentorship program offers a transformative one-on-one experience with a dedicated mentor who will guide you through your unique journey of growth and self-discovery.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Weekly Personalized Sessions</h4>
                                            <p className="text-muted-foreground text-sm">
                                                Regular one-on-one sessions focused on your specific needs, challenges, and goals.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Customized Growth Plan</h4>
                                            <p className="text-muted-foreground text-sm">
                                                A structured yet flexible roadmap tailored to your unique journey and desired outcomes.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Ongoing Support</h4>
                                            <p className="text-muted-foreground text-sm">
                                                Access to resources, practices, and check-ins between your scheduled sessions.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex flex-wrap gap-4">
                                    <Button asChild className="rounded-full">
                                        <Link href="/schedule">
                                            Schedule a Consultation
                                        </Link>
                                    </Button>

                                    <Button variant="outline" asChild className="rounded-full">
                                        <Link href="/assessment">
                                            Take the Assessment First
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-video max-w-md mx-auto overflow-hidden rounded-2xl shadow-xl bg-muted">
                                {/* Placeholder for mentorship image */}
                                <div className="absolute inset-0 bg-gradient-to-br from-innerpath-primary/30 via-innerpath-light/40 to-innerpath-blue/20"></div>
                                <Image
                                    src="https://images.unsplash.com/photo-1516398810565-0cb4310bb8ea?fit=crop&w=800&q=80"
                                    alt="One-on-one mentorship session"
                                    className="w-full h-full object-cover"
                                    width={500}
                                    height={500}
                                />
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -top-6 -right-6 w-28 h-28 rounded-lg bg-innerpath-peach rotate-12 -z-10"></div>
                            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-innerpath-green -z-10"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mental Health Support */}
            <section id="mental-health" className="py-20 bg-muted">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="aspect-video max-w-md mx-auto overflow-hidden rounded-2xl shadow-xl bg-background">
                                {/* Placeholder for mental health image */}
                                <div className="absolute inset-0 bg-gradient-to-bl from-innerpath-secondary/30 via-innerpath-blue/40 to-innerpath-green/20"></div>
                                <Image
                                    src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?fit=crop&w=800&q=80"
                                    alt="Mental health support session"
                                    className="w-full h-full object-cover"
                                    width={500}
                                    height={500}
                                />
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -top-6 -left-6 w-28 h-28 rounded-lg bg-innerpath-blue rotate-12 -z-10"></div>
                            <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-innerpath-light -z-10"></div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <div className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                                Emotional Wellbeing
                            </div>

                            <SectionHeader
                                title="Mental Health Support"
                                subtitle="Navigate emotional challenges with professional support in a safe, confidential space"
                                isPageHeader={false}
                            />

                            <div className="space-y-6">
                                <p className="text-lg">
                                    Our mental health support program offers compassionate guidance to help you navigate emotional challenges, build resilience, and cultivate lasting wellbeing.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Emotional Resilience Building</h4>
                                            <p className="text-muted-foreground text-sm">
                                                Develop skills to navigate difficult emotions and challenges with greater ease and confidence.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Stress Management Techniques</h4>
                                            <p className="text-muted-foreground text-sm">
                                                Practical tools to reduce stress and create sustainable balance in your daily life.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Holistic Wellbeing Practices</h4>
                                            <p className="text-muted-foreground text-sm">
                                                Integrative approaches that address mental, emotional, physical, and spiritual dimensions.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex flex-wrap gap-4">
                                    <Button asChild className="rounded-full">
                                        <Link href="/contact">
                                            Learn More <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Career Guidance */}
            <section id="career" className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                                Professional Development
                            </div>

                            <SectionHeader
                                title="Career Guidance"
                                subtitle="Align your career with your purpose and discover fulfilling professional pathways"
                                isPageHeader={false}
                            />

                            <div className="space-y-6">
                                <p className="text-lg">
                                    Our career guidance services help you discover and create a professional path that aligns with your authentic values, strengths, and vision.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Skills Assessment & Development</h4>
                                            <p className="text-muted-foreground text-sm">
                                                Identify your core strengths and develop skills that align with your professional aspirations.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Career Transition Planning</h4>
                                            <p className="text-muted-foreground text-sm">
                                                Strategic support for navigating career changes with confidence and clarity.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Professional Identity Alignment</h4>
                                            <p className="text-muted-foreground text-sm">
                                                Discover work that resonates with your authentic self and creates meaningful impact.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex flex-wrap gap-4">
                                    <Button asChild className="rounded-full">
                                        <Link href="/contact">
                                            Explore Career Services
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-video max-w-md mx-auto overflow-hidden rounded-2xl shadow-xl bg-muted">
                                {/* Placeholder for career image */}
                                <div className="absolute inset-0 bg-gradient-to-br from-innerpath-green/30 via-innerpath-blue/40 to-innerpath-primary/20"></div>
                                <Image
                                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?fit=crop&w=800&q=80"
                                    alt="Career guidance session"
                                    className="w-full h-full object-cover"
                                    width={500}
                                    height={500}
                                />
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -top-6 -right-6 w-28 h-28 rounded-lg bg-innerpath-light rotate-12 -z-10"></div>
                            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-innerpath-primary/20 -z-10"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Life Direction */}
            <section id="life-direction" className="py-20 bg-muted">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="aspect-video max-w-md mx-auto overflow-hidden rounded-2xl shadow-xl bg-background">
                                {/* Placeholder for life direction image */}
                                <div className="absolute inset-0 bg-gradient-to-bl from-innerpath-peach/30 via-innerpath-primary/40 to-innerpath-blue/20"></div>
                                <div className="w-full h-full flex items-center justify-center">
                                    <Compass className="h-20 w-20 text-primary/50" />
                                </div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -top-6 -left-6 w-28 h-28 rounded-lg bg-innerpath-primary/20 rotate-12 -z-10"></div>
                            <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-innerpath-green -z-10"></div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <div className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                                Purpose & Meaning
                            </div>

                            <SectionHeader
                                title="Life Direction"
                                subtitle="Find clarity, purpose, and meaning in your life's journey through structured guidance"
                                isPageHeader={false}
                            />

                            <div className="space-y-6">
                                <p className="text-lg">
                                    Our life direction program helps you discover your authentic path, clarify your purpose, and create a meaningful vision for your future.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Values & Purpose Clarification</h4>
                                            <p className="text-muted-foreground text-sm">
                                                Discover what truly matters to you and how to align your life accordingly.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Decision-Making Frameworks</h4>
                                            <p className="text-muted-foreground text-sm">
                                                Tools and processes to make aligned choices in moments of uncertainty or transition.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Life Vision Development</h4>
                                            <p className="text-muted-foreground text-sm">
                                                Create a compelling and authentic vision for your life that inspires meaningful action.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex flex-wrap gap-4">
                                    <Button asChild className="rounded-full">
                                        <Link href="/contact">
                                            Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Program Pricing */}
            <section className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <SectionHeader
                        title="Program Packages"
                        subtitle="Flexible options designed to meet you where you are on your journey"
                        centered={true}
                        isPageHeader={false}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                        <div className="border-2 border-muted rounded-xl p-8 bg-card hover-scale">
                            <div className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                                Starter
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Initial Guidance</h3>
                            <div className="text-3xl font-bold mb-6">$199</div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                    </div>
                                    <span>5 blog posts per month</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                    </div>
                                    <span>Basic course access</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                    </div>
                                    <span>Limited streak tracking</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                    </div>
                                    <span>Community forum access</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                    </div>
                                    <span>Email support</span>
                                </li>
                            </ul>
                            <Button variant="outline" asChild className="w-full rounded-full">
                                <Link href="/signup">
                                    Sign Up Free
                                </Link>
                            </Button>
                        </div>

                        <div className="border-2 border-muted rounded-xl p-8 bg-card hover-scale">
                            <div className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                                Starter
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Initial Guidance</h3>
                            <div className="text-3xl font-bold mb-6">$19.99</div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                    </div>
                                    <span>15 blog posts per month</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                    </div>
                                    <span>Full course access</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                    </div>
                                    <span>Complete streak tracking</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                    </div>
                                    <span>Community membership</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                    </div>
                                    <span>2 Mentorship sessions per quarter</span>
                                </li>
                            </ul>
                            <Button variant="outline" asChild className="w-full rounded-full">
                                <Link href="/checkout">
                                    Get Started
                                </Link>
                            </Button>
                        </div>

                        <div className="border-2 border-primary rounded-xl p-8 bg-card relative shadow-lg hover-scale">
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs py-1 px-3 rounded-full">
                                Most Popular
                            </div>
                            <div className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                                Transformation
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Deep Dive</h3>
                            <div className="text-3xl font-bold mb-6">$49.99</div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                    </div>
                                    <span>4 Personalized mentorship sessions</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                    </div>
                                    <span>Comprehensive assessment</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                    </div>
                                    <span>Customized growth plan</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                    </div>
                                    <span>Email support between sessions</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                    </div>
                                    <span>Complete resource library access</span>
                                </li>
                            </ul>
                            <Button asChild className="w-full rounded-full">
                                <Link href="/contact">
                                    Choose This Plan
                                </Link>
                            </Button>
                        </div>

                        <div className="border-2 border-muted rounded-xl p-8 bg-card hover-scale">
                            <div className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                                Complete
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Full Journey</h3>
                            <div className="text-3xl font-bold mb-6">$1,199</div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                    </div>
                                    <span>12 Comprehensive sessions</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                    </div>
                                    <span>In-depth assessments & progress tracking</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                    </div>
                                    <span>Customized transformational roadmap</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                    </div>
                                    <span>Priority support & emergency sessions</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                    </div>
                                    <span>VIP access to all resources & workshops</span>
                                </li>
                            </ul>
                            <Button variant="outline" asChild className="w-full rounded-full">
                                <Link href="/contact">
                                    Get Started
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <CTASection
                title="Begin Your Transformative Journey Today"
                subtitle="Take the first step towards personal growth, clarity, and authentic living with our expert guidance"
                buttonText="Schedule a Free Consultation"
                buttonLink="/contact"
            />
        </>
    );
}
