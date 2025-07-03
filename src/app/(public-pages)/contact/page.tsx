import { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { NewsletterSubscription } from "@/components/contact/NewsletterSubscription";
import { getContactFAQs, getContactInfo } from "@/data/contact";
import { sharedMetadata } from "../../shared-metadata";

export const metadata: Metadata = {
  title: "Contact Us | Tiny Steps A Day",
  description: "Get in touch with our team for mentorship inquiries, support, or general questions about our programs and courses. We're here to help you on your journey to personal growth.",
  keywords: [
    "contact us",
    "get in touch",
    "mentorship inquiries",
    "support",
    "help",
    "questions",
    "customer service",
    "contact form",
    "email support",
    "phone support"
  ],
  openGraph: {
    title: "Contact Us | Tiny Steps A Day",
    description: "Get in touch with our team for mentorship inquiries, support, or general questions about our programs and courses.",
    url: `${sharedMetadata.metadataBase}/contact`,
    images: ["https://www.tinystepsaday.com/cover-image.jpg"],
    siteName: sharedMetadata.openGraph.siteName,
    locale: sharedMetadata.openGraph.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Contact Us | Tiny Steps A Day",
    description: "Get in touch with our team for mentorship inquiries, support, or general questions about our programs and courses.",
    images: ["https://www.tinystepsaday.com/cover-image.jpg"],
  },
  alternates: {
    canonical: `${sharedMetadata.metadataBase}/contact`,
  },
  robots: sharedMetadata.robots,
};

export default function ContactPage() {
  const faqs = getContactFAQs();
  const contactInfo = getContactInfo();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Us",
    description: "Get in touch with our team for mentorship inquiries, support, or general questions about our programs and courses.",
    url: `${sharedMetadata.metadataBase}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: "Tiny Steps A Day",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+250 780 599 859",
          contactType: "customer service",
          availableLanguage: "English",
        },
        {
          "@type": "ContactPoint",
          email: "hello@tinystepsaday.com",
          contactType: "customer service",
          availableLanguage: "English",
        }
      ],
    },
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <SectionHeader 
        title="Get in Touch" 
        subtitle="We're here to answer your questions and help you on your journey"
        centered
      />
      
      <div className="grid md:grid-cols-2 gap-12 mt-12 max-w-5xl mx-auto">
        {/* Contact Form */}
        <div>
          <ContactForm />
        </div>
        
        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <p className="text-muted-foreground mb-6">
              Have questions or need support? Reach out to us through any of these channels.
            </p>
            
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    {info.icon === "Mail" && <Mail className="h-5 w-5 text-primary" />}
                    {info.icon === "MessageSquare" && <MessageSquare className="h-5 w-5 text-primary" />}
                    {info.icon === "Phone" && <Phone className="h-5 w-5 text-primary" />}
                  </div>
                  <div>
                    <h4 className="font-medium">{info.title}</h4>
                    <p className="text-muted-foreground">
                      {info.link ? (
                        <a href={info.link} className="hover:text-primary transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        info.value
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {info.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <NewsletterSubscription />
        </div>
      </div>
      
      {/* FAQs Section */}
      <div className="mt-20">
        <SectionHeader 
          title="Frequently Asked Questions" 
          subtitle="Find quick answers to common questions"
          centered
        />
        
        <div className="mt-10 max-w-3xl mx-auto">
          <div className="grid gap-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-2">{faq.question}</h4>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
