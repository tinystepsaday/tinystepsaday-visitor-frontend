"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { verifyEmail, resendVerificationCode } from "@/integration/auth";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";

const verifyEmailSchema = z.object({
  verificationCode: z.string()
    .length(6, "Verification code must be exactly 6 digits")
    .regex(/^\d{6}$/, "Verification code must contain only digits"),
});

type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;

export default function VerifyAccountForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/dashboard';

  // Extract email from URL parameters
  const emailFromParams = searchParams.get('email') || '';

  const form = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      verificationCode: "",
    }
  });

  // Set email when component mounts
  useEffect(() => {
    if (emailFromParams) {
      setEmail(emailFromParams);
    }
  }, [emailFromParams]);

  // Handle resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const onSubmit = async (data: VerifyEmailFormValues) => {
    if (!email) {
      toast.error("Email address is required");
      return;
    }

    setIsLoading(true);

    try {
      const result = await verifyEmail({
        email: email,
        verificationCode: data.verificationCode
      });

      if (result.success) {
        toast.success("Email verified successfully!", {
          description: "Your account has been activated. You can now log in.",
        });
        setIsSubmitted(true);
      } else {
        toast.error("Email verification failed", {
          description: result.message || "Please check your verification code and try again.",
        });
      }
    } catch {
      toast.error("An unexpected error occurred", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      toast.error("Email address is required");
      return;
    }

    if (resendCooldown > 0) {
      toast.error("Please wait before requesting another code", {
        description: `You can request a new code in ${resendCooldown} seconds.`,
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await resendVerificationCode(email);
      
      if (result.success) {
        toast.success("Verification code sent!", {
          description: "Please check your email for the new verification code.",
        });
        // Set 60-second cooldown
        setResendCooldown(60);
      } else {
        toast.error("Failed to send verification code", {
          description: result.message || "Please try again later.",
        });
      }
    } catch {
      toast.error("An unexpected error occurred", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-background rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Email Verified!</h1>
          <p className="text-muted-foreground">
            Your email has been verified successfully. Your account is now active.
          </p>
        </div>

        <div className="space-y-4">
          <Link href={`/auth/login?returnUrl=${encodeURIComponent(returnUrl)}`}>
            <Button className="w-full">
              Continue to Login
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!email) {
    return (
      <div className="bg-background rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Invalid Verification Link</h1>
          <p className="text-muted-foreground">
            The verification link is missing the email address. Please check your email for the correct link.
          </p>
        </div>

        <div className="space-y-4">
          <Link href={`/auth/login?returnUrl=${encodeURIComponent(returnUrl)}`}>
            <Button variant="outline" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background rounded-xl shadow-lg p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Verify Your Email</h1>
        <p className="text-muted-foreground">
          We&apos;ve sent a verification code to your email address
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
          <FormField
            control={form.control}
            name="verificationCode"
            render={({ field }) => (
              <FormItem className="mx-auto w-full flex flex-col items-center justify-center">
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isLoading}
                    containerClassName="gap-2"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <div className="text-xs text-muted-foreground mt-2">
                  Enter the 6-digit code sent to your email
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || form.watch('verificationCode').length !== 6}
          >
            {isLoading ? "Verifying..." : "Verify Email"}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </form>
      </Form>

      <div className="text-center mt-6 space-y-4">
                <p className="text-sm text-muted-foreground">
          Didn&apos;t receive the code?{" "}
          <button 
            onClick={handleResendCode}
            disabled={isLoading || resendCooldown > 0}
            className={`font-medium flex items-center justify-center gap-1 mx-auto ${
              resendCooldown > 0 
                ? 'text-muted-foreground cursor-not-allowed' 
                : 'text-primary hover:underline'
            }`}
          >
            <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
            {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
          </button>
        </p>

        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            Already verified?{" "}
            <Link href={`/auth/login?returnUrl=${encodeURIComponent(returnUrl)}`} className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 