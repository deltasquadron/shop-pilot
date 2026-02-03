'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => void;
  hasRole: (role: User['role']) => boolean;
  hasPermission: (permission: string) => boolean;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'auth_user';
const REMEMBER_KEY = 'auth_remember';

interface MockUser extends User {
  password: string;
}

const MOCK_USERS: MockUser[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    password: 'admin123',
  },
  {
    id: '2',
    name: 'Editor User',
    email: 'editor@example.com',
    role: 'editor',
    password: 'editor123',
  },
];

const ROLE_PERMISSIONS: Record<User['role'], string[]> = {
  admin: [
    'products:view',
    'products:create',
    'products:edit',
    'products:delete',
    'orders:view',
    'orders:edit',
    'orders:delete',
    'users:view',
    'users:manage',
    'settings:view',
    'settings:edit',
  ],
  editor: [
    'products:view',
    'products:create',
    'products:edit',
    'orders:view',
    'orders:edit',
    'settings:view',
  ],
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string, rememberMe = false): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const mockUser = MOCK_USERS.find(u => u.email === email && u.password === password);

      if (!mockUser) {
        throw new Error('Invalid email or password');
      }

      const { password: _, ...userWithoutPassword } = mockUser;
      
      setUser(userWithoutPassword);
      
      if (rememberMe) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));
        localStorage.setItem(REMEMBER_KEY, 'true');
      } else {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));
        localStorage.removeItem(REMEMBER_KEY);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(REMEMBER_KEY);
    window.location.href = '/auth/login';
  }, []);

  const hasRole = useCallback((role: User['role']): boolean => {
    return user?.role === role;
  }, [user]);

  const hasPermission = useCallback((permission: string): boolean => {
    if (!user) return false;
    const permissions = ROLE_PERMISSIONS[user.role];
    return permissions.includes(permission);
  }, [user]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    hasRole,
    hasPermission,
    error,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
