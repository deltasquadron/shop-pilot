'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from '@/components';
import { User } from '@/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: User['role'];
  requiredPermission?: string;
  fallback?: React.ReactNode;
}

export function ProtectedRoute({
  children,
  requiredRole,
  requiredPermission,
  fallback,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, hasRole, hasPermission, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!isLoading && isAuthenticated && requiredRole && !hasRole(requiredRole)) {
      router.push('/dashboard');
    }
  }, [isLoading, isAuthenticated, requiredRole, hasRole, router]);

  useEffect(() => {
    if (!isLoading && isAuthenticated && requiredPermission && !hasPermission(requiredPermission)) {
      router.push('/dashboard');
    }
  }, [isLoading, isAuthenticated, requiredPermission, hasPermission, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <LoadingSpinner size="lg" message="Loading..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[var(--error)] mb-2">Access Denied</h2>
          <p className="text-[var(--text-secondary)]">
            You need {requiredRole} privileges to access this page.
          </p>
          {fallback}
        </div>
      </div>
    );
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[var(--error)] mb-2">Access Denied</h2>
          <p className="text-[var(--text-secondary)]">
            You don&apos;t have permission to access this page.
          </p>
          {fallback}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
