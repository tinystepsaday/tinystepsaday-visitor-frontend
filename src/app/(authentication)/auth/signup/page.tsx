import { Metadata } from "next";
import { Suspense } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";
import AuthFormSkeleton from "@/components/auth/AuthFormSkeleton";

export const metadata: Metadata = {
  title: "Sign Up - Tiny Steps A Day",
  description: "Create your Tiny Steps A Day account and begin your transformation journey today.",
  keywords: ["sign up", "register", "create account", "tiny steps a day"],
  openGraph: {
    title: "Sign Up - Tiny Steps A Day",
    description: "Create your Tiny Steps A Day account and begin your transformation journey today.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign Up - Tiny Steps A Day",
    description: "Create your Tiny Steps A Day account and begin your transformation journey today.",
  },
};

export default function SignupPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<AuthFormSkeleton />}>
        <SignupForm />
      </Suspense>
    </AuthLayout>
  );
}