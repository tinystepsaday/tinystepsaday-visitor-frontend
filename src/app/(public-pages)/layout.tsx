'use client';

import ConditionalNavbar from "@/components/ConditionalNavbar";
import ConditionalFooter from "@/components/ConditionalFooter";
import Providers from "@/components/providers";
import Script from 'next/script';
import CookieConsent from 'react-cookie-consent';
import { useState } from 'react';

export default function PublicPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [consentGiven, setConsentGiven] = useState(false);
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-491Q5ZW28Y';

  return (
    <Providers>
      {consentGiven && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `,
            }}
          />
        </>
      )}
      <CookieConsent
        location="bottom"
        buttonText="Accept Cookies"
        cookieName="tinyStepsCookieConsent"
        onAccept={() => setConsentGiven(true)}
        style={{ background: '#fff' }}
        buttonStyle={{ color: '#8984fb', background: '#fff' }}
      >
        This website uses cookies to enhance your experience and track usage via Google Analytics.
      </CookieConsent>
      <ConditionalNavbar />
      {children}
      <ConditionalFooter />
    </Providers>
  );
}
