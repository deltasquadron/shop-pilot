import React from "react";
import { cn } from "../utils/cn";

export interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className="overflow-x-auto">
      <table
        className={cn(
          'min-w-full divide-y divide-border',
          className
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  );
};

Table.displayName = "Table";

export interface TableHeadProps {
  children: React.ReactNode;
  className?: string;
}

export const TableHead: React.FC<TableHeadProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <thead className={cn('bg-surface', className)} {...props}>
      {children}
    </thead>
  );
};

TableHead.displayName = "TableHead";

export interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const TableBody: React.FC<TableBodyProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <tbody className={cn('divide-y divide-border bg-surface', className)} {...props}>
      {children}
    </tbody>
  );
};

TableBody.displayName = "TableBody";

export interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const TableRow: React.FC<TableRowProps> = ({
  children,
  className,
  onClick,
  ...props
}) => {
  return (
    <tr
      className={cn(
        onClick && 'hover:bg-surface cursor-pointer',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </tr>
  );
};

TableRow.displayName = "TableRow";

export interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  children,
  className,
  onClick,
  sortable = false,
  sortDirection,
  ...props
}) => {
  return (
    <th
      className={cn(
        'px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider',
        sortable && 'cursor-pointer hover:bg-background',
        className
      )}
      onClick={sortable ? onClick : undefined}
      {...props}
    >
      <div className="flex items-center gap-1">
        {children}
        {sortable && sortDirection && (
          <svg
            className={cn(
              'w-3 h-3 transition-transform',
              sortDirection === 'desc' && 'rotate-180'
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        )}
      </div>
    </th>
  );
};

TableHeader.displayName = "TableHeader";

export interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

export const TableCell: React.FC<TableCellProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <td
      className={cn(
        'px-6 py-4 whitespace-nowrap text-sm text-primary',
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
};

TableCell.displayName = "TableCell";