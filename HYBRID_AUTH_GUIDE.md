# Hybrid Authentication System Guide

This guide explains how to use the hybrid authentication system that supports both server-side rendering (SSR) and client-side rendering while maintaining SEO capabilities and proper security.

## Overview

The hybrid authentication system provides:

1. **Server-side authentication** using HTTP-only cookies for SSR
2. **Client-side authentication** using localStorage for client-side operations
3. **Automatic token synchronization** between client and server
4. **SEO-friendly server components** with proper metadata generation
5. **Role-based access control** for protected routes
6. **Automatic token refresh** and session management

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client Side   │    │   Server Side   │    │   API Routes    │
│                 │    │                 │    │                 │
│ localStorage    │◄──►│ HTTP-only       │◄──►│ /api/auth/sync  │
│ (accessToken)   │    │ cookies         │    │                 │
│                 │    │ (auth-token)    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Key Components

### 1. Server-Side Authentication (`/lib/auth/server.ts`)

Handles authentication in server components and API routes:

```typescript
import { 
  getServerAuthToken, 
  getServerUser, 
  requireAuth, 
  requireRole,
  optionalAuth 
} from '@/lib/auth/server';

// Get current user (requires authentication)
const user = await requireAuth();

// Get current user (optional)
const user = await optionalAuth();

// Require specific role
const admin = await requireRole('ADMIN');

// Get user by ID
const user = await getServerUserById('user-id');
```

### 2. Unified Authentication (`/lib/auth/unified.ts`)

Provides a unified API that works in both server and client environments:

```typescript
import { 
  getAuthToken, 
  getCurrentUser, 
  getUserById,
  isAuthenticated,
  hasRole 
} from '@/lib/auth/unified';

// Works in both server and client
const token = getAuthToken();
const user = await getCurrentUser();
const isAdmin = await hasRole('ADMIN');
```

### 3. Token Manager (`/utils/tokenManager.ts`)

Handles client-side token management with server synchronization:

```typescript
import tokenManager from '@/utils/tokenManager';

// Set tokens (automatically syncs with server)
await tokenManager.setAuthTokens(accessToken, refreshToken);

// Clear tokens (automatically syncs with server)
await tokenManager.clearAuthTokens();
```

## Usage Patterns

### 1. SEO-Friendly Public Pages with Optional Authentication

```typescript
// app/(public-pages)/courses/[slug]/page.tsx
import { Metadata } from "next";
import { optionalAuth } from "@/lib/auth/server";

export async function generateMetadata({ params }): Promise<Metadata> {
  const course = await getCourseBySlug(params.slug);
  
  return {
    title: `${course.title} | Tiny Steps A Day`,
    description: course.description,
    // ... other SEO metadata
  };
}

export default async function CoursePage({ params }) {
  const course = await getCourseBySlug(params.slug);
  const user = await optionalAuth(); // Optional - doesn't block rendering
  
  const canAccessPremium = user && hasPremiumAccess(user);
  
  return (
    <CourseDetailsClient 
      course={course} 
      user={user}
      canAccessPremium={canAccessPremium}
    />
  );
}
```

### 2. Protected Management Pages

```typescript
// app/(management)/management/users/[id]/page.tsx
import { requireRole } from "@/lib/auth/server";

export async function generateMetadata({ params }): Promise<Metadata> {
  // Require admin role for metadata generation
  await requireRole('ADMIN');
  
  const user = await getServerUserById(params.id);
  
  return {
    title: `${user.firstName} ${user.lastName} - User Details`,
    robots: "noindex, nofollow", // Management pages shouldn't be indexed
  };
}

export default async function UserDetailsPage({ params }) {
  // Require admin role
  await requireRole('ADMIN');
  
  const user = await getServerUserById(params.id);
  
  return <UserDetailsClient user={user} />;
}
```

### 3. Client Components with Authentication

```typescript
// components/dashboard/DashboardClient.tsx
'use client';

import { useAuthStore } from "@/store/authStore";
import { getCurrentUser } from "@/lib/auth/unified";

export default function DashboardClient() {
  const { user, isLoading } = useAuthStore();
  
  // Or use the unified API
  const currentUser = await getCurrentUser();
  
  return (
    <div>
      <h1>Welcome, {user?.firstName}!</h1>
      {/* Dashboard content */}
    </div>
  );
}
```

### 4. API Routes with Server Authentication

```typescript
// app/api/users/me/route.ts
import { getServerUser } from "@/lib/auth/server";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getServerUser();
  
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  return NextResponse.json({ user });
}
```

## Authentication Flow

### 1. Login Process

```typescript
// 1. User logs in via client component
const response = await fetch('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
});

const { accessToken, refreshToken } = await response.json();

// 2. Store in localStorage and sync with server
await tokenManager.setAuthTokens(accessToken, refreshToken);

// 3. Update auth store
useAuthStore.getState().setAuth(accessToken, refreshToken, user);
```

### 2. Server-Side Authentication

