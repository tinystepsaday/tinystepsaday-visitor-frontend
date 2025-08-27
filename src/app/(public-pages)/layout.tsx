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
        declineButtonText="Decline Cookies"
        declineButtonStyle={{ background: 'white', color: '#8984fb', border: '1px solid #8984fb' }}
        cookieName="tinyStepsCookieConsent"
        onAccept={() => setConsentGiven(true)}
        style={{ background: '#fff', color: 'black' }}
        buttonStyle={{ background: '#8984fb', color: '#fff' }}
      >
        This website uses cookies to enhance your experience. 
        {/* Click on the &apos;Accept cookies&apos; button or ignore it to manage our preferences. */}
      </CookieConsent>
      <ConditionalNavbar />
      {children}
      <ConditionalFooter />
    </Providers>
  );
}
