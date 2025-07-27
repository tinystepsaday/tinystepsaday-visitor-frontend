import { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import VerifyAccountForm from "@/components/auth/VerifyAccountForm";
import AuthFormSkeleton from "@/components/auth/AuthFormSkeleton";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Verify Email - Tiny Steps A Day",
  description: "Verify your email address to activate your Tiny Steps A Day account.",
  keywords: ["email verification", "verify email", "account activation", "tiny steps a day"],
  openGraph: {
    title: "Verify Email - Tiny Steps A Day",
    description: "Verify your email address to activate your Tiny Steps A Day account.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verify Email - Tiny Steps A Day",
    description: "Verify your email address to activate your Tiny Steps A Day account.",
  },
};

export default function VerifyAccountPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<AuthFormSkeleton />}>  
        <VerifyAccountForm />
      </Suspense>
    </AuthLayout>
  );
} 