import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Cookie Policy | Tiny Steps A Day',
  description: 'Comprehensive Cookie Policy for Tiny Steps A Day platform covering user rights, responsibilities, subscriptions, and legal compliance.',
  keywords: ['cookie policy', 'tinystepsaday', 'user agreement', 'legal terms', 'subscription terms', 'platform rules'],
  openGraph: {
    title: 'Cookie Policy | Tiny Steps A Day',
    description: 'Comprehensive Cookie Policy for Tiny Steps A Day platform covering user rights, responsibilities, subscriptions, and legal compliance.',
    images: ["/images/cookies.png"],
  },
  twitter: {
    title: 'Cookie Policy | Tiny Steps A Day',
    description: 'Comprehensive Cookie Policy for Tiny Steps A Day platform covering user rights, responsibilities, subscriptions, and legal compliance.',
    images: ["/images/cookies.png"],
  },
  alternates: {
    canonical: '/cookie-policy',
  },
};

export default function CookiePolicy() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Cookie Policy | Tiny Steps A Day",
    "description": "Comprehensive Cookie Policy for Tiny Steps A Day platform covering user rights, responsibilities, subscriptions, and legal compliance.",
    "url": "https://tinystepsaday.com/cookie-policy",
    "image": "https://www.tinystepsaday.com/images/cookies.png",
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
        "url": "https://www.tinystepsaday.com/images/cookies.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://tinystepsaday.com/cookie-policy"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container max-w-4xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl md:text-4xl text-primary font-bold mb-8 mt-24">Cookie Policy</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-8">Last updated: July 1, 2025</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4">
              This Cookie Policy explains how Tiny Steps A Day (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) uses cookies and similar technologies when you visit our website, use our mobile applications, or interact with our services (collectively, the &quot;Service&quot;).
            </p>
            <p className="mb-4">
              This policy is part of our broader Privacy Policy and should be read in conjunction with it. By using our Service, you consent to our use of cookies in accordance with this Cookie Policy.
            </p>
            <p>
              We are committed to being transparent about our use of cookies and providing you with control over your privacy preferences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. What Are Cookies?</h2>
            <p className="mb-4">
              Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit a website. They help websites remember information about your visit, such as your preferred language and other settings, which can make your next visit easier and more useful.
            </p>
            <p className="mb-4">
              We also use similar technologies such as:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Local Storage:</strong> Data stored in your browser&apos;s local storage</li>
              <li><strong>Session Storage:</strong> Temporary data stored for the duration of your browser session</li>
              <li><strong>Web Beacons:</strong> Small transparent images used to track user behavior</li>
              <li><strong>Pixel Tags:</strong> Tracking pixels used for analytics and advertising</li>
              <li><strong>Device Fingerprinting:</strong> Technology that identifies devices based on their characteristics</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Cookies</h2>
            <p className="mb-4">
              We use cookies and similar technologies for the following purposes:
            </p>
            
            <h3 className="text-xl font-semibold mb-3">3.1 Essential Cookies</h3>
            <p className="mb-3">These cookies are necessary for the Service to function properly and cannot be disabled. They include:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Authentication Cookies:</strong> Keep you logged in and maintain your session</li>
              <li><strong>Security Cookies:</strong> Protect against fraud and ensure secure transactions</li>
              <li><strong>Load Balancing Cookies:</strong> Distribute traffic across our servers</li>
              <li><strong>CSRF Protection:</strong> Prevent cross-site request forgery attacks</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">3.2 Functional Cookies</h3>
            <p className="mb-3">These cookies enhance your experience by remembering your preferences and choices:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Language Preferences:</strong> Remember your preferred language</li>
              <li><strong>Theme Settings:</strong> Store your dark/light mode preference</li>
              <li><strong>Form Data:</strong> Remember information you&apos;ve entered in forms</li>
              <li><strong>User Interface:</strong> Remember your layout and display preferences</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">3.3 Analytics Cookies</h3>
            <p className="mb-3">These cookies help us understand how visitors interact with our Service:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Page Views:</strong> Track which pages are most popular</li>
              <li><strong>User Behavior:</strong> Understand how users navigate our site</li>
              <li><strong>Performance Metrics:</strong> Monitor site speed and functionality</li>
              <li><strong>Error Tracking:</strong> Identify and fix technical issues</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">3.4 Marketing and Advertising Cookies</h3>
            <p className="mb-3">These cookies are used to deliver relevant advertisements and track marketing campaign effectiveness:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Targeted Advertising:</strong> Show you relevant ads based on your interests</li>
              <li><strong>Campaign Tracking:</strong> Measure the effectiveness of our marketing campaigns</li>
              <li><strong>Retargeting:</strong> Show you ads for products you&apos;ve viewed</li>
              <li><strong>Social Media Integration:</strong> Enable sharing and social media features</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Types of Cookies We Use</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">Cookie Name</th>
                    <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">Purpose</th>
                    <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">auth-token</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">Authentication and session management</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">Essential</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <td className="border border-gray-300 dark:border-gray-600 p-3">refresh-token</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">Token refresh for extended sessions</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">Essential</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">theme-preference</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">Dark/light mode preference</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">Functional</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <td className="border border-gray-300 dark:border-gray-600 p-3">language-preference</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">User&apos;s preferred language</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">Functional</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">_ga</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">Google Analytics - distinguish users</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">Analytics</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <td className="border border-gray-300 dark:border-gray-600 p-3">_gid</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">Google Analytics - distinguish users</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">Analytics</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">_fbp</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">Facebook Pixel - advertising</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">Marketing</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <td className="border border-gray-300 dark:border-gray-600 p-3">cookie-consent</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">User&apos;s cookie preferences</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3">Essential</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Third-Party Cookies</h2>
            <p className="mb-4">
              We work with trusted third-party service providers who may also set cookies on your device. These third parties include:
            </p>
            
            <h3 className="text-xl font-semibold mb-3">5.1 Analytics Providers</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Google Analytics:</strong> Website analytics and user behavior tracking</li>
              <li><strong>Mixpanel:</strong> User interaction and feature usage analytics</li>
              <li><strong>Hotjar:</strong> Heatmaps and user session recordings</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">5.2 Advertising Partners</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Google Ads:</strong> Online advertising and remarketing</li>
              <li><strong>Facebook Pixel:</strong> Social media advertising and conversion tracking</li>
              <li><strong>LinkedIn Insight Tag:</strong> Professional network advertising</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">5.3 Social Media Platforms</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Facebook:</strong> Social sharing and authentication</li>
              <li><strong>Twitter:</strong> Social sharing and embedded content</li>
              <li><strong>LinkedIn:</strong> Professional networking integration</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">5.4 Payment Processors</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Stripe:</strong> Payment processing and fraud prevention</li>
              <li><strong>PayPal:</strong> Alternative payment method</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Managing Your Cookie Preferences</h2>
            
            <h3 className="text-xl font-semibold mb-3">6.1 Cookie Consent Banner</h3>
            <p className="mb-3">When you first visit our website, you&apos;ll see a cookie consent banner that allows you to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Accept all cookies</li>
              <li>Reject non-essential cookies</li>
              <li>Customize your cookie preferences</li>
              <li>Learn more about our cookie usage</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">6.2 Browser Settings</h3>
            <p className="mb-3">You can control cookies through your browser settings:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
              <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
              <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">6.3 Mobile Device Settings</h3>
            <p className="mb-3">On mobile devices, you can manage cookies through:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>iOS Safari:</strong> Settings → Safari → Privacy & Security</li>
              <li><strong>Android Chrome:</strong> Settings → Site settings → Cookies</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">6.4 Opt-Out Tools</h3>
            <p className="mb-4">
              You can also opt out of specific third-party cookies:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a></li>
              <li><strong>Facebook:</strong> <a href="https://www.facebook.com/settings?tab=ads" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Facebook Ad Preferences</a></li>
              <li><strong>Digital Advertising Alliance:</strong> <a href="https://optout.aboutads.info/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Your Ad Choices</a></li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Impact of Disabling Cookies</h2>
            <p className="mb-4">
              While you can disable cookies, please be aware that doing so may affect your experience on our Service:
            </p>
            
            <h3 className="text-xl font-semibold mb-3">7.1 Essential Cookies</h3>
            <p className="mb-3">Disabling essential cookies will prevent the Service from functioning properly:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>You may not be able to log in or stay logged in</li>
              <li>Some features may not work correctly</li>
              <li>Security features may be compromised</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">7.2 Functional Cookies</h3>
            <p className="mb-3">Disabling functional cookies may result in:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Loss of your preferences and settings</li>
              <li>Need to re-enter information repeatedly</li>
              <li>Reduced personalization of your experience</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">7.3 Analytics and Marketing Cookies</h3>
            <p className="mb-4">Disabling these cookies may result in:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Less relevant content and recommendations</li>
              <li>Generic advertisements instead of personalized ones</li>
              <li>Reduced ability to improve our services based on usage data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Cookie Retention Periods</h2>
            <p className="mb-4">
              We retain cookies for different periods depending on their purpose:
            </p>
            
            <h3 className="text-xl font-semibold mb-3">8.1 Session Cookies</h3>
            <p className="mb-3">These cookies are deleted when you close your browser:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Authentication tokens (30 minutes)</li>
              <li>Temporary form data</li>
              <li>Navigation state</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">8.2 Persistent Cookies</h3>
            <p className="mb-3">These cookies remain on your device for specified periods:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Preferences (1 year)</li>
              <li>Analytics data (2 years)</li>
              <li>Marketing cookies (3 months to 1 year)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. International Data Transfers</h2>
            <p className="mb-4">
              Some of our third-party service providers may be located outside your country of residence. When cookies are set by these providers, your data may be transferred internationally. We ensure that such transfers comply with applicable data protection laws and include appropriate safeguards.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Updates to This Cookie Policy</h2>
            <p className="mb-4">
              We may update this Cookie Policy from time to time to reflect changes in our practices, technology, or legal requirements. We will notify you of any material changes by posting the updated policy on our website and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
            <p className="mb-4">If you have any questions about our use of cookies or this Cookie Policy, please contact us:</p>
            <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-800 dark:text-white">
              <p className="mb-2"><strong>Email:</strong> hello@tinystepsaday.com</p>
              <p className="mb-2"><strong>Address:</strong> Kigali, Rwanda</p>
              <p className="mb-2"><strong>Phone:</strong> +250 780 599 859</p>
              <p><strong>Website:</strong> https://www.tinystepsaday.com</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Additional Resources</h2>
            <p className="mb-4">For more information about cookies and online privacy, you may find these resources helpful:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><a href="https://www.allaboutcookies.org/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">All About Cookies</a> - Comprehensive information about cookies</li>
              <li><a href="https://www.youronlinechoices.com/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Your Online Choices</a> - European interactive advertising opt-out</li>
              <li><a href="https://www.networkadvertising.org/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Network Advertising Initiative</a> - Digital advertising opt-out</li>
              <li><a href="/privacy-policy" className="text-primary hover:underline">Our Privacy Policy</a> - Complete privacy information</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}