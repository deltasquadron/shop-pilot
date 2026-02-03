'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Badge } from '@/components';
import { Bell, Sun, Moon, Search, Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
  onMenuClick?: () => void;
}

export function Header({ title, onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();
  const [notifications] = useState(3);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('darkMode', String(isDarkMode));
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className="h-16 bg-[var(--surface)] border-b border-[var(--border)] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-[var(--surface-hover)] transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
        )}
        <h1 className="text-xl font-semibold text-[var(--text)]">{title}</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search - Hidden on mobile */}
        <div className="hidden sm:flex items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] w-48 lg:w-64"
            />
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-[var(--surface-hover)] transition-colors"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-[var(--text-secondary)]" />
          ) : (
            <Moon className="w-5 h-5 text-[var(--text-secondary)]" />
          )}
        </button>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-lg hover:bg-[var(--surface-hover)] transition-colors"
          aria-label={`${notifications} notifications`}
        >
          <Bell className="w-5 h-5 text-[var(--text-secondary)]" />
          {notifications > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-[var(--error)] text-white text-xs rounded-full flex items-center justify-center">
              {notifications}
            </span>
          )}
        </button>

        {/* User Menu */}
        {user && (
          <div className="flex items-center gap-3 pl-4 border-l border-[var(--border)]">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-[var(--text)]">{user.name}</p>
              <p className="text-xs text-[var(--text-secondary)] capitalize">{user.role}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
              <span className="text-sm font-semibold text-[var(--primary)]">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={logout}
              className="hidden sm:flex"
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
