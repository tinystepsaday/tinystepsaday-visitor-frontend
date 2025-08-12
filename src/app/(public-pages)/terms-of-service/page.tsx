import { Metadata } from "next";
import { sharedMetadata } from "../../shared-metadata";

export const metadata: Metadata = {
  title: 'Terms of Service | Tiny Steps A Day',
  description: 'Comprehensive Terms of Service for Tiny Steps A Day platform covering user rights, responsibilities, subscriptions, and legal compliance.',
  keywords: ['terms of service', 'tinystepsaday', 'user agreement', 'legal terms', 'subscription terms', 'platform rules'],
  openGraph: {
    title: 'Terms of Service | Tiny Steps A Day',
    description: 'Comprehensive Terms of Service for Tiny Steps A Day platform covering user rights, responsibilities, subscriptions, and legal compliance.',
    images: [sharedMetadata.openGraph.images[0]],
    siteName: sharedMetadata.openGraph.siteName,
    locale: sharedMetadata.openGraph.locale,
    type: "website",
    url: `${sharedMetadata.metadataBase}/terms-of-service`,
  },
  twitter: {
    title: 'Terms of Service | Tiny Steps A Day',
    description: 'Comprehensive Terms of Service for Tiny Steps A Day platform covering user rights, responsibilities, subscriptions, and legal compliance.',
    card: "summary_large_image" as const,
    images: [sharedMetadata.twitter.images[0]],
  },
  alternates: {
    canonical: `${sharedMetadata.metadataBase}/terms-of-service`,
  },
  robots: sharedMetadata.robots,
};

