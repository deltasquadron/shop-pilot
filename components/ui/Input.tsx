import React from "react";
import { cn } from "../utils/cn";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'search';
  inputSize?: 'sm' | 'md' | 'lg';
  error?: string | boolean;
  className?: string;
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  variant = 'default',
  inputSize = 'md',
  error,
  className,
  label,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const baseClasses = 'block w-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50';
  
  const variantClasses = {
    default: 'bg-input-background border border-input-border rounded-md focus:ring-primary focus:border-primary hover:border-text-muted',
    search: 'bg-input-background border border-input-border rounded-md focus:ring-primary focus:border-primary hover:border-text-muted',
  };
  
  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-sm h-8',
    md: 'px-3 py-2 text-sm h-10',
    lg: 'px-4 py-2.5 text-base h-12',
  };
  
  const errorClasses = error ? 'border-error focus:ring-error focus:border-error hover:border-error' : '';

  const paddingClasses = {
    left: leftIcon || variant === 'search' ? 'pl-10' : '',
    right: rightIcon ? 'pr-10' : '',
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1.5 text-text-primary">
          {label}
        </label>
      )}

      <div className="relative">
        {variant === 'search' && !leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        )}

        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}

        <input
          className={cn(
            baseClasses,
            variantClasses[variant],
            sizeClasses[inputSize],
            errorClasses,
            paddingClasses.left,
            paddingClasses.right,
            className
          )}
          {...props}
        />

        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightIcon}
          </div>
        )}
      </div>

      {error && typeof error === 'string' && (
        <p className="mt-1 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
};

Input.displayName = "Input";