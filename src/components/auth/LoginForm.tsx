"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Checkbox } from "@/components/ui/checkbox";
// import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { 
  // googleSignIn, 
  // verifyGoogleToken, 
  initializeGoogleAuth,
} from "@/lib/api/socialAuth";
import { getRedirectUrl } from "@/utils/redirectUtils";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [isGoogleAuthReady, setIsGoogleAuthReady] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuthStore();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Initialize social auth providers
  useEffect(() => {
    const initializeSocialAuth = async () => {
      try {
        await initializeGoogleAuth();
        // setIsGoogleAuthReady(true);
      } catch (error) {
        console.error('Failed to initialize Google Auth:', error);
      }
    };

    initializeSocialAuth();
  }, []);

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    
    try {
      const result = await login(data.email, data.password, data.rememberMe);
      
      if (result.success) {
        toast.success("Login successful!", {
          description: "Welcome back!",
        });
        
        // Use the user data returned from the login function
        if (result.user) {
          const redirectUrl = getRedirectUrl(result.user.role as 'USER' | 'ADMIN' | 'SUPER_ADMIN' | 'INSTRUCTOR' | 'MODERATOR', searchParams.get('redirect'), searchParams.get('returnUrl'));
          
          // Use window.location.href for reliable redirect
          if (typeof window !== 'undefined') {
            window.location.href = redirectUrl;
          }
        } else {
          // Fallback to default redirect
          if (typeof window !== 'undefined') {
            window.location.href = '/';
          }
        }
      } else {
        toast.error("Login failed", {
          description: result.message,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // const handleGoogleLogin = async () => {
  //   if (!isGoogleAuthReady) {
  //     toast.error("Google authentication not ready", {
  //       description: "Please wait a moment and try again.",
  //     });
  //     return;
  //   }

  //   setIsLoading(true);
    
  //   try {
  //     const response = await googleSignIn() as { access_token?: string };
      
  //     if (response.access_token) {
  //       // Verify the token with our backend
  //       const authResult = await verifyGoogleToken(response.access_token);
        
  //       if (authResult.success && authResult.data) {
  //         // Store tokens and user data
  //         const { user, token, refreshToken } = authResult.data;
          
  //         // Create user object with enhanced fields
  //         const userWithEnhancedFields = {
  //           ...user,
  //           permissions: [],
  //           subscriptionTier: 'free' as const,
  //           subscriptionStatus: 'active' as const,
  //           subscriptionExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  //           lastDataSync: new Date().toISOString(),
  //         };
          
  //         // Update auth store
  //         useAuthStore.getState().setUser(userWithEnhancedFields);
          
  //         // Store tokens
  //         localStorage.setItem('accessToken', token);
  //         localStorage.setItem('refreshToken', refreshToken);
          
  //         // Sync with server
  //         await fetch('/api/auth/sync', {
  //           method: 'POST',
  //           headers: { 'Content-Type': 'application/json' },
  //           body: JSON.stringify({ accessToken: token, refreshToken }),
  //         });

  //         toast.success("Google login successful!", {
  //           description: `Welcome, ${user.firstName || user.username}!`,
  //         });

  //         // Use the user data directly for redirect
  //         const redirectUrl = getRedirectUrl(user.role as 'USER' | 'ADMIN' | 'SUPER_ADMIN' | 'INSTRUCTOR' | 'MODERATOR', searchParams.get('redirect'), searchParams.get('returnUrl'));
  //         console.log('Google login redirectUrl:', redirectUrl);
          
  //         // Use window.location.href for reliable redirect
  //         window.location.href = redirectUrl;
  //       } else {
  //         toast.error("Google authentication failed", {
  //           description: authResult.message,
  //         });
  //       }
  //     }
  //   } catch (error: unknown) {
  //     console.error("Google login error:", error);
  //     toast.error("Google login failed", {
  //       description: (error as Error).message || "An unexpected error occurred.",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleAppleLogin = async () => {
  //   if (!isAppleAuthReady) {
  //     toast.error("Apple authentication not ready", {
  //       description: "Please wait a moment and try again.",
  //     });
  //     return;
  //   }

  //   setIsLoading(true);
    
  //   try {
  //     const response = await appleSignIn() as { authorization?: unknown };
      
  //     if (response.authorization) {
  //       // Handle Apple authentication response
  //       toast.info("Apple authentication", {
  //         description: "Apple authentication is being processed...",
  //       });
        
  //       // TODO: Implement Apple token verification with backend
  //       // For now, show a placeholder message
  //       toast.info("Apple authentication coming soon!", {
  //         description: "This feature is under development.",
  //       });
  //     }
  //   } catch (error: unknown) {
  //     console.error("Apple login error:", error);
  //     toast.error("Apple login failed", {
  //       description: (error as Error).message || "An unexpected error occurred.",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="bg-background rounded-xl shadow-lg p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
        <p className="text-muted-foreground">
          Sign in to continue your journey
        </p>
      </div>
      
      {/* <div className="space-y-4 mb-6">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handleGoogleLogin}
          disabled={isLoading || !isGoogleAuthReady}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          ) : (
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107"/>
              <path d="M3.15302 7.3455L6.43851 9.755C7.32751 7.554 9.48052 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15902 2 4.82801 4.1685 3.15302 7.3455Z" fill="#FF3D00"/>
              <path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5717 17.5742 13.3037 18.001 12 18C9.39897 18 7.19047 16.3415 6.35847 14.027L3.09747 16.5395C4.75247 19.778 8.11347 22 12 22Z" fill="#4CAF50"/>
              <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2"/>
            </svg>
          )}
          Continue with Google
        </Button>
      </div>
      
      <div className="relative mb-6">
        <Separator />
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
          or continue with email
        </span>
      </div> */}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      placeholder="Enter your password" 
                      className="pl-10 pr-10" 
                      {...field} 
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal">
                      Remember me
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            
            <Button
              type="button"
              variant="link"
              className="px-0 text-sm"
              onClick={() => router.push(`/auth/forgotpassword?returnUrl=${searchParams.get('returnUrl') || '/onboarding'}`)}
              disabled={isLoading}
            >
              Forgot password?
            </Button>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </Form>
      
      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">Don&apos;t have an account? </span>
        <Button
          type="button"
          variant="link"
          className="px-0 text-sm"
          onClick={() => router.push(`/auth/signup?returnUrl=${searchParams.get('returnUrl') || '/onboarding'}`)}
          disabled={isLoading}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
} 