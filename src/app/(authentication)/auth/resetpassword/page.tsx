import { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password - Tiny Steps A Day",
  description: "Set your new Tiny Steps A Day password. Create a strong password to secure your account.",
  keywords: ["reset password", "new password", "password change", "tiny steps a day"],
  openGraph: {
    title: "Reset Password - Tiny Steps A Day",
    description: "Set your new Tiny Steps A Day password. Create a strong password to secure your account.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reset Password - Tiny Steps A Day",
    description: "Set your new Tiny Steps A Day password. Create a strong password to secure your account.",
  },
};

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <ResetPasswordForm />
    </AuthLayout>
  );
}
