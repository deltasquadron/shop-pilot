import React from "react";
import { cn } from "../utils/cn";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  inputSize?: 'sm' | 'md' | 'lg';
  error?: string | boolean;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  inputSize = 'md',
  error,
  className,
  children,
  ...props
}) => {
  const baseClasses = 'block w-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 appearance-none bg-input-background border border-input-border rounded-md pl-3 pr-10 focus:ring-primary focus:border-primary hover:border-text-muted';
  
  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-sm h-8',
    md: 'px-3 py-2 text-sm h-10',
    lg: 'px-4 py-2.5 text-base h-12',
  };
  
  const errorClasses = error ? 'border-error focus:ring-error focus:border-error hover:border-error' : '';
  
  return (
    <div className="relative">
      <select
        className={cn(
          baseClasses,
          sizeClasses[inputSize],
          errorClasses,
          className
        )}
        {...props}
      >
        {children}
      </select>
      
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="h-4 w-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {error && typeof error === 'string' && (
        <p className="mt-1 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
};

Select.displayName = "Select";