import { Metadata } from "next";
import { Suspense } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In - Tiny Steps A Day",
  description: "Sign in to your Tiny Steps A Day account to continue your transformation journey.",
  keywords: ["sign in", "login", "authentication", "tiny steps a day"],
  openGraph: {
    title: "Sign In - Tiny Steps A Day",
    description: "Sign in to your Tiny Steps A Day account to continue your transformation journey.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign In - Tiny Steps A Day",
    description: "Sign in to your Tiny Steps A Day account to continue your transformation journey.",
  },
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
