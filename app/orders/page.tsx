'use client';

import { useState, useEffect, useCallback } from 'react';
import { DashboardLayout } from '@/app/dashboard/components/Layout';
import { Button, Input, Select, Table, TableHead, TableBody, TableRow, TableHeader, TableCell, Badge, Pagination, LoadingSpinner, ErrorMessage, EmptyState } from '@/components';
import { Search, ShoppingCart } from 'lucide-react';
import type { Order } from '@/types';

const STATUS_OPTIONS = ['pending', 'processing', 'shipped', 'completed', 'cancelled'];

const STATUS_BADGE_MAP: Record<string, { variant: 'success' | 'warning' | 'error' | 'info' | 'primary', label: string }> = {
  pending: { variant: 'info', label: 'Pending' },
  processing: { variant: 'primary', label: 'Processing' },
  shipped: { variant: 'warning', label: 'Shipped' },
  completed: { variant: 'success', label: 'Completed' },
  cancelled: { variant: 'error', label: 'Cancelled' },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);
  
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
      });
      
      if (debouncedSearch) params.append('search', debouncedSearch);
      if (status) params.append('status', status);
      
      const response = await fetch(`/api/orders?${params.toString()}&_t=${Date.now()}`);
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.data.data);
        setTotalPages(data.data.totalPages);
      } else {
        setError(data.error || 'Failed to fetch orders');
      }
    } catch (err) {
      setError('An error occurred while fetching orders');
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, status]);
  
  useEffect(() => {
    fetchOrders();
  }, []);
  
  useEffect(() => {
    const handleFocus = () => {
      fetchOrders();
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [page, debouncedSearch, status]);
  
  useEffect(() => {
    fetchOrders();
  }, [page, debouncedSearch, status]);
  
  const handleViewOrder = (id: string) => {
    window.location.href = `/orders/${id}`;
  };
  
  const getBadgeInfo = (status: string) => {
    return STATUS_BADGE_MAP[status] || { variant: 'info' as const, label: status };
  };
  
  return (
    <DashboardLayout title="Orders">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-semibold text-[var(--text)]">Orders</h1>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              variant="search"
              placeholder="Search by customer name or order ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-48">
            <Select inputSize="md" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">All Status</option>
              {STATUS_OPTIONS.map((st) => (
                <option key={st} value={st}>{st.charAt(0).toUpperCase() + st.slice(1)}</option>
              ))}
            </Select>
          </div>
        </div>
        
        {loading ? (
          <div className="py-12">
            <LoadingSpinner size="lg" message="Loading orders..." />
          </div>
        ) : error ? (
          <ErrorMessage message={error} onRetry={fetchOrders} />
        ) : orders.length === 0 ? (
          <EmptyState
            title="No orders found"
            description={search || status ? 'Try adjusting your filters or search terms.' : 'Orders will appear here when customers make purchases.'}
            icon={<ShoppingCart className="w-12 h-12" />}
          />
        ) : (
          <>
            <Table className="bg-[var(--surface)] border border-[var(--border)] rounded-lg">
              <TableHead>
                <TableRow>
                  <TableHeader>Order ID</TableHeader>
                  <TableHeader>Customer</TableHeader>
                  <TableHeader>Items</TableHeader>
                  <TableHeader>Total</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Date</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => {
                  const badgeInfo = getBadgeInfo(order.status);
                  return (
                    <TableRow key={order.id} onClick={() => handleViewOrder(order.id)}>
                      <TableCell>
                        <span className="font-mono text-sm">{order.id}</span>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-[var(--text)]">{order.customerName}</div>
                          <div className="text-xs text-[var(--text-secondary)]">{order.customerEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-[var(--text)]">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={badgeInfo.variant}>{badgeInfo.label}</Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            
            {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
