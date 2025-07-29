# Enhanced Authentication & Access Control System

## Overview

This document describes the enhanced authentication and access control system for Tiny Steps A Day, built with Zustand for state management and comprehensive security features.

## Key Features

### ✅ **Enhanced User State Management**
- **Zustand with Persistence**: Global state management with automatic persistence
- **Automatic Data Sync**: User data is automatically synchronized from the server
- **Real-time Updates**: User information stays fresh across page reloads
- **Subscription Management**: Real-time subscription status tracking

### ✅ **Security Features**
- **Token Management**: Automatic JWT token refresh
- **Session Validation**: Server-side session verification
- **Secure Storage**: Sensitive data is not persisted in localStorage
- **Access Control**: Granular permission-based access control

### ✅ **Access Control System**
- **Role-based Access**: Admin, moderator, user roles
- **Subscription-based Access**: Free, basic, premium, enterprise tiers
- **Permission-based Access**: Custom permissions for specific features
- **Component-level Protection**: Easy-to-use access control components

## Architecture

### State Management Flow

```
User Login → Store User Data → Sync with Server → Update Global State → Persist to Storage
     ↓
Page Reload → Restore from Storage → Validate Tokens → Sync Fresh Data → Update State
     ↓
Component Access → Check Permissions → Render Content → Monitor Changes → Auto-sync
```

### Data Flow

1. **Authentication**: User logs in → tokens stored → user data cached
2. **Persistence**: Zustand persists non-sensitive data to localStorage
3. **Synchronization**: Automatic sync every 5 minutes or on demand
4. **Access Control**: Components check permissions before rendering
5. **Token Refresh**: Automatic token refresh before expiration

## Usage Examples

### Basic Authentication

```tsx
import { useAuth } from "@/hooks/useAuth";

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Welcome, {user?.firstName}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Access Control Components

```tsx
import { AccessControl } from "@/components/auth/AccessControl";

// Basic authentication check
<AccessControl>
  <PremiumFeature />
</AccessControl>

// Admin access required
<AccessControl requireAdmin>
  <AdminPanel />
</AccessControl>

// Premium subscription required
<AccessControl requiredSubscription="premium">
  <PremiumContent />
</AccessControl>

// Custom permission required
<AccessControl requiredPermission="manage_courses">
  <CourseManager />
</AccessControl>

// Active subscription required
<AccessControl requireActiveSubscription>
  <SubscriptionFeature />
</AccessControl>
```

### Conditional Rendering

```tsx
import { useAccessControl } from "@/components/auth/AccessControl";

function Dashboard() {
  const { canAccess, canAccessPremium, canAccessAdmin } = useAccessControl();

  return (
    <div>
      {canAccessPremium() && <PremiumFeatures />}
      {canAccessAdmin() && <AdminTools />}
      {canAccess('manage_users') && <UserManagement />}
    </div>
  );
}
```

### User Data Synchronization

```tsx
import { useAuth } from "@/hooks/useAuth";
import { UserDataSyncStatus } from "@/components/dashboard/UserDataSyncStatus";

function Dashboard() {
  const { syncUserData, isUserDataFresh, isSyncingUser } = useAuth();

  return (
    <div>
      <UserDataSyncStatus />
      
      <button 
        onClick={syncUserData}
        disabled={isSyncingUser}
      >
        {isSyncingUser ? 'Syncing...' : 'Sync Now'}
      </button>
      
      <div>
        Data Status: {isUserDataFresh ? 'Fresh' : 'Stale'}
      </div>
    </div>
  );
}
```

## API Integration

### User Data Endpoint

The system automatically calls `GET /api/users/me` to sync user data:

```typescript
// Automatic sync on login and page reload
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

// Expected response format
{
  "success": true,
  "message": "User profile retrieved successfully",
  "data": {
    "id": "...",
    "email": "user@example.com",
    "username": "username",
    "firstName": "First",
    "lastName": "Last",
    "role": "USER",
    "isEmailVerified": true,
    "isActive": true,
    "permissions": ["read_courses", "manage_profile"],
    "subscriptionTier": "premium",
    "subscriptionStatus": "active",
    "subscriptionExpiry": "2024-12-31T23:59:59Z",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

## Security Considerations

### ✅ **Implemented Security Measures**

1. **Token Security**
   - JWT tokens stored in localStorage (with automatic refresh)
   - Refresh tokens for session persistence
   - Automatic token validation on each request

2. **Data Protection**
   - Sensitive data not persisted in localStorage
   - User data automatically synced from server
   - Session validation on server side

3. **Access Control**
   - Role-based access control
   - Subscription-based feature access
   - Permission-based component rendering

4. **Session Management**
   - Automatic session validation
   - Secure logout with server-side session cleanup
   - Session timeout handling

### 🔒 **Security Best Practices**

1. **Always validate on server-side**: Client-side checks are for UX only
2. **Use HTTPS**: All API calls should be over HTTPS
3. **Implement rate limiting**: Prevent brute force attacks
4. **Log security events**: Monitor for suspicious activity
5. **Regular token rotation**: Implement token refresh strategy

## Configuration

### Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Store Configuration

The auth store is configured with:

- **Persistence**: Automatic localStorage persistence
- **Partialization**: Only non-sensitive data is persisted
- **Auto-sync**: User data syncs every 5 minutes
- **Token refresh**: Automatic token refresh before expiration

## Troubleshooting

### Common Issues

1. **User data not syncing**
   - Check network connectivity
   - Verify API endpoint is accessible
   - Check token validity

2. **Access control not working**
   - Verify user permissions on server
   - Check subscription status
   - Ensure proper role assignment

3. **Token refresh failing**
   - Check refresh token validity
   - Verify server-side session management
   - Check token expiration settings

### Debug Mode

Enable debug logging by setting:

```typescript
// In development
localStorage.setItem('auth-debug', 'true');
```

## Performance Considerations

### ✅ **Optimizations**

1. **Lazy Loading**: Access control components are lazy-loaded
2. **Debounced Sync**: User data sync is debounced to prevent excessive API calls
3. **Caching**: User data is cached locally with freshness checks
4. **Selective Updates**: Only changed data triggers re-renders

### 📊 **Monitoring**

Monitor these metrics for performance:

- User data sync frequency
- Token refresh success rate
- Access control check performance
- Component render times

## Migration Guide

### From Previous Auth System

1. **Update imports**: Use new `useAuth` hook
2. **Replace access checks**: Use `AccessControl` components
3. **Update user data access**: Use enhanced user object
4. **Add sync status**: Implement `UserDataSyncStatus` component

### Breaking Changes

- User object structure has changed
- Access control API has been updated
- Token management is now automatic

## Future Enhancements

### Planned Features

1. **Real-time Updates**: WebSocket integration for live user data
2. **Advanced Permissions**: Hierarchical permission system
3. **Multi-factor Authentication**: 2FA integration
4. **Session Analytics**: User session tracking and analytics
5. **Offline Support**: Offline mode with sync when online

### Scalability Considerations

1. **Microservices**: Auth service can be extracted to microservice
2. **Redis Caching**: User data caching with Redis
3. **CDN Integration**: Static assets served via CDN
4. **Load Balancing**: Multiple auth service instances

## Support

For issues or questions about the authentication system:

1. Check this documentation
2. Review the example components
3. Check the troubleshooting section
4. Contact the development team

---

**Last Updated**: January 2025
**Version**: 2.0.0 