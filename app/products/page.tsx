'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/app/dashboard/components/Layout';
import { Button, Input, Select, Table, TableHead, TableBody, TableRow, TableHeader, TableCell, Badge, Pagination, LoadingSpinner, ErrorMessage, EmptyState } from '@/components';
import { Plus, Search, Package } from 'lucide-react';
import type { Product } from '@/types';

const CATEGORIES = ['Electronics', 'Office', 'Clothing', 'Home'];
const STATUS_OPTIONS = ['active', 'inactive', 'archived'];

const STATUS_BADGE_MAP: Record<string, { variant: 'success' | 'warning' | 'error' | 'info' | 'primary', label: string }> = {
  active: { variant: 'success', label: 'Active' },
  inactive: { variant: 'warning', label: 'Inactive' },
  archived: { variant: 'error', label: 'Archived' },
};

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);
  
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
      });
      
      if (debouncedSearch) params.append('search', debouncedSearch);
      if (category) params.append('category', category);
      if (status) params.append('status', status);
      
      const response = await fetch(`/api/products?${params.toString()}&_t=${Date.now()}`);
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data.data);
        setTotalPages(data.data.totalPages);
      } else {
        setError(data.error || 'Failed to fetch products');
      }
    } catch (err) {
      setError('An error occurred while fetching products');
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, category, status]);
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  useEffect(() => {
    const handleFocus = () => {
      fetchProducts();
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [page, debouncedSearch, category, status]);
  
  useEffect(() => {
    fetchProducts();
  }, [page, debouncedSearch, category, status]);
  
  const handleCreateProduct = () => {
    router.push('/products/new');
  };
  
  const handleViewProduct = (id: string) => {
    router.push(`/products/${id}`);
  };
  
  const getBadgeInfo = (status: string) => {
    return STATUS_BADGE_MAP[status] || { variant: 'info' as const, label: status };
  };
  
  return (
    <DashboardLayout title="Products">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-semibold text-[var(--text)]">Products</h1>
          <Button variant="primary" onClick={handleCreateProduct} icon={<Plus className="w-4 h-4" />}>
            Add Product
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              variant="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-48">
            <Select inputSize="md" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Select>
          </div>
          <div className="w-full sm:w-40">
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
            <LoadingSpinner size="lg" message="Loading products..." />
          </div>
        ) : error ? (
          <ErrorMessage message={error} onRetry={fetchProducts} />
        ) : products.length === 0 ? (
          <EmptyState
            title="No products found"
            description={search || category || status ? 'Try adjusting your filters or search terms.' : 'Get started by creating your first product.'}
            icon={<Package className="w-12 h-12" />}
            actionLabel="Add Product"
            onAction={handleCreateProduct}
          />
        ) : (
          <>
            <Table className="bg-[var(--surface)] border border-[var(--border)] rounded-lg">
              <TableHead>
                <TableRow>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Category</TableHeader>
                  <TableHeader>Price</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Created</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => {
                  const badgeInfo = getBadgeInfo(product.status);
                  return (
                    <TableRow key={product.id} onClick={() => handleViewProduct(product.id)}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {product.images[0] && (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-10 h-10 rounded-md object-cover"
                            />
                          )}
                          <div>
                            <div className="font-medium text-[var(--text)]">{product.name}</div>
                            <div className="text-xs text-[var(--text-secondary)]">{product.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={badgeInfo.variant}>{badgeInfo.label}</Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(product.createdAt).toLocaleDateString()}
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