```typescript
// 1. Server component calls requireAuth()
const user = await requireAuth();

// 2. System checks HTTP-only cookies
const token = await getServerAuthToken();

// 3. If token exists, fetch user data
const user = await getServerUser();

// 4. If token is invalid, try to refresh
const refreshed = await refreshServerToken();
```

### 3. Token Refresh

```typescript
// Automatic refresh happens in the background
// Client: TokenManager handles refresh every 14 minutes
// Server: Automatic refresh when token is invalid
```

## Security Features

### 1. HTTP-Only Cookies
- Access tokens stored in HTTP-only cookies for server-side use
- Prevents XSS attacks on server-side tokens
- Short-lived (15 minutes) for security

### 2. Secure Token Storage
- Refresh tokens stored in HTTP-only cookies
- Long-lived (30 days) for convenience
- Automatically refreshed before expiry

### 3. Role-Based Access Control
```typescript
// Require specific role
await requireRole('ADMIN');

// Check multiple roles
await hasAnyRole(['ADMIN', 'MODERATOR']);

// Optional authentication
const user = await optionalAuth();
```

### 4. Middleware Protection
```typescript
// middleware.ts automatically protects routes
const protectedRoutes = ['/dashboard', '/management'];
const adminRoutes = ['/management'];
```

## Best Practices

### 1. SEO and Authentication
- Use `optionalAuth()` for public pages that need SEO
- Use `requireAuth()` for protected pages
- Set appropriate `robots` metadata for management pages

### 2. Error Handling
```typescript
try {
  const user = await requireAuth();
} catch (error) {
  // Handle authentication errors
  redirect('/auth/login');
}
```

### 3. Performance
- Use `cache: 'no-store'` for user data
- Implement proper loading states
- Handle token refresh gracefully

### 4. Type Safety
```typescript
// Use proper TypeScript interfaces
import { ServerUser } from '@/lib/auth/server';
import { User } from '@/lib/api/users';

// Both interfaces are compatible
const user: User | ServerUser = await getCurrentUser();
```

## Migration Guide

### From Client-Only Authentication

1. **Update server components** to use server authentication:
```typescript
// Before
const user = await getUserById(id); // ❌ localStorage error

// After
const user = await getServerUserById(id); // ✅ HTTP-only cookies
```

2. **Add token synchronization** to login/logout:
```typescript
// Before
localStorage.setItem('accessToken', token);

// After
await tokenManager.setAuthTokens(accessToken, refreshToken);
```

3. **Update API calls** to use unified authentication:
```typescript
// Before
import { getAuthToken } from '@/utils/tokenManager';

// After
import { getAuthToken } from '@/lib/auth/unified';
```

### From NextAuth.js

1. **Replace NextAuth hooks** with unified authentication:
```typescript
// Before
import { useSession } from 'next-auth/react';

// After
import { getCurrentUser } from '@/lib/auth/unified';
```

2. **Update middleware** to use custom authentication:
```typescript
// Before
export { default } from "next-auth/middleware";

// After
export function middleware(request: NextRequest) {
  // Custom middleware logic
}
```

## Troubleshooting

### Common Issues

1. **"localStorage is not defined"**
   - Use server authentication functions in server components
   - Use unified authentication API for cross-environment code

2. **Token synchronization issues**
   - Check network connectivity
   - Verify API routes are working
   - Check browser console for errors

3. **Role-based access errors**
   - Ensure user has proper role
   - Check role hierarchy (SUPER_ADMIN bypasses all checks)
   - Verify role names match exactly

4. **SEO metadata not working**
   - Use `optionalAuth()` instead of `requireAuth()` for public pages
   - Ensure metadata generation doesn't depend on authentication
   - Set appropriate `robots` directives

### Debug Mode

Enable debug logging by setting environment variables:
```bash
NEXT_PUBLIC_DEBUG_AUTH=true
```

This will log authentication operations to the console for debugging.

## API Reference

### Server Authentication Functions

- `getServerAuthToken()`: Get token from HTTP-only cookies
- `getServerUser()`: Get current user from server
- `getServerUserById(id)`: Get user by ID from server
- `requireAuth()`: Require authentication, redirect if not
- `requireRole(role)`: Require specific role
- `optionalAuth()`: Get user if authenticated, null otherwise

### Unified Authentication Functions

- `getAuthToken()`: Get token (works in both environments)
- `getCurrentUser()`: Get current user (works in both environments)
- `getUserById(id)`: Get user by ID (works in both environments)
- `isAuthenticated()`: Check if user is authenticated
- `hasRole(role)`: Check if user has specific role
- `hasAnyRole(roles)`: Check if user has any of the specified roles

### Token Manager Methods

- `setAuthTokens(accessToken, refreshToken)`: Set and sync tokens
- `clearAuthTokens()`: Clear and sync tokens
- `initialize()`: Initialize token manager
- `cleanup()`: Clean up token manager
- `refreshToken()`: Manually refresh token

This hybrid authentication system provides the best of both worlds: SEO-friendly server-side rendering with secure client-side authentication, all while maintaining a unified API for developers. 