export default function TermsOfService() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service | Tiny Steps A Day",
    "description": "Comprehensive Terms of Service for Tiny Steps A Day platform covering user rights, responsibilities, subscriptions, and legal compliance.",
    "url": "https://tinystepsaday.com/terms-of-service",
    "image": "https://www.tinystepsaday.com/images/terms.png",
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
        "url": "https://www.tinystepsaday.com/images/terms.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.tinystepsaday.com/terms-of-service"
    }
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container max-w-4xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl md:text-4xl text-primary font-bold mb-8 mt-24">Terms of Service</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-8">Last updated: July 1, 2025</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction and Acceptance</h2>
            <p className="mb-4">
              Welcome to Tiny Steps A Day (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). These Terms of Service (&quot;Terms&quot;) govern your use of our platform, including our website, mobile applications, and related services (collectively, the &quot;Service&quot;).
            </p>
            <p className="mb-4">
              By accessing or using our Service, you agree to be bound by these Terms and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this Service.
            </p>
            <p>
              These Terms constitute a legally binding agreement between you and Tiny Steps A Day. We reserve the right to modify these Terms at any time, and such modifications will be effective immediately upon posting on our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
            <p className="mb-4">
              Tiny Steps A Day is a comprehensive wellness and personal development platform that provides:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Educational courses and content on mindfulness, wellness, and personal growth</li>
              <li>Interactive quizzes and assessments for self-discovery</li>
              <li>Community features for connecting with like-minded individuals</li>
              <li>Streak tracking and habit formation tools</li>
              <li>Event management and booking services</li>
              <li>E-commerce platform for wellness products</li>
              <li>Career opportunities and job postings</li>
              <li>Blog and educational content</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts and Registration</h2>
            
            <h3 className="text-xl font-semibold mb-3">3.1 Account Creation</h3>
            <p className="mb-3">To access certain features of our Service, you must create an account. You agree to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and update your account information to keep it accurate and current</li>
              <li>Protect the security of your account credentials</li>
              <li>Accept responsibility for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">3.2 Account Security</h3>
            <p className="mb-3">You are responsible for:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Maintaining the confidentiality of your password and account information</li>
              <li>All activities that occur under your account</li>
              <li>Ensuring that your account information is accurate and up-to-date</li>
              <li>Logging out of your account at the end of each session</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">3.3 Account Termination</h3>
            <p className="mb-4">
              We reserve the right to terminate or suspend your account at any time for violations of these Terms or for any other reason at our sole discretion. You may also terminate your account at any time by contacting us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Subscription and Payment Terms</h2>
            
            <h3 className="text-xl font-semibold mb-3">4.1 Subscription Plans</h3>
            <p className="mb-3">We offer various subscription tiers:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Free Tier:</strong> Basic access to limited features and content</li>
              <li><strong>Starter Plan:</strong> Enhanced features and content access</li>
              <li><strong>Transformation Plan:</strong> Premium features and personalized content</li>
              <li><strong>Complete Plan:</strong> Full access to all features and exclusive content</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">4.2 Payment Terms</h3>
            <p className="mb-3">By subscribing to our Service, you agree to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Pay all fees associated with your chosen subscription plan</li>
              <li>Provide accurate billing and payment information</li>
              <li>Authorize us to charge your payment method for recurring fees</li>
              <li>Pay applicable taxes on your subscription</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">4.3 Billing and Renewal</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Subscriptions automatically renew unless cancelled before the renewal date</li>
              <li>Fees are charged in advance on a monthly or annual basis</li>
              <li>Price changes will be communicated 30 days in advance</li>
              <li>Failed payments may result in service suspension</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">4.4 Cancellation and Refunds</h3>
            <p className="mb-3">You may cancel your subscription at any time:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Cancellation takes effect at the end of your current billing period</li>
              <li>No refunds for partial months or unused portions</li>
              <li>Refunds may be provided at our discretion for extenuating circumstances</li>
              <li>Access to premium features ends immediately upon cancellation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. User Conduct and Prohibited Activities</h2>
            
            <h3 className="text-xl font-semibold mb-3">5.1 Acceptable Use</h3>
            <p className="mb-3">You agree to use our Service only for lawful purposes and in accordance with these Terms. You may not:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Use the Service for any illegal or unauthorized purpose</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Use automated systems to access the Service</li>
              <li>Share your account credentials with others</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">5.2 Community Guidelines</h3>
            <p className="mb-3">When participating in our community features, you agree to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Be respectful and supportive of other users</li>
              <li>Not post harmful, offensive, or inappropriate content</li>
              <li>Not spam or engage in commercial solicitation</li>
              <li>Not impersonate others or provide false information</li>
              <li>Respect intellectual property rights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property Rights</h2>
            
            <h3 className="text-xl font-semibold mb-3">6.1 Our Intellectual Property</h3>
            <p className="mb-3">The Service and its original content, features, and functionality are owned by Tiny Steps A Day and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. This includes:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Course content and educational materials</li>
              <li>Software, code, and technical implementations</li>
              <li>Brand names, logos, and trademarks</li>
              <li>Design elements and user interface</li>
              <li>Proprietary algorithms and methodologies</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">6.2 License to Use</h3>
            <p className="mb-3">We grant you a limited, non-exclusive, non-transferable, and revocable license to use our Service for personal, non-commercial purposes, subject to these Terms.</p>

            <h3 className="text-xl font-semibold mb-3">6.3 User-Generated Content</h3>
            <p className="mb-3">You retain ownership of content you create and share on our platform. By posting content, you grant us a license to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Display and distribute your content within our Service</li>
              <li>Use your content for promotional purposes (with attribution)</li>
              <li>Modify or adapt your content as necessary for platform functionality</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">6.4 Prohibited Uses</h3>
            <p className="mb-4">You may not:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Copy, reproduce, or distribute our content without permission</li>
              <li>Create derivative works based on our content</li>
              <li>Use our content for commercial purposes</li>
              <li>Remove or alter copyright notices or trademarks</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Privacy and Data Protection</h2>
            <p className="mb-4">
              Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our Service, you consent to our collection and use of information as described in our Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Disclaimers and Limitations of Liability</h2>
            
            <h3 className="text-xl font-semibold mb-3">8.1 Service Availability</h3>
            <p className="mb-4">
              We strive to provide a reliable and secure Service, but we cannot guarantee that the Service will be uninterrupted, error-free, or secure. We reserve the right to modify, suspend, or discontinue the Service at any time.
            </p>

            <h3 className="text-xl font-semibold mb-3">8.2 Content Accuracy</h3>
            <p className="mb-4">
              While we strive to provide accurate and helpful information, we do not guarantee the accuracy, completeness, or usefulness of any content on our Service. The content is provided for educational and informational purposes only.
            </p>

            <h3 className="text-xl font-semibold mb-3">8.3 Health and Wellness Disclaimer</h3>
            <p className="mb-4">
              Our Service provides educational content related to wellness and personal development. This content is not intended as medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical concerns.
            </p>

            <h3 className="text-xl font-semibold mb-3">8.4 Limitation of Liability</h3>
            <p className="mb-4">
              To the maximum extent permitted by law, Tiny Steps A Day shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or relating to your use of the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Indemnification</h2>
            <p className="mb-4">
              You agree to indemnify, defend, and hold harmless Tiny Steps A Day and its officers, directors, employees, and agents from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys&apos; fees) arising out of or relating to your use of the Service or violation of these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Third-Party Services and Links</h2>
            <p className="mb-4">
              Our Service may contain links to third-party websites or services that are not owned or controlled by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that we shall not be responsible or liable for any damage or loss caused by the use of such third-party services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Termination</h2>
            <p className="mb-4">
              These Terms are effective until terminated by either party. You may terminate these Terms by discontinuing your use of the Service and deleting your account. We may terminate these Terms at any time without notice if you fail to comply with any provision of these Terms. Upon termination, your right to use the Service will cease immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Governing Law and Dispute Resolution</h2>
            
            <h3 className="text-xl font-semibold mb-3">12.1 Governing Law</h3>
            <p className="mb-4">
              These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
            </p>

            <h3 className="text-xl font-semibold mb-3">12.2 Dispute Resolution</h3>
            <p className="mb-4">
              Any disputes arising out of or relating to these Terms or the Service shall be resolved through binding arbitration in accordance with the rules of [Arbitration Organization]. The arbitration shall be conducted in [City, State], and the decision of the arbitrator shall be final and binding.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Severability</h2>
            <p className="mb-4">
              If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall be enforced to the fullest extent possible.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">14. Entire Agreement</h2>
            <p className="mb-4">
              These Terms, together with our Privacy Policy and any other agreements referenced herein, constitute the entire agreement between you and Tiny Steps A Day regarding the use of our Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">15. Contact Information</h2>
            <p className="mb-4">If you have any questions about these Terms of Service, please contact us:</p>
            <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-800 dark:text-white">
              <p className="mb-2"><strong>Email:</strong> hello@tinystepsaday.com</p>
              <p className="mb-2"><strong>Address:</strong> Kigali, Rwanda</p>
              <p className="mb-2"><strong>Phone:</strong> +250 780 599 859</p>
              <p><strong>Website:</strong> https://www.tinystepsaday.com</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}