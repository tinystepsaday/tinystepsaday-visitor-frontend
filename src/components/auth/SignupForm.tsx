"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Mail, Lock, ArrowRight, Eye, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { 
  googleSignIn, 
  verifyGoogleToken, 
  initializeGoogleAuth,
  appleSignIn,
  initializeAppleAuth 
} from "@/lib/api/socialAuth";

const signupSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." }),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions."
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleAuthReady, setIsGoogleAuthReady] = useState(false);
  const [isAppleAuthReady, setIsAppleAuthReady] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const returnUrl = searchParams.get('returnUrl') || '/dashboard';
  const { signup } = useAuthStore();

  // Initialize social auth providers
  useEffect(() => {
    const initializeSocialAuth = async () => {
      try {
        await initializeGoogleAuth();
        setIsGoogleAuthReady(true);
      } catch (error) {
        console.error('Failed to initialize Google Auth:', error);
      }

      try {
        await initializeAppleAuth();
        setIsAppleAuthReady(true);
      } catch (error) {
        console.error('Failed to initialize Apple Auth:', error);
      }
    };

    initializeSocialAuth();
  }, []);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false
    }
  });

  const setFieldError = (field: string, message: string) => {
    const fieldMap: Record<string, keyof SignupFormValues> = {
      'firstName': 'firstName',
      'lastName': 'lastName',
      'username': 'username',
      'email': 'email',
      'password': 'password'
    };
    
    const mappedField = fieldMap[field];
    if (mappedField) {
      form.setError(mappedField, { message });
    }
  };

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);

    try {
      const result = await signup({
        email: data.email,
        username: data.username,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName
      });

      if (result.success) {
        toast.success("Account created successfully!", {
          description: "Please check your email to verify your account.",
        });
        // Redirect to verify account page with email parameter
        router.push(`/auth/verifyaccount?email=${encodeURIComponent(data.email)}`);
      } else {
        // Handle validation errors
        if (result.message.includes(':')) {
          const errors = result.message.split(', ');
          errors.forEach(error => {
            const [field, message] = error.split(': ');
            if (field && message) {
              setFieldError(field, message);
            }
          });
          toast.error("Please fix the validation errors");
        } else {
          toast.error("Signup failed", {
            description: result.message,
          });
        }
      }
    } catch {
      toast.error("An unexpected error occurred", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    if (!isGoogleAuthReady) {
      toast.error("Google authentication not ready", {
        description: "Please wait a moment and try again.",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await googleSignIn() as { access_token?: string };
      
      if (response.access_token) {
        // Verify the token with our backend
        const authResult = await verifyGoogleToken(response.access_token);
        
        if (authResult.success && authResult.data) {
          // Store tokens and user data
          const { user, token, refreshToken } = authResult.data;
          
          // Update auth store
          useAuthStore.getState().setUser({
            ...user,
            permissions: [],
            subscriptionTier: 'free',
            subscriptionStatus: 'active',
            subscriptionExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            lastDataSync: new Date().toISOString(),
          });
          
          // Store tokens
          localStorage.setItem('accessToken', token);
          localStorage.setItem('refreshToken', refreshToken);
          
          // Sync with server
          await fetch('/api/auth/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accessToken: token, refreshToken }),
          });

          toast.success("Google signup successful!", {
            description: `Welcome to Tiny Steps A Day, ${user.firstName || user.username}!`,
          });

          router.push(returnUrl);
        } else {
          toast.error("Google authentication failed", {
            description: authResult.message,
          });
        }
      }
    } catch (error: unknown) {
      console.error("Google signup error:", error);
      toast.error("Google signup failed", {
        description: (error as Error).message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleSignup = async () => {
    if (!isAppleAuthReady) {
      toast.error("Apple authentication not ready", {
        description: "Please wait a moment and try again.",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await appleSignIn() as { authorization?: unknown };
      
      if (response.authorization) {
        // Handle Apple authentication response
        toast.info("Apple authentication", {
          description: "Apple authentication is being processed...",
        });
        
        // TODO: Implement Apple token verification with backend
        // For now, show a placeholder message
        toast.info("Apple authentication coming soon!", {
          description: "This feature is under development.",
        });
      }
    } catch (error: unknown) {
      console.error("Apple signup error:", error);
      toast.error("Apple signup failed", {
        description: (error as Error).message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background rounded-xl shadow-lg p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
        <p className="text-muted-foreground">
          Begin your transformation journey today
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignup}
          disabled={isLoading || !isGoogleAuthReady}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          ) : (
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107" />
              <path d="M3.15302 7.3455L6.43851 9.755C7.32751 7.554 9.48052 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15902 2 4.82801 4.1685 3.15302 7.3455Z" fill="#FF3D00" />
              <path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5717 17.5742 13.3037 18.001 12 18C9.39897 18 7.19047 16.3415 6.35847 14.027L3.09747 16.5395C4.75247 19.778 8.11347 22 12 22Z" fill="#4CAF50" />
              <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2" />
            </svg>
          )}
          Sign up with Google
        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={handleAppleSignup}
          disabled={isLoading || !isAppleAuthReady}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          ) : (
            <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" /><path d="M10 2c1 .5 2 2 2 5" /></svg>
          )}
          Sign up with Apple
        </Button>
      </div>

      <div className="relative mb-6">
        <Separator />
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
          or sign up with email
        </span>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4 w-full items-center">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="John"
                        className="pl-10"
                        {...field}
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Doe"
                        className="pl-10"
                        {...field}
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="john_doe123"
                      className="pl-10"
                      {...field}
                      disabled={isLoading}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="name@example.com"
                      className="pl-10"
                      {...field}
                      disabled={isLoading}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4 w-full items-start">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
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
                      <Eye className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
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
                  <FormLabel>Confirm Password</FormLabel>
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
                      <Eye className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>


          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex space-x-2 items-center">
                <FormControl>
                  <Input
                    type="checkbox"
                    className="h-4 w-4 mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                    title="I agree to the Terms of Service and Privacy Policy"
                    placeholder="I agree to the Terms of Service and Privacy Policy"
                    checked={field.value}
                    onChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>
                <div className="text-sm">
                  <FormLabel className="font-normal">
                    I agree to the{" "}
                    <Link href="/terms-of-service" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create Account"}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </form>
      </Form>

      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href={`/auth/login?returnUrl=${encodeURIComponent(returnUrl)}`} className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
} 