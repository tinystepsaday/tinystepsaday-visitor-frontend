"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, ArrowRight, Eye, Key } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { resetPassword } from "@/integration/auth";

const resetPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  resetToken: z.string()
    .length(6, "Reset token must be exactly 6 digits")
    .regex(/^\d{6}$/, "Reset token must contain only digits"),
  newPassword: z.string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." }),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  
  // Extract email and token from URL parameters
  const emailFromParams = searchParams.get('email') || '';
  const tokenFromParams = searchParams.get('token') || '';
  
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: emailFromParams,
      resetToken: tokenFromParams,
      newPassword: "",
      confirmPassword: "",
    }
  });

  // Update form values when URL parameters change
  useEffect(() => {
    if (emailFromParams) {
      form.setValue('email', emailFromParams);
    }
    if (tokenFromParams) {
      form.setValue('resetToken', tokenFromParams);
    }
  }, [emailFromParams, tokenFromParams, form]);

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setIsLoading(true);
    
    try {
      const result = await resetPassword({
        email: data.email,
        resetToken: data.resetToken,
        newPassword: data.newPassword
      });
      
      if (result.success) {
        toast.success("Password reset successfully!", {
          description: "You can now log in with your new password.",
        });
        setIsSubmitted(true);
      } else {
        toast.error("Failed to reset password", {
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
          <h1 className="text-2xl font-bold mb-2">Password Reset Successful!</h1>
          <p className="text-muted-foreground">
            Your password has been reset successfully. You can now log in with your new password.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link href="/auth/login">
            <Button className="w-full">
              Continue to Login
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background rounded-xl shadow-lg p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Reset Your Password</h1>
        <p className="text-muted-foreground">
          {tokenFromParams && emailFromParams 
            ? "Enter your new password below."
            : "Enter your email, reset token, and new password to reset your account."
          }
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-2 hidden">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="name@example.com" 
                      className="pl-10" 
                      {...field} 
                      disabled={isLoading || !!emailFromParams}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="resetToken"
            render={({ field }) => (
              <FormItem className="col-span-2 hidden">
                <FormLabel>Reset Token</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="123456" 
                      className="pl-10" 
                      {...field} 
                      disabled={isLoading || !!tokenFromParams}
                      maxLength={6}
                    />
                  </div>
                </FormControl>
                <div className="text-xs text-muted-foreground mt-1">
                  {tokenFromParams 
                    ? "Reset token loaded from your email link"
                    : "Enter the 6-digit code sent to your email"
                  }
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10"
                      {...field}
                      disabled={isLoading}
                    />
                    <Eye 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer" 
                      onClick={() => setShowPassword(!showPassword)} 
                    />
                  </div>
                </FormControl>
                <div className="text-xs text-muted-foreground mt-1">
                  Must contain at least 8 characters, including uppercase, lowercase, and numbers.
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10"
                      {...field}
                      disabled={isLoading}
                    />
                    <Eye 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer" 
                      onClick={() => setShowPassword(!showPassword)} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Resetting Password..." : "Reset Password"}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </form>
      </Form>
      
      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link href="/auth/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
} 