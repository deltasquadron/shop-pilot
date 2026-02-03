'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { DashboardLayout } from '@/app/dashboard/components/Layout';
import { Button, Badge, Card, LoadingSpinner, ErrorMessage } from '@/components';
import { ArrowLeft, Edit, Trash2, Package, DollarSign, Calendar, FileText, FolderOpen, Image as ImageIcon, CheckCircle, XCircle, Archive } from 'lucide-react';
import type { Product } from '@/types';

const STATUS_CONFIG = {
  active: { icon: <CheckCircle className="w-5 h-5" />, variant: 'success' as const, label: 'Active' },
  inactive: { icon: <XCircle className="w-5 h-5" />, variant: 'warning' as const, label: 'Inactive' },
  archived: { icon: <Archive className="w-5 h-5" />, variant: 'error' as const, label: 'Archived' },
};

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  useEffect(() => {
    fetchProduct();
  }, [id]);
  
  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      
      if (data.success) {
        setProduct(data.data);
      } else {
        setError(data.error || 'Failed to fetch product');
      }
    } catch (err) {
      setError('An error occurred while fetching the product');
    } finally {
      setLoading(false);
    }
  };
  
  const handleEdit = () => {
    router.push(`/products/${id}/edit`);
  };
  
  const handleDelete = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }
    
    setDeleteLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        router.push('/products');
      } else {
        setError(data.error || 'Failed to delete product');
        setShowDeleteConfirm(false);
      }
    } catch (err) {
      setError('An error occurred while deleting the product');
      setShowDeleteConfirm(false);
    } finally {
      setDeleteLoading(false);
    }
  };
  
  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };
  
  if (loading) {
    return (
      <DashboardLayout title="Product Details">
        <div className="py-12">
          <LoadingSpinner size="lg" message="Loading product..." />
        </div>
      </DashboardLayout>
    );
  }
  
  if (error || !product) {
    return (
      <DashboardLayout title="Product Details">
        <div className="space-y-6">
          <Button variant="secondary" onClick={() => router.back()} icon={<ArrowLeft className="w-4 h-4" />}>
            Back to Products
          </Button>
          <ErrorMessage message={error || 'Product not found'} />
        </div>
      </DashboardLayout>
    );
  }
  
  const statusConfig = STATUS_CONFIG[product.status];
  
  return (
    <DashboardLayout title="Product Details">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="secondary" onClick={() => router.back()} icon={<ArrowLeft className="w-4 h-4" />}>
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-[var(--text)]">Product Details</h1>
              <p className="text-[var(--text-secondary)] text-sm">{product.id}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={handleEdit} icon={<Edit className="w-4 h-4" />}>
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              loading={deleteLoading}
              loadingText="Deleting..."
              icon={<Trash2 className="w-4 h-4" />}
            >
              {showDeleteConfirm ? 'Confirm Delete' : 'Delete'}
            </Button>
          </div>
        </div>
        
        {showDeleteConfirm && (
          <div className="bg-[var(--error)]/10 border border-[var(--error)]/20 rounded-lg p-4">
            <p className="text-[var(--error)] font-medium">Are you sure you want to delete this product?</p>
            <p className="text-[var(--error)]/80 text-sm mt-1">This action cannot be undone.</p>
            <div className="flex gap-3 mt-3">
              <Button variant="secondary" size="sm" onClick={handleCancelDelete}>
                Cancel
              </Button>
              <Button variant="danger" size="sm" onClick={handleDelete} loading={deleteLoading}>
                Yes, Delete It
              </Button>
            </div>
          </div>
        )}
        
        {error && <ErrorMessage message={error} />}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  {product.images[0] && (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg border border-[var(--border)]"
                    />
                  )}
                  <div>
                    <h2 className="text-xl font-semibold text-[var(--text)]">{product.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={statusConfig.variant}>
                        <div className="flex items-center gap-1">
                          {statusConfig.icon}
                          <span>{statusConfig.label}</span>
                        </div>
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-[var(--text-secondary)] mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[var(--text)]">Description</p>
                    <p className="text-[var(--text-secondary)] mt-1">{product.description}</p>
                  </div>
                </div>
              </div>
            </Card>
            
            {product.images.length > 1 && (
              <Card className="p-6">
                <h3 className="font-medium text-[var(--text)] flex items-center gap-2 mb-4">
                  <ImageIcon className="w-5 h-5" />
                  Product Images
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      className="w-full aspect-square object-cover rounded-md border border-[var(--border)]"
                    />
                  ))}
                </div>
              </Card>
            )}
          </div>
          
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-medium text-[var(--text)] mb-4">Product Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-[var(--text-secondary)]" />
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Price</p>
                    <p className="font-semibold text-[var(--text)]">${product.price.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FolderOpen className="w-5 h-5 text-[var(--text-secondary)]" />
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Category</p>
                    <p className="font-semibold text-[var(--text)]">{product.category}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[var(--text-secondary)]" />
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Created</p>
                    <p className="text-[var(--text)]">{new Date(product.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[var(--text-secondary)]" />
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Last Updated</p>
                    <p className="text-[var(--text)]">{new Date(product.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-medium text-[var(--text)] mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button variant="secondary" fullWidth onClick={handleEdit}>
                  Edit Product
                </Button>
                <Button variant="danger" fullWidth onClick={handleDelete} loading={deleteLoading}>
                  Delete Product
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
