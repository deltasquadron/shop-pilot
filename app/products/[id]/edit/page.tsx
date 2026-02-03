'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { DashboardLayout } from '@/app/dashboard/components/Layout';
import { LoadingSpinner, ErrorMessage } from '@/components';
import type { Product } from '@/types';
import { ProductForm } from '@/app/products/components/ProductForm';

export default function EditProductPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
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
  
  if (loading) {
    return (
      <DashboardLayout title="Edit Product">
        <div className="py-12">
          <LoadingSpinner size="lg" message="Loading product..." />
        </div>
      </DashboardLayout>
    );
  }
  
  if (error || !product) {
    return (
      <DashboardLayout title="Edit Product">
        <ErrorMessage message={error || 'Product not found'} />
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout title="Edit Product">
      <ProductForm product={product} mode="edit" />
    </DashboardLayout>
  );
}
