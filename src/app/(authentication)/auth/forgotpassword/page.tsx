import { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import AuthFormSkeleton from "@/components/auth/AuthFormSkeleton";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Forgot Password - Tiny Steps A Day",
  description: "Reset your Tiny Steps A Day password. Enter your email address and we'll send you a reset link.",
  keywords: ["forgot password", "reset password", "password recovery", "tiny steps a day"],
  openGraph: {
    title: "Forgot Password - Tiny Steps A Day",
    description: "Reset your Tiny Steps A Day password. Enter your email address and we'll send you a reset link.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Forgot Password - Tiny Steps A Day",
    description: "Reset your Tiny Steps A Day password. Enter your email address and we'll send you a reset link.",
  },
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<AuthFormSkeleton />}>
        <ForgotPasswordForm />
      </Suspense>
    </AuthLayout>
  );
}
