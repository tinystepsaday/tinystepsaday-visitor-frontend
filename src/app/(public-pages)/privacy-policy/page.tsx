import { Metadata } from "next";
import { sharedMetadata } from "../../shared-metadata";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Our comprehensive privacy policy details how we collect, use, and protect your personal information in compliance with GDPR, CCPA, and other privacy regulations.",
  keywords: ["privacy policy", "tinystepsaday", "personal information", "data protection", "GDPR", "CCPA", "privacy rights"],
  openGraph: {
    title: "Privacy Policy | Tiny Steps A Day",
    description: "Our comprehensive privacy policy details how we collect, use, and protect your personal information in compliance with GDPR, CCPA, and other privacy regulations.",
    images: [sharedMetadata.openGraph.images[0]],
    url: `${sharedMetadata.metadataBase}/privacy-policy`,
    siteName: sharedMetadata.openGraph.siteName,
    locale: sharedMetadata.openGraph.locale,
    type: "website",
  },
  twitter: {
    title: "Privacy Policy | Tiny Steps A Day",
    description: "Our comprehensive privacy policy details how we collect, use, and protect your personal information in compliance with GDPR, CCPA, and other privacy regulations.",
    images: [sharedMetadata.twitter.images[0]],
    card: "summary_large_image" as const,
  },
  alternates: {
    canonical: `${sharedMetadata.metadataBase}/privacy-policy`,
  },
  robots: sharedMetadata.robots,
};

