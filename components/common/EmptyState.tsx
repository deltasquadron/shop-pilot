'use client';

import React from "react";
import { cn } from "../utils/cn";

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className,
}) => {
  const defaultIcon = (
    <svg className="mx-auto h-12 w-12 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
  
  return (
    <div className={cn('text-center py-12', className)}>
      <div className="mx-auto h-12 w-12">
        {icon || defaultIcon}
      </div>
      <h3 className="mt-2 text-sm font-medium text-primary">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-muted">{description}</p>
      )}
      {actionLabel && onAction && (
        <div className="mt-6">
          <button
            onClick={onAction}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover active:bg-primary-active font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {actionLabel}
          </button>
        </div>
      )}
    </div>
  );
};

EmptyState.displayName = "EmptyState";