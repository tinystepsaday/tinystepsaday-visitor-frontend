
export default function TermsOfService() {
  return (
    <>
      <div className="container max-w-3xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl md:text-4xl text-primary font-bold mb-8 mt-24">Terms of Service</h1>
        <div className="prose prose-lg">
          <p className="text-muted-foreground">Last updated: April 20, 2025</p>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using InnerPath Journey, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
            <p>You are responsible for:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Maintaining account security</li>
              <li>All activities under your account</li>
              <li>Providing accurate information</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property</h2>
            <p>All content and materials available on InnerPath Journey are protected by intellectual property rights. Users may not:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Copy or distribute content without permission</li>
              <li>Use content for commercial purposes</li>
              <li>Modify or create derivative works</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}