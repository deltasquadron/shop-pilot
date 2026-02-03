import React from "react";
import { cn } from "../utils/cn";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'search';
  inputSize?: 'sm' | 'md' | 'lg';
  error?: string | boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  variant = 'default',
  inputSize = 'md',
  error,
  className,
  ...props
}) => {
  const baseClasses = 'block w-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50';
  
  const variantClasses = {
    default: 'bg-input-background border border-input-border rounded-md focus:ring-primary focus:border-primary hover:border-text-muted',
    search: 'pl-10 pr-3 bg-input-background border border-input-border rounded-md focus:ring-primary focus:border-primary hover:border-text-muted',
  };
  
  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-sm h-8',
    md: 'px-3 py-2 text-sm h-10',
    lg: 'px-4 py-2.5 text-base h-12',
  };
  
  const errorClasses = error ? 'border-error focus:ring-error focus:border-error hover:border-error' : '';
  
  return (
    <div className="relative">
      {variant === 'search' && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      )}
      
      <input
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[inputSize],
          errorClasses,
          className
        )}
        {...props}
      />
      
      {error && typeof error === 'string' && (
        <p className="mt-1 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
};

Input.displayName = "Input";