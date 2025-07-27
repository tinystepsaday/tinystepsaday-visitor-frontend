"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, ArrowRight, Eye } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
  rememberMe: z.boolean().optional()
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  // Get return URL from search params
  const returnUrl = searchParams.get('returnUrl') || '/dashboard';
  
  // Check for existing user in localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const isAlreadyLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (storedUser && isAlreadyLoggedIn) {
      const user = JSON.parse(storedUser);
      
      // Check if user is admin
      if (user.role === 'ADMIN') {
        router.push('/management');
      } else {
        router.push(returnUrl);
      }
    }
  }, [returnUrl, router]);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    
    try {
      const result = await login(data.email, data.password, data.rememberMe);
      
      if (result.success) {
        toast.success("Login successful!", {
          description: "Redirecting...",
        });
        
        // Check if user is admin and redirect accordingly
        // The user will be available in the next render cycle
        setTimeout(() => {
          const currentUser = useAuthStore.getState().user;
          if (currentUser) {
            if (currentUser.role === 'ADMIN') {
              router.push('/management');
            } else {
              router.push(returnUrl);
            }
          }
        }, 100);
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

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);

    
    setTimeout(() => {
      console.log(`Logging in with ${provider}`);
      toast.info("Social login coming soon!", {
        description: "This feature is under development.",
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-background rounded-xl shadow-lg p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
        <p className="text-muted-foreground">
          Sign in to continue your journey
        </p>
      </div>
      
      <div className="space-y-4 mb-6">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => handleSocialLogin("Google")}
          disabled={isLoading}
        >
          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107"/>
            <path d="M3.15302 7.3455L6.43851 9.755C7.32751 7.554 9.48052 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15902 2 4.82801 4.1685 3.15302 7.3455Z" fill="#FF3D00"/>
            <path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5717 17.5742 13.3037 18.001 12 18C9.39897 18 7.19047 16.3415 6.35847 14.027L3.09747 16.5395C4.75247 19.778 8.11347 22 12 22Z" fill="#4CAF50"/>
            <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2"/>
          </svg>
          Continue with Google
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => handleSocialLogin("Apple")}
          disabled={isLoading}
        >
          <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/></svg>
          Continue with Apple
        </Button>
      </div>
      
      <div className="relative mb-6">
        <Separator />
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
          or continue with email
        </span>
      </div>
      
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
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link href="/auth/forgotpassword" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
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
                    <Eye className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" onClick={() => setShowPassword(!showPassword)} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 space-y-0">
                <FormControl>
                  <Input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    title="Remember me for 30 days"
                    placeholder="Remember me for 30 days"
                    checked={field.value}
                    onChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">Remember me</FormLabel>
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </form>
      </Form>
      
      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href={`/auth/signup?returnUrl=${encodeURIComponent(returnUrl)}`} className="text-primary hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
} 