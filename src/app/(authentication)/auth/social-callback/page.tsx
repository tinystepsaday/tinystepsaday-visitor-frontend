'use client';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

function SocialCallbackInner() {
  const [isProcessing, setIsProcessing] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuthStore();

  useEffect(() => {
    const processCallback = async () => {
      try {
        const token = searchParams.get('token');
        const refreshToken = searchParams.get('refreshToken');
        const isNewUser = searchParams.get('isNewUser') === 'true';
        const profileCompleted = searchParams.get('profileCompleted') === 'true';

        if (!token || !refreshToken) {
          throw new Error('Missing authentication tokens');
        }

        // Store tokens
        localStorage.setItem('accessToken', token);
        localStorage.setItem('refreshToken', refreshToken);

        // Sync with server
        await fetch('/api/auth/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessToken: token, refreshToken }),
        });

        // Get user data
        const userResponse = await fetch('/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userResponse.json();

        if (userData.success) {
          setUser({
            ...userData.data,
            permissions: [],
            subscriptionTier: 'free',
            subscriptionStatus: 'active',
            subscriptionExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            lastDataSync: new Date().toISOString(),
          });

          toast.success(
            isNewUser ? 'Welcome to Tiny Steps A Day!' : 'Welcome back!',
            {
              description: isNewUser && !profileCompleted 
                ? 'Please complete your profile to get started.'
                : 'You have been successfully signed in.',
            }
          );

          // Redirect based on user state
          if (isNewUser && !profileCompleted) {
            router.push('/onboarding');
          } else {
            router.push('/dashboard');
          }
        } else {
          throw new Error('Failed to get user data');
        }
      } catch (error: unknown) {
        console.error('Social callback error:', error);
        toast.error('Authentication failed', {
          description: (error as Error).message || 'An unexpected error occurred.',
        });
        router.push('/auth/login');
      } finally {
        setIsProcessing(false);
      }
    };

    processCallback();
  }, [searchParams, router, setUser]);

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Processing Authentication</h2>
          <p className="text-muted-foreground">Please wait while we sign you in...</p>
        </div>
      </div>
    );
  }

  return null;
}

export default function SocialCallbackPage() {
  return (
    <Suspense>
      <SocialCallbackInner />
    </Suspense>
  );
}