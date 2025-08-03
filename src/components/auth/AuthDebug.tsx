"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export default function AuthDebug() {
  const { user, isLoggedIn, isLoading, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <div className="fixed top-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">Auth Debug</h3>
      <div className="space-y-1">
        <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
        <div>Logged In: {isLoggedIn ? 'Yes' : 'No'}</div>
        <div>User: {user ? `${user.firstName} ${user.lastName} (${user.role})` : 'None'}</div>
        <div>User ID: {user?.id || 'None'}</div>
        <div>LocalStorage User: {typeof window !== 'undefined' ? localStorage.getItem('user') ? 'Present' : 'Missing' : 'N/A'}</div>
        <div>LocalStorage isLoggedIn: {typeof window !== 'undefined' ? localStorage.getItem('isLoggedIn') || 'false' : 'N/A'}</div>
      </div>
    </div>
  );
} 