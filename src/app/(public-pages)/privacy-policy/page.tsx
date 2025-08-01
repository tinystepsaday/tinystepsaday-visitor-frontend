import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Tiny Steps A Day",
  description: "Our privacy policy details how we collect, use, and protect your personal information.",
  keywords: ["privacy policy", "tinystepsaday", "personal information", "data protection"],
  openGraph: {
    title: "Privacy Policy | Tiny Steps A Day",
    description: "Our privacy policy details how we collect, use, and protect your personal information.",
    images: ["/images/privacy.png"],
  },
  twitter: {
    title: "Privacy Policy | Tiny Steps A Day",
    description: "Our privacy policy details how we collect, use, and protect your personal information.",
    images: ["/images/privacy.png"],
  },
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Privacy Policy | Tiny Steps A Day",
    "description": "Our privacy policy details how we collect, use, and protect your personal information.",
    "url": "https://www.tinystepsaday.com/privacy-policy",
    "image": "https://www.tinystepsaday.com/images/privacy.png",
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
        "url": "https://www.tinystepsaday.com/images/privacy.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.tinystepsaday.com/privacy-policy"
    }
  };
  
  return (
    <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="container max-w-3xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl md:text-4xl text-primary font-bold mb-8 mt-24">Privacy Policy</h1>
          <div className="prose prose-lg">
            <p className="text-muted-foreground">Last updated: April 20, 2025</p>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>Payment information</li>
              <li>Course progress and preferences</li>
              <li>Communications with us</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Provide and improve our services</li>
              <li>Process your payments</li>
              <li>Send you updates and marketing communications</li>
              <li>Analyze and enhance our platform</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
            <p>We do not sell your personal information. We may share your information with:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Service providers</li>
              <li>Payment processors</li>
              <li>Legal authorities when required</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
