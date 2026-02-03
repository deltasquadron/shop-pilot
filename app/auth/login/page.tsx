'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Input, ErrorMessage, Card } from '@/components';
import { ShoppingBag, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, error, clearError } = useAuth();
  const router = useRouter();

  const validateForm = (): boolean => {
    const errors: { email?: string; password?: string } = {};
    let isValid = true;

    if (!email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await login(email, password, rememberMe);
      router.push('/dashboard');
    } catch {
      // Error is handled by AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--primary)] text-white mb-4 shadow-lg shadow-[var(--primary)]/30">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-[var(--text)] mb-2">
            Admin Dashboard
          </h1>
          <p className="text-[var(--text-secondary)]">
            Sign in to manage your store
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <ErrorMessage
                message={error}
                onRetry={() => {
                  clearError();
                  setFormErrors({});
                }}
              />
            )}

            <div className="space-y-4">
              <div>
                <Input
                  type="email"
                  label="Email Address"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (formErrors.email) {
                      setFormErrors({ ...formErrors, email: undefined });
                    }
                    if (error) clearError();
                  }}
                  error={formErrors.email}
                  leftIcon={<Mail className="w-5 h-5" />}
                  autoComplete="email"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (formErrors.password) {
                      setFormErrors({ ...formErrors, password: undefined });
                    }
                    if (error) clearError();
                  }}
                  error={formErrors.password}
                  leftIcon={<Lock className="w-5 h-5" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] rounded"
                      tabIndex={-1}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  }
                  autoComplete="current-password"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)] cursor-pointer"
                  disabled={isSubmitting}
                />
                <span className="text-sm text-[var(--text-secondary)]">Remember me</span>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isSubmitting}
              loadingText="Signing in..."
            >
              Sign In
            </Button>
          </form>
        </Card>

        <div className="mt-8 p-4 bg-[var(--surface)] rounded-lg border border-[var(--border)]">
          <h3 className="text-sm font-semibold text-[var(--text)] mb-2">
            Demo Credentials
          </h3>
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            <p>
              <strong className="text-[var(--text)]">Admin:</strong>{' '}
              admin@example.com / admin123
            </p>
            <p>
              <strong className="text-[var(--text)]">Editor:</strong>{' '}
              editor@example.com / editor123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