export default function PrivacyPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Privacy Policy | Tiny Steps A Day",
    "description": "Our comprehensive privacy policy details how we collect, use, and protect your personal information in compliance with GDPR, CCPA, and other privacy regulations.",
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
      <div className="container max-w-4xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl md:text-4xl text-primary font-bold mb-8 mt-24">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-8">Last updated: July 1, 2025</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4">
              Tiny Steps A Day (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, including our website, mobile applications, and related services (collectively, the &quot;Service&quot;).
            </p>
            <p className="mb-4">
              This Privacy Policy complies with applicable data protection laws, including the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and other relevant privacy regulations.
            </p>
            <p>
              By using our Service, you consent to the data practices described in this Privacy Policy. If you do not agree with our policies and practices, please do not use our Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mb-3">2.1 Personal Information You Provide</h3>
            <p className="mb-3">We collect personal information that you voluntarily provide to us, including:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Account Information:</strong> Name, email address, username, password, profile picture, and biographical information</li>
              <li><strong>Contact Information:</strong> Phone number, mailing address, and emergency contact details</li>
              <li><strong>Payment Information:</strong> Credit card details, billing address, and payment history (processed securely through third-party payment processors)</li>
              <li><strong>Profile Data:</strong> Personal goals, preferences, interests, and wellness objectives</li>
              <li><strong>Communication Data:</strong> Messages, feedback, support requests, and other communications with us</li>
              <li><strong>Social Authentication:</strong> Information from Google, Apple, or other social login providers when you choose to sign in using these services</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">2.2 Information We Collect Automatically</h3>
            <p className="mb-3">When you use our Service, we automatically collect certain information, including:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Device Information:</strong> IP address, device type, operating system, browser type, and device identifiers</li>
              <li><strong>Usage Data:</strong> Pages visited, features used, time spent on the Service, and interaction patterns</li>
              <li><strong>Location Data:</strong> General location information (city/country level) based on IP address</li>
              <li><strong>Cookies and Similar Technologies:</strong> Information stored on your device to enhance your experience</li>
              <li><strong>Log Data:</strong> Server logs, error reports, and performance data</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">2.3 Information from Third Parties</h3>
            <p className="mb-3">We may receive information about you from third parties, including:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Social media platforms when you connect your account</li>
              <li>Payment processors for transaction verification</li>
              <li>Analytics providers for usage insights</li>
              <li>Public databases and directories</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect for the following purposes:</p>
            
            <h3 className="text-xl font-semibold mb-3">3.1 Service Provision</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Create and manage your account</li>
              <li>Provide personalized content, courses, and recommendations</li>
              <li>Process payments and manage subscriptions</li>
              <li>Track your progress and achievements</li>
              <li>Enable community features and social interactions</li>
              <li>Provide customer support and respond to inquiries</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">3.2 Communication</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Send you important service updates and notifications</li>
              <li>Provide educational content and wellness tips</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Respond to your questions and support requests</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">3.3 Improvement and Analytics</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Analyze usage patterns to improve our Service</li>
              <li>Develop new features and functionality</li>
              <li>Conduct research and surveys</li>
              <li>Monitor and prevent fraud and abuse</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">3.4 Legal Compliance</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Comply with applicable laws and regulations</li>
              <li>Respond to legal requests and court orders</li>
              <li>Protect our rights and property</li>
              <li>Enforce our Terms of Service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Legal Basis for Processing (GDPR)</h2>
            <p className="mb-3">Under GDPR, we process your personal data based on the following legal grounds:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Consent:</strong> When you explicitly agree to our processing of your data</li>
              <li><strong>Contract Performance:</strong> To provide the services you have requested</li>
              <li><strong>Legitimate Interest:</strong> To improve our services and prevent fraud</li>
              <li><strong>Legal Obligation:</strong> To comply with applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Information Sharing and Disclosure</h2>
            <p className="mb-4">We do not sell, rent, or trade your personal information to third parties. We may share your information in the following circumstances:</p>
            
            <h3 className="text-xl font-semibold mb-3">5.1 Service Providers</h3>
            <p className="mb-3">We may share your information with trusted third-party service providers who assist us in operating our Service, including:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Payment processors (Stripe, PayPal)</li>
              <li>Cloud hosting providers (AWS, Google Cloud)</li>
              <li>Email service providers</li>
              <li>Analytics and marketing tools</li>
              <li>Customer support platforms</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">5.2 Legal Requirements</h3>
            <p className="mb-3">We may disclose your information if required by law or in response to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Court orders or legal proceedings</li>
              <li>Government requests or investigations</li>
              <li>Protection of our rights and safety</li>
              <li>Prevention of fraud or security threats</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">5.3 Business Transfers</h3>
            <p className="mb-4">In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity, subject to the same privacy protections.</p>

            <h3 className="text-xl font-semibold mb-3">5.4 With Your Consent</h3>
            <p className="mb-4">We may share your information with third parties when you explicitly consent to such sharing.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
            <p className="mb-4">We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction, including:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication measures</li>
              <li>Employee training on data protection</li>
              <li>Incident response procedures</li>
            </ul>
            <p>However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
            <p className="mb-4">We retain your personal information for as long as necessary to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Provide our services to you</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes and enforce agreements</li>
              <li>Improve our services</li>
            </ul>
            <p className="mb-4">When we no longer need your information, we will securely delete or anonymize it. You may request deletion of your account and associated data at any time.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Your Privacy Rights</h2>
            <p className="mb-4">Depending on your location, you may have the following rights regarding your personal information:</p>
            
            <h3 className="text-xl font-semibold mb-3">8.1 Access and Portability</h3>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request a copy of your data in a portable format</li>
              <li>Know how we process your information</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">8.2 Correction and Update</h3>
            <p className="mb-3">You can:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Correct inaccurate or incomplete information</li>
              <li>Update your profile and preferences</li>
              <li>Request data rectification</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">8.3 Deletion and Restriction</h3>
            <p className="mb-3">You may:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Request deletion of your personal information</li>
              <li>Restrict processing of your data</li>
              <li>Withdraw consent for data processing</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">8.4 Objection and Automated Decisions</h3>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Object to processing of your data</li>
              <li>Request human review of automated decisions</li>
              <li>Opt out of marketing communications</li>
            </ul>

            <p className="mb-4">To exercise these rights, please contact us using the information provided below. We will respond to your request within 30 days.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Cookies and Tracking Technologies</h2>
            <p className="mb-4">We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content. For detailed information about our use of cookies, please see our <a href="/cookie-policy" className="text-primary hover:underline">Cookie Policy</a>.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. International Data Transfers</h2>
            <p className="mb-4">Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with applicable laws, including standard contractual clauses and adequacy decisions.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Children&apos;s Privacy</h2>
            <p className="mb-4">Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Changes to This Privacy Policy</h2>
            <p className="mb-4">We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on our website and updating the &quot;Last updated&quot; date. Your continued use of our Service after such changes constitutes acceptance of the updated policy.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
            <p className="mb-4">If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
            <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-800 dark:text-white">
              <p className="mb-2"><strong>Email:</strong> hello@tinystepsaday.com</p>
              <p className="mb-2"><strong>Address:</strong> Kigali, Rwanda</p>
              <p className="mb-2"><strong>Data Protection Officer:</strong> hello@tinystepsaday.com</p>
              <p><strong>Phone:</strong> +250 780 599 859</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">14. Supervisory Authority</h2>
            <p className="mb-4">If you are located in the European Economic Area (EEA), you have the right to lodge a complaint with your local data protection supervisory authority if you believe we have not addressed your concerns adequately.</p>
          </section>
        </div>
      </div>
    </>
  );
}
