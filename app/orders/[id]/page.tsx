'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { DashboardLayout } from '@/app/dashboard/components/Layout';
import { Button, Badge, Card, LoadingSpinner, ErrorMessage } from '@/components';
import { ArrowLeft, Mail, ShoppingCart, DollarSign, Calendar, Package, Save } from 'lucide-react';
import type { Order } from '@/types';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending', variant: 'info' as const },
  { value: 'processing', label: 'Processing', variant: 'primary' as const },
  { value: 'shipped', label: 'Shipped', variant: 'warning' as const },
  { value: 'completed', label: 'Completed', variant: 'success' as const },
  { value: 'cancelled', label: 'Cancelled', variant: 'error' as const },
];

export default function OrderDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  
  useEffect(() => {
    fetchOrder();
  }, [id]);
  
  const fetchOrder = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/orders/${id}`);
      const data = await response.json();
      
      if (data.success) {
        setOrder(data.data);
        setSelectedStatus(data.data.status);
      } else {
        setError(data.error || 'Failed to fetch order');
      }
    } catch (err) {
      setError('An error occurred while fetching the order');
    } finally {
      setLoading(false);
    }
  };
  
  const handleStatusUpdate = async () => {
    if (!order || selectedStatus === order.status) return;
    
    setSaving(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: selectedStatus }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setOrder(data.data);
      } else {
        setError(data.error || 'Failed to update order status');
      }
    } catch (err) {
      setError('An error occurred while updating the order status');
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <DashboardLayout title="Order Details">
        <div className="py-12">
          <LoadingSpinner size="lg" message="Loading order..." />
        </div>
      </DashboardLayout>
    );
  }
  
  if (error || !order) {
    return (
      <DashboardLayout title="Order Details">
        <div className="space-y-6">
          <Button variant="secondary" onClick={() => router.back()} icon={<ArrowLeft className="w-4 h-4" />}>
            Back to Orders
          </Button>
          <ErrorMessage message={error || 'Order not found'} />
        </div>
      </DashboardLayout>
    );
  }
  
  const currentStatusOption = STATUS_OPTIONS.find((opt) => opt.value === order.status);
  
  return (
    <DashboardLayout title="Order Details">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="secondary" onClick={() => router.back()} icon={<ArrowLeft className="w-4 h-4" />}>
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-[var(--text)]">Order Details</h1>
              <p className="text-[var(--text-secondary)] text-sm font-mono">{order.id}</p>
            </div>
          </div>
          {currentStatusOption && (
            <Badge variant={currentStatusOption.variant} size="md">
              {currentStatusOption.label}
            </Badge>
          )}
        </div>
        
        {error && <ErrorMessage message={error} />}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="font-medium text-[var(--text)] mb-4 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Order Items
              </h3>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-start justify-between p-4 bg-[var(--background)] rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-md bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center">
                        <Package className="w-6 h-6 text-[var(--text-secondary)]" />
                      </div>
                      <div>
                        <p className="font-medium text-[var(--text)]">{item.name}</p>
                        <p className="text-sm text-[var(--text-secondary)]">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-[var(--text)]">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-[var(--text-secondary)]">@ ${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-[var(--border)]">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-[var(--text)]">Order Total</span>
                  <span className="text-2xl font-semibold text-[var(--primary)]">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-medium text-[var(--text)] mb-4">Customer Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-[var(--primary)]">
                      {order.customerName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[var(--text)]">{order.customerName}</p>
                    <p className="text-sm text-[var(--text-secondary)] break-all">{order.customerEmail}</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-medium text-[var(--text)] mb-4">Update Status</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--text)]">
                    Order Status
                  </label>
                  <select
                    className="block w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    disabled={saving}
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                
                {selectedStatus !== order.status && (
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={handleStatusUpdate}
                    loading={saving}
                    loadingText="Updating..."
                    icon={<Save className="w-4 h-4" />}
                  >
                    Update Status
                  </Button>
                )}
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-medium text-[var(--text)] mb-4">Order Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[var(--text-secondary)]" />
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Order Date</p>
                    <p className="text-[var(--text)]">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                {order.updatedAt !== order.createdAt && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[var(--text-secondary)]" />
                    <div>
                      <p className="text-sm text-[var(--text-secondary)]">Last Updated</p>
                      <p className="text-[var(--text)]">{new Date(order.updatedAt).toLocaleString()}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-[var(--text-secondary)]" />
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Total</p>
                    <p className="font-semibold text-[var(--text)]">${order.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
