import React from "react";
import { cn } from "../utils/cn";

export interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = "Error",
  message,
  onRetry,
  className,
}) => {
  return (
    <div className={cn(
      'bg-error/10 border border-error/20 rounded-lg p-4',
      className
    )}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-error">{title}</h3>
          <div className="mt-1 text-sm text-error/90">{message}</div>
          {onRetry && (
            <div className="mt-3">
              <button
                type="button"
                onClick={onRetry}
                className="text-sm font-medium text-error hover:text-error-hover focus:outline-none focus:underline"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ErrorMessage.displayName = "ErrorMessage";