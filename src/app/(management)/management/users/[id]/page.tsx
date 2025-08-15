"use client"

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { UserDetailsClient } from "@/components/management/user-details/UserDetailsClient"
import { DetailPageLoader } from '@/components/ui/loaders'
import { useAuth } from '@/hooks/useAuth'

export default function UserDetailsPage() {
  const params = useParams()
  const userId = params.id as string
  const { isLoggedIn, user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is admin
    if (!isLoggedIn || !user || user.role !== 'ADMIN') {
      setError('Access denied. Admin privileges required.')
      setIsLoading(false)
      return
    }

    // For now, we'll just set loading to false since we don't have a user API yet
    // In a real implementation, you'd fetch user details here
    setIsLoading(false)
  }, [isLoggedIn, user, userId])

  if (isLoading) {
    return <DetailPageLoader />
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-destructive mb-4">Access Denied</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  // Mock user data for now - replace with actual API call
  const mockUser = {
    id: userId,
    email: 'john.doe@example.com',
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    role: 'USER' as const,
    isEmailVerified: true,
    twoFactorEnabled: false,
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  return <UserDetailsClient user={mockUser} />
}