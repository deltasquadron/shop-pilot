'use client';

import { DashboardLayout } from '@/app/dashboard/components/Layout';
import { ProductForm } from '@/app/products/components/ProductForm';

export default function NewProductPage() {
  return (
    <DashboardLayout title="Create Product">
      <ProductForm mode="create" />
    </DashboardLayout>
  );
}